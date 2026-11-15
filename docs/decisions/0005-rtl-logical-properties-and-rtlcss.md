# ADR-0005 — RTL support via logical properties and RTLCSS

- **Status:** accepted
- **Date:** 2026-11-15
- **Scope:** blueprint
- **Layer:** design system, technology blueprints

## Context

Projects may be LTR, RTL (e.g. Persian) or both. Bootstrap 5.3 compiles physical
properties and officially supports RTL by post-processing with RTLCSS. The Angular builder
reads `postcss.config.json` / `.postcssrc.json`.

## Decision

- All design-system CSS uses logical properties and logical insets (no direction-specific transforms), so it needs no RTL overrides.
- Bootstrap CSS is made bidirectional with `postcss-rtlcss` (combined mode, **`safeBothPrefix: true`**) only in projects whose `design.direction` is `rtl` or `both`; `<html>` always carries a `dir` attribute.
- Fonts per language via `:lang()`; letter-spacing and case transforms are reset for Arabic-script languages.

Verified: compiling `main.scss` and processing with postcss-rtlcss 6 produced `[dir="rtl"]`
overrides for Bootstrap utilities only; no `ds-` rule required flipping.

Amendment (playground verification): without `safeBothPrefix`, combined mode raises the
specificity of direction-dependent element rules above Bootstrap component classes
(e.g. `[dir="ltr"] ol { padding-left }` overrode `.breadcrumb { padding: 0 }`).
`safeBothPrefix` prefixes the competing component declarations as well, restoring the
cascade. Measured on `main.scss`: raw CSS grows +17.7 % without and +23.4 % with the option.

## Consequences

- One bundle supports both directions at runtime; switching `dir` needs no reload.
- LTR-only projects pay no cost.
- RTL-only projects may choose RTLCSS override mode (recorded as a project decision).
