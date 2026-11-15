import { Component, booleanAttribute, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Bootstrap button with a loading state.
 *
 * Applied as an attribute on a native <button>, so native semantics, `type`,
 * form submission and all other attributes keep working:
 *
 *   <button appButton type="submit" variant="primary" [loading]="saving()">Save</button>
 *
 * It adds behaviour (loading/disabled handling, aria-busy) and nothing that
 * Bootstrap classes already provide.
 */
@Component({
  selector: 'button[appButton]',
  templateUrl: './button.html',
  host: {
    '[class]': 'classes()',
    '[disabled]': 'disabled() || loading()',
    '[attr.aria-busy]': 'loading() || null',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Announced to assistive technology while loading. */
  readonly loadingLabel = input('Loading');

  protected readonly classes = computed(() => {
    const size = this.size();
    return [
      'btn',
      `btn-${this.variant()}`,
      size === 'md' ? '' : `btn-${size}`,
      'd-inline-flex align-items-center justify-content-center gap-2',
    ]
      .filter(Boolean)
      .join(' ');
  });
}
