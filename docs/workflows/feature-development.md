# Workflow — Feature Development

## 1. Clarify

- Locate the feature in `project.config.yaml` → `requirements.features` (add it with approval if missing).
- Write acceptance criteria as observable behaviour, including empty/error cases, permissions and responsive behaviour.
- Ask about unknown API contracts; never invent endpoints or fields — use a typed placeholder and flag it.

## 2. Plan (share before coding when the feature touches > 5 files)

List:

- route(s) and where they are registered;
- files to create under `features/<feature>/` (components, services, models) and anything promoted to `shared/` or `core/` (with reason);
- data flow: API client → store → container → presentational components;
- state shape (`LoadState<T>` or equivalent);
- UI composition per [component classification](../design-system/components.md#1-classification--choose-the-first-source-that-fits);
- tests to write.

## 3. Implement in this order

1. **Models**: DTO types (mirror the API) and model types; the mapper with tests.
2. **API client**: methods, error mapping via the interceptor/`AppError`; tests with the HTTP testing backend.
3. **Store**: signals, commands, state transitions; tests.
4. **Presentational components**: inputs/outputs, all states, accessibility; tests.
5. **Container/page**: wire store to components, page title, focus management.
6. **Route**: lazy route + feature-scoped providers.
7. **Styles**: Bootstrap classes/utilities first; component SCSS with tokens for the rest.

Generate files with the CLI (`ng generate component|service|…`) and keep generated defaults.

## 4. Rules while implementing

- No imports from other features. Promote to `shared/` only with a second consumer.
- No business logic in templates; derived values are `computed()`.
- Every async view handles loading, empty, error, success.
- No raw design values; tokens only.
- Commit in small, buildable steps with descriptive messages (`feat(items): add list page`).

## 5. Validate and hand over

- Run [validation.md](validation.md) checks relevant to the change.
- Self-review with [code-review.md](code-review.md).
- Update docs: feature README (purpose, routes, data sources), `project.config.yaml` if requirements or deviations changed.
- Report: what changed, how it was validated (commands + results), open questions, follow-ups.
