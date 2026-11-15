import { Component, computed, input } from '@angular/core';

import { toHex } from '../../../core/utils/color';

/** Color sample with its token name and resolved value. */
@Component({
  selector: 'pg-swatch',
  templateUrl: './swatch.html',
  styleUrl: './swatch.scss',
})
export class Swatch {
  /** Display name, e.g. "text-secondary". */
  readonly name = input.required<string>();
  /** CSS custom property, e.g. "--ds-color-text-secondary". */
  readonly property = input.required<string>();
  readonly value = input.required<string>();
  readonly compact = input(false);

  protected readonly hex = computed(() => toHex(this.value()));
}
