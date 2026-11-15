# Layout and Responsive Design

## 1. Breakpoints (mobile-first)

| Name | Min width | Typical devices | Container max width |
| --- | --- | --- | --- |
| `xs` | 0 | small phones | fluid |
| `sm` | 576 px | large phones (landscape) | 540 px |
| `md` | 768 px | tablets | 720 px |
| `lg` | 992 px | small laptops; **sidebar becomes persistent** | 960 px |
| `xl` | 1200 px | desktops | 1140 px |
| `xxl` | 1400 px | large desktops | 1320 px |

The values equal Bootstrap's defaults so Bootstrap knowledge transfers; the
canonical source is `$breakpoints` in [`tokens/_sizing.scss`](../../src/styles/tokens/_sizing.scss),
which also configures Bootstrap.

```scss
@include ds.media-up("md") { … }          // ≥ 768px  (preferred)
@include ds.media-down("lg") { … }        // < 992px
@include ds.media-between("sm", "lg") { … }
@include ds.container-up(30rem) { … }     // container query
```

**Rules:** write base styles for the smallest screen, then add `media-up` layers.
Design for content, not devices: add a breakpoint where the layout breaks. Do not add new
breakpoints per project; if unavoidable, record a deviation. Use **container queries** for
components whose layout depends on their slot (cards in a sidebar vs. main column).

## 2. Layout tools — which one to use

| Need | Use | Not |
| --- | --- | --- |
| Page width and side padding | `.container` / `.container-fluid` (Bootstrap) or `.ds-container` (standalone) | custom wrappers |
| 12-column page layouts | Bootstrap grid `.row` / `.col-md-6` | custom grid classes |
| Card/tile collections | `.ds-auto-grid` (auto-fill, min column width) | breakpoint-specific column counts |
| One-dimensional alignment | flex utilities (`.d-flex .gap-3 .align-items-center`) or `display:flex` | floats, margins between siblings |
| Two-dimensional component internals | CSS Grid in the component stylesheet | nested rows/cols |
| Vertical stacks | `.vstack .gap-*` (Bootstrap) or `display:flex; flex-direction:column; gap` | margins on children |
| Readable text column | `.ds-measure` | fixed widths |
| Page sections | `.ds-section` (responsive vertical padding) | ad-hoc padding per page |
| Application frame | `.ds-shell` (header / sidebar / main / footer) | per-page layout |

One layout system per concern: do not introduce a second grid framework or utility library.

## 3. Page regions

The shell ([`layout/_app-shell.scss`](../../src/styles/layout/_app-shell.scss)) defines the regions:

```text
┌──────────────────────── header (sticky) ───────────────────────┐
├──────────────┬─────────────────────────────────────────────────┤
│ sidebar      │ main (#main, focus target for skip link)        │
│ (≥ lg:       │                                                 │
│  column;     │                                                 │
│  < lg:       ├─────────────────────────────────────────────────┤
│  off-canvas) │ footer                                          │
└──────────────┴─────────────────────────────────────────────────┘
```

- **Header:** brand, primary navigation (≥ lg) or menu toggle (< lg), global actions. Sticky, single row, `header-height`.
- **Navigation:** a `<nav>` landmark with an accessible name; current page marked with `aria-current="page"`.
- **Sidebar:** optional; persistent from `lg`, off-canvas with backdrop below `lg`; closes on Escape and on navigation.
- **Main:** one `<main>` per page, `id="main"`, target of the skip link.
- **Footer:** secondary links, legal text; never essential actions.

Landing pages and content sites may use the shell without a sidebar (the grid collapses
automatically) or a project-specific header; dashboards and admin applications usually use the sidebar.

## 4. Responsive patterns

| Element | Pattern |
| --- | --- |
| **Navigation** | ≥ lg: horizontal nav or persistent sidebar. < lg: menu button (`aria-expanded`, `aria-controls`) opening an off-canvas panel; focus moves into the panel and returns to the button on close. |
| **Typography** | Fluid headings (clamp); body fixed at 16 px. Never shrink body text on mobile. |
| **Forms** | Single column below `md`; labels above inputs; full-width controls on mobile; two columns only for short related fields (≥ md). Inputs ≥ 16 px to avoid mobile zoom. |
| **Tables** | Wrap in `.table-responsive` (horizontal scroll with visible affordance) for data tables; for record lists on mobile, switch to a stacked card layout below `md`. Keep the first column sticky when the table is wide. Never hide columns without offering access to the data. |
| **Cards** | `.ds-auto-grid` with a sensible min width (16–20rem); card internals use container queries when they host media + text side by side. |
| **Media** | `max-inline-size: 100%`, explicit `width`/`height` attributes or `aspect-ratio`, `srcset`/`sizes` for raster images. |
| **Dialogs** | Full-screen sheet below `sm`; centered dialog above. |
| **Spacing** | Page padding `gutter-sm` (16 px) → `gutter` (24 px) from `lg`; section spacing `section-sm` → `section`. |

## 5. Extending in a project

- Need a new layout primitive? First try composition of existing ones. If it is truly reusable, add it under `src/styles/layout/` in the project, prefixed with the project prefix, and propose it upstream.
- Need different container widths? Change `$container-max-widths` only through a recorded deviation.
