# Project Initialization Checklist

Copy into the new project (e.g. `docs/initialization-checklist.md`) and tick
items as they are completed. Each step links to the workflow section that
explains it. Items marked **(approval)** need a human decision before work continues.

## Step 1 — Understand the project

- [ ] Project brief completed ([template](project-brief.md))
- [ ] Missing or ambiguous requirements listed and answered
- [ ] Locales and text direction confirmed

## Step 2 — Read the blueprint

- [ ] Blueprint version chosen and pinned (tag)
- [ ] `AGENTS.md` read
- [ ] Applicable technology profiles identified (framework, styling, CSS framework)

## Step 3 — Create project configuration

- [ ] `project.config.yaml` created from [the template](project.config.yaml)
- [ ] `npm run validate:config -- <path>` passes (run from the blueprint checkout)

## Step 4 — Propose the architecture **(approval)**

- [ ] Directory structure and feature list proposed
- [ ] Dependencies listed with justification
- [ ] Design configuration (colors, type, shape, density, themes, direction) proposed
- [ ] Development plan (first feature, milestones) proposed
- [ ] Human approval recorded

## Step 5 — Initialize the application

- [ ] Workspace generated with the official CLI (see the framework profile)
- [ ] Strict TypeScript and template checking enabled
- [ ] Formatter and linter configured
- [ ] First commit made

## Step 6 — Apply the design foundation

- [ ] `src/styles/` copied from the pinned blueprint version
- [ ] `config/_project.scss` filled from `project.config.yaml`
- [ ] Global stylesheet and Sass load path configured
- [ ] Bootstrap installed and configured through tokens (if used)
- [ ] Fonts loaded (self-hosted when web fonts are used)
- [ ] RTL build step configured (if direction is `rtl` or `both`)
- [ ] Style build has no warnings; contrast check passes

## Step 7 — Implement

- [ ] Application shell (layout, navigation, skip link, theme switch)
- [ ] First feature delivered end-to-end following the feature workflow

## Step 8 — Validate

- [ ] Build, lint, format and tests pass
- [ ] Responsive check at xs, md and xl widths
- [ ] Keyboard-only walkthrough and automated accessibility scan
- [ ] Light and dark themes (and RTL, if applicable) visually checked

## Step 9 — Document deviations

- [ ] Every intentional deviation recorded in `project.config.yaml` → `customizations.deviations`
- [ ] Candidates for promotion to the blueprint noted
