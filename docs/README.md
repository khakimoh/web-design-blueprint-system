# Documentation

Reference documentation for the Web Design & Engineering Blueprint, organized by the
five conceptual layers described in [architecture/](architecture/README.md).

| Layer | Folder | Purpose |
| --- | --- | --- |
| 1. Engineering Principles | [principles/](principles/README.md), [api/](api/README.md) | Technology-independent coding, naming, quality, security and API rules |
| 2. Generic Design System | [design-system/](design-system/README.md) | Tokens, color, themes, typography, spacing, layout, components, states, RTL, accessibility |
| 3. Technology Blueprints | [technologies/](technologies/README.md) | Angular, SCSS and Bootstrap profiles |
| 4. Agent Instructions & Workflows | [workflows/](workflows/README.md) (+ root [AGENTS.md](../AGENTS.md)) | Step-by-step procedures for agents and humans |
| 5. Project-Specific Configuration | [configuration/](configuration/README.md) | `project.config.yaml`, schema, deviations |

Supporting documentation:

| Folder | Purpose |
| --- | --- |
| [architecture/](architecture/README.md) | How the layers fit together and depend on each other |
| [decisions/](decisions/README.md) | Architecture decision records (why things are the way they are) |
| [development/](development/README.md) | Maintaining and extending this repository: tooling, versioning, contributing |
| [deployment/](deployment/README.md) | Generic build and deployment standards for projects |

## Suggested reading order

- **New to the blueprint:** root README → [architecture](architecture/README.md) → [principles](principles/README.md) → [design system](design-system/README.md) → [Angular profile](technologies/angular/README.md) → [project initialization](workflows/project-initialization.md).
- **AI agent in a project:** [AGENTS.md](../AGENTS.md) defines the order.
- **Designer / brand owner:** [color-system](design-system/color-system.md), [typography](design-system/typography.md), [themes](design-system/themes.md), `src/styles/config/_project.scss`.
