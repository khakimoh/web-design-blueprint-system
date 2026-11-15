# ADR-0003 — Bootstrap 5.3 via Sass module configuration and a theme bridge

- **Status:** accepted
- **Date:** 2026-11-15
- **Scope:** blueprint
- **Layer:** technology blueprints (bootstrap)

## Context

Bootstrap is the default CSS framework. Verified facts (2026-11): latest stable 5.3.9,
6.0 is alpha; Bootstrap 5.3 Sass uses `@import` internally and emits deprecation warnings
under Dart Sass 1.108 that `quietDeps` silences; `@use "bootstrap/scss/bootstrap" with (…)`
configures `!default` variables (including `$utilities` merges) and errors on unknown names.
Bootstrap 5.3 components read most colors from `--bs-*` custom properties at runtime and
support color modes via `data-bs-theme`.

## Options considered

1. Precompiled `bootstrap.min.css` + overrides — duplicates values, specificity conflicts.
2. Bootstrap docs' `@import` partial sequence — deprecated syntax; tokens and Bootstrap drift.
3. `@use … with (…)` from tokens + a bridge re-emitting `--bs-*` per theme from design-system themes.

## Decision

Option 3. Bootstrap variables are configured only from tokens in
`src/styles/vendors/bootstrap/_index.scss`; `_bridge.scss` re-emits Bootstrap runtime
variables for every theme after Bootstrap's output. The theme attribute is
`data-bs-theme`, shared by both systems. Bootstrap JS is not loaded by default.

## Consequences

- One theme system; Bootstrap follows light/dark/custom themes at runtime.
- Brand primary/secondary are compile-time for Bootstrap button/alert variants (documented limitation).
- Spacing utilities use 4 px-unit keys (`.p-4` = 16 px), unlike stock Bootstrap.
- Moving to Bootstrap 6 will be a new major version of the profile.
