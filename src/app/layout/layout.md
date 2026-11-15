# layout/

The application frame shared by all routes. Layout components may use `shared` components and
`core` services (e.g. color mode) but never import features.

| Folder | Example |
| --- | --- |
| [shell/](shell/shell.md) | Page grid, skip link, sidebar state and focus management |
| [header/](header/header.md) | Menu toggle, brand slot, color-mode switch |
| [navigation/](navigation/navigation.md) | Primary navigation list with current-page marking |
| [sidebar/](sidebar/sidebar.md) | Guidance (the shell renders the sidebar region) |
| [footer/](footer/footer.md) | Guidance |
| [not-found/](not-found/not-found.md) | Wildcard-route page |

Styling comes from the global `.ds-shell` pattern in
[`src/styles/layout/_app-shell.scss`](../../styles/layout/_app-shell.scss).
