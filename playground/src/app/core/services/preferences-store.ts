import { DOCUMENT, Service, computed, inject, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';

/** Must match `$theme-attribute` in the Blueprint's config/_project.scss. */
const THEME_ATTRIBUTE = 'data-bs-theme';
const STORAGE_KEY = 'pg-preferences';

interface StoredPreferences {
  theme: ThemePreference;
  direction: Direction;
}

/**
 * Viewer preferences for the playground: color theme (light/dark/system) and
 * text direction. Applies them to <html> synchronously, so anything that reads
 * computed styles after a change sees the new values.
 */
@Service()
export class PreferencesStore {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private readonly darkQuery = this.window?.matchMedia('(prefers-color-scheme: dark)');
  private readonly systemDark = signal(this.darkQuery?.matches ?? false);
  private readonly stored = this.read();

  readonly themePreference = signal<ThemePreference>(this.stored.theme);
  readonly direction = signal<Direction>(this.stored.direction);
  readonly theme = computed<Theme>(() => {
    const p = this.themePreference();
    return p === 'system' ? (this.systemDark() ? 'dark' : 'light') : p;
  });

  constructor() {
    this.darkQuery?.addEventListener('change', (event) => {
      this.systemDark.set(event.matches);
      this.apply();
    });
    this.apply();
  }

  setTheme(preference: ThemePreference): void {
    this.themePreference.set(preference);
    this.apply();
  }

  setDirection(direction: Direction): void {
    this.direction.set(direction);
    this.apply();
  }

  private apply(): void {
    const html = this.document.documentElement;
    html.setAttribute(THEME_ATTRIBUTE, this.theme());
    html.setAttribute('dir', this.direction());
    html.setAttribute('lang', this.direction() === 'rtl' ? 'fa' : 'en');
    try {
      const value: StoredPreferences = { theme: this.themePreference(), direction: this.direction() };
      this.window?.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Storage unavailable (private mode); preferences still apply for this visit.
    }
  }

  private read(): StoredPreferences {
    const fallback: StoredPreferences = { theme: 'system', direction: 'ltr' };
    try {
      const raw = JSON.parse(this.window?.localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<StoredPreferences> | null;
      return {
        theme: raw?.theme === 'light' || raw?.theme === 'dark' ? raw.theme : fallback.theme,
        direction: raw?.direction === 'rtl' ? 'rtl' : fallback.direction,
      };
    } catch {
      return fallback;
    }
  }
}
