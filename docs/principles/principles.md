# Layer 1 — Engineering Principles

Technology-independent rules that apply to every project, whatever framework or
styling solution it uses. Framework-specific implementation lives in
[technologies/](../technologies/technologies.md); this layer never names a framework API.

| Document | Covers |
| --- | --- |
| [coding-standards.md](coding-standards.md) | Readability, maintainability, modularity, separation of concerns, reuse, file organization, error handling, configuration management |
| [naming-conventions.md](naming-conventions.md) | Naming rules for files, directories, code identifiers, CSS, data and tokens |
| [quality-standards.md](quality-standards.md) | Testing, performance, accessibility, documentation and dependency management principles; definition of done |
| [security.md](security.md) | Frontend security baseline: secrets, untrusted data, dependencies, headers, privacy |
| [../api/api.md](../api/api.md) | Integrating with APIs: boundary normalization, typed contracts, error mapping, caching |

## The ten rules (summary)

1. **Clarity over cleverness.** Code is read far more than it is written.
2. **One responsibility per unit.** A file, function or component has one reason to change.
3. **Explicit boundaries.** Features depend on shared code, never on each other; data from outside is normalized at the boundary.
4. **Single source of truth.** Every value, token, type and rule is defined once and referenced elsewhere.
5. **Typed contracts.** Public inputs, outputs and data shapes are typed; `any` is not a type.
6. **Fail visibly, recover gracefully.** Errors are mapped to user-meaningful states, logged once, and never swallowed.
7. **Configuration is data.** Environment-specific values come from configuration, not code.
8. **Accessible and responsive by default.** WCAG 2.2 AA and mobile-first are requirements, not enhancements.
9. **Minimal dependencies.** Every dependency is justified, pinned and maintained.
10. **Documented intent.** Code explains *what*; comments and docs explain *why*; deviations are recorded.
