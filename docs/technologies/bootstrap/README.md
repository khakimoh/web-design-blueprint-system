# Bootstrap Profile

Bootstrap is the default CSS framework. It provides Reboot, the grid, utilities and
component CSS; the design system provides every value it uses. Implementation:
[`src/styles/vendors/bootstrap/`](../../../src/styles/vendors/bootstrap/README.md).

## 1. Version policy

| | |
| --- | --- |
| Supported | **Bootstrap 5.3.x** (verified with 5.3.9, the current stable release in 2026-11) |
| Range | `~5.3.9` (patch updates only; minor updates are reviewed because Bootstrap changes Sass variables in minors) |
| Bootstrap 6 | Pre-release only (`6.0.0-alpha`) — do not use in projects. A Bootstrap 6 adapter will be a new major version of this profile. |
| JavaScript | Not loaded by default. Interactive widgets use the framework integration (Angular: `@ng-bootstrap/ng-bootstrap`, versions matched to Angular) or native elements (`<dialog>`, `<details>`). If Bootstrap's own JS is used, load `bootstrap.bundle` (includes Popper) once, globally. |

## 2. Integration method (recommended and only supported)

**Sass module configuration** of Bootstrap's `!default` variables:

```scss
// vendors/bootstrap/_index.scss (simplified)
@use "../../abstracts" as ds;
@use "bootstrap/scss/bootstrap" with (
  $primary: …from the light theme…,
  $spacers: …from the spacing scale…,
  $grid-breakpoints: …from tokens…,
  …
);
@use "bridge";   // runtime --bs-* variables for every theme
```

Why this method:

- **Supported mechanism** — Bootstrap variables are designed to be overridden; Sass validates that every configured variable exists (a typo fails the build).
- **Tokens stay the source** — Bootstrap never defines a value the design system does not.
- **Removable** — deleting the vendor layer (standalone entry) leaves the design system intact.

Alternatives considered and rejected: importing `bootstrap.min.css` and overriding classes
(duplicates values, specificity fights); the `@import`-based partial import sequence from
Bootstrap's docs (deprecated Sass syntax, harder to keep token-driven); prebuilt RTL CSS
(bypasses configuration).

Never modify files in `node_modules/bootstrap`, never copy Bootstrap source into the project.

## 3. What is configured from tokens

| Area | Bootstrap variables | Token source |
| --- | --- | --- |
| Colors | `$primary`, `$secondary`, `$success`, `$info`, `$warning`, `$danger`, `$light`, `$dark`, `$body-*` | light theme + palettes |
| Runtime colors per theme | `--bs-body-bg`, `--bs-border-color`, `--bs-*-text-emphasis`, `-bg-subtle`, `-border-subtle`, form validation colors… | `_bridge.scss` from each theme |
| Typography | `$font-family-*`, `$font-size-*`, `$font-weight-*`, `$line-height-*`, `$h1…h6-font-size` (fluid), `$headings-*` | typography tokens and roles |
| Breakpoints & grid | `$grid-breakpoints`, `$container-max-widths`, `$grid-gutter-width`, `$container-padding-x` | sizing tokens |
| Spacing utilities | `$spacer`, `$spacers` (keys 0–16 = 4 px units) | spacing scale |
| Shape & elevation | `$border-radius*`, `$box-shadow*`, `$zindex-*` | shape and elevation tokens |
| Motion | `$transition-base`, `$transition-fade`, `$btn-transition` | motion tokens |
| Focus | `$focus-ring-width`, `$focus-ring-color` | focus tokens |
| Components | buttons, inputs, form checks, cards, dropdowns, modals, badges, tables | component tokens |
| Switches | `$enable-dark-mode`, `$color-mode-type: data`, `$enable-shadows: false`, `$enable-rfs: false`, `$enable-reduced-motion`, `$min-contrast-ratio: 4.5` | |
| Utility API | `$utilities` additions (example: `.text-balance`, `.text-pretty`) | |

### Customizing in a project

- Brand, fonts, roundness, density, themes → `config/_project.scss` only.
- Another Bootstrap variable → add it to `vendors/bootstrap/_index.scss`, sourced from a token, and record it as a deviation (or propose it upstream if generic).
- New utility → add to `$utilities` in the same file (Bootstrap's Utility API); set a key to `null` to remove a utility.
- Component look beyond variables → a global stylesheet in `src/styles/components/` targeting a **project** class (e.g. `.app-card--metric`), never overriding `.card` itself.

## 4. Theme integration

`$color-mode-type: data` + the `data-bs-theme` attribute drive both Bootstrap's color modes
and the design-system themes. `_bridge.scss` re-emits Bootstrap's runtime variables from the
design-system theme after Bootstrap's own output, so a single attribute switch updates every
component. See [themes.md](../../design-system/themes.md).

## 5. Usage rules

- Use Bootstrap markup/classes for standard components (see the classification in [components.md](../../design-system/components.md)).
- Prefer utilities for one-off spacing/alignment; create a component class when the same utility combination repeats 3+ times.
- Spacing utility numbers are 4 px units (`.p-4` = 16 px).
- Use start/end utilities (`ms-*`, `me-*`, `text-start`) — never left/right — so RTL works.
- Do not mix in another CSS framework or utility library.

## 6. Using the design system without Bootstrap

Set `frontend.css_framework: none` and use `src/styles/main-standalone.scss`: tokens, themes,
reset, headings, containers (`.ds-container`), layout primitives, shell and helpers are all
included. The project then supplies component styles using the same tokens.
