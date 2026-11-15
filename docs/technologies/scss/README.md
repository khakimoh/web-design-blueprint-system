# SCSS Profile

How the design system is implemented in SCSS. Reference implementation:
[`src/styles/`](../../../src/styles/README.md). Framework-agnostic: used unchanged by the
Angular profile and by any future framework profile.

## 1. Toolchain

- **Dart Sass** (`sass` package) with the **module system** (`@use` / `@forward`). `@import` is forbidden (deprecated; removed in Dart Sass 3).
- Verified with Sass 1.108 (blueprint build) — Angular's builder ships its own compatible Sass.
- Bootstrap 5.3 still uses `@import` internally; its deprecation warnings are dependency noise and are silenced by `quietDeps` (Angular does this automatically). Warnings from our files are never silenced.

## 2. Architecture

```text
src/styles/
├── main.scss              entry — Bootstrap profile
├── main-standalone.scss   entry — no CSS framework
├── config/_project.scss   project inputs (project-owned)
├── abstracts/             public Sass API: tokens + functions + mixins (no CSS output)
├── tokens/                canonical token maps (no CSS output)
├── themes/                semantic color values per theme + registry/validation
├── base/                  :root custom properties, themes, global behaviour, type roles, reset*
├── layout/                app shell, layout primitives, containers*
├── components/            global styles for patterns the CSS framework lacks
├── utilities/             helper classes*
├── vendors/bootstrap/     Bootstrap configured from tokens + runtime theme bridge
└── project/               project-owned CSS (fonts, project patterns), loaded last
                           (* standalone entry only)
```

### Import order (documented in each entry file)

| # | Layer | Emits CSS | Depends on |
| --- | --- | --- | --- |
| 1 | `config` | no | — |
| 2 | `abstracts` (→ `tokens`, color math) | no | config |
| 3 | `vendors/bootstrap` | yes | abstracts, themes |
| 4 | `base` (root, themes, global, typography; reset/headings standalone) | yes | abstracts, themes |
| 5 | `layout` | yes | abstracts |
| 6 | `components` | yes | abstracts |
| 7 | `utilities` | yes | abstracts |
| 8 | `project` (project-owned) | yes | abstracts |

Dependencies point **up** this table only; there are no circular imports (Sass's module
system rejects cycles at compile time).

## 3. Using the API in component stylesheets

```scss
@use "abstracts" as ds;   // needs src/styles on the load path

.thing {
  padding: ds.space(4);
  color: ds.color-token("text-secondary");
  @include ds.media-up("md") { padding: ds.space(6); }
}
```

`abstracts` emits no CSS, so it can be used from any number of component stylesheets
without duplicating output. Each Angular component stylesheet is compiled separately, which
is why project values live in a **file** (`config/_project.scss`) rather than in an
`@use … with (…)` configuration that only the global entry would see.

## 4. Rules

1. **One canonical source:** values come from `tokens/` (seeded by `config/`). Raw colors are allowed only in `config/_project.scss`, `tokens/_palette.scss` and `abstracts/_color.scss` (enforced by `npm run build:styles`).
2. **No duplicated values:** reference tokens; derive (`calc()` with tokens) rather than repeat.
3. **Sass maps** for systematic scales; accessor functions (`ds.space()`, `ds.radius()`…) instead of `map.get` in components — they error on unknown keys.
4. **Mixins** only for patterns used in ≥ 2 places (`focus-ring`, `visually-hidden`, `type-role`, media queries).
5. **Functions** only when they improve consistency (token accessors, color math, fluid sizes).
6. **CSS custom properties** for anything that changes at runtime (theme colors, shadows, durations) and for component customization hooks.
7. **Nesting ≤ 2 levels** (block → element/state). Prefer flat BEM-style classes: `.block`, `.block__element`, modifiers via attributes (`[data-tone="danger"]`) or `.block--modifier`.
8. **No `!important`** (enforced). Bootstrap utilities use it by design; that is the only exception.
9. **No unintended global side effects:** global element rules only in `base/` and wrapped in `:where()` (zero specificity); everything else is class-based with the `ds-` (blueprint) or project prefix.
10. **Vendor isolation:** third-party CSS is configured in `vendors/` only; never edit files in `node_modules`; never override vendor classes from component styles.
11. **No circular imports**; a partial `@use`s only layers above it.
12. **Entry points:** exactly one global entry per profile (`main.scss` or `main-standalone.scss`).
13. **Import order** as in section 2; new partials are added to the entry in their layer's block.
14. **Naming:** files `_kebab-case.scss`; variables/maps `$kebab-case`; private members `_leading-underscore`; classes `ds-<block>__<element>`; custom properties `--ds-<category>-<name>`.
15. **Logical properties** for all direction-dependent values (see [rtl-ltr.md](../../design-system/rtl-ltr.md)).

## 5. Validation

```bash
npm run build:styles
```

Compiles both entries and all component stylesheets in `src/app/`, fails on warnings from
this repository, `@import`, `!important` and misplaced raw colors, and runs the compile-time
contrast check (`$contrast-check`).
