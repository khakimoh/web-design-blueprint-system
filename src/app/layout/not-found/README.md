# layout/not-found/

`NotFound` — page for the wildcard route (`**`), lazy-loaded via `loadComponent` and therefore
a **default export**.

Uses `EmptyState` with `headingLevel = 1` (it is the page's main heading) and a link back to
the start page. A real not-found page (rather than a silent redirect) tells users and
monitoring that a link is broken. File: [not-found.ts](not-found.ts).
