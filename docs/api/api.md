# API Integration Principles

Technology-independent rules for consuming APIs from the frontend. The Angular
implementation is shown in [angular/architecture.md](../technologies/angular/architecture.md#data-access)
and in the golden example `src/app/features/placeholder-feature/services/`.

## 1. Layering

```text
UI (presentational) ← container ← state/store ← API client ← HTTP
                                              ↑
                                    normalization + error mapping
```

- One **API client** per backend resource or feature. It owns URLs, request shapes and response mapping.
- Components never call HTTP directly and never see transfer types.

## 2. Typed contracts and boundary normalization

- Define **transfer types** (`ItemDto`) that mirror the API exactly, and **model types** (`Item`) that the application uses.
- Map DTO → model in one function at the boundary. The mapper:
  - converts casing (`created_at` → `createdAt`);
  - converts types (ISO strings → `Date` only if the app needs date math; otherwise keep ISO strings);
  - applies safe defaults (`[]` for missing collections, `''` or `null` for missing text — decide per field, document it);
  - reconciles legacy or inconsistent fields in one place;
  - resolves relative asset URLs against configuration.
- Prefer validation (schema/guard functions) for payloads from systems you do not control.
- Models are readonly; mapping produces new objects.

## 3. Errors

- Map every failed request to one application error type with a small, closed set of kinds: `network`, `timeout`, `unauthorized`, `forbidden`, `not-found`, `validation`, `conflict`, `server`, `unknown`.
- Carry a user-safe message key, the HTTP status, and field errors for `validation`.
- UI decides presentation from the kind (retry button for `network`, inline field messages for `validation`, sign-in prompt for `unauthorized`).
- Global concerns (session expiry, offline banner) are handled once, centrally (interceptor/middleware).

## 4. Caching and request discipline

- Idempotent, rarely changing data is fetched once and shared (single-flight + replay cache); invalidate explicitly after writes.
- Cancel superseded requests (typeahead, rapid filter changes).
- Retries: only idempotent methods, only transient failures (network, 502/503/504), bounded with backoff.
- Pagination, filtering and sorting parameters are typed and serialized in one place.

## 5. Configuration

- Base URLs come from configuration; services never hard-code protocol, host or absolute paths.
- Relative asset paths are resolved against the configured base, so the app works under a sub-path deployment.

## 6. Loading states

Every view backed by an API exposes four states — **loading**, **empty**, **error**,
**success** — modelled as a discriminated union (see the `LoadState<T>` golden
example in `src/app/shared/models/`). Spinners appear only after a short delay
(~300 ms) or as skeletons, to avoid flicker on fast responses.
