# Coding Standards

Technology-independent. Profiles in [technologies/](../technologies/README.md) show how
each rule is implemented in a specific stack.

## 1. Readability

- Prefer descriptive names over comments that explain names (see [naming-conventions.md](naming-conventions.md)).
- Keep functions short enough to read without scrolling (~30 lines is a smell threshold, not a hard limit).
- Return early instead of nesting conditionals more than two levels deep.
- Avoid boolean parameters that change behaviour (`render(true)`); use named options or separate functions.
- Replace magic numbers and strings with named constants or design tokens.
- Format automatically (formatter in CI); never hand-format or debate style in review.

## 2. Maintainability

- Code is organized by **feature first, technical type second** (a feature folder contains its components, services, models).
- Delete dead code instead of commenting it out; version control remembers it.
- Keep public surfaces small: export only what other modules use.
- A change that touches many unrelated files signals a missing abstraction or a misplaced responsibility.

## 3. Modularity and separation of concerns

Separate these concerns into different units:

| Concern | Responsibility | Must not |
| --- | --- | --- |
| **Presentation** | Render data, emit user intent | Fetch data, hold application state |
| **Container / page** | Connect presentation to state and services, read route parameters | Contain markup-heavy rendering logic |
| **State** | Hold and derive application or feature state | Know about DOM or rendering |
| **Data access** | Talk to APIs, normalize responses, map errors | Contain UI decisions |
| **Domain/utility logic** | Pure functions (formatting, calculations, validation) | Have side effects |

Rules:

- Presentational units receive data through typed inputs and report intent through typed outputs/events.
- Dependencies point inward: presentation → state → data access. Never the reverse.
- Cross-feature communication goes through shared, explicitly exported interfaces (shared services, routes, events), never through importing another feature's internals.

## 4. Reusability

- Extract only after the **second** real use ("rule of three" for shared libraries: promote to `shared` on the third).
- Reusable units are generic: no feature names, no business terms, inputs described by role (`title`, `items`, `tone`).
- Prefer composition (content projection, slots, children) over configuration flags.
- Use the platform and the chosen CSS framework before writing a custom component (see [components.md](../design-system/components.md)).

## 5. File organization

- One exported concept per file (one component, one service, one model group).
- Co-locate a unit's template, styles and tests with its source.
- Directory depth: prefer ≤ 4 levels below the feature root.
- Index/barrel files only at public boundaries (e.g. a shared library entry), never inside features (they hide coupling and create cycles).

## 6. Error handling

- **Classify** errors at the boundary where they occur (network, validation, authorization, not-found, unexpected).
- **Map** raw errors to a typed application error before they reach UI code.
- **Present** errors as states: every async view has *loading*, *empty*, *error* and *success* states designed up front.
- **Log once**, at the boundary, with context; never log-and-rethrow repeatedly.
- **Never swallow** errors silently; an empty `catch` needs a comment explaining why.
- **Recover** where possible: retries only for idempotent requests and transient failures, with a limit.
- Unexpected errors are reported to a global handler that shows a generic message and records diagnostics.

## 7. Configuration management

- Separate **build-time** configuration (feature flags compiled in, environment name) from **runtime** configuration (API base URLs, keys for public services) loaded at startup.
- Prefer runtime configuration for anything that differs between deployments, so one build artifact can be promoted across environments.
- Configuration is typed and validated at startup; the app fails fast with a clear message when required values are missing.
- No secrets in frontend code or configuration: everything shipped to the browser is public (see [security.md](security.md)).
- `.env` files are local-only and git-ignored; commit `.env.example` with variable names and no values.

## 8. Comments and documentation in code

- Document **why**, constraints and non-obvious decisions; not what the next line does.
- Public APIs (shared components, services, utilities) get a doc comment describing purpose, inputs and side effects.
- `TODO` comments include an owner or issue reference.
- Workarounds reference the bug or upstream issue they work around.

## 9. Immutability and state

- Treat data as immutable; produce new objects instead of mutating inputs.
- Derive state instead of duplicating it (computed values, selectors).
- Keep state as local as possible; promote it only when two distant parts of the UI need it.
