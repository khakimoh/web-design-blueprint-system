import { Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';

import { NavItem } from '../../shared/models/nav-item.model';
import { AppHeader } from '../header/app-header';
import { MainNav } from '../navigation/main-nav';

/**
 * Application frame built on the global `.ds-shell` layout
 * (src/styles/layout/_app-shell.scss): skip link, sticky header, sidebar that
 * is persistent from `lg` and off-canvas below, main region and footer.
 *
 * Accessibility behaviour shown here:
 * - focus moves into the off-canvas sidebar when it opens and back to the menu
 *   button when it closes (Escape or backdrop);
 * - after each navigation the sidebar closes and focus moves to <main>.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, AppHeader, MainNav],
  templateUrl: './app-shell.html',
  host: {
    '(document:keydown.escape)': 'closeSidebar()',
  },
})
export class AppShell {
  protected readonly sidebarId = 'app-sidebar';
  protected readonly sidebarOpen = signal(false);
  protected readonly navItems: readonly NavItem[] = [{ label: 'Items', path: '/items' }];

  private readonly injector = inject(Injector);
  private readonly header = viewChild.required(AppHeader);
  private readonly sidebar = viewChild.required<ElementRef<HTMLElement>>('sidebar');
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        skip(1), // keep the browser's default focus on first load
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
    afterNextRender(
      () => this.sidebar().nativeElement.querySelector<HTMLElement>('a[href], button')?.focus(),
      { injector: this.injector },
    );
  }

  protected closeSidebar(): void {
    if (!this.sidebarOpen()) return;
    this.sidebarOpen.set(false);
    this.header().focusMenuButton();
  }
}
