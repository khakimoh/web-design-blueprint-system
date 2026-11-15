import { Component, DOCUMENT, DestroyRef, computed, inject, signal } from '@angular/core';

import { DesignTokens } from '../../core/services/design-tokens';

@Component({
  selector: 'pg-layout-grid-page',
  templateUrl: './layout-grid-page.html',
  styleUrl: './layout-grid-page.scss',
})
export default class LayoutGridPage {
  protected readonly tokens = inject(DesignTokens);
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly breakpoints = computed(() => this.tokens.tokens('--pg-breakpoint-'));
  protected readonly containers = computed(() => this.tokens.tokens('--pg-container-'));
  protected readonly contentWidths = computed(() => this.tokens.tokens('--pg-content-width-'));
  protected readonly viewport = signal(this.window?.innerWidth ?? 0);

  /** The largest breakpoint whose minimum width the viewport reaches. */
  protected readonly active = computed(() => {
    const width = this.viewport();
    return this.breakpoints().reduce((current, bp) => (width >= parseFloat(bp.value) ? bp.name : current), 'xs');
  });

  constructor() {
    const onResize = (): void => this.viewport.set(this.window?.innerWidth ?? 0);
    this.window?.addEventListener('resize', onResize, { passive: true });
    inject(DestroyRef).onDestroy(() => this.window?.removeEventListener('resize', onResize));
  }
}
