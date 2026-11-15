# features/placeholder-feature/

Reference feature with a deliberately generic entity (`Item`). It demonstrates the complete
vertical slice; replace it with real features in a project.

| Path | Demonstrates |
| --- | --- |
| [placeholder-feature.routes.ts](placeholder-feature.routes.ts) | Default-exported routes, feature-scoped providers |
| [models/](models/models.md) | Model vs DTO types |
| [services/](services/services.md) | API client with boundary normalization; signal store with load/save states |
| [components/](components/components.md) | Container, presentational component, form |

Data flow: `ItemApi` (HTTP → `Item`) → `ItemStore` (signals, `LoadState`) →
`PlaceholderContainer` (page) → `PlaceholderDetail` / `PlaceholderForm` (presentational).
