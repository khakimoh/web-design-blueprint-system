# src/styles/

The design-system implementation in SCSS — framework-agnostic, copied into every project.

```text
main.scss              entry — Bootstrap profile (default)
main-standalone.scss   entry — no CSS framework
config/                project settings (project-owned)
abstracts/             public Sass API: tokens + functions + mixins (no CSS)
tokens/                canonical token maps (no CSS)
themes/                semantic color values per theme, validation, output
base/                  :root custom properties, global behaviour, type roles (+ reset/headings standalone)
layout/                app shell, layout primitives (+ containers standalone)
components/            global styles for patterns Bootstrap lacks
utilities/             helper classes (standalone)
vendors/bootstrap/     Bootstrap configured from tokens + theme bridge
project/               project-owned CSS, loaded last
```

- Use in component styles: `@use "abstracts" as ds;` (requires `src/styles` on the load path).
- Projects edit only [config/_project.scss](config/_project.scss) and [project/](project/README.md).
- Validate: `npm run build:styles` (from the blueprint root).

Docs: [design system](../../docs/design-system/README.md), [SCSS profile](../../docs/technologies/scss/README.md),
[Bootstrap profile](../../docs/technologies/bootstrap/README.md).
