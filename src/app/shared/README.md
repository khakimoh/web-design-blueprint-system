# shared/

Generic, reusable building blocks with **no feature or domain knowledge**. Anything here could
be dropped into a different project unchanged.

| Folder | Contents |
| --- | --- |
| [components/](components/README.md) | Generic presentational components |
| [directives/](directives/README.md) | Reusable behaviour on existing elements |
| [pipes/](pipes/README.md) | Pure display transforms |
| [models/](models/README.md) | Generic types (`LoadState`, `NavItem`) |
| [utils/](utils/README.md) | Pure functions (coercion, formatting) |

Rules: no imports from `features/`, `layout/` or `core` services; inputs named by role;
promote code here on its second real use, after removing domain words.
