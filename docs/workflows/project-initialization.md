# Workflow — Project Initialization

Domain-independent sequence for starting any new website. Track progress with
[templates/initialization-checklist.md](../../templates/initialization-checklist.md).

## Step 1 — Understand the project

The developer provides (ideally via [templates/project-brief.md](../../templates/project-brief.md)):
description, website type, target users, main requirements, features, technology preferences,
design preferences, integrations, constraints.

Agent actions:

1. Restate the project in 3–5 sentences.
2. List **missing or ambiguous requirements** as numbered questions, grouped: scope, users/locales, design, technology, integrations, constraints. Mark each as *blocking* or *can default*.
3. For non-blocking gaps, state the blueprint default you will assume (e.g. "Angular 22, Bootstrap 5.3, light+dark, LTR, WCAG 2.2 AA").
4. Wait for answers to blocking questions.

**Output:** confirmed understanding + list of assumptions.

## Step 2 — Read the blueprint

Read, in order: `AGENTS.md`; principles; design-system index (`design-system.md`) plus topics relevant to the
project (always: tokens, color, typography, layout, accessibility; RTL if needed); the
selected technology profiles; this workflow and feature-development; golden examples.

**Output:** a short list of the documents read and the profile(s) selected.

## Step 3 — Create the project configuration

1. Copy [templates/project.config.yaml](../../templates/project.config.yaml) to the project root.
2. Fill every field from the brief and the confirmed assumptions; pin `blueprint.version`.
3. Validate with the blueprint's validator:

   ```bash
   npm --prefix <blueprint-path> run validate:config -- "$PWD/project.config.yaml"
   ```

**Output:** valid `project.config.yaml`.

## Step 4 — Propose the architecture **(approval)**

Present one proposal containing:

| Section | Content |
| --- | --- |
| Directory structure | `core`, `shared`, `layout`, `features/<one per feature>` with the first files |
| Technology choices | framework/version, rendering mode, CSS framework, test runner |
| Main dependencies | each runtime dependency with its reason; nothing beyond the profile defaults without justification |
| Design configuration | brand seeds, fonts (and how they load), shape, density, themes, direction — i.e. the planned `config/_project.scss` |
| Theme configuration | default theme, user switching, follow-system |
| Feature organization | features → routes → main components/services; cross-feature data flows |
| Development plan | ordered milestones; first feature to deliver end-to-end |
| Deviations | anything differing from the blueprint, with rationale |

Stop. Proceed only after the human approves (record approval in the checklist).

## Step 5 — Initialize the application

Use the official CLI as described in the framework profile, e.g.
[Angular profile §2](../technologies/angular/angular.md#2-create-a-project). Do not hand-write
workspace configuration the CLI generates, and do not build a custom generator.

Then: initial commit; add lint/format tooling; confirm `ng build` and `ng test` pass on the
untouched scaffold.

**Output:** building, testing scaffold committed.

## Step 6 — Apply the design foundation

Follow [design-system-application.md](design-system-application.md) part A:

1. Copy `src/styles/` from the pinned blueprint version.
2. Fill `config/_project.scss` from `project.config.yaml` → `design`.
3. Wire the global entry and Sass load path; install Bootstrap if selected.
4. Configure fonts (self-hosted), theme bootstrap script, `lang`/`dir`.
5. RTL build step if `direction` is `rtl` or `both`.
6. Build: no warnings from project files, contrast check clean.

**Output:** the app renders with project tokens in light and dark themes.

## Step 7 — Implement the application

1. Application shell first (layout, navigation, skip link, theme switch, not-found route) — see the layout golden examples.
2. Then features one at a time with [feature-development.md](feature-development.md), in the approved order.

## Step 8 — Validate

Run [validation.md](validation.md) in full at the end of each milestone: build, lint, format,
tests, responsiveness, accessibility, design consistency, directory organization.

## Step 9 — Document deviations

Record every intentional deviation in `project.config.yaml` → `customizations.deviations`.
Never edit the copied blueprint files (other than `config/_project.scss`) to hide a deviation.
Note promotion candidates for the blueprint in the final report.

**Final report:** what was built, validation results (commands + outcomes), deviations,
open questions.
