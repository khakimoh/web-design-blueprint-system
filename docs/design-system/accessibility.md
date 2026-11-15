# Accessibility (WCAG 2.2 AA)

Target for every project: **WCAG 2.2 Level AA** unless `project.config.yaml` states a higher target.
Accessibility is part of the definition of done, not a later phase.

## 1. Color contrast

| Element | Minimum | Enforced by |
| --- | --- | --- |
| Body text, small text | 4.5:1 | compile-time contrast check on semantic pairs |
| Large text (≥ 24 px, or ≥ 18.66 px bold) | 3:1 | review |
| UI component boundaries, form fields, focus indicators, meaningful icons | 3:1 (1.4.11) | `border-interactive`, `focus-ring` checks |
| Disabled controls | exempt | — |

Never communicate meaning by color alone (1.4.1).

## 2. Keyboard navigation

- Everything operable with a keyboard; no keyboard traps (2.1.1, 2.1.2).
- Tab order follows reading order; no positive `tabindex`.
- A **skip link** to `#main` is the first focusable element (`.ds-skip-link`).
- Custom widgets follow the WAI-ARIA Authoring Practices keyboard patterns (see [interaction-states.md](interaction-states.md)).
- Single-character shortcuts can be turned off or remapped (2.1.4).

## 3. Focus visibility

- Visible focus on every focusable element (2.4.7) using the `focus-ring` token (3 px, 2 px offset, ≥ 3:1).
- Focus is never hidden behind sticky headers/footers (2.4.11) — use `scroll-padding-block-start: var(--ds-header-height)` on the scroll container when the header is sticky.
- After route changes, move focus to the main heading or `<main>` and announce the new page title.
- Dialogs move focus in, trap it, and restore it on close.

## 4. Semantic HTML

- Landmarks: one `<header>`, `<nav>` (labelled when several), one `<main>`, `<footer>`; `<aside>` for complementary content.
- One `h1` per page; heading levels do not skip.
- Lists for lists, tables for tabular data, buttons for actions, links for navigation.
- `lang` on `<html>`, and on fragments in another language (3.1.2).
- Unique, descriptive `<title>` per route (2.4.2).

## 5. Accessible forms

- Every control has a programmatic label (`<label for>`, or `aria-labelledby`); placeholders are not labels.
- Group related controls with `<fieldset>`/`<legend>`.
- Required fields marked in text (not only `*`), plus `required`/`aria-required`.
- Errors: identify the field, describe the problem and how to fix it (3.3.1, 3.3.3); `aria-invalid` + `aria-describedby`.
- Correct `type` and `autocomplete` attributes (1.3.5); do not block paste.
- Do not ask for the same information twice in one process (3.3.7, redundant entry).
- Authentication must not rely on cognitive tests alone; allow paste and password managers (3.3.8).

## 6. Screen reader support

- Accessible names for icon-only controls; decorative images and icons hidden (`alt=""`, `aria-hidden="true"`).
- Dynamic updates announced with live regions: `role="status"` (polite) for results/confirmations, `role="alert"` only for urgent errors.
- State exposed with native attributes or ARIA (`aria-expanded`, `aria-selected`, `aria-current`, `aria-busy`).
- Visually hidden text (`.visually-hidden` / `ds.visually-hidden`) for context that is visually implied.

## 7. Reduced motion and user preferences

- All duration tokens collapse to 0 under `prefers-reduced-motion: reduce`.
- Content reflows without horizontal scrolling at 320 CSS px (1.4.10) and supports 200 % text zoom (1.4.4).
- Text spacing overrides do not break layouts (1.4.12): avoid fixed heights on text containers.
- Forced-colors mode: rely on borders/outlines, not only backgrounds and shadows (`ds.forced-colors` mixin).

## 8. Accessible navigation

- Consistent navigation and help placement across pages (3.2.3, 3.2.6).
- Current location indicated (`aria-current="page"`); breadcrumbs for deep hierarchies.
- Pointer targets ≥ 24 × 24 px (2.5.8); drag interactions have a single-pointer alternative (2.5.7).

## 9. Accessible tables

- `<caption>`, `<th scope="col|row">`; complex headers use `headers`/`id`.
- Sortable columns: header contains a button; `aria-sort` on the sorted `<th>`.
- Do not use tables for layout. Responsive tables keep header association (stacked card layouts repeat labels).

## 10. Alternative descriptions for visual content

- Informative images: concise `alt` describing purpose, not appearance.
- Decorative images: `alt=""` (or CSS backgrounds).
- Complex images (charts, diagrams): short `alt` plus a nearby text summary or data table.
- Video: captions; audio: transcripts; no auto-playing audio.
- SVG icons with meaning: `role="img"` + `<title>` or a labelled parent.

## 11. Verification

| Method | When |
| --- | --- |
| Compile-time contrast check | every style build |
| Linting (framework template accessibility rules) | every commit |
| Automated scan (axe-core in unit/e2e tests or browser extension) | every feature |
| Keyboard-only walkthrough | every feature |
| Screen reader smoke test (NVDA/JAWS on Windows, VoiceOver on macOS/iOS, TalkBack on Android) | every release |
| 200 % zoom and 320 px width | every feature |

Automated tools find roughly a third of issues; manual checks are mandatory.
