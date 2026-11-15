# Web Design & Engineering Blueprint

A reusable foundation for building websites and web applications with AI coding agents
(Claude Code, Codex and others): engineering principles, a brand-neutral design system,
technology guides, agent instructions and project templates — in one place, versioned.

| | |
| --- | --- |
| Version | `2.0.0` (see [CHANGELOG.md](CHANGELOG.md)) |
| Primary technology profile | Angular 22 · TypeScript · SCSS (Dart Sass) · Bootstrap 5.3 |
| Accessibility target | WCAG 2.2 AA |
| Entry point for AI agents | [AGENTS.md](AGENTS.md) |
| Live showcase | [playground/](playground/playground.md) |
| License | [MIT](LICENSE) |

---

## Contents

1. [What this repository is](#1-what-this-repository-is)
2. [Quick start: use it in a new front-end project (VS Code)](#2-quick-start-use-it-in-a-new-front-end-project-vs-code)
3. [See the design system in the Playground](#3-see-the-design-system-in-the-playground)
4. [Main capabilities](#4-main-capabilities)
5. [Architecture](#5-architecture)
6. [Repository structure](#6-repository-structure)
7. [Working with AI agents](#7-working-with-ai-agents)
8. [Reuse and extension](#8-reuse-and-extension)
9. [Versioning and maintenance](#9-versioning-and-maintenance)
10. [Validation](#10-validation)
11. [Limitations and open decisions](#11-limitations-and-open-decisions)

---

## 1. What this repository is

This repository is a **blueprint**, not a website or a product. It contains no business
logic, no domain-specific terms and no fixed brand.

**The problem it solves.** Every new web project repeats the same foundational decisions:
how colors are organized, which spacing scale to use, how Bootstrap is customized, where SCSS
files go, how Angular folders are structured, and how to explain all of this to an AI agent.
Without a shared reference, every project ends up different, values are hard-coded and
duplicated, and accessibility, RTL and dark mode are left until the end.

**What it does instead.** It makes those decisions once — documented and automatically
checked — and lets each project specify only what is unique to it: brand colors, fonts,
themes, features and integrations.

**Who it is for.** Front-end developers starting a project, teams that want several projects
on the same foundation, designers who want to define a visual identity through a few
parameters, and anyone building with AI coding agents.

**How it helps AI agents.** Instead of re-explaining your preferences in every conversation,
the agent reads the short [AGENTS.md](AGENTS.md), then your project's `project.config.yaml`,
and only the documents its current task needs. Step-by-step workflows and tested golden
examples make the expected implementation style concrete, and approval gates keep major
decisions with you.

**How it differs from a UI component library.**

| UI component library | This blueprint |
| --- | --- |
| Ready-made components to import | Standards, design tokens, patterns and workflows |
| Ships its own look and brand | Takes the brand from your project |
| Tied to one framework | Principles and design system are framework-independent; technology profiles implement them |
| UI layer only | From coding and security standards to architecture, testing and how agents work |
| Re-implements components | Uses native HTML and Bootstrap first, fills only real gaps |

---

## 2. Quick start: use it in a new front-end project (VS Code)

Follow these steps in order. They take a new, empty Angular project from zero to "an AI agent
is building features with your design system". Commands are for the VS Code integrated
terminal (**Terminal → New Terminal**) on macOS or Linux; on Windows, use Git Bash or replace
`cp -R` with `Copy-Item -Recurse` and `rm` with `Remove-Item` in PowerShell.

### What you need (once)

- [VS Code](https://code.visualstudio.com/), [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) 20.19 or newer
- The Angular CLI: `npm install -g @angular/cli@22`
- Recommended VS Code extensions:

  | Extension | Why |
  | --- | --- |
  | Angular Language Service | Template completion and errors |
  | ESLint | Lint feedback in the editor |
  | Prettier | Formatting on save |
  | EditorConfig | Applies the shared `.editorconfig` |
  | YAML (Red Hat) | Validates `project.config.yaml` against the schema while you type |
  | An AI agent: Claude Code, Codex or GitHub Copilot | Builds the project following the blueprint |

Keep the blueprint and your projects **side by side** in one parent folder. All paths below
assume this layout:

```text
~/dev/
├── web-design-blueprint-system/   ← this repository (cloned once, used by every project)
└── my-site/                       ← your new project
```

### Step 1 — Get the blueprint and pin a version

```bash
mkdir -p ~/dev && cd ~/dev
git clone https://github.com/khakimoh/web-design-blueprint-system.git
git -C web-design-blueprint-system checkout v2.0.0
```

Pinning a tag means later changes to the blueprint never change your project by surprise.
(You can also clone from VS Code: **Command Palette → Git: Clone**.)

### Step 2 — Create the Angular project

```bash
cd ~/dev
ng new my-site --style=scss --routing --ssr=false --ai-config=none
cd my-site
```

Keep the CLI defaults (standalone components, zoneless, strict mode, Vitest).
`--ai-config=none` is used because the agent instructions come from this blueprint.

### Step 3 — Open the project and the blueprint together in VS Code

Create `my-site/my-site.code-workspace`:

```json
{
  "folders": [
    { "path": "." },
    { "path": "../web-design-blueprint-system", "name": "blueprint (reference — do not edit)" }
  ],
  "settings": {
    "files.readonlyInclude": { "**/web-design-blueprint-system/**": true }
  }
}
```

Then open it: **File → Open Workspace from File… → my-site.code-workspace**. You now see both
folders in the Explorer; the blueprint is read-only, so nobody edits it by accident. The
documentation stays in the blueprint — you do **not** copy `docs/` into your project.

### Step 4 — Add the project templates

```bash
cp ../web-design-blueprint-system/templates/project.config.yaml .
mkdir -p docs
cp ../web-design-blueprint-system/templates/project-brief.md docs/
```

In `project.config.yaml`, change the first line so VS Code validates it against the schema:

```yaml
# yaml-language-server: $schema=../web-design-blueprint-system/schemas/project-config.schema.json
```

### Step 5 — Describe your website

Fill in `docs/project-brief.md`: purpose, website type, target users, languages and text
direction, features with priorities, integrations, technology and design preferences, and
constraints. Write "Unknown" where you are unsure — the agent will ask instead of guessing.
You can leave `project.config.yaml` for the agent to fill in from the brief (step 9).

### Step 6 — Add the design foundation (styles and Bootstrap)

```bash
cp -R ../web-design-blueprint-system/src/styles ./src/styles
rm src/styles.scss
npm install bootstrap@~5.3.9
```

In `angular.json`, under `projects → my-site → architect → build → options`, set:

```json
"styles": ["src/styles/main.scss"],
"stylePreprocessorOptions": { "includePaths": ["src/styles"] }
```

`src/styles/` is the only part of the blueprint you copy, because it is real code that your
build compiles.

### Step 7 — Set your brand

Open `src/styles/config/_project.scss` — the **only** style file you edit (project-specific CSS
goes in `src/styles/project/`):

```scss
$brand-primary: #0f766e;      // your main brand color, used exactly on primary buttons
$brand-secondary: #475569;
$font-family-base: (Inter, system-ui, sans-serif);
$radius-scale-factor: 1;      // 0 sharp · 0.5 subtle · 1 default · 1.5 rounded
$density: "comfortable";      // compact · comfortable · spacious
$enabled-themes: ("light", "dark");
```

Full palettes, hover states, readable text colors, the dark theme and Bootstrap's variables
are all generated from these values. If a color does not have enough contrast, the build
warns you. Record the same choices under `design:` in `project.config.yaml`.

### Step 8 — Connect your AI agent

Create `AGENTS.md` in the project root:

```markdown
# AGENTS.md
This project follows the Web Design & Engineering Blueprint v2.0.0,
located at ../web-design-blueprint-system (read-only — never edit it).

1. Read ../web-design-blueprint-system/AGENTS.md first and follow its reading order.
2. Then read ./project.config.yaml and ./docs/project-brief.md.
3. Project-specific notes: <only what is unique to this project>
```

For Claude Code, also create `CLAUDE.md` containing the single line `@AGENTS.md`. Codex reads
`AGENTS.md` directly. For other agents, point their instruction file to `AGENTS.md`.

### Step 9 — Start the agent

Open your agent in VS Code and paste the kickoff prompt from
[templates/agent-kickoff-prompt.md](templates/agent-kickoff-prompt.md) (replace the
placeholders). The agent will:

1. ask about anything missing in your brief;
2. fill in and validate `project.config.yaml`;
3. propose the architecture (folders, dependencies, design settings, feature plan) and **wait
   for your approval**;
4. build the app shell, then one feature at a time, validating each step.

### Step 10 — Run and check the application

```bash
ng serve --open
```

Before accepting each feature:

```bash
ng build
ng test --watch=false
```

Validate the configuration file against the blueprint's schema (the first command installs the
blueprint's small validation tools once):

```bash
npm --prefix ../web-design-blueprint-system install
npm --prefix ../web-design-blueprint-system run validate:config -- "$PWD/project.config.yaml"
```

Also check by hand: narrow (320 px) and wide screens, keyboard-only navigation, light and dark
themes, and loading/empty/error states. The full list is in
[docs/workflows/validation.md](docs/workflows/validation.md).

### Step 11 — Record deviations

If the project intentionally does something differently from the blueprint, record it in
`project.config.yaml`:

```yaml
customizations:
  deviations:
    - id: DEV-001
      standard: docs/technologies/angular/architecture.md#5-state-management
      decision: Use a state library for one complex feature
      rationale: Cross-feature workflows need devtools
      approved_by: Tech lead
      date: 2026-11-15
```

Never edit the copied blueprint files (other than `config/_project.scss` and `project/`) to
make a deviation disappear.

### Optional — Right-to-left languages (e.g. Persian)

If `design.direction` is `rtl` or `both`:

```bash
npm install --save-dev postcss-rtlcss
```

Create `postcss.config.json` in the project root:

```json
{ "plugins": { "postcss-rtlcss": { "safeBothPrefix": true } } }
```

Always set `lang` and `dir` on `<html>` (for example `<html lang="fa" dir="rtl">`). Details:
[docs/design-system/rtl-ltr.md](docs/design-system/rtl-ltr.md).

### Later — Upgrading to a newer blueprint version

Read the [CHANGELOG](CHANGELOG.md), check out the new tag in the blueprint folder, copy
`src/styles/` again **except** `config/_project.scss` and `project/`, update
`blueprint.version` in `project.config.yaml`, then rebuild and review your deviations.

---

## 3. See the design system in the Playground

[`playground/`](playground/playground.md) is a standalone Angular app that renders the design
system live — colors with contrast checks, typography, spacing, components, forms, layout,
light/dark themes and RTL/LTR. It compiles this repository's `src/styles/` directly, so it
always shows the real foundation.

```bash
cd playground
npm install
ng serve --open
```

It opens at http://localhost:4200/. Edit `src/styles/config/_project.scss` and the playground
updates — a quick way to preview a brand before starting a project.

---

## 4. Main capabilities

| Capability | Description | Reference |
| --- | --- | --- |
| Generic design system | A brand-neutral visual foundation for any website | [docs/design-system](docs/design-system/design-system.md) |
| Design tokens | Three levels (primitive → semantic → component), one source (Sass maps), published as CSS custom properties and Bootstrap variables | [design-tokens.md](docs/design-system/design-tokens.md) |
| Color architecture | Palettes generated from a seed color in OKLCH with fixed lightness per step; semantic colors; WCAG contrast checked at compile time | [color-system.md](docs/design-system/color-system.md) |
| Themes | Light, dark and custom themes, switched at runtime with one attribute | [themes.md](docs/design-system/themes.md) |
| Typography | rem scale, text roles, fluid headings, per-language fonts (e.g. Persian and English) | [typography.md](docs/design-system/typography.md) |
| Spacing and sizing | 4 px scale, semantic aliases, density-based control heights | [spacing-and-sizing.md](docs/design-system/spacing-and-sizing.md) |
| Responsive layout | Mobile-first breakpoints, app shell, auto grid, container queries | [layout-and-responsive.md](docs/design-system/layout-and-responsive.md) |
| SCSS standards | Sass module system, documented import order, automatically enforced rules | [technologies/scss](docs/technologies/scss/scss.md) |
| Bootstrap integration | Bootstrap 5.3 configured from tokens with `@use … with`, plus a runtime theme bridge | [technologies/bootstrap](docs/technologies/bootstrap/bootstrap.md) |
| Front-end architecture | Angular 22: standalone components, signals, zoneless, feature-based folders | [technologies/angular](docs/technologies/angular/angular.md) |
| Engineering principles | Readability, modularity, error handling, configuration, security, testing, performance, documentation | [docs/principles](docs/principles/principles.md) |
| AI agent instructions | Tool-independent `AGENTS.md` plus thin adapters | [AGENTS.md](AGENTS.md) |
| Project initialization workflow | Nine domain-independent steps with a checklist | [project-initialization.md](docs/workflows/project-initialization.md) |
| Project configuration | `project.config.yaml` with JSON Schema and validator | [docs/configuration](docs/configuration/configuration.md) |

---

## 5. Architecture

The blueprint is organized in **five layers**. Each layer only relies on the layers above it,
so generic principles never depend on a technology or a project.

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ 1. Engineering Principles        docs/principles, docs/api                │ technology-independent
├───────────────────────────────────────────────────────────────────────────┤
│ 2. Generic Design System         docs/design-system  +  src/styles        │ brand-independent
├───────────────────────────────────────────────────────────────────────────┤
│ 3. Technology Blueprints         docs/technologies/{angular,scss,bootstrap}│ how 1–2 are implemented
│                                  + src/app (golden examples), playground/ │
├───────────────────────────────────────────────────────────────────────────┤
│ 4. AI Agent Instructions         AGENTS.md, CLAUDE.md, docs/workflows     │ how to apply them
│    & Workflows                                                            │
├───────────────────────────────────────────────────────────────────────────┤
│ 5. Project-Specific              templates/, schemas/ → project.config.yaml│ one project's decisions
│    Configuration                 src/styles/config/_project.scss (copied) │
└───────────────────────────────────────────────────────────────────────────┘
```

| Layer | Owns | Must not contain |
| --- | --- | --- |
| 1. Engineering Principles | Code quality, naming, modularity, separation of concerns, error handling, configuration, security, testing, performance, accessibility, documentation, dependencies | Framework APIs |
| 2. Generic Design System | Tokens, color, themes, typography, spacing, layout, breakpoints, radius, shadows, z-index, motion, iconography, component specs, interaction states, RTL/LTR, accessibility — and their SCSS implementation | Framework code, a project's brand |
| 3. Technology Blueprints | Mapping of layers 1–2 to Angular, SCSS and Bootstrap; setup commands; conventions; golden examples | Changes to principles; product code |
| 4. Agent Instructions & Workflows | Step-by-step procedures, approval gates, validation steps | Long reference material (they link to 1–3) |
| 5. Project-Specific Configuration | Templates and schema for recording one project's decisions | Explanations (they live in docs) |

How a project uses the layers:

```text
project brief ──▶ project.config.yaml (layer 5, validated by schema)
                       │ selects technology profiles
                       ▼
       Angular / SCSS / Bootstrap profiles (layer 3) ──▶ principles (1) + design system (2)
                       │
           agent follows workflows (layer 4) ──▶ application code + copied src/styles
                       │
            deviations recorded back in project.config.yaml
```

Details: [docs/architecture](docs/architecture/architecture.md) and
[ADR-0001](docs/decisions/0001-five-layer-architecture.md).

---

## 6. Repository structure

Every folder is documented by an index file **named after the folder** (for example
`docs/design-system/design-system.md`); only this root file is called `README.md`. The
`npm run check:docs` script enforces this.

```text
web-design-blueprint-system/
├── README.md                 this document
├── AGENTS.md                 tool-independent instructions for AI agents (entry point)
├── CLAUDE.md                 thin adapter for Claude Code (imports AGENTS.md)
├── CHANGELOG.md              version history
├── LICENSE
├── package.json              validation tooling for this repository (dev dependencies only)
├── .editorconfig             shared editor settings
│
├── docs/                     reference documentation, by layer
│   ├── architecture/         the five layers and how they connect
│   ├── principles/           layer 1: coding, naming, quality, security standards
│   ├── api/                  layer 1: API integration principles
│   ├── design-system/        layer 2: tokens, color, themes, typography, layout, components, RTL, accessibility
│   ├── technologies/         layer 3: technology profiles
│   │   ├── angular/          architecture, conventions and testing for Angular
│   │   ├── scss/             SCSS architecture and rules
│   │   └── bootstrap/        Bootstrap version policy and integration
│   ├── workflows/            layer 4: initialization, design system, features, review, refactoring, validation, docs
│   ├── configuration/        layer 5: project.config.yaml and deviations
│   ├── decisions/            architecture decision records (ADR 0001–0006)
│   ├── development/          maintaining and extending this repository, versioning policy
│   └── deployment/           generic build and deployment standards
│
├── templates/                files copied into a new project
│   ├── project.config.yaml   machine-readable record of project decisions
│   ├── project-brief.md      project description for the agent
│   ├── initialization-checklist.md
│   ├── agent-kickoff-prompt.md
│   ├── deviations.md
│   └── adr.md
├── schemas/                  JSON Schema for project.config.yaml
├── scripts/                  validators: build-styles, validate-config, check-docs
│
├── src/                      reference implementation (not a runnable workspace)
│   ├── styles/               ★ the design system in SCSS — copied into every project
│   │   ├── main.scss             entry with Bootstrap
│   │   ├── main-standalone.scss  entry without a CSS framework
│   │   ├── config/               project settings (_project.scss)
│   │   ├── abstracts/            public Sass API: tokens, functions, mixins (no CSS output)
│   │   ├── tokens/               canonical token definitions
│   │   ├── themes/               semantic values per theme + validation
│   │   ├── base/                 custom properties, global behaviour, text roles
│   │   ├── layout/               app shell and layout primitives
│   │   ├── components/           patterns Bootstrap lacks (empty state)
│   │   ├── utilities/            helpers for the no-Bootstrap entry
│   │   ├── vendors/bootstrap/    Bootstrap configured from tokens + theme bridge
│   │   └── project/              project-owned CSS (e.g. @font-face)
│   ├── app/                  Angular reference structure + golden examples
│   │   ├── core/                 app-wide singletons (config, errors, interceptors, services)
│   │   ├── shared/               generic components, models and utilities
│   │   ├── layout/               shell, header, navigation, sidebar, footer, not-found
│   │   └── features/             one folder per feature (example: placeholder-feature)
│   ├── assets/               conventions for static files
│   ├── environments/         conventions for build-time flags
│   └── testing/              conventions for shared test utilities
│
├── playground/               standalone Angular app showcasing the design system live
│
└── engineering-audit/        audit of an earlier Angular project — historical reference, unchanged, not a standard
```

> **About `engineering-audit/`:** these documents describe one specific application. Reusable
> practices were extracted and classified (general principle, design pattern, Angular
> convention, project-specific decision, legacy detail, to improve) — see
> [ADR-0006](docs/decisions/0006-audit-as-reference-not-standard.md). The documents
> themselves are kept unchanged.

### What a project copies and what it only references

| Item | How | Why |
| --- | --- | --- |
| `docs/`, `AGENTS.md`, workflows, schema | **Reference** from the pinned blueprint | One source; no duplicated docs |
| `src/styles/` | **Copy** into the project | Real code the project's build compiles |
| `templates/project.config.yaml`, `project-brief.md`, checklist | **Copy** into the project | The project's own decisions |
| `src/app/` (golden examples) | **Imitate**, do not copy | Patterns, not a library |
| `engineering-audit/`, `scripts/`, `package.json`, `playground/` | **Do not copy** | Specific to this repository |

---

## 7. Working with AI agents

[AGENTS.md](AGENTS.md) is tool-independent and short; details live in the reference documents
and workflows. Agent-specific files are only **thin adapters**:

| Agent | How it connects |
| --- | --- |
| Codex and agents that read `AGENTS.md` | Directly |
| Claude Code | `CLAUDE.md` with `@AGENTS.md` |
| Others | Their own instruction file with one line pointing to `AGENTS.md`, or mention it in the first message |

### Example first message (generic)

The full template is in [templates/agent-kickoff-prompt.md](templates/agent-kickoff-prompt.md).

```text
We are starting a new web project. Follow the Web Design & Engineering
Blueprint at ../web-design-blueprint-system, version 2.0.0.

1. Read its AGENTS.md first and follow its reading order.
2. Read docs/project-brief.md. List missing or ambiguous requirements and
   ask before proposing anything. Do not invent requirements.
3. Fill in project.config.yaml from the template and validate it.
4. Propose the architecture; wait for my approval before generating code.
5. Then apply the design foundation and implement one feature at a time,
   validating each step.
6. Never modify the blueprint. Record deviations in project.config.yaml.
```

### What to expect from the agent

| Stage | Agent behaviour |
| --- | --- |
| Reading `AGENTS.md` | Follows the reading order; opens only the documents relevant to the task |
| Project configuration | Reads `project.config.yaml`; runs the initialization workflow if it is missing |
| Technology profile | Picks Angular/SCSS/Bootstrap profiles from `frontend.*`; says so explicitly if no profile exists |
| Design system | Tokens only; native HTML and Bootstrap first; all interaction states; RTL and dark mode |
| Architecture proposal | Folder structure, dependencies with reasons, design settings, feature order |
| Approval | Asks before: architecture, new runtime dependencies, deviations, deleting files |
| Incremental work | One feature or concern per change; files generated with the CLI |
| Validation | Runs build/lint/tests and manual checks; reports exactly what ran — never claims success without running it |

---

## 8. Reuse and extension

| Goal | How | Reference |
| --- | --- | --- |
| Add a brand theme | Add an entry to `$custom-themes` that extends `light` or `dark` and overrides only the tokens you need; the build checks completeness and contrast | [themes.md](docs/design-system/themes.md) |
| Add a technology profile (e.g. React, Vue) | Create `docs/technologies/<name>/` following the profile contract; golden examples in `examples/<name>/`; reuse `src/styles`; write an ADR | [technologies.md](docs/technologies/technologies.md) |
| Extend the token system | Pick the right level (primitive / semantic / component); a semantic token needs a value in every theme or the build fails | [design-tokens.md](docs/design-system/design-tokens.md#6-extending-the-token-system-blueprint-maintainers) |
| Add a golden example | Minimal, generic, placed where its pattern belongs; listed in the profile index; its stylesheet compiles with `npm run build:styles` | [development.md](docs/development/development.md) |
| Add an engineering standard | Technology-independent → `docs/principles/`, otherwise the profile; add a review checklist item; ADR if it changes practice | [development.md](docs/development/development.md#adding-to-the-blueprint) |
| Promote a project pattern | Record it as a deviation or candidate in the project → remove project vocabulary → express with tokens → docs, example, CHANGELOG | [Promoting a project pattern](docs/development/development.md#promoting-a-project-pattern) |

---

## 9. Versioning and maintenance

| Change | Version | Examples |
| --- | --- | --- |
| Patch | `x.y.Z` | Wording fixes, broken links, SCSS bug fixes that do not intentionally change values |
| Minor | `x.Y.0` | New token, optional config field, golden example, workflow, technology profile, playground features |
| Major | `X.0.0` | Renamed or removed tokens/classes, changed scale values, new required schema fields, a different default technology (e.g. Bootstrap 6), changed folder conventions |

- **Updating standards:** each change comes with a CHANGELOG entry and, when it has lasting impact, an ADR; `npm run validate` must pass; releases are git tags `vX.Y.Z` matching `package.json`.
- **Pinning in projects:** record `blueprint.version` in `project.config.yaml` and keep the blueprint checkout on that tag. A new release never changes an existing project until it upgrades.
- **Breaking changes:** listed in the CHANGELOG under **Breaking**, with a migration section.
- **Project feedback:** deviations are the main source of improvements; generic ones are promoted into the blueprint.
- **Backward compatibility:** deprecate before removing — keep the old name for one minor release, mark it `@deprecated`, remove it in the next major.

---

## 10. Validation

### Checking this repository

```bash
npm install
npm run validate
```

| Check | Command | Ensures |
| --- | --- | --- |
| Styles | `npm run build:styles` | Both entries and all `src/app/` component stylesheets compile with zero Sass warnings from this repository; no `@import`, `!important` or raw colors outside token files; `abstracts/` emits no CSS; contrast checks pass in every theme |
| Config | `npm run validate:config` | The template matches the JSON Schema and cross-field rules |
| Docs | `npm run check:docs` | Every folder has a meaningful index file named after it; relative links resolve; no domain vocabulary in reusable files |

### Verified results

This repository is not a runnable Angular workspace, so it has no application build of its
own. The golden examples were verified in a freshly generated Angular 22.2 workspace:
`ng build` (production, AOT with strict templates) succeeded with no compile errors, all 7
unit tests passed, and a browser check covered the responsive shell, focus management, form
validation, dark mode and `dir="rtl"`. The [playground](playground/playground.md) builds with
no errors or warnings and its unit tests pass.

---

## 11. Limitations and open decisions

- **Bootstrap brand colors are compile-time.** Runtime themes change neutrals and surfaces; a different brand color per tenant needs a separate build ([ADR-0003](docs/decisions/0003-bootstrap-via-sass-module-configuration.md)).
- **Bootstrap 5.3 still uses `@import` internally.** Its deprecation warnings are silenced with `quietDeps` (Angular does this automatically). Moving to Bootstrap 6 (currently alpha) will be a major release.
- **Only the Angular profile exists.** React and Vue are documented extension points.
- **Tokens are defined in Sass only.** Exporting them for design tools (e.g. DTCG format) can be added later ([ADR-0002](docs/decisions/0002-sass-tokens-canonical-source.md)).
- **Full Bootstrap CSS is about 270 kB raw** (about 27 kB transferred); ways to trim it are in the Angular profile.
- **Authentication, backend and business logic** are intentionally not implemented; they are project work.
- **Folder index files are named `<folder>.md`.** GitHub only auto-displays files named `README.md` below a folder listing, so open the folder's `<folder>.md` file directly when browsing on GitHub.
