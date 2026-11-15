# Layer 5 — Project-Specific Configuration

Every project records **its own decisions** in a single machine-readable file,
`project.config.yaml`, at the project root. The blueprint stays unchanged.

| Artifact | Location |
| --- | --- |
| Template | [templates/project.config.yaml](../../templates/project.config.yaml) |
| Schema (JSON Schema 2020-12) | [schemas/project-config.schema.json](../../schemas/project-config.schema.json) |
| Validator | `npm run validate:config -- <file>` ([scripts/validate-config.mjs](../../scripts/validate-config.mjs)) |
| Design implementation of `design.*` | `src/styles/config/_project.scss` in the project |

## What belongs in the file

Decisions, not explanations, and not copies of the design system:

| Section | Records |
| --- | --- |
| `schema_version`, `blueprint` | Schema version; pinned blueprint release and its source |
| `project` | Name, description, website type, audience, locales |
| `frontend` | Framework + version, language, styling, CSS framework + version, package manager, rendering mode, test runner — **selects the technology profiles** |
| `design` | Visual direction, brand color seeds, fonts, shape, density, themes, text direction |
| `architecture` | Structure, routing/lazy loading, state approach, API style and base-URL source, authentication approach, selector prefix, file-name style |
| `quality` | Accessibility target, responsiveness, browsers, testing scope, performance budgets |
| `requirements` | Features (id, name, priority), integrations, constraints |
| `customizations.deviations` | Every intentional deviation from the blueprint |
| `extensions` | Free-form project settings the schema does not cover |

## Rules

- Values that also exist in code (colors, fonts) are **mirrored** in `src/styles/config/_project.scss`. The YAML is the decision record; the SCSS is the implementation. When they disagree, the YAML expresses intent — fix the SCSS or update the YAML through a reviewed decision.
- Keep long reasoning out of YAML; link to `docs/deviations.md` or an ADR.
- Validate after every edit; CI should run the validator.
- Do not add top-level keys; use `extensions` (the schema rejects unknown keys to catch typos).

## Deviations

A deviation is any intentional difference from a blueprint standard. Record it as:

```yaml
customizations:
  deviations:
    - id: DEV-001
      standard: docs/technologies/angular/architecture.md#5-state-management
      decision: Use NgRx SignalStore for the reporting feature
      rationale: Complex cross-feature workflows; team already uses its devtools
      approved_by: <name or role>
      date: 2026-01-31
```

Deviations are reviewed when upgrading the blueprint version: some may become obsolete;
generally useful ones are proposed upstream ([development/README.md](../development/README.md#promoting-a-project-pattern)).
