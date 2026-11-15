import { Component, inject } from '@angular/core';

import { PreferencesStore } from './core/services/preferences-store';
import { DocsShell } from './layout/docs-shell/docs-shell';

@Component({
  selector: 'pg-root',
  imports: [DocsShell],
  template: '<pg-docs-shell />',
})
export class App {
  // Instantiate early so the stored theme and direction apply before first paint of content.
  private readonly preferences = inject(PreferencesStore);
}
