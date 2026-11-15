# Changelog

All notable changes to the blueprint. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning: [Semantic Versioning](https://semver.org/) as defined in
[docs/development/README.md](docs/development/README.md#versioning-policy-semantic-versioning).

## [1.0.0] — 2026-11-15

First complete release of the Web Design & Engineering Blueprint.

### Added

- Five-layer architecture ([docs/architecture](docs/architecture/README.md)) and ADRs 0001–0006.
- Layer 1: engineering principles — coding standards, naming, quality, security, API integration.
- Layer 2: generic design system documentation and SCSS implementation (`src/styles/`):
  OKLCH-generated palettes, semantic color contract with compile-time validation and WCAG
  contrast checks, light/dark/custom themes, typography roles with fluid headings and
  per-language fonts, 4 px spacing scale, sizing, radius, elevation, z-index and motion
  tokens, app shell and layout primitives, empty-state pattern, standalone entry without Bootstrap.
- Layer 3: technology profiles for Angular 22, SCSS (Dart Sass modules) and Bootstrap 5.3
  (Sass module configuration + runtime theme bridge); Angular golden examples in `src/app/`.
- Layer 4: `AGENTS.md`, `CLAUDE.md` adapter and seven workflows.
- Layer 5: `project.config.yaml` template, JSON Schema, project brief, initialization
  checklist, deviations, kickoff prompt and ADR templates.
- Tooling: `npm run validate` (style build with SCSS rules, config validation, docs integrity).

### Supported versions

Angular 22.x · Bootstrap 5.3.x (verified 5.3.9) · Dart Sass ≥ 1.108 (blueprint build) · Node.js ≥ 20.19.
