# layout/header/

`AppHeader` — content of the sticky header region.

- Menu button (hidden from `lg` with `d-lg-none`) emitting `menuToggle`; exposes
  `focusMenuButton()` so the shell can restore focus.
- Brand slot via `[appHeaderBrand]` content projection.
- Color-mode switch (`aria-pressed`) backed by `ColorModeStore`.

The `<header>` landmark element is rendered by the shell; this component fills it.
Files: [app-header.ts](app-header.ts), [app-header.html](app-header.html), [app-header.scss](app-header.scss).
