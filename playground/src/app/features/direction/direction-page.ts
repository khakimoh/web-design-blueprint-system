import { Component, inject } from '@angular/core';

import { PreferencesStore } from '../../core/services/preferences-store';
import { ThemeControls } from '../../shared/components/theme-controls/theme-controls';

@Component({
  selector: 'pg-direction-page',
  imports: [ThemeControls],
  templateUrl: './direction-page.html',
  styleUrl: './direction-page.scss',
})
export default class DirectionPage {
  protected readonly preferences = inject(PreferencesStore);
  protected readonly samples = [
    { dir: 'ltr', lang: 'en', title: 'Left to right', body: 'Spacing, borders and icons follow the reading direction.', action: 'Continue', next: 'Next' },
    { dir: 'rtl', lang: 'fa', title: 'راست به چپ', body: 'فاصله‌ها، حاشیه‌ها و آیکون‌ها از جهت خواندن پیروی می‌کنند.', action: 'ادامه', next: 'بعدی' },
  ] as const;
}
