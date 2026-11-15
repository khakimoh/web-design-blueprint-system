# Workflow — Design System Application

## Part A — Configure the visual identity (once per project)

1. **Copy** `src/styles/` from the pinned blueprint version into the project's `src/styles/`.
2. **Translate** `project.config.yaml` → `design` into `src/styles/config/_project.scss`:

   | `project.config.yaml` | `_project.scss` |
   | --- | --- |
   | `colors.primary` / `secondary` / `neutral` / `extra` | `$brand-primary` / `$brand-secondary` / `$neutral-seed` / `$brand-extra` |
   | `typography.font_family_base` / `_heading` / `_mono` | `$font-family-base` / `$font-family-heading` / `$font-family-mono` |
   | `typography.fonts_by_locale` | `$font-families-by-lang` |
   | `shape`: sharp / subtle / default / rounded | `$radius-scale-factor`: 0 / 0.5 / 1 / 1.5 |
   | `density` | `$density` |
   | `themes.enabled` / `default` / `custom` | `$enabled-themes` / `$default-theme` / `$custom-themes` |
   | (CI strictness) | `$contrast-check: "error"` recommended once the palette is settled |

3. **Wire** the entry: `main.scss` (Bootstrap) or `main-standalone.scss` (none) as the only
   global stylesheet; add `src/styles` to the Sass load path.
4. **Fonts:** self-host web fonts (package or files in `public/fonts/`), declare `@font-face`
   with `font-display: swap` in `src/styles/project/_fonts.scss` (enable it in
   `project/_index.scss`), preload the main weight.
5. **Direction:** set `lang`/`dir` on `<html>`; add the RTL PostCSS step when needed.
6. **Themes:** add the pre-paint theme script to `index.html`; provide the color-mode service and a toggle in the header.
7. **Build** and fix every contrast warning via `$semantic-overrides` (never by editing `themes/`).
8. **Visual check:** a temporary page rendering headings, body text, buttons (all variants and states), form controls (valid/invalid/disabled), alerts, badges, a card and a table in light, dark and (if applicable) RTL. Delete the page afterwards or keep it behind a dev-only route.

## Part B — Build UI with the design system (every UI change)

1. **Classify** each element: native → Bootstrap → generic shared component → project component ([components.md](../design-system/components.md)).
2. **Layout** with containers, the grid, `.ds-auto-grid`, flex/gap utilities; mobile-first.
3. **Spacing** with the 4 px scale (`.p-4`, `ds.space(4)`, aliases like `stack-md`).
4. **Typography** with roles (`.ds-type-*`, Bootstrap headings), not raw sizes.
5. **Color** with semantic tokens only (`ds.color-token()`, `var(--ds-color-*)`, Bootstrap theme utilities).
6. **States**: implement all applicable states ([interaction-states.md](../design-system/interaction-states.md)).
7. **Accessibility**: names, labels, focus, contrast, keyboard ([accessibility.md](../design-system/accessibility.md)).
8. **Direction**: logical properties, mirrored directional icons.

## Design consistency review checklist

- [ ] No raw color, spacing, radius, shadow, z-index or duration values in changed files.
- [ ] No duplicated Bootstrap functionality (custom grid, custom button classes…).
- [ ] Typography uses roles; one `h1` per page; heading levels sequential.
- [ ] Components look correct in light and dark themes.
- [ ] Layout correct at 320 px, md and xl; no horizontal page scroll.
- [ ] Focus visible on every interactive element; targets ≥ 24 px.
- [ ] RTL mirrored correctly (if configured).
- [ ] Loading, empty and error states use the shared patterns.
