import { Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ColorModeStore } from '../../core/services/color-mode-store';

/** Top bar: menu toggle (below lg), product name slot, color-mode switch. */
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  readonly sidebarOpen = input(false);
  /** id of the element the menu button controls. */
  readonly sidebarId = input.required<string>();
  readonly menuToggle = output<void>();

  protected readonly colorMode = inject(ColorModeStore);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  /** Used by the shell to restore focus when the off-canvas sidebar closes. */
  focusMenuButton(): void {
    this.menuButton()?.nativeElement.focus();
  }
}
