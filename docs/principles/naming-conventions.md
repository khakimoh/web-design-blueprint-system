# Naming Conventions (generic)

These rules apply to every stack. Framework-specific file naming (e.g. Angular
CLI file names) is defined in the profile, e.g.
[angular/conventions.md](../technologies/angular/conventions.md).

## General rules

- Names describe **purpose**, not implementation or appearance: `primaryAction`, not `blueButton`.
- Use full words. Accepted abbreviations: `id`, `url`, `api`, `http`, `dto`, `i18n`, `a11y`, `min`, `max`.
- One concept, one name, everywhere (UI label, code, API mapping table).
- Booleans read as questions: `isOpen`, `hasError`, `canSubmit`, `shouldRetry`.
- Collections are plural (`items`), single values singular (`item`).
- Functions start with a verb: `loadItems`, `formatDate`, `toAppError`.
- Event handlers describe the event, not the reaction: `onSave`, `onSelect` (or the framework idiom).

## Casing by kind

| Kind | Case | Example |
| --- | --- | --- |
| Directories and file names | `kebab-case` | `item-list/`, `date-format.ts` |
| Types, interfaces, classes, enums | `PascalCase` | `ItemSummary`, `LoadState` |
| Variables, functions, methods, properties | `camelCase` | `selectedItem`, `loadItems()` |
| Module-level constants (true constants) | `UPPER_SNAKE_CASE` | `MAX_PAGE_SIZE` |
| Generic type parameters | `T`, or `TItem` for clarity | `LoadState<T>` |
| CSS classes | `kebab-case`, BEM elements `block__element`, modifiers via attribute or `--modifier` | `ds-empty-state__title` |
| CSS custom properties | `--<prefix>-<category>-<name>` | `--ds-color-text-secondary` |
| Sass variables / maps | `$kebab-case` | `$font-sizes` |
| Design tokens | `<category>-<role>-<variant>-<state>` | `color-primary-hover` |
| URL paths | `kebab-case`, lowercase | `/account-settings` |
| Query parameters | `camelCase` or the API's convention, consistently | `?pageSize=20` |
| Environment variables | `UPPER_SNAKE_CASE` | `API_BASE_URL` |
| Git branches | `type/short-description` | `feat/item-filters` |

## Data from external systems

- External payloads keep the external casing **only** in transfer types (`…Dto`, `…Response`).
- Normalize to application casing at the boundary (see [api/api.md](../api/api.md)).
  UI code never sees `snake_case` fields from an API.

## Asynchronous values

- Streams/observables end with `$`: `items$`.
- Signals or reactive state containers are named like plain values: `items`, `isLoading`.
- Promises are named for their result: `itemsPromise` only when both the promise and the value coexist.

## Prefixes

- CSS: `ds-` for design-system classes; projects choose one project prefix for their own global classes.
- Custom properties: `--ds-` for design-system tokens; framework variables keep their own prefix (`--bs-`).
- Component selectors: one project-wide prefix (framework profile defines it).

## Tests

- Test files mirror the unit name: `item-list.spec.ts` next to `item-list.ts`.
- Test names describe behaviour: `"shows the empty state when there are no items"`.
