# ADR-0001 — Five-layer blueprint architecture

- **Status:** accepted
- **Date:** 2026-11-15
- **Scope:** blueprint
- **Layer:** all

## Context

The repository must serve many unrelated projects and several AI coding agents. Mixing
generic rules, framework code and project choices in one place makes agents apply
project-specific or framework-specific details where they do not belong, and makes the
repository hard to extend with new technologies.

## Options considered

1. **Single style guide document** — simple; but everything is coupled, and agents load far more context than needed.
2. **Starter application** (a runnable template) — concrete; but couples every project to one app structure and version, and invites copying unrelated code.
3. **Layered blueprint** — principles, design system, technology profiles, workflows, project configuration; each with clear dependency direction.

## Decision

Use five layers (principles → design system → technology blueprints → agent workflows →
project configuration). Lower layers may reference higher ones only. Projects **reference**
docs and workflows from a pinned version, **copy** only `src/styles/` and templates, and
record their decisions in `project.config.yaml`.

## Consequences

- New frameworks are added as profiles without touching principles or the design system.
- Agents read a short `AGENTS.md` and only the documents relevant to the task.
- `src/` is a reference implementation, not a runnable app; generation stays with official CLIs.
