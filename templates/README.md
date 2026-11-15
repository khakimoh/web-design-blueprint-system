# templates/

Starting files that are **copied into a new project** (Layer 5 — project-specific
configuration). Templates hold placeholders and short comments only; the
reasoning behind each field lives in [docs/](../docs/README.md).

| File | Copy to (in the new project) | Purpose |
| --- | --- | --- |
| [project.config.yaml](project.config.yaml) | `project.config.yaml` | Machine-readable record of project decisions. Validated by [schemas/project-config.schema.json](../schemas/project-config.schema.json). |
| [project-brief.md](project-brief.md) | `docs/project-brief.md` | Human description of the project: purpose, users, features, constraints. Input to the agent. |
| [initialization-checklist.md](initialization-checklist.md) | `docs/initialization-checklist.md` | Tick-list for the nine initialization steps. |
| [agent-kickoff-prompt.md](agent-kickoff-prompt.md) | — (paste into the agent) | First message for a coding agent in a new project. |
| [deviations.md](deviations.md) | `docs/deviations.md` | Long-form rationale for deviations indexed in `project.config.yaml`. |
| [adr.md](adr.md) | `docs/decisions/NNNN-title.md` | Architecture decision record, for the blueprint or a project. |

The design customization template is not here on purpose: it is
[`src/styles/config/_project.scss`](../src/styles/config/_project.scss), which is
copied together with the rest of `src/styles/`. Projects edit only that file
(settings) and `src/styles/project/` (project-owned CSS).

## Rules

- Keep templates generic: no product names, domain terms or brand values.
- When a schema field changes, update `project.config.yaml`, the schema and
  [docs/configuration/README.md](../docs/configuration/README.md) in the same change,
  then run `npm run validate:config`.
