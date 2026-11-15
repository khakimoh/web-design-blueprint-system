# playground/src/app/features/

One folder per showcase section, each a lazy-loaded standalone page (default export, loaded
with `loadComponent` from `app.routes.ts`).

`overview`, `colors`, `typography`, `spacing`, `ui-components`, `forms`, `layout-grid`, `theming`,
`direction`, plus `not-found` for unknown routes. Pages read tokens through `DesignTokens` and never
define values.
