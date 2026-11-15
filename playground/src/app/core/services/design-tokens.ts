import { DOCUMENT, Service, computed, inject } from '@angular/core';

import { PreferencesStore } from './preferences-store';

export interface TokenEntry {
  /** Name without the leading `--prefix-`, e.g. "text-secondary". */
  readonly name: string;
  /** Full custom property, e.g. "--ds-color-text-secondary". */
  readonly property: string;
  /** Computed value for the active theme. */
  readonly value: string;
}

/**
 * Reads design tokens from the compiled stylesheet at runtime instead of
 * keeping a copy of them in TypeScript: custom property names are collected
 * from `:root` rules, values come from getComputedStyle for the active theme.
 * Re-evaluates whenever the theme changes.
 */
@Service()
export class DesignTokens {
  private readonly document = inject(DOCUMENT);
  private readonly preferences = inject(PreferencesStore);
  private readonly names = this.collectRootProperties();
  private readonly classes = this.collectClassNames();

  /** Changes identity whenever the theme changes, so dependants recompute. */
  private readonly snapshot = computed(() => {
    this.preferences.theme();
    this.preferences.direction();
    const view = this.document.defaultView;
    return view ? view.getComputedStyle(this.document.documentElement) : null;
  });

  /** All tokens whose property starts with `prefix` (e.g. "--ds-space-"). */
  tokens(prefix: string, options: { exclude?: RegExp } = {}): TokenEntry[] {
    const style = this.snapshot();
    return this.names
      .filter((p) => p.startsWith(prefix) && !(options.exclude?.test(p) ?? false))
      .map((property) => ({
        name: property.slice(prefix.length),
        property,
        value: style?.getPropertyValue(property).trim() ?? '',
      }));
  }

  value(property: string): string {
    return this.snapshot()?.getPropertyValue(property).trim() ?? '';
  }

  /** Class names defined in the stylesheet that start with `prefix` (e.g. "ds-type-"). */
  classNames(prefix: string): string[] {
    return this.classes.filter((c) => c.startsWith(prefix));
  }

  private rules(): CSSStyleRule[] {
    const out: CSSStyleRule[] = [];
    for (const sheet of Array.from(this.document.styleSheets)) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue; // cross-origin stylesheet
      }
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule) out.push(rule);
      }
    }
    return out;
  }

  private collectRootProperties(): string[] {
    const seen = new Set<string>();
    for (const rule of this.rules()) {
      if (!rule.selectorText.includes(':root')) continue;
      for (let i = 0; i < rule.style.length; i++) {
        const property = rule.style[i];
        if (property.startsWith('--')) seen.add(property);
      }
    }
    return [...seen];
  }

  private collectClassNames(): string[] {
    const seen = new Set<string>();
    for (const rule of this.rules()) {
      for (const match of rule.selectorText.matchAll(/\.([a-z][\w-]*)/g)) seen.add(match[1]);
    }
    return [...seen];
  }
}
