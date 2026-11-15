import { Component, OnInit, inject, viewChild } from '@angular/core';

import { Button } from '../../../../shared/components/button/button';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ItemDraft } from '../../models/item.model';
import { ItemStore } from '../../services/item-store';
import { PlaceholderDetail } from '../placeholder-detail/placeholder-detail';
import { PlaceholderForm } from '../placeholder-form/placeholder-form';

/**
 * Container (page) component: connects the feature store to presentational
 * components and renders one branch per load state. Contains no markup-heavy
 * rendering logic and no HTTP calls.
 */
@Component({
  selector: 'app-placeholder-container',
  imports: [Button, EmptyState, LoadingSpinner, PlaceholderDetail, PlaceholderForm],
  templateUrl: './placeholder-container.html',
})
export class PlaceholderContainer implements OnInit {
  protected readonly store = inject(ItemStore);
  private readonly form = viewChild.required(PlaceholderForm);

  ngOnInit(): void {
    this.store.load();
  }

  protected async create(draft: ItemDraft): Promise<void> {
    if (await this.store.create(draft)) {
      this.form().reset();
    }
  }
}
