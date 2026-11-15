# layout/sidebar/

The sidebar **region** is rendered by the shell (`<aside class="ds-shell__sidebar">`) and its
responsive behaviour comes from `src/styles/layout/_app-shell.scss`.

Extract a `Sidebar` component here when the sidebar gains its own content beyond navigation
(secondary navigation groups, collapse-to-icons mode using `sidebar-width-collapsed`, user
menu). Keep: `aria-label` on the `<aside>`, focus management owned by the shell, logical
properties so it follows text direction.
