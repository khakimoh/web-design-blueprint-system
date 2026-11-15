import { Component, inject } from '@angular/core';

import { Direction, PreferencesStore, ThemePreference } from '../../../core/services/preferences-store';

/** Theme (light / dark / system) and direction (LTR / RTL) switches. */
@Component({
  selector: 'pg-theme-controls',
  templateUrl: './theme-controls.html',
})
export class ThemeControls {
  protected readonly preferences = inject(PreferencesStore);
  protected readonly themes: readonly { value: ThemePreference; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  protected readonly directions: readonly { value: Direction; label: string }[] = [
    { value: 'ltr', label: 'LTR' },
    { value: 'rtl', label: 'RTL' },
  ];
}
