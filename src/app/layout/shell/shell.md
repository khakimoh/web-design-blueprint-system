# layout/shell/

`AppShell` — golden example of a responsive application frame.

- Uses the global `.ds-shell` grid: sticky header; sidebar persistent from `lg`, off-canvas
  below with a backdrop; `<main id="main" tabindex="-1">`; footer.
- Skip link to `#main` as the first focusable element.
- Off-canvas behaviour: focus moves into the panel when it opens; Escape or the backdrop
  closes it and focus returns to the menu button (`aria-expanded`/`aria-controls` on the button).
- After each navigation: the sidebar closes and focus moves to `<main>` (skipped on first load).

Verified in a browser at 375 px and desktop widths, light/dark themes and `dir="rtl"`.
Files: [app-shell.ts](app-shell.ts), [app-shell.html](app-shell.html).
