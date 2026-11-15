# playground/src/app/

The playground application, organized by the Blueprint's Angular profile.

| Folder | Responsibility |
| --- | --- |
| `core/` | App-wide services and utilities |
| `shared/` | Generic components and models |
| `layout/` | Documentation shell |
| `features/` | One lazy-loaded page per showcase section |

`app.routes.ts` defines the sections (`NAV_ITEMS`) and their lazy routes; `app.config.ts` provides
the router with component input binding, scroll restoration and a page title strategy.
