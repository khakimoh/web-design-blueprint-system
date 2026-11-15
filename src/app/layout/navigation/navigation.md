# layout/navigation/

`MainNav` — primary navigation from a typed `NavItem[]` input.

- `<nav>` landmark with an accessible name (`label` input; required when several navs exist).
- `routerLinkActive` + `ariaCurrentWhenActive="page"` mark the current page for sighted and
  screen-reader users.
- Bootstrap `.nav.nav-pills` markup; no custom styles.

Files: [main-nav.ts](main-nav.ts), [main-nav.html](main-nav.html).
