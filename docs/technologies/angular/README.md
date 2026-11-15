# Angular Profile

Angular + TypeScript implementation of the blueprint. Reference implementation and
golden examples: [`src/app/`](../../../src/app/README.md).

| Document | Content |
| --- | --- |
| [architecture.md](architecture.md) | Feature-based modular architecture, layers, boundaries, routing, state, data access |
| [conventions.md](conventions.md) | File naming, identifiers, TypeScript, templates, component styles |
| [testing.md](testing.md) | Vitest + TestBed, what to test, examples |

## 1. Supported versions and version policy

| Package | Blueprint 1.x targets | Policy |
| --- | --- | --- |
| Angular (`@angular/*`, CLI) | **22.x** (current stable as of 2026-11) | Use the latest stable major at project start. Upgrade within 6 months of a new major using `ng update`. Never run a major older than Angular's LTS window. |
| TypeScript | the version required by the Angular release | Let `ng update` manage it. |
| Node.js | an Active LTS release supported by the Angular version | Pin in `.nvmrc` / `engines`. |
| RxJS | 7.x (as required by Angular) | |
| Bootstrap | 5.3.x — see [bootstrap profile](../bootstrap/README.md) | |
| `@ng-bootstrap/ng-bootstrap` (optional) | 21.x for Angular 22 | Only when interactive Bootstrap widgets are needed. |

Defaults verified against the Angular 22.2 CLI schematics: standalone APIs, **zoneless**
change detection, `OnPush` components, `@Service()` services, Vitest test runner, `2025`
file-name style guide, strict mode.

## 2. Create a project

```bash
npx @angular/cli@22 new my-project --style=scss --routing --ssr=false --prefix=app --ai-config=none
```

- `--ssr=true` when `frontend.rendering` is `ssr`/`ssg`/`hybrid`.
- `--ai-config=none` because agent instructions come from this blueprint (`AGENTS.md` → see section 5).
- Keep the generated defaults (strict, zoneless, Vitest, standalone). Changing them is a deviation.

Add tooling:

```bash
cd my-project
npx ng add angular-eslint
npm install --save-dev prettier
```

## 3. Apply the design foundation

1. Copy the styles from the **pinned** blueprint version:

   ```bash
   cp -R ../web-design-blueprint-system/src/styles ./src/styles
   rm src/styles.scss
   ```

2. Fill `src/styles/config/_project.scss` from `project.config.yaml` → `design`.
3. Install Bootstrap (skip when `css_framework: none`):

   ```bash
   npm install bootstrap@~5.3.9
   ```

4. Configure `angular.json` → `projects.<name>.architect.build.options`:

   ```json
   "styles": ["src/styles/main.scss"],
   "stylePreprocessorOptions": {
     "includePaths": ["src/styles"]
   }
   ```

   Use `src/styles/main-standalone.scss` instead when `css_framework: none`.
   Angular already resolves `node_modules` and runs Sass with `quietDeps`, so Bootstrap's own
   deprecation warnings are not shown; warnings from `src/` must be fixed.

5. Set budgets in `angular.json` (`configurations.production.budgets`) from
   `quality.performance_budget`. Measured baseline (Angular 22.2 + this blueprint's golden
   examples + full Bootstrap profile, production build): initial **567 kB raw / 107 kB
   transferred**, of which styles are 272 kB raw / 27 kB transferred. The CLI default warning
   (500 kB) is therefore exceeded by the CSS framework alone; the template uses 700 kB / 1 MB.
   To trim CSS: remove unused utilities via `$utilities` (`"key": null`) and reduce the
   spacing keys passed to Bootstrap — both in `vendors/bootstrap/_index.scss` (record as a deviation).
6. RTL (`direction: rtl | both`): add `postcss-rtlcss` and `postcss.config.json` with `safeBothPrefix: true` — see
   [rtl-ltr.md](../../design-system/rtl-ltr.md#3-bootstrap-and-rtl).
7. Set `lang` and `dir` on `<html>` in `src/index.html`, and add the theme bootstrap script
   (see [themes.md](../../design-system/themes.md#3-runtime-switching)).

## 4. Golden examples in this repository

| Concern | Example |
| --- | --- |
| Application config and providers | [`src/app/app.config.ts`](../../../src/app/app.config.ts) |
| Lazy routes | [`src/app/app.routes.ts`](../../../src/app/app.routes.ts), [`placeholder-feature.routes.ts`](../../../src/app/features/placeholder-feature/placeholder-feature.routes.ts) |
| Runtime configuration (InjectionToken) | [`core/config/app-config.ts`](../../../src/app/core/config/app-config.ts) |
| Error model and mapping | [`core/errors/app-error.ts`](../../../src/app/core/errors/app-error.ts) |
| Functional HTTP interceptor | [`core/interceptors/http-error-interceptor.ts`](../../../src/app/core/interceptors/http-error-interceptor.ts) |
| Theme / color-mode service | [`core/services/color-mode-store.ts`](../../../src/app/core/services/color-mode-store.ts) |
| Responsive app shell + navigation | [`layout/shell/`](../../../src/app/layout/shell/README.md), [`layout/navigation/`](../../../src/app/layout/navigation/README.md) |
| Reusable component (attribute selector, Bootstrap-based) | [`shared/components/button/`](../../../src/app/shared/components/button/README.md) |
| Reusable component with global SCSS | [`shared/components/empty-state/`](../../../src/app/shared/components/empty-state/README.md) |
| Typed shared models | [`shared/models/load-state.model.ts`](../../../src/app/shared/models/load-state.model.ts) |
| Feature model + DTO mapping | [`features/placeholder-feature/models/`](../../../src/app/features/placeholder-feature/models/README.md) |
| Feature API client and store | [`features/placeholder-feature/services/`](../../../src/app/features/placeholder-feature/services/README.md) |
| Container (page) component | [`placeholder-container/`](../../../src/app/features/placeholder-feature/components/placeholder-container/README.md) |
| Presentational component + test | [`placeholder-detail/`](../../../src/app/features/placeholder-feature/components/placeholder-detail/README.md) |
| Form with validation states | [`placeholder-form/`](../../../src/app/features/placeholder-feature/components/placeholder-form/README.md) |

`src/` is a reference, not a runnable workspace (no `angular.json`/`package.json` for an app).
Its component stylesheets are compiled by `npm run build:styles`; TypeScript is
verified when the examples are used in a generated project.

## 5. Agent configuration files

Angular can generate agent rule files (`--ai-config`). Do not use them alongside this
blueprint: the project's `AGENTS.md` should point to the blueprint instead (see the root
[AGENTS.md](../../../AGENTS.md)). Angular's own best-practice guidance is already reflected here.

## 6. Profile checklist

- [ ] Standalone components only; no `NgModule` without a recorded justification.
- [ ] `ChangeDetectionStrategy.OnPush` (CLI default) everywhere.
- [ ] Signals for component and feature state; RxJS for event streams and HTTP composition.
- [ ] `@Service()` for services; `inject()` for dependencies; no constructor parameter injection in new code.
- [ ] Built-in control flow (`@if`, `@for` with `track`, `@switch`), `@defer` for heavy below-the-fold content.
- [ ] Feature routes lazy-loaded with `loadChildren`/`loadComponent`.
- [ ] No cross-feature imports (lint rule or review).
- [ ] Styles through tokens (`@use "abstracts" as ds`); component budgets respected.
