/**
 * Generic example entity for the reference feature. Replace with the
 * project's own models; keep the split between API (DTO) and app (model) types.
 */

export type ItemStatus = 'active' | 'archived';
export const ITEM_STATUSES: readonly ItemStatus[] = ['active', 'archived'];

/** Application model: camelCase, non-null, readonly. */
export interface Item {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly status: ItemStatus;
  /** ISO 8601 timestamp. */
  readonly updatedAt: string;
}

/** Data entered by the user to create an item. */
export interface ItemDraft {
  readonly title: string;
  readonly summary: string;
}

/**
 * Transfer type: mirrors the API exactly (snake_case, optional/nullable
 * fields as documented by the API). Used only inside services.
 */
export interface ItemDto {
  readonly id: string;
  readonly title?: string | null;
  readonly summary?: string | null;
  readonly status?: string | null;
  readonly updated_at?: string | null;
}
