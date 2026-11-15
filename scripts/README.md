# scripts/

Validation tooling for **this repository**. These scripts are not copied into
projects; projects use their own framework tooling (Angular CLI, linters, tests).

| Script | npm command | What it checks |
| --- | --- | --- |
| [build-styles.mjs](build-styles.mjs) | `npm run build:styles` | Compiles `src/styles/main.scss` (Bootstrap profile) and `main-standalone.scss`; compiles every component stylesheet under `src/app/` against the public Sass API; fails on any Sass warning from this repo, on `@import`, `!important`, or raw colors outside token files; asserts `abstracts/` emits no CSS. Output in `dist/styles/` (git-ignored). |
| [validate-config.mjs](validate-config.mjs) | `npm run validate:config -- [files…]` | Validates project configuration YAML against [the schema](../schemas/project-config.schema.json) plus cross-field rules. Defaults to the template. |
| [check-docs.mjs](check-docs.mjs) | `npm run check:docs` | Every directory has a meaningful README; relative Markdown links resolve; no domain-specific vocabulary in reusable files. |

Run everything with:

```bash
npm install
npm run validate
```

Requirements: Node.js 20.19 or newer. Dev dependencies are limited to
`sass`, `bootstrap` (to compile the Bootstrap profile), `ajv` and `yaml`.
