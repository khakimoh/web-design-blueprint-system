# Documentation

Reference documentation for the Web Design & Engineering Blueprint, organized by the
five conceptual layers described in [architecture/](architecture/architecture.md).

| Layer | Folder | Purpose |
| --- | --- | --- |
| 1. Engineering Principles | [principles/](principles/principles.md), [api/](api/api.md) | Technology-independent coding, naming, quality, security and API rules |
| 2. Generic Design System | [design-system/](design-system/design-system.md) | Tokens, color, themes, typography, spacing, layout, components, states, RTL, accessibility |
| 3. Technology Blueprints | [technologies/](technologies/technologies.md) | Angular, SCSS and Bootstrap profiles |
| 4. Agent Instructions & Workflows | [workflows/](workflows/workflows.md) (+ root [AGENTS.md](../AGENTS.md)) | Step-by-step procedures for agents and humans |
| 5. Project-Specific Configuration | [configuration/](configuration/configuration.md) | `project.config.yaml`, schema, deviations |

Supporting documentation:

| Folder | Purpose |
| --- | --- |
| [architecture/](architecture/architecture.md) | How the layers fit together and depend on each other |
| [decisions/](decisions/decisions.md) | Architecture decision records (why things are the way they are) |
| [development/](development/development.md) | Maintaining and extending this repository: tooling, versioning, contributing |
| [deployment/](deployment/deployment.md) | Generic build and deployment standards for projects |

## Suggested reading order

- **New to the blueprint:** root README → [architecture](architecture/architecture.md) → [principles](principles/principles.md) → [design system](design-system/design-system.md) → [Angular profile](technologies/angular/angular.md) → [project initialization](workflows/project-initialization.md).
- **AI agent in a project:** [AGENTS.md](../AGENTS.md) defines the order.
- **Designer / brand owner:** [color-system](design-system/color-system.md), [typography](design-system/typography.md), [themes](design-system/themes.md), `src/styles/config/_project.scss`.
