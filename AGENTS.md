# AGENTS.md — Instructions for AI coding agents

This repository is the **Web Design & Engineering Blueprint**: reusable standards, a design
system and templates for building websites and web applications. It is not an application.
You use it in two situations:

- **A. Building a project** that follows the blueprint (most common).
- **B. Maintaining the blueprint itself** (changing this repository).

## 1. Read before implementing (in this order)

1. The project's `project.config.yaml` (Layer 5) — if it does not exist, follow
   [docs/workflows/project-initialization.md](docs/workflows/project-initialization.md) first.
2. [docs/principles/principles.md](docs/principles/principles.md) — the ten rules (Layer 1).
3. [docs/design-system/design-system.md](docs/design-system/design-system.md) — tokens, themes, components (Layer 2).
4. The technology profiles named in `project.config.yaml` → `frontend`
   ([docs/technologies/technologies.md](docs/technologies/technologies.md)), e.g. `angular/`, `scss/`, `bootstrap/` (Layer 3).
5. The workflow for your task ([docs/workflows/workflows.md](docs/workflows/workflows.md)) (Layer 4).
6. Golden examples in [src/](src/src.md) for the implementation style.

Read topic documents on demand; do not load the whole `docs/` tree for a small change.

## 2. Identify the technology profile

`project.config.yaml` → `frontend.framework`, `styling`, `css_framework` select the profiles.
If a value has no profile in this blueprint (e.g. `react`), apply Layers 1–2 and the `scss`/
`bootstrap` profiles, follow the framework's official conventions, and tell the human that no
profile exists yet.

## 3. Non-negotiable rules

- **Ask, don't assume.** List missing requirements before proposing architecture. Never invent features, data or business rules.
- **Approval gates.** Get human approval for: architecture proposal, new runtime dependencies, deviations from the blueprint, deleting files, and anything irreversible.
- **Official tooling.** Initialize and generate with the framework CLI (`ng new`, `ng generate`). No custom generators.
- **Design tokens only.** No raw colors, spacing, radii, shadows, z-index or durations in components. Use `@use "abstracts" as ds` and `ds.*` functions or `var(--ds-*)`. Brand values change only in `src/styles/config/_project.scss`; project-wide CSS goes in `src/styles/project/`.
- **Bootstrap first** (when selected) for standard components and utilities; configure it through tokens in `src/styles/vendors/bootstrap/`; never edit Bootstrap sources or override its classes ad hoc.
- **Directory conventions.** `core/` app-wide singletons, `shared/` generic reusables, `layout/` the frame, `features/<name>/` everything feature-specific. No imports between features.
- **Accessibility and responsiveness** are part of every task (WCAG 2.2 AA, mobile-first, RTL when configured).
- **Small increments.** One feature or concern per change; validate after each.
- **Never modify the blueprint from a project.** Record deviations instead (section 5).

## 4. Validate before declaring done

Run what exists in the project (Angular profile shown):

```bash
ng build            # no errors, no new warnings, budgets respected
ng lint             # if configured
ng test --watch=false
```

Then check: responsive at 320 px / md / xl, keyboard-only walkthrough, light/dark themes, RTL
if configured, loading/empty/error states. Report exactly what was run and its result; never
claim a check passed that was not run. Details: [docs/workflows/validation.md](docs/workflows/validation.md).

When maintaining this repository (case B): `npm run validate`.

## 5. Document deviations

Any intentional difference from a blueprint standard is recorded in
`project.config.yaml` → `customizations.deviations` (`id`, `standard`, `decision`,
`rationale`), with long-form reasoning in `docs/deviations.md` when needed. Get approval first.
If a deviation looks generally useful, say so — it may be promoted into the blueprint.

## 6. Where things are

| Need | Location |
| --- | --- |
| New project steps | [docs/workflows/project-initialization.md](docs/workflows/project-initialization.md) |
| Feature implementation steps | [docs/workflows/feature-development.md](docs/workflows/feature-development.md) |
| Applying the design system | [docs/workflows/design-system-application.md](docs/workflows/design-system-application.md) |
| Review checklist | [docs/workflows/code-review.md](docs/workflows/code-review.md) |
| Config template / schema | [templates/project.config.yaml](templates/project.config.yaml), [schemas/](schemas/schemas.md) |
| SCSS foundation | [src/styles/](src/styles/styles.md) |
| Angular golden examples | [src/app/](src/app/app.md) |
| Decisions and their reasons | [docs/decisions/](docs/decisions/decisions.md) |

The original project audit in `engineering-audit/` is historical reference material: it
describes one specific application and is **not** a standard. Do not copy domain concepts from it.
