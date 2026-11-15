# Design System Playground

A standalone Angular application that showcases the Blueprint's design system **live**:
colors, typography, spacing, UI components, forms, layout and grid, light/dark themes and
RTL/LTR. It is the visual companion to the documentation in [`../docs/`](../docs/docs.md).

The playground defines **no design tokens of its own**. It compiles the Blueprint's
[`src/styles/`](../src/styles/styles.md) in place (nothing is copied), including the Bootstrap
configuration, and reads token names and values from the compiled stylesheet at runtime.

## Run it

Requirements: Node.js 20.19+ (or 22.12+/24+) and npm. The `ng` command comes from the Angular
CLI; install it globally once with `npm install -g @angular/cli@22`, or use the npm scripts.

```bash
cd playground
npm install
ng serve --open
```

The application opens at **http://localhost:4200/**. Without a global CLI, use either:

```bash
npm start -- --open
```

```bash
npx ng serve --open
```

Other commands:

| Command | Purpose |
| --- | --- |
| `ng build` | Production build into `dist/playground/` |
| `ng test --watch=false` | Unit tests (Vitest) |

The playground has its own `package.json`; the repository root needs no `npm install` for it.

## Sections

| Route | Shows |
| --- | --- |
| `/overview` | What the design system is, token counts read from the stylesheet, token levels |
| `/colors` | Semantic colors per group, live WCAG contrast checks, primitive palettes |
| `/typography` | Text roles, Persian and English samples, type scale, families, weights, line heights |
| `/spacing` | Spacing scale, radius, elevation, control heights, z-index layers, motion |
| `/components` | Buttons, badges, alerts, cards, tabs, breadcrumbs, pagination, table, loading/empty/error states, dialog |
| `/forms` | Form controls and validation states with accessible error handling |
| `/layout` | Breakpoints with the active one highlighted, Bootstrap grid, auto grid, content widths |
| `/themes` | Theme switching and side-by-side light/dark previews |
| `/direction` | RTL/LTR switching and the same markup rendered in both directions |

The header switches theme (Light / Dark / System) and direction (LTR / RTL) for the whole page;
below the `md` breakpoint the switches move into the off-canvas sidebar.

## How it reuses the Blueprint

| Concern | How |
| --- | --- |
| Global styles | [`src/styles.scss`](src/styles.scss) does `@use "../../src/styles/main"` — the Blueprint entry, Bootstrap included |
| Component styles | `@use "abstracts" as ds;` — [`angular.json`](angular.json) adds `../src/styles` (and `node_modules` for Bootstrap) to `stylePreprocessorOptions.includePaths` |
| Token values in TypeScript | [`DesignTokens`](src/app/core/services/design-tokens.ts) collects `--ds-*` custom properties and `.ds-type-*` classes from the stylesheet; no token list in code |
| Tokens not emitted by the Blueprint | [`_token-exports.scss`](src/styles/_token-exports.scss) re-exports palettes, breakpoints, container widths and contrast pairs from the Sass maps as `--pg-*` properties |
| Brand and theme settings | The Blueprint's defaults in `src/styles/config/_project.scss` — edit that file to preview another brand |
| RTL for Bootstrap | [`postcss.config.json`](postcss.config.json) runs `postcss-rtlcss` (see note below) |

Playground-only styles use the `pg-` prefix ([`_docs.scss`](src/styles/_docs.scss)) and tokens only.

### Note on RTLCSS

`postcss-rtlcss` in its default mode wraps physical properties such as Reboot's
`ol { padding-left }` in `[dir="ltr"]` rules. That raises their specificity above Bootstrap
component classes (for example, it left an unwanted indent in `.breadcrumb`). The playground
therefore enables `safeBothPrefix: true`, which prefixes the competing component rules too.
It requires a `dir` attribute on `<html>`, which the playground always sets.

## Structure

```text
playground/
├── angular.json, package.json, postcss.config.json
├── public/                 static files (favicon)
└── src/
    ├── styles.scss         Blueprint entry + playground exports
    ├── styles/             playground-only global styles (token exports, docs patterns)
    └── app/
        ├── core/           preferences store, token reader, title strategy, color utils
        ├── shared/         swatch, code sample, theme controls, models
        ├── layout/         documentation shell (sidebar, header, main, footer)
        └── features/       one lazy-loaded page per showcase section
```

It follows the Blueprint's Angular profile: standalone components, zoneless, `OnPush`,
signals, `@Service()`, feature-based folders, lazy routes and the 2025 file-name style.
