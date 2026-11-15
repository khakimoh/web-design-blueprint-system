import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { APP_CONFIG } from '../../../core/config/app-config';
import { asArray, asOneOf, asString } from '../../../shared/utils/coerce';
import { ITEM_STATUSES, Item, ItemDraft, ItemDto } from '../models/item.model';

/**
 * HTTP access for items: URLs, request bodies and DTO -> model mapping.
 * Stateless; errors arrive as AppError via the HTTP error interceptor.
 * Provided by the feature route (autoProvided: false).
 */
@Service({ autoProvided: false })
export class ItemApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${inject(APP_CONFIG).apiBaseUrl}/items`;

  list(): Observable<readonly Item[]> {
    return this.http.get<unknown>(this.baseUrl).pipe(map((body) => asArray(body, toItem)));
  }

  create(draft: ItemDraft): Observable<Item | null> {
    return this.http.post<unknown>(this.baseUrl, toCreateRequest(draft)).pipe(map(toItem));
  }
}

/**
 * Boundary normalization: the only place that knows the API's field names.
 * Returns null for entries without a usable id so callers can drop them.
 */
export function toItem(value: unknown): Item | null {
  if (typeof value !== 'object' || value === null) return null;
  const dto = value as Partial<ItemDto>;
  const id = asString(dto.id);
  if (!id) return null;
  return {
    id,
    title: asString(dto.title, 'Untitled'),
    summary: asString(dto.summary),
    status: asOneOf(dto.status, ITEM_STATUSES, 'active'),
    updatedAt: asString(dto.updated_at),
  };
}

function toCreateRequest(draft: ItemDraft): Pick<ItemDto, 'title' | 'summary'> {
  return { title: draft.title.trim(), summary: draft.summary.trim() };
}
