# Workflow — Documentation

## When to write what

| Change | Update |
| --- | --- |
| New directory | Index file named after it (`<folder>/<folder>.md`): responsibility, what belongs / does not belong, example |
| New feature | Feature index file (`<feature>.md`): purpose, routes, data sources, state, notable decisions |
| New reusable component/service | Doc comment on the public API + usage example in the folder's index file |
| New/changed requirement or integration | `project.config.yaml` → `requirements` |
| Intentional deviation | `project.config.yaml` → `customizations.deviations` (+ `docs/deviations.md` if long) |
| Lasting technical decision | ADR from [templates/adr.md](../../templates/adr.md) in `docs/decisions/` |
| User-visible release | CHANGELOG entry |

## How to write

1. Purpose first (one or two sentences), then usage, then details.
2. Short sections, tables for structured facts, code blocks for commands; every command must have been run or verified against the tool's current documentation.
3. Link instead of repeating; one source per fact.
4. Use the project's terminology consistently; define new terms once.
5. Document **why** for anything non-obvious; the code shows *what*.
6. Keep docs in the same commit as the code they describe.

## Blueprint documentation (maintainers)

- Layer 1 docs never mention framework APIs; profile docs never redefine principles.
- Every directory has a meaningful index file named after it (enforced by `npm run check:docs`).
- Relative links must resolve (enforced); no product or domain vocabulary in reusable files (enforced for known terms).
- Update the root README's repository structure when directories change.
