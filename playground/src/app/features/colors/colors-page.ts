import { Component, computed, inject } from '@angular/core';

import { DesignTokens, TokenEntry } from '../../core/services/design-tokens';
import { contrastRatio } from '../../core/utils/color';
import { Swatch } from '../../shared/components/swatch/swatch';

interface ColorGroup {
  readonly title: string;
  readonly tokens: readonly TokenEntry[];
}

/** Presentation grouping of semantic names (the names themselves come from the stylesheet). */
const GROUPS: readonly { title: string; test: RegExp }[] = [
  { title: 'Surfaces', test: /^(background|surface.*|overlay)$/ },
  { title: 'Text', test: /^text-/ },
  { title: 'Borders', test: /^border/ },
  { title: 'Brand', test: /^(on-)?(primary|secondary)/ },
  { title: 'Feedback', test: /^(success|warning|danger|info)/ },
  { title: 'Interaction', test: /^(focus-ring|selection-bg|highlight-bg|shadow)$/ },
];

@Component({
  selector: 'pg-colors-page',
  imports: [Swatch],
  templateUrl: './colors-page.html',
})
export default class ColorsPage {
  private readonly tokens = inject(DesignTokens);

  protected readonly groups = computed<ColorGroup[]>(() => {
    const semantic = this.tokens.tokens('--ds-color-', { exclude: /-rgb$/ });
    return GROUPS.map((g) => ({ title: g.title, tokens: semantic.filter((t) => g.test.test(t.name)) }));
  });

  protected readonly palettes = computed(() => {
    const byName = new Map<string, TokenEntry[]>();
    for (const token of this.tokens.tokens('--pg-palette-')) {
      const [palette, step] = splitLast(token.name);
      byName.set(palette, [...(byName.get(palette) ?? []), { ...token, name: step }]);
    }
    return [...byName].map(([name, steps]) => ({ name, steps }));
  });

  protected readonly contrast = computed(() => {
    const raw = this.tokens.value('--pg-contrast-pairs').replace(/^"|"$/g, '');
    return raw
      .split(',')
      .map((entry) => entry.trim().split(/\s+/))
      .filter((parts) => parts.length === 3)
      .map(([fg, bg, min]) => {
        const ratio = contrastRatio(
          this.tokens.value(`--ds-color-${fg}`),
          this.tokens.value(`--ds-color-${bg}`),
        );
        return { fg, bg, min: Number(min), ratio, pass: ratio !== null && ratio >= Number(min) };
      });
  });
}

function splitLast(name: string): [string, string] {
  const i = name.lastIndexOf('-');
  return [name.slice(0, i), name.slice(i + 1)];
}
