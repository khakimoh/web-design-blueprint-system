# placeholder-container/

`PlaceholderContainer` — the feature's page (container) component.

- Injects `ItemStore`, triggers `load()` on init, and renders `@switch` branches for
  `loading` (delayed spinner), `error` (danger empty state with retry), `success` (empty state
  or a `.ds-auto-grid` list).
- Passes data down to `PlaceholderDetail`, handles `selectItem`; submits form drafts to the
  store and resets the form on success.
- Owns the page heading (`h1`) and section headings for a correct outline.

Files: [placeholder-container.ts](placeholder-container.ts), [placeholder-container.html](placeholder-container.html).
