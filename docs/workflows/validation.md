# Workflow — Testing and Validation

Run before declaring any task done. Report each check as **passed**, **failed** (with
output), or **not run** (with reason). Never report a check as passed without running it.

## 1. Automated checks (Angular profile)

| Check | Command | Pass criteria |
| --- | --- | --- |
| Build | `ng build` | exits 0; no new warnings; budgets not exceeded |
| Lint | `ng lint` | no errors (warnings reviewed) |
| Format | `npx prettier --check .` | no differences |
| Unit tests | `ng test --watch=false` | all pass |
| E2E (if configured) | `npx playwright test` | all pass |
| Accessibility scan (if configured) | axe in e2e | no serious/critical violations |
| Config | `npm --prefix <blueprint> run validate:config -- $PWD/project.config.yaml` | valid |

## 2. Manual checks

| Area | How |
| --- | --- |
| **Responsiveness** | Browser devtools at 320, 768 and 1280 px widths; no horizontal page scroll; navigation usable at each size |
| **Keyboard** | Tab through the changed screens: logical order, visible focus, all actions reachable, Escape closes overlays, focus restored |
| **Screen reader smoke test** (per release) | Landmarks, headings, form labels and live announcements make sense |
| **Zoom / reflow** | 200 % zoom and 320 px width remain usable |
| **Themes** | Toggle light/dark (and custom themes); no unreadable text or invisible borders |
| **Direction** (if `rtl`/`both`) | `dir="rtl"`: mirrored layout, correct icons, mixed-direction text |
| **States** | Force loading (throttle network), empty (no data) and error (offline / failing endpoint) states |
| **Design consistency** | Checklist in [design-system-application.md](design-system-application.md#design-consistency-review-checklist) |
| **Directory organization** | New files in the right layer; READMEs present for new folders; no cross-feature imports |

## 3. Blueprint repository (maintainers)

```bash
npm run validate     # styles + config schema + docs integrity
```

There is no application build in this repository; do not claim one.

## 4. Report template

```text
Validation
- Build: passed (ng build, 0 warnings)
- Lint: passed
- Tests: passed (42 tests)
- Responsive: checked 320/768/1280 — passed
- Keyboard: passed
- Themes: light/dark checked — passed
- RTL: not applicable (direction: ltr)
- E2E: not run (not configured)
```
