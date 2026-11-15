# Layer 4 — Agent Workflows

Procedural, step-by-step instructions for AI coding agents (and humans). Each workflow is
short and actionable and links to reference documents for the *why*. The entry point for
agents is the root [AGENTS.md](../../AGENTS.md).

| Workflow | Use when |
| --- | --- |
| [project-initialization.md](project-initialization.md) | Starting a new website or application |
| [design-system-application.md](design-system-application.md) | Configuring the visual identity, or building/reviewing UI against the design system |
| [feature-development.md](feature-development.md) | Implementing a feature or a significant change |
| [code-review.md](code-review.md) | Reviewing a change (own or someone else's) |
| [refactoring.md](refactoring.md) | Restructuring code without changing behaviour |
| [validation.md](validation.md) | Testing and validating before declaring work done |
| [documentation.md](documentation.md) | Writing or updating documentation and recording decisions |

## Conventions used in workflows

- **(approval)** marks a gate: stop and wait for an explicit human decision.
- **Output** lists what the step must produce, so progress is verifiable.
- Steps are ordered; skipping one is a deviation and must be stated in the final report.

## Agent-specific adapters

Workflows are plain Markdown so any agent can follow them. Agents with a native "skills"
or "commands" feature may wrap a workflow in a thin adapter (e.g. a Claude Code skill that
says "follow `docs/workflows/feature-development.md`"). Adapters must not copy workflow
content — link to it, so there is one source.
