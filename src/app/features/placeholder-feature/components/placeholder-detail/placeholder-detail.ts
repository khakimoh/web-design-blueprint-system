import { DatePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { Item } from '../../models/item.model';

/**
 * Presentational component: renders one item and reports intent.
 * No injected services, no state beyond its inputs.
 */
@Component({
  selector: 'app-placeholder-detail',
  imports: [DatePipe],
  templateUrl: './placeholder-detail.html',
  styleUrl: './placeholder-detail.scss',
})
export class PlaceholderDetail {
  readonly item = input.required<Item>();
  readonly active = input(false);
  readonly selectItem = output<string>();

  protected readonly statusLabel = computed(() => (this.item().status === 'active' ? 'Active' : 'Archived'));
  protected readonly statusClass = computed(() =>
    this.item().status === 'active'
      ? 'bg-success-subtle text-success-emphasis border border-success-subtle'
      : 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle',
  );
}
