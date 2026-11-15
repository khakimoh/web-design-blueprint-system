# src/environments/

Build-time flags only. Angular CLI no longer generates environment files by default; add them
with `ng generate environments` when a compile-time flag is genuinely needed (e.g. enabling a
debug panel in development builds).

Deployment-specific values (API base URL, public service keys) are **runtime configuration**
and belong to `core/config/` (`APP_CONFIG`), so one build can be promoted across environments.
Never store secrets here.
