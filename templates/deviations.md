# Deviations from the Blueprint — <Project name>

Use this file when a deviation needs more explanation than fits in
`project.config.yaml` → `customizations.deviations`. Keep the YAML entry as the
index (id, standard, one-line decision) and put the longer reasoning here under
the same id.

A deviation is any intentional difference from a blueprint standard: a
different library, an altered token value outside `config/_project.scss`, a
structural exception, a skipped validation step.

Do **not** change the blueprint's reusable files in the project to make a
deviation disappear. Record it here; if it proves generally useful, propose
it upstream (see [docs/development/README.md](../docs/development/README.md)).

---

## DEV-001 — <Short title>

- **Standard:** `docs/...` (link the exact section)
- **Decision:** what the project does instead
- **Rationale:** why the standard does not fit this project
- **Scope:** files/features affected
- **Approved by / date:**
- **Revisit when:** condition that would let the project return to the standard
- **Promotion candidate:** yes / no — reason
