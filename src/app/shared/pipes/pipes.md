# shared/pipes/

Pure pipes for display formatting that Angular's built-in pipes (`date`, `number`,
`currency`, `percent`, `i18nPlural`) do not cover — e.g. relative time or file size.

Rules: `pure: true` (default); no side effects or injected state; locale-aware via
`LOCALE_ID`. Prefer `computed()` in the component when the transform is used once.
Generate with `ng generate pipe shared/pipes/<name>` (produces `<name>-pipe.ts`).
