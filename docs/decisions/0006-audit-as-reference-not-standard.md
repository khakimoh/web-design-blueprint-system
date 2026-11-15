# ADR-0006 — The engineering audit is reference input, not the standard

- **Status:** accepted
- **Date:** 2026-11-15
- **Scope:** blueprint
- **Layer:** all

## Context

`engineering-audit/` documents one existing Angular 14 application, including its domain,
data model, styling and habits. The blueprint must be generic.

## Decision

The audit is preserved unchanged as historical reference. Practices were extracted and
classified:

| Classification | Examples from the audit | Outcome in the blueprint |
| --- | --- | --- |
| General principle | normalization at the data boundary; single-flight replay caching; container/presentational split; strict typing; environment-based URLs; JSDoc for intent | Layer 1 ([coding-standards](../principles/coding-standards.md), [api](../api/README.md)) |
| Reusable design pattern | 4 px spacing unit; algorithmic color derivation from one seed; programmatic tokens | Layer 2, generalized (OKLCH palettes, semantic tokens, themes) |
| Angular-specific convention | lazy feature routes, `async`/`shareReplay`, strict template checking, CLI budgets | Angular profile, modernized (standalone, signals, zoneless) |
| Project-specific decision | product data model, print layout for documents, serif headings, fixed brand hue, dark-only body | Not adopted (a project may add print styles as an extension) |
| Legacy detail | NgModules, jQuery, `*ngIf`, decorator inputs, Karma, mixed-case folders, `any` inputs | Excluded |
| To improve or replace | custom grid utilities duplicating Bootstrap, viewport-height JS calculations, `!important` overrides, wildcard route to a module | Replaced by Bootstrap grid + `.ds-auto-grid`, CSS `dvh` units, token-driven configuration, real not-found route |

## Consequences

- No domain vocabulary from the audit appears in reusable files (checked by `npm run check:docs`).
- Agents are told explicitly not to copy concepts from the audit.
