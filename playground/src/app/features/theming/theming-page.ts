import { Component, inject } from '@angular/core';

import { PreferencesStore } from '../../core/services/preferences-store';
import { CodeSample } from '../../shared/components/code-sample/code-sample';
import { ThemeControls } from '../../shared/components/theme-controls/theme-controls';

@Component({
  selector: 'pg-theming-page',
  imports: [CodeSample, ThemeControls],
  templateUrl: './theming-page.html',
})
export default class ThemingPage {
  protected readonly preferences = inject(PreferencesStore);
  protected readonly schemes = ['light', 'dark'] as const;

  protected readonly config = `// src/styles/config/_project.scss
$enabled-themes: ("light", "dark");
$default-theme: "light";
$custom-themes: (
  "high-contrast": ("extends": "light", "tokens": (
    "text-secondary": #1a1a1a,
  )),
);`;

  protected readonly markup = `<html data-bs-theme="dark">          <!-- whole page -->
<section data-bs-theme="light">…</section>  <!-- one subtree -->`;
}
