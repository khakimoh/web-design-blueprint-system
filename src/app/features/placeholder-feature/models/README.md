# placeholder-feature/models/

[item.model.ts](item.model.ts) defines:

- `Item` — application model: camelCase, non-null, readonly.
- `ItemDraft` — user input for creating an item.
- `ItemDto` — transfer type mirroring the API (snake_case, nullable fields); used only inside
  `services/`.
- `ItemStatus` union and `ITEM_STATUSES` list (used to validate API values).

Components import `Item`/`ItemDraft` only, never `ItemDto`.
