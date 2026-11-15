# core/services/

Application-wide services that are not configuration, errors or auth: color mode, page title
and focus announcements, analytics consent, feature flags.

Golden example: [color-mode-store.ts](color-mode-store.ts) — `@Service()` store with a
signal preference (`light` / `dark` / `system`), `prefers-color-scheme` resolution,
persistence and application of `data-bs-theme` on `<html>`; SSR-safe.

Name services by role (`…Store`, `…Api`, `…Facade`) — see
[conventions](../../../../docs/technologies/angular/conventions.md#1-file-naming-angular-cli-2025-style-guide--default).
