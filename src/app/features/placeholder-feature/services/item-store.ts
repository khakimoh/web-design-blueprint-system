import { Service, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppError, toAppError } from '../../../core/errors/app-error';
import { IDLE, LOADING, LoadState } from '../../../shared/models/load-state.model';
import { Item, ItemDraft } from '../models/item.model';
import { ItemApi } from './item-api';

/**
 * Feature state for items. Provided by the feature route, so it lives exactly
 * as long as the feature is active. Exposes readonly signals and commands;
 * components never write state directly.
 */
@Service({ autoProvided: false })
export class ItemStore {
  private readonly api = inject(ItemApi);
  private readonly state = signal<LoadState<readonly Item[], AppError>>(IDLE);
  private readonly saveState = signal<LoadState<Item, AppError>>(IDLE);
  private loading?: Subscription;

  readonly status = computed(() => this.state().status);
  readonly items = computed(() => {
    const state = this.state();
    return state.status === 'success' ? state.data : [];
  });
  readonly error = computed(() => {
    const state = this.state();
    return state.status === 'error' ? state.error : null;
  });
  readonly isEmpty = computed(() => this.status() === 'success' && this.items().length === 0);

  readonly selectedId = signal<string | null>(null);
  readonly selected = computed(() => this.items().find((item) => item.id === this.selectedId()) ?? null);

  readonly isSaving = computed(() => this.saveState().status === 'loading');
  readonly saveError = computed(() => {
    const state = this.saveState();
    return state.status === 'error' ? state.error : null;
  });

  load(): void {
    this.loading?.unsubscribe(); // a newer request supersedes an older one
    this.state.set(LOADING);
    this.loading = this.api.list().subscribe({
      next: (items) => this.state.set({ status: 'success', data: items }),
      error: (error: unknown) => this.state.set({ status: 'error', error: toAppError(error) }),
    });
  }

  select(id: string): void {
    this.selectedId.update((current) => (current === id ? null : id));
  }

  /** Resolves to true when the item was created. */
  create(draft: ItemDraft): Promise<boolean> {
    if (this.isSaving()) return Promise.resolve(false); // prevent duplicate submissions
    this.saveState.set(LOADING);
    return new Promise((resolve) => {
      this.api.create(draft).subscribe({
        next: (item) => {
          if (item) {
            this.state.update((state) =>
              state.status === 'success' ? { status: 'success', data: [item, ...state.data] } : state,
            );
            this.saveState.set({ status: 'success', data: item });
          } else {
            this.saveState.set({ status: 'error', error: toAppError(new Error('Invalid response')) });
          }
          resolve(item !== null);
        },
        error: (error: unknown) => {
          this.saveState.set({ status: 'error', error: toAppError(error) });
          resolve(false);
        },
      });
    });
  }
}
