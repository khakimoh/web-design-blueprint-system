# Quality Standards

## 1. Testing principles

- **Test behaviour, not implementation.** Assert what the user or caller observes.
- **Pyramid:** many fast unit tests (pure logic, data mapping, presentational rendering), fewer integration tests (container + state + mocked HTTP), few end-to-end tests (critical journeys).
- **What must be tested:**
  - data normalization and error mapping at API boundaries;
  - state transitions (loading → success / empty / error);
  - form validation rules;
  - components with logic (conditional rendering, emitted events);
  - accessibility-critical behaviour (focus management, keyboard handling).
- **What need not be unit-tested:** framework wiring, trivial getters, third-party library internals.
- Tests are deterministic: no real network, no real time (use fake timers/clock), no order dependence.
- A bug fix starts with a failing test that reproduces it.
- Coverage is a signal, not a goal; the project sets a target in `project.config.yaml` (`quality.testing.coverage_target`).

## 2. Performance principles

- **Budget first:** set bundle budgets (initial JS/CSS, per-component styles) and fail the build when exceeded.
- **Load less:** lazy-load routes/features; import only what is used; avoid large dependencies for small tasks.
- **Render less:** prefer fine-grained reactivity and immutable inputs; avoid recomputation in templates.
- **Fetch once:** deduplicate and cache idempotent requests; never re-fetch unchanged data on navigation.
- **Media:** responsive images with explicit dimensions (prevents layout shift), modern formats, lazy-loading below the fold, `font-display: swap` for web fonts, self-hosted subsetted fonts.
- **Measure:** Core Web Vitals targets — LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (75th percentile).

## 3. Accessibility principles

Target: **WCAG 2.2 Level AA**. Details in [design-system/accessibility.md](../design-system/accessibility.md).

- Semantic HTML first; ARIA only to fill gaps, never to replace native semantics.
- Everything operable by keyboard with a visible focus indicator.
- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI component boundaries).
- No information conveyed by color alone.
- Respect user settings: reduced motion, zoom up to 200 %/400 % reflow, forced colors, text direction.
- Accessibility is verified with automated scanning **and** manual keyboard/screen-reader checks.

## 4. Documentation standards

- Every directory has an index file named after it (`<folder>/<folder>.md`; the repository root keeps `README.md`) stating its responsibility and what belongs (and does not belong) in it.
- Every reusable unit documents its purpose, inputs/outputs and usage example.
- Decisions with lasting impact get an ADR ([decisions/](../decisions/decisions.md)).
- Docs live next to what they describe and change in the same commit as the code.
- Write for a newcomer: start with purpose, then usage, then details.

## 5. Dependency management

- Add a dependency only when it removes significant, non-trivial work **and** is actively maintained, widely used, license-compatible and reasonably sized.
- Prefer platform features (native HTML elements, CSS, Web APIs) and the framework's first-party packages.
- One library per concern (one CSS framework, one date library, one state approach).
- Pin with a lockfile; commit it. Use caret ranges for tooling, tilde or exact for runtime libraries with a history of breaking minors.
- Update regularly (at least monthly security patches, framework majors within two releases).
- Remove dependencies that are no longer imported.
- Record every non-default runtime dependency and its reason in the architecture proposal.

## 6. Definition of done (any change)

- [ ] Builds without errors or new warnings.
- [ ] Lint and format checks pass.
- [ ] Tests added/updated and passing.
- [ ] Loading, empty, error and success states handled (for async UI).
- [ ] Works at small, medium and large widths; no horizontal scroll at 320 px.
- [ ] Keyboard operable, visible focus, labels and names present, contrast met.
- [ ] Works in light and dark themes and in each supported text direction.
- [ ] Uses design tokens; no hard-coded colors, spacing or z-index.
- [ ] Documentation and `project.config.yaml` updated; deviations recorded.
