# Angular Architecture — Feature-Based Modular Design

Implements [Layer 1 principles](../../principles/principles.md) with modern Angular
(standalone components, signals, functional providers, zoneless).

## 1. Directory structure

```text
src/
├── main.ts                      bootstrapApplication(App, appConfig)
├── index.html                   <html lang dir>, theme bootstrap script
├── styles/                      design-system SCSS (copied from the blueprint)
├── app/
│   ├── app.ts / app.html        root component: renders the shell
│   ├── app.config.ts            application providers
│   ├── app.routes.ts            top-level routes (lazy features)
│   │
│   ├── core/                    application-wide singletons — imported by app.config / shell only
│   │   ├── api/                 HTTP base utilities (URL building, params serialization)
│   │   ├── authentication/      session state, auth guard/interceptor (when the project needs auth)
│   │   ├── config/              runtime configuration token + loader
│   │   ├── errors/              AppError model, error mapping, global ErrorHandler
│   │   ├── guards/              cross-feature functional guards
│   │   ├── initialization/      provideAppInitializer() tasks
│   │   ├── interceptors/        functional HTTP interceptors
│   │   └── services/            other app-wide services (color mode, title, analytics)
│   │
│   ├── shared/                  reusable, feature-agnostic building blocks
│   │   ├── components/          generic presentational components
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── models/              generic types (LoadState, Page, NavItem)
│   │   └── utils/               pure functions (coercion, formatting)
│   │
│   ├── layout/                  application frame
│   │   ├── shell/               page grid, skip link, sidebar state
│   │   ├── header/
│   │   ├── navigation/
│   │   ├── sidebar/
│   │   ├── footer/
│   │   └── not-found/           wildcard-route page
│   │
│   └── features/                one folder per feature (lazy-loaded)
│       └── <feature>/
│           ├── <feature>.routes.ts
│           ├── components/      containers (pages) and presentational components
│           ├── services/        API client(s) and store(s) for this feature
│           ├── models/          feature models and DTOs
│           └── utils/           feature-only helpers (optional)
├── environments/                build-time flags only (optional; `ng generate environments`)
└── testing/                     shared test utilities and fakes

public/                          static files copied as-is (favicon, fonts, images, config.json)
```

Angular CLI ≥ 18 serves static files from `public/` at the project root. This blueprint's
`src/assets/` folder documents asset categories; in a generated project place those files
under `public/` (same sub-folders) unless the project configures `assets` differently.

## 2. Layer responsibilities and dependency rules

| Layer | Contains | May import | Must not import |
| --- | --- | --- | --- |
| `core` | Singletons: config, error handling, interceptors, guards, auth/session, app-wide services | `shared` models/utils | `features`, `layout` |
| `shared` | Generic components, directives, pipes, models, utils | other `shared` units, Angular/CDK | `core` services, `features`, `layout` |
| `layout` | Shell, header, navigation, sidebar, footer | `shared`, `core` services (e.g. color mode) | `features` |
| `features/<x>` | Everything specific to feature *x* | `shared`, `core` | other features' internals |

- **Application-wide vs feature-specific:** a unit belongs in `core` if exactly one instance should exist for the app and more than one feature (or the shell) relies on it; in `shared` if it is reusable and stateless or locally stateful; otherwise it stays in the feature.
- **Cross-feature needs:** navigate via routes, share data through a `core` service with an explicit interface, or promote the shared part to `shared`. Never import from `features/<other>/`.
- **Adding a feature** = adding a folder + one lazy route. Nothing else changes.
- Enforce boundaries with lint rules (e.g. `no-restricted-imports` patterns per folder) once the project has more than two features.

## 3. Building blocks

| Unit | Responsibility | Angular API |
| --- | --- | --- |
| **Component (container/page)** | Connects route params and stores to presentational components; owns page title and focus management | `@Component`, `inject()`, `input()` for route params (with `withComponentInputBinding()`) |
| **Component (presentational)** | Renders inputs, emits intent; no injected data services | `input()`, `input.required()`, `output()`, `model()` for two-way |
| **Service — API client** | HTTP calls, DTO → model mapping, no state | `@Service()` (auto-provided in root) or `@Service({ autoProvided: false })` + feature-route providers; `HttpClient` |
| **Service — store** | Feature state (signals), loading/error states, commands | `@Service({ autoProvided: false })` provided at the feature route (destroyed with the feature); `signal`, `computed`, `linkedSignal` |
| **Model / interface** | Types for data; DTOs separate from models | `interface`/`type`, no classes for plain data |
| **Guard** | Route access decisions (UX only; server enforces) | functional `CanActivateFn`, `CanMatchFn` |
| **Interceptor** | Cross-cutting HTTP concerns (headers, error mapping, retries) | functional `HttpInterceptorFn` via `withInterceptors()` |
| **Directive** | Reusable behaviour on existing elements | `@Directive` with `host` metadata |
| **Pipe** | Pure display transforms in templates | `@Pipe({ pure: true })` |
| **Assets** | Static files | `public/` |
| **Environments** | Build-time flags (`production`, feature toggles) | file replacements; runtime values go to `core/config` |

## 4. Routing

```ts
// app.routes.ts
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  { path: 'items', loadChildren: () => import('./features/items/items.routes') },
  { path: '**', loadComponent: () => import('./layout/not-found/not-found') },
];
```

- Every feature exports its routes as the **default export** of `<feature>.routes.ts`.
- Feature-scoped providers (stores, API clients that are feature-only) go in the feature route's `providers` array.
- Enable `withComponentInputBinding()` so route params arrive as component inputs.
- Set `title` on routes (or a `TitleStrategy`) for unique page titles.
- Wildcard route renders a real not-found page (never a module or a silent redirect that hides errors).
- Preloading: `withPreloading(PreloadAllModules)` only for small apps; otherwise default (none) or a custom strategy.

## 5. State management

Default: **signals in services**, scoped to where state is needed.

1. **Component state:** `signal()`/`computed()` inside the component.
2. **Feature state:** a store service provided on the feature route, exposing readonly signals and command methods.
3. **App state:** a `core` service (`@Service()`, auto-provided in root) for truly global state (session, color mode, user preferences).
4. **RxJS** for event streams, debouncing, cancellation and HTTP composition; convert at the edge with `toSignal()`/`toObservable()`.

Adopting a state library (NgRx SignalStore, NgRx Store) is a deviation that needs a stated reason (team size, devtools, complex cross-feature workflows) recorded in `project.config.yaml`.

## 6. Data access

- API clients follow [API integration principles](../../api/api.md): DTO types mirror the API, `toModel()` mappers normalize at the boundary, errors are mapped to `AppError`.
- Base URL comes from the `APP_CONFIG` injection token (runtime config), never from string literals in services.
- Idempotent shared data: cache with `shareReplay({ bufferSize: 1, refCount: false })` in the client or keep the result in a store signal.
- Use `HttpClient` with `withFetch()`; `resource()`/`httpResource()` may be used where they simplify read-only data loading, as long as the four view states are still modelled.

## 7. Error handling

- `provideBrowserGlobalErrorListeners()` + a custom `ErrorHandler` in `core/errors` for unexpected errors.
- An HTTP interceptor converts `HttpErrorResponse` to `AppError` once; services and stores only see `AppError`.
- Stores expose errors as part of `LoadState<T>`; components render error states, not alerts from services.

## 8. Change detection and performance

- Zoneless (CLI default) + `OnPush` (CLI default) + signals. Do not reintroduce `zone.js` without a recorded reason (e.g. a library that requires it).
- Use `@defer` for heavy, below-the-fold or interaction-triggered UI.
- `NgOptimizedImage` (`ngSrc`) for images; always set dimensions.
- Track functions in `@for` use a stable identity (`track item.id`).
