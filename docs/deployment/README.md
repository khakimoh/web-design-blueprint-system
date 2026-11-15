# Build and Deployment Standards

Generic standards for building and deploying frontend projects. Hosting-specific
instructions belong in each project's own docs.

## 1. Build once, deploy many

- One production build artifact is promoted through environments (test → staging → production).
- Environment differences come from **runtime configuration** (e.g. `public/config.json` fetched at startup, or values injected by the hosting layer), not from rebuilding — see [coding-standards.md §7](../principles/coding-standards.md#7-configuration-management).
- Build-time environment files only for genuinely compile-time flags.

## 2. Build requirements

- Production configuration with output hashing for cache busting.
- Bundle budgets from `project.config.yaml` → `quality.performance_budget` enforced by the build.
- Source maps generated but not publicly served (upload to error monitoring instead), unless the project decides otherwise.
- CI runs, in order: install from lockfile (`npm ci`) → lint → format check → tests → build → (e2e) → artifact upload.

## 3. Serving

- **Base path:** set the base href for sub-path deployments (`ng build --base-href /sub/path/`); use relative asset URLs everywhere so the app works under any base.
- **SPA fallback:** unknown paths serve `index.html` (except real static files) so client-side routes work on reload.
- **Caching:** hashed assets `Cache-Control: public, max-age=31536000, immutable`; `index.html` and runtime config `no-cache`.
- **Compression:** Brotli/gzip for text assets.
- **Security headers:** see [security.md §4](../principles/security.md#4-transport-and-headers-set-by-the-hosting-layer).

## 4. Release checklist

- [ ] Version and CHANGELOG updated.
- [ ] CI green on the release commit.
- [ ] Runtime configuration for the target environment reviewed (no secrets).
- [ ] Smoke test after deployment: home route, one deep link reload, one API-backed view, theme switch.
- [ ] Rollback path known (previous artifact retained).
