# layout/

The application frame shared by all routes. Layout components may use `shared` components and
`core` services (e.g. color mode) but never import features.

| Folder | Example |
| --- | --- |
| [shell/](shell/README.md) | Page grid, skip link, sidebar state and focus management |
| [header/](header/README.md) | Menu toggle, brand slot, color-mode switch |
| [navigation/](navigation/README.md) | Primary navigation list with current-page marking |
| [sidebar/](sidebar/README.md) | Guidance (the shell renders the sidebar region) |
| [footer/](footer/README.md) | Guidance |
| [not-found/](not-found/README.md) | Wildcard-route page |

Styling comes from the global `.ds-shell` pattern in
[`src/styles/layout/_app-shell.scss`](../../styles/layout/_app-shell.scss).
