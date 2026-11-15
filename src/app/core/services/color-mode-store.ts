import { DOCUMENT, Service, computed, effect, inject, signal } from '@angular/core';

export type ColorModePreference = 'light' | 'dark' | 'system';
export type ColorMode = 'light' | 'dark';

/** Must match `$theme-attribute` in src/styles/config/_project.scss. */
const THEME_ATTRIBUTE = 'data-bs-theme';
const STORAGE_KEY = 'color-mode';

/**
 * Holds the user's color-mode preference, resolves "system" through
 * prefers-color-scheme, persists the choice and applies it to <html>.
 * SSR-safe: browser APIs are only touched when a window exists.
 */
@Service()
export class ColorModeStore {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private readonly darkQuery = this.window?.matchMedia('(prefers-color-scheme: dark)');
  private readonly systemPrefersDark = signal(this.darkQuery?.matches ?? false);

  readonly preference = signal<ColorModePreference>(this.readStoredPreference());
  readonly mode = computed<ColorMode>(() => {
    const preference = this.preference();
    if (preference !== 'system') return preference;
    return this.systemPrefersDark() ? 'dark' : 'light';
  });

  constructor() {
    this.darkQuery?.addEventListener('change', (event) => this.systemPrefersDark.set(event.matches));
    effect(() => this.document.documentElement.setAttribute(THEME_ATTRIBUTE, this.mode()));
  }

  setPreference(preference: ColorModePreference): void {
    this.preference.set(preference);
    try {
      this.window?.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Storage can be unavailable (private mode, quota); the choice still applies for this session.
    }
  }

  toggle(): void {
    this.setPreference(this.mode() === 'dark' ? 'light' : 'dark');
  }

  private readStoredPreference(): ColorModePreference {
    try {
      const stored = this.window?.localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch {
      return 'system';
    }
  }
}
