# Blueprint Architecture

The blueprint is organized in five conceptual layers. Each layer may rely on the layers
above it and never the other way around, so generic principles stay independent of any
technology or project.

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ 1. Engineering Principles       docs/principles, docs/api                │  technology-independent
├──────────────────────────────────────────────────────────────────────────┤
│ 2. Generic Design System        docs/design-system  +  src/styles        │  brand-independent
├──────────────────────────────────────────────────────────────────────────┤
│ 3. Technology Blueprints        docs/technologies/{angular,scss,bootstrap}│  how 1–2 are implemented
│                                 + src/app (Angular golden examples)      │
├──────────────────────────────────────────────────────────────────────────┤
│ 4. Agent Instructions/Workflows AGENTS.md, CLAUDE.md, docs/workflows     │  how to apply 1–3
├──────────────────────────────────────────────────────────────────────────┤
│ 5. Project Configuration        templates/, schemas/  →  project.config  │  one project's decisions
│                                 config/_project.scss (per project copy)  │
└──────────────────────────────────────────────────────────────────────────┘
```

## Layer responsibilities

| Layer | Owns | Must not contain |
| --- | --- | --- |
| 1 | Rules about code quality, structure, errors, configuration, security, testing, performance, accessibility, docs, dependencies | Framework APIs, brand values |
| 2 | Token architecture and scales, themes, component specifications, states, accessibility, RTL; the SCSS implementation of these | Framework code, project brand values (only neutral placeholders) |
| 3 | Mapping of 1–2 onto specific technologies; setup commands; conventions; golden examples | Changes to 1–2; product-specific code |
| 4 | Ordered procedures, approval gates, validation steps | Detailed reference material (it links to 1–3) |
| 5 | Templates and the schema for recording one project's decisions | Explanations (they live in docs) |

## How a project uses the layers

```text
project brief ──▶ project.config.yaml (Layer 5, validated by schema)
                        │ selects
                        ▼
        technology profiles (Layer 3) ──implement──▶ principles (1) + design system (2)
                        │
            agent follows workflows (Layer 4) ──▶ application code + copied src/styles
                        │
                 deviations recorded back in project.config.yaml
```

- **Reused by reference:** docs, workflows, schema (read from the pinned blueprint version).
- **Copied into the project:** `src/styles/` (the design-system implementation) and the templates.
  Projects edit only `src/styles/config/_project.scss` and `src/styles/project/`.
- **Not copied:** golden examples (they are patterns to imitate, not code to import), the audit, tooling.

## The reference implementation in `src/`

| Path | Layer | Role |
| --- | --- | --- |
| `src/styles/` | 2 (+3 for `vendors/bootstrap`) | Production-ready SCSS foundation, copied into projects |
| `src/app/` | 3 | Angular reference structure: index files (`<folder>.md`) describing each directory + minimal golden examples |
| `src/assets/`, `src/environments/`, `src/testing/` | 3 | Directory conventions with index files |

`src/` is intentionally **not** a runnable Angular workspace: no `angular.json`, no app
`package.json`, no `main.ts`. Generating a workspace is the CLI's job (Step 5 of the
initialization workflow).

## Extension points

| To add | Where | See |
| --- | --- | --- |
| A framework profile (React, Vue…) | `docs/technologies/<name>/` + `examples/<name>/` | [technologies/technologies.md](../technologies/technologies.md) |
| A CSS strategy other than Bootstrap | `src/styles/vendors/<name>/` + entry file + profile doc | [scss/scss.md](../technologies/scss/scss.md) |
| A token or semantic color | `src/styles/tokens/` + all themes | [design-tokens.md](../design-system/design-tokens.md#6-extending-the-token-system-blueprint-maintainers) |
| A brand theme (per project) | `config/_project.scss` → `$custom-themes` | [themes.md](../design-system/themes.md) |
| A golden example | next to the related directory in `src/app/` | [development/development.md](../development/development.md) |
| A workflow | `docs/workflows/` | [workflows/workflows.md](../workflows/workflows.md) |
