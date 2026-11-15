# Component Design Principles

This is a specification, not a component library. It defines how common UI
components must look and behave, and **which implementation source to use**.

## 1. Classification — choose the first source that fits

| Class | Definition | Where it lives | Example |
| --- | --- | --- | --- |
| **1. Native HTML element** | The platform element with design-system styles | Global styles (Reboot/reset + tokens) | `<button>`, `<a>`, `<input>`, `<select>`, `<dialog>`, `<details>`, `<table>` |
| **2. CSS framework component** | Bootstrap markup + classes, configured by tokens | Bootstrap (via `vendors/bootstrap/`) | `.btn`, `.card`, `.alert`, `.badge`, `.form-control`, `.nav-tabs`, `.pagination` |
| **3. Generic reusable component** | Framework component with no domain knowledge, used in ≥ 2 features | `shared/components/` (+ `src/styles/components/` for global CSS) | loading indicator, empty state, button with loading state |
| **4. Project-specific component** | Encodes a feature or domain concept | `features/<feature>/components/` | an item summary card |

Rules:

- Wrap a native/Bootstrap element in a framework component **only** when it adds behaviour, accessibility wiring or a reused composition — not to rename classes.
- Prefer **attribute selectors** for wrappers of native elements (e.g. a component on `button[appButton]`) so native semantics, form participation and attributes are preserved.
- Generic components never import from features and never contain domain words.
- A project-specific component may be promoted to generic once two features need it and its domain words are removed.

## 2. Common anatomy rules (all components)

- Use semantic tokens for color, scale tokens for size; no raw values.
- Implement every applicable state from [interaction-states.md](interaction-states.md).
- Minimum target 24 × 24 px (44 px on touch-first products); spacing between targets counts.
- Logical properties only; icons mirror per [rtl-ltr.md](rtl-ltr.md).
- Accessible name for every interactive element; visible label where possible.

## 3. Specifications

| Component | Source | Specification |
| --- | --- | --- |
| **Button** | `<button class="btn btn-*">`; generic wrapper only for loading state | Variants: primary (one per view region), secondary/outline, link-style, danger. Sizes sm/md/lg = control heights. Label = verb ("Save changes"). Loading: keep width, show spinner, `aria-busy="true"`, disable repeat submission. Never use `<a>` for actions or `<button>` for navigation. |
| **Link** | `<a href>` | Underlined in running text; visible focus; external links indicate new tab only if opened in one (avoid). `aria-current="page"` for current navigation item. |
| **Text input / textarea** | `.form-control` | Visible `<label for>`; help text linked with `aria-describedby`; border `border-interactive` (≥ 3:1); height `control-height md`; placeholder is an example, never the label. Textarea resizes vertically. |
| **Select** | `.form-select` (native) | Native select unless search/multi-select with chips is required (then one vetted library, recorded). |
| **Checkbox / radio** | `.form-check` | Label clickable; radios grouped in `<fieldset>` with `<legend>`; minimum target respected by label padding. |
| **Switch** | `.form-check.form-switch` + `role="switch"` | For immediate on/off settings only; for form submissions use a checkbox. |
| **Card** | `.card` | Container for one topic; radius `container`; padding by density; whole-card click only with one primary link (stretched link pattern), never nested interactive elements inside a clickable card. |
| **Badge** | `.badge` + `text-bg-*` or subtle variants | Short status/count; not interactive; pill radius; meaning not by color alone. |
| **Alert** | `.alert .alert-*` | Inline, persistent messages. `role="alert"` only for urgent, newly inserted messages; otherwise `role="status"` or none. Title + description + optional action. Dismissible only if non-critical. |
| **Modal / dialog** | Native `<dialog>` with `showModal()` (preferred) or Bootstrap modal / framework dialog library | Labelled by its title; focus moves in, is trapped, returns to the trigger; Escape closes; one primary action; destructive confirmations name the object ("Delete 3 items?"). Full-screen below `sm`. |
| **Dropdown / menu** | Bootstrap dropdown (via the framework integration) | Trigger is a button with `aria-expanded`; arrow-key navigation; Escape closes and returns focus. Use a `<select>` instead for form values. |
| **Tabs** | `.nav-tabs` with tab semantics | `role="tablist/tab/tabpanel"`, arrow keys move between tabs, only the active tab in tab order. Tabs switch views of the same context; use links/routes for navigation. |
| **Breadcrumbs** | `.breadcrumb` in `<nav aria-label="Breadcrumb">` | Last item is the current page (`aria-current="page"`, not a link). Separator is decorative (mirrored in RTL). |
| **Pagination** | `.pagination` in `<nav aria-label="Pagination">` | Current page `aria-current="page"`; previous/next have text labels; show total where known. |
| **Tooltip** | Bootstrap tooltip / framework overlay | Supplementary only (never essential info); appears on hover **and** focus; dismissible with Escape; does not contain interactive content (use a popover). |
| **Navigation** | `<nav>` landmark + list of links | Accessible name per nav landmark when more than one exists; current item marked; collapses per [layout-and-responsive.md](layout-and-responsive.md). |
| **Table** | `<table class="table">` | `<caption>` (can be visually hidden), `<th scope>`, numeric columns right-aligned to the inline end with `.ds-numeric`; sortable headers are buttons with `aria-sort`; responsive per layout doc. Row hover is not the only selection indicator. |
| **Loading indicator** | `.spinner-border` / `.placeholder` (skeleton) | `role="status"` + text label; show after ~300 ms delay; skeletons for content areas, spinners for actions; never block the whole page for partial loads. |
| **Empty state** | `.ds-empty-state` | Explains why it is empty and what to do next; one primary action; neutral tone. |
| **Error state** | `.ds-empty-state[data-tone="danger"]` or `.alert-danger` | Says what failed in plain language, what the user can do (retry, go back), and preserves user input. No raw error codes as primary text. |

## 4. Writing a new generic component — checklist

- [ ] No existing native or Bootstrap solution fits (state why in the PR).
- [ ] Inputs named by role, typed; outputs describe user intent.
- [ ] All states implemented and visible in a demo or test.
- [ ] Keyboard and screen-reader behaviour defined (refer to the WAI-ARIA Authoring Practices pattern).
- [ ] Styles use `@use "abstracts" as ds` and tokens only; ≤ 1 nesting level; no `!important`.
- [ ] Works in light/dark and LTR/RTL.
- [ ] Documented in the component folder README with a usage example.
