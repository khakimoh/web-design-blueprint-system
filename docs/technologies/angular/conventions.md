# Angular Conventions

Applies the generic [naming conventions](../../principles/naming-conventions.md) to Angular.

## 1. File naming (Angular CLI 2025 style guide — default)

| Artifact | CLI command | File(s) | Class / symbol |
| --- | --- | --- | --- |
| Component | `ng g c features/items/components/item-card` | `item-card.ts`, `.html`, `.scss`, `.spec.ts` | `ItemCard` |
| Container/page component | `ng g c features/items/components/item-list-page` | `item-list-page.ts` … | `ItemListPage` |
| Service — API client | `ng g s features/items/services/item-api` | `item-api.ts` | `ItemApi` |
| Service — store | `ng g s features/items/services/item-store` | `item-store.ts` | `ItemStore` |
| Other service | `ng g s core/services/color-mode-store` | `color-mode-store.ts` | `ColorModeStore` |
| Guard (functional) | `ng g guard core/guards/unsaved-changes` | `unsaved-changes-guard.ts` | `unsavedChangesGuard` |
| Interceptor (functional) | `ng g interceptor core/interceptors/http-error` | `http-error-interceptor.ts` | `httpErrorInterceptor` |
| Directive | `ng g d shared/directives/autofocus` | `autofocus.ts` | `Autofocus` |
| Pipe | `ng g p shared/pipes/relative-time` | `relative-time-pipe.ts` | `RelativeTimePipe` |
| Model | (by hand) | `item.model.ts` | `Item`, `ItemDto` |
| Routes | (by hand) | `items.routes.ts` | default export `Routes` |
| Injection token | (by hand) | `app-config.ts` | `APP_CONFIG` |

Because the 2025 style drops type suffixes, **service names must state their role**:
`…Api` (HTTP access, no state), `…Store` (state + commands), `…Facade` (composition of
several stores for a page), or a clear noun for utilities (`TitleUpdater`). Projects may
choose the 2016 style (`item-card.component.ts`, `ItemCardComponent`) with
`architecture.file_name_style: "2016"`; never mix styles in one project.

## 2. Identifiers

| Kind | Convention | Example |
| --- | --- | --- |
| Component selector | `<prefix>-<name>` element; attribute selectors for native wrappers | `app-item-card`, `button[appButton]` |
| Directive selector | `[<prefix><Name>]` camelCase attribute | `[appAutofocus]` |
| Pipe name | camelCase | `relativeTime` |
| Inputs / outputs | camelCase nouns / past-tense or intent verbs; no `on` prefix for outputs | `item`, `selected`, `retry` |
| Signals | plain names | `items`, `isLoading` |
| Observables | `$` suffix | `query$` |
| Interfaces / types | PascalCase, no `I` prefix | `Item`, `LoadState<T>` |
| DTOs | `…Dto` | `ItemDto` |
| Constants / tokens | `UPPER_SNAKE_CASE` | `APP_CONFIG`, `DEFAULT_PAGE_SIZE` |
| Private members | `private` / `#` with no underscore prefix | `private readonly http` |
| Template event handlers | `on<Event>` or intent verb | `onSubmit()`, `retry()` |

## 3. TypeScript rules

- `strict: true` plus Angular `strictTemplates` (CLI defaults); never weaken them.
- No `any`. Use `unknown` at boundaries and narrow; use generics for reusable types.
- Prefer `interface` for object shapes, `type` for unions; `readonly` properties and `ReadonlyArray`/`readonly T[]` for data.
- Discriminated unions for states (`LoadState<T>`), exhaustive `switch` with a `never` check.
- `inject()` in field initializers; `private readonly` for injected services.
- Services use `@Service()` (Angular 22 CLI default; auto-provided in root) or `@Service({ autoProvided: false })` when provided by a route or component. `@Injectable()` remains valid for existing code and for classes that need constructor parameter injection.
- Avoid `enum`; use string literal unions (`'idle' | 'loading'`) or `as const` objects.
- Use `??` and optional chaining at boundaries only; inside the app, types should make values non-null.
- Import order: Angular → third-party → app (`core` → `shared` → feature) → relative. Use relative imports within a feature; path aliases (`@core/*`, `@shared/*`) are optional and configured in `tsconfig.json`.

## 4. Component rules

- Standalone (default; do not write `standalone: true`), `OnPush` (default; do not override).
- Signal inputs/outputs: `input()`, `input.required()`, `output()`, `model()`. No `@Input()`/`@Output()` decorators in new code.
- Use `host: {}` metadata instead of `@HostBinding`/`@HostListener`.
- Templates: built-in control flow (`@if`, `@for` + `track`, `@switch`, `@let`), no `*ngIf`/`*ngFor`. No function calls with side effects in templates; derived values are `computed()`.
- Class and style bindings: `[class.is-active]`, `[class]`, `[style.--var]`; avoid `ngClass`/`ngStyle`.
- Templates in separate `.html` files when longer than ~10 lines.
- Keep components small: if a template exceeds ~150 lines or the class ~200 lines, split.
- Members order: injected deps → inputs/outputs/models → signals/computed → public methods → private methods.

## 5. Component styles

```scss
@use "abstracts" as ds;           // resolved via stylePreprocessorOptions.includePaths

:host {
  display: block;
}

.item-card__meta {
  color: ds.color-token("text-secondary");
  gap: ds.space(2);
}
```

- Default `ViewEncapsulation.Emulated`. Never `::ng-deep`; style children through their own inputs, CSS custom properties, or global `ds-` classes.
- Use Bootstrap classes in templates first; component SCSS only for what utilities cannot express.
- Component styles stay within the budget (default 4 kB warning); repeated patterns move to `src/styles/components/`.
- Expose customization points as CSS custom properties on `:host` (e.g. `--app-item-card-columns`).

## 6. Forms

- Typed Reactive Forms (`FormBuilder.nonNullable`) for anything beyond a single field. Signal Forms may be adopted once stable in the project's Angular version (record the decision).
- Validation messages come from a single function mapping `ValidationErrors` to text.
- Show errors when a control is `touched` (or after submit); bind `aria-invalid` and `aria-describedby`.

## 7. Accessibility in templates

- Enable angular-eslint template accessibility rules (`@angular-eslint/template/accessibility` config).
- Use native elements; when adding ARIA, bind attributes with `[attr.aria-*]`.
- Route changes: set the title and move focus to the main heading (see the shell example).
- Use `@angular/cdk/a11y` (`FocusTrap`, `LiveAnnouncer`) instead of hand-written focus management where needed.
