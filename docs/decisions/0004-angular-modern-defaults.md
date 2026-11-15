# ADR-0004 — Angular profile defaults

- **Status:** accepted
- **Date:** 2026-11-15
- **Scope:** blueprint
- **Layer:** technology blueprints (angular)

## Context

The reference audit described an Angular 14 NgModule application. Verified against the
Angular 22.2 CLI schematics: new workspaces default to standalone APIs, zoneless change
detection, `OnPush` components, `@Service()`-decorated services, Vitest, strict mode, and
the "2025" file-name style (`item-card.ts` / `ItemCard`).

## Decision

Adopt the CLI defaults as the profile standard: standalone components (no `NgModule`
without justification), zoneless + `OnPush` + signals, signal inputs/outputs, built-in
control flow, `@Service()` with `inject()`, functional guards/interceptors, feature-based folders
(`core`/`shared`/`layout`/`features`) with lazy feature routes, Vitest. Services carry a
role word in their name (`…Api`, `…Store`) because the 2025 style drops type suffixes.
Projects may choose the 2016 file-name style via `architecture.file_name_style`.

## Consequences

- Generated code matches the blueprint without schematic overrides.
- Patterns from the audit that remain valid (container/presentational split, normalization at the boundary, single-flight caching, strict typing) are kept, expressed with modern APIs.
- Legacy constructs (`NgModule` features, `*ngIf`, decorator inputs, jQuery) are excluded.
