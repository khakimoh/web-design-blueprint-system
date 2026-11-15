# Workflow — Refactoring

Refactoring changes structure, never behaviour. Mixed refactor + feature changes are split
into separate commits (refactor first).

1. **State the goal** in one sentence (e.g. "move item filtering into the store to remove duplicated logic in two components") and the standard it serves.
2. **Secure behaviour**: make sure tests cover the affected behaviour; add characterization tests where they are missing. Run them green before starting.
3. **Plan small steps**, each leaving the build green: rename/move → extract → inline → delete. Prefer the CLI and IDE refactorings over manual edits for renames and moves.
4. **Execute** one step at a time; build and test after each; commit each meaningful step (`refactor(items): extract item filter`).
5. **Check boundaries**: no new cross-feature imports, no generic code depending on features, no new dependencies.
6. **Remove** what became dead (code, styles, assets, dependencies, docs).
7. **Validate**: full test suite, build without new warnings, a quick visual check of affected screens in both themes.
8. **Report** the before/after structure and confirm "no behaviour change" with the evidence (tests run).

Large refactors (more than one feature or a layer change) need a short plan approved by a
human **(approval)** and, if they change a convention, an ADR.

## Common refactorings toward the blueprint

| Smell | Refactoring |
| --- | --- |
| Component fetches data and renders details | Split into container + presentational |
| DTO fields used in templates | Introduce model + mapper at the API boundary |
| Same utility class combination in 3+ places | Extract a component or a project class in `src/styles/components/` |
| Hard-coded colors/spacing | Replace with tokens; if no token fits, discuss before adding one |
| `@Input()`/`*ngIf` legacy syntax | Migrate with `ng generate @angular/core:signal-input-migration` and `@angular/core:control-flow` schematics |
| Feature imports another feature | Move the shared part to `shared/` or communicate through a route/core service |
