# ADR-0002 — Sass token maps as the canonical token source

- **Status:** accepted
- **Date:** 2026-11-15
- **Scope:** blueprint
- **Layer:** design system

## Context

Tokens are needed at compile time (Bootstrap variables, Sass math, media queries) and at
runtime (theme switching). Angular compiles every component stylesheet separately, so Sass
configuration passed with `@use … with (…)` in the global entry is invisible to components.

## Options considered

1. **JSON tokens (DTCG format) + a generator** (e.g. Style Dictionary) — tool-agnostic; but adds a build step and a dependency to every project.
2. **CSS custom properties only** — runtime-friendly; but Bootstrap's Sass needs static values and media queries cannot use custom properties.
3. **Sass maps seeded from a project settings file**, emitted as CSS custom properties where runtime change is needed.

## Decision

Option 3. `src/styles/config/_project.scss` holds project inputs (brand seeds, fonts, shape,
density, themes). `tokens/` derives all scales and palettes from it. `base/_root.scss` emits
runtime tokens as `--ds-*` custom properties; `vendors/bootstrap/` feeds Bootstrap. Palettes
are generated in OKLCH with fixed lightness per step so semantic mappings keep their
contrast across brands; a compile-time contrast check guards semantic pairs.

## Consequences

- Any stylesheet (global or component) gets identical tokens via `@use "abstracts" as ds`.
- Projects change one file for their identity; everything else is upgradeable.
- Exporting tokens to non-Sass tools (design tools, native apps) would require adding a generator later; acceptable for the current scope.
