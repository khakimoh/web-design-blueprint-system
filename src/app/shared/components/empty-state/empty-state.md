# shared/components/empty-state/

`EmptyState` — empty and error states, built on the framework-agnostic global pattern
[`src/styles/components/_empty-state.scss`](../../../../styles/components/_empty-state.scss).

- Inputs: `title` (required), `description`, `tone` (`neutral` | `danger`), `headingLevel`
  (1–3, to fit the page outline), `role` (`status`/`alert` for dynamic errors).
- Slots: `[emptyStateIcon]` and `[emptyStateActions]` via content projection.
- No component stylesheet: the global `.ds-empty-state` classes provide the styling, so the same
  markup works in non-Angular contexts.

```html
<app-empty-state tone="danger" title="Items could not be loaded" description="Try again.">
  <button emptyStateActions appButton type="button" (click)="retry()">Try again</button>
</app-empty-state>
```
