# Layer 3 — Technology Blueprints

A **technology profile** explains how Layers 1–2 are implemented with a specific
technology. Profiles are independent and composable: a project selects one profile per
concern in `project.config.yaml` → `frontend`.

| Concern | Profile | Status | Selected by |
| --- | --- | --- | --- |
| Application framework | [angular/](angular/angular.md) | **Primary (v1)** — Angular 22, TypeScript, standalone, zoneless | `frontend.framework: angular` |
| Styling language | [scss/](scss/scss.md) | **Primary (v1)** — Dart Sass module system | `frontend.styling: scss` |
| CSS framework | [bootstrap/](bootstrap/bootstrap.md) | **Primary (v1)** — Bootstrap 5.3 via Sass | `frontend.css_framework: bootstrap` |
| CSS framework | none | Supported — `src/styles/main-standalone.scss` | `frontend.css_framework: none` |

The SCSS design-system implementation does not depend on Angular, so a future React or
Vue profile reuses `scss/` and `bootstrap/` unchanged.

## Profile contract

Every framework profile folder contains:

| File | Content |
| --- | --- |
| `<profile>.md` (index) | Supported versions, version policy, setup commands, how the design foundation is wired in, profile checklist |
| `architecture.md` | Directory structure, layer responsibilities, dependency rules, routing, state, data access, error handling |
| `conventions.md` | File and identifier naming, language/template rules, styling inside components |
| `testing.md` | Test runner, what to test at which level, examples |

Styling/CSS-framework profiles contain an index file (`<profile>.md`) with setup, configuration, import
order and rules. Golden examples for a profile live in the reference implementation
(`src/` for the primary profile) and are listed in the profile index file.

## Adding a new profile (e.g. React or Vue)

1. Create `docs/technologies/<name>/` following the contract above.
2. Map each Layer 1 principle to the framework's idioms (component boundaries, state, data access, error boundaries). Do **not** copy Layer 1 text; link to it.
3. Describe how the framework consumes `src/styles/` (global entry, Sass load path, component styles via `@use "abstracts" as ds`).
4. Add golden examples under a separate reference folder (e.g. `examples/<name>/`) so they never mix with the Angular reference in `src/`.
5. Add the profile value to `frontend.framework` in [the schema](../../schemas/project-config.schema.json) if not present.
6. Add an ADR and a CHANGELOG entry (minor release).
7. Run `npm run validate`.

Profiles never change Layers 1–2. If a framework genuinely needs a different principle,
raise it as an ADR against the principle itself.
