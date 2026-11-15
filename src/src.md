# src/

Reference implementation of the blueprint. It is **not** a runnable workspace (no
`angular.json`, no application `package.json`, no `main.ts`); projects generate those with
the official CLI and then adopt what is here.

| Folder | Layer | What projects do with it |
| --- | --- | --- |
| [styles/](styles/styles.md) | 2 — design system (+ Bootstrap adapter) | **Copy** into the project's `src/styles/`; edit only `config/_project.scss` and `project/` |
| [app/](app/app.md) | 3 — Angular profile | **Imitate**: directory conventions and golden examples |
| [assets/](assets/assets.md) | 3 | Conventions for static files (served from `public/` in current Angular CLI) |
| [environments/](environments/environments.md) | 3 | Conventions for build-time flags |
| [testing/](testing/testing.md) | 3 | Conventions for shared test utilities |

The golden examples were verified by compiling and testing them in a freshly generated
Angular 22.2 workspace (see the root README, "Validation").
