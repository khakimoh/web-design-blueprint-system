import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';

/**
 * Loading indicator for content areas. Appears only after `delay` ms so fast
 * responses do not flash a spinner. Announced politely to screen readers.
 */
@Component({
  selector: 'app-loading-spinner',
  template: `
    @if (visible()) {
      <div class="d-flex align-items-center gap-2 py-6 justify-content-center text-body-secondary" role="status">
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span>{{ label() }}</span>
      </div>
    }
  `,
})
export class LoadingSpinner implements OnInit {
  readonly label = input('Loading…');
  readonly delay = input(300);

  protected readonly visible = signal(false);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const timer = setTimeout(() => this.visible.set(true), this.delay());
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }
}
