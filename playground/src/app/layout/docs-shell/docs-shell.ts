import { Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';

import { ThemeControls } from '../../shared/components/theme-controls/theme-controls';
import { NAV_ITEMS } from '../../app.routes';

/**
 * Documentation shell on the Blueprint's `.ds-shell` layout: sticky header,
 * sidebar navigation (persistent from lg, off-canvas below), main, footer.
 */
@Component({
  selector: 'pg-docs-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeControls],
  templateUrl: './docs-shell.html',
  styleUrl: './docs-shell.scss',
  host: { '(document:keydown.escape)': 'closeSidebar()' },
})
export class DocsShell {
  protected readonly navItems = NAV_ITEMS;
  protected readonly sidebarOpen = signal(false);

  private readonly injector = inject(Injector);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly sidebar = viewChild.required<ElementRef<HTMLElement>>('sidebar');
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        skip(1),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.sidebarOpen.set(false);
        this.main().nativeElement.focus();
      });
  }

  protected toggleSidebar(): void {
    if (this.sidebarOpen()) {
      this.closeSidebar();
      return;
    }
    this.sidebarOpen.set(true);
    afterNextRender(() => this.sidebar().nativeElement.querySelector<HTMLElement>('a[href]')?.focus(), {
      injector: this.injector,
    });
  }

  protected closeSidebar(): void {
    if (!this.sidebarOpen()) return;
    this.sidebarOpen.set(false);
    this.menuButton().nativeElement.focus();
  }
}
