# Workflow — Code Review

Review the diff, not the author. Report findings ordered by severity:
**blocker** (bug, security, accessibility failure, data loss) → **major** (standard violation,
missing state, missing tests) → **minor** (naming, small simplifications) → **nit**.
Each finding states *where*, *what*, *why* (link the standard) and a concrete fix.

## Checklist

### Correctness

- [ ] Behaviour matches the acceptance criteria, including edge cases (empty, error, long text, many items, no permission).
- [ ] Async flows handle cancellation, race conditions, and duplicate submissions.
- [ ] No unhandled promise rejections or swallowed errors.

### Architecture ([angular/architecture.md](../technologies/angular/architecture.md))

- [ ] Files are in the correct layer (`core`/`shared`/`layout`/`features`).
- [ ] No cross-feature imports; shared code is generic.
- [ ] Presentational components do not inject data services.
- [ ] External data is mapped at the boundary; components never see DTOs.
- [ ] New dependencies are justified and approved.

### Code quality ([coding-standards.md](../principles/coding-standards.md))

- [ ] Names follow [naming-conventions.md](../principles/naming-conventions.md) and the profile conventions.
- [ ] No `any`, no dead code, no commented-out code, no stray `console.log`.
- [ ] Functions/components have one responsibility and reasonable size.

### Design system

- [ ] Tokens only; no raw design values (the style build enforces some of this).
- [ ] Bootstrap used before custom CSS; no overrides of Bootstrap classes.
- [ ] All interaction states implemented; light/dark and RTL correct.

### Accessibility ([accessibility.md](../design-system/accessibility.md))

- [ ] Semantic elements; labels and accessible names; correct ARIA states.
- [ ] Keyboard operable; focus visible and managed (dialogs, route changes).
- [ ] Contrast and non-color cues for state.

### Security ([security.md](../principles/security.md))

- [ ] No secrets; no unsanitized HTML; URLs validated; errors don't leak internals.

### Tests and docs

- [ ] Tests cover the new behaviour and pass; bug fixes include a regression test.
- [ ] Folder index files (`<folder>.md`), `project.config.yaml` and deviations updated.

## Output format

```text
Summary: <one paragraph: what the change does, overall assessment>
Blockers: <list or "none">
Major: …
Minor: …
Nits: …
Validation observed: <commands run and results, or "not run">
```
