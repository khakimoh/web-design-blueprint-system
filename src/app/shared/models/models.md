# shared/models/

Generic types used across features. No domain entities here — those live in
`features/<feature>/models/`.

| File | Type |
| --- | --- |
| [load-state.model.ts](load-state.model.ts) | `LoadState<T, E>` discriminated union (`idle`, `loading`, `success`, `error`) with `IDLE`/`LOADING` constants; the error type is a parameter so `shared` does not depend on `core` |
| [nav-item.model.ts](nav-item.model.ts) | `NavItem` for navigation lists |

Rules: `interface`/`type` only, readonly properties, no classes for plain data.
