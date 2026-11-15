# core/api/

HTTP infrastructure shared by all API clients: URL building, query-parameter serialization,
pagination types, common headers.

Feature API clients (e.g. `features/<x>/services/<x>-api.ts`) use these helpers; they do not
live here. Keep this folder empty until two clients need the same helper — the golden example
API client currently needs none beyond `APP_CONFIG`.

Rules: [docs/api/README.md](../../../../docs/api/README.md).
