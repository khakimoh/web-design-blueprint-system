# playground/src/app/layout/docs-shell/

`DocsShell` — documentation layout on the Blueprint's `.ds-shell` pattern.

- Skip link, sticky header with brand and (from `md`) theme/direction switches.
- Sidebar navigation: persistent from `lg`, off-canvas below with backdrop; Escape closes it and
  returns focus to the Sections button; switches move into it below `md`.
- After each navigation, focus moves to `<main>`.
