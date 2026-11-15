# shared/

Generic, reusable building blocks with **no feature or domain knowledge**. Anything here could
be dropped into a different project unchanged.

| Folder | Contents |
| --- | --- |
| [components/](components/components.md) | Generic presentational components |
| [directives/](directives/directives.md) | Reusable behaviour on existing elements |
| [pipes/](pipes/pipes.md) | Pure display transforms |
| [models/](models/models.md) | Generic types (`LoadState`, `NavItem`) |
| [utils/](utils/utils.md) | Pure functions (coercion, formatting) |

Rules: no imports from `features/`, `layout/` or `core` services; inputs named by role;
promote code here on its second real use, after removing domain words.
