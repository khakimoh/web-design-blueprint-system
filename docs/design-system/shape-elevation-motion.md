# Shape, Elevation, Motion and Iconography

## 1. Border radius

Tokens: [`tokens/_shape.scss`](../../src/styles/tokens/_shape.scss).

| Key | Default | Role (use the role, not the key) |
| --- | --- | --- |
| `none` | 0 | |
| `xs` | 2 px | |
| `sm` | 4 px | |
| `md` | 6 px | `control` — buttons, inputs, selects |
| `lg` | 8 px | `container` — cards, panels, alerts |
| `xl` | 12 px | `overlay` — dialogs, popovers, menus |
| `2xl` | 16 px | large media, hero panels |
| `pill` | 50rem | `badge`, chips, pill buttons |
| `circle` | 50 % | avatars, icon buttons |

`$radius-scale-factor` (0 / 0.5 / 1 / 1.5 ↔ `sharp` / `subtle` / `default` / `rounded` in
`project.config.yaml`) scales every step except `pill` and `circle`, so a project's roundness is one decision.
Nested radii: inner radius = outer radius − padding (never larger than the outer).

Border widths: `thin` 1 px (default), `medium` 2 px (selected/emphasis), `thick` 4 px (accent bars).

## 2. Shadows and elevation

Tokens: [`tokens/_elevation.scss`](../../src/styles/tokens/_elevation.scss). Shadows reference
`--ds-color-shadow-rgb`, so one definition works in light and dark themes.

| Token | Role |
| --- | --- |
| `xs` | subtle separation (inputs on tinted surfaces) |
| `sm` | `card`, `sticky` headers |
| `md` | hovered/raised cards |
| `lg` | `dropdown`, `popover`, off-canvas panels |
| `xl` | `modal` |
| `inset` | pressed/sunken controls |

In dark themes, elevation is communicated mainly by **lighter surfaces**
(`surface` → `surface-raised`); shadows are secondary. Do not stack shadows with borders
of strong contrast on the same element.

## 3. Z-index layers

Never write raw z-index numbers. Use `ds.z("<layer>")` or `var(--ds-z-<layer>)`:

`base 0` < `raised 1` < `dropdown 1000` < `sticky 1020` < `fixed 1030` < `drawer-backdrop 1040` <
`drawer 1045` < `modal-backdrop 1050` < `modal 1055` < `popover 1070` < `tooltip 1080` < `toast 1090`

The values match Bootstrap's scale (and configure it), so Bootstrap components and custom
components interleave correctly. Within a component, prefer creating a stacking context
(`isolation: isolate`) and using `raised` over global layers.

## 4. Motion

Tokens: [`tokens/_motion.scss`](../../src/styles/tokens/_motion.scss).

| Duration | Value | Use |
| --- | --- | --- |
| `instant` | 0 ms | state changes that must not animate |
| `fast` | 120 ms | hover, color, opacity |
| `base` | 200 ms | toggles, small movements |
| `slow` | 320 ms | drawers, panels, larger surfaces |
| `slower` | 480 ms | page-level transitions (sparingly) |

| Easing | Use |
| --- | --- |
| `standard` | most transitions |
| `enter` (decelerate) | elements appearing |
| `exit` (accelerate) | elements leaving |
| `linear` | progress, spinners, opacity loops |

Rules:

- Motion explains change (where something came from, what changed); it is never decoration only.
- Animate `opacity` and `transform` where possible; list properties explicitly (`ds.transition((opacity, transform))`), never `all`.
- Under `prefers-reduced-motion: reduce` every duration token becomes `0ms` automatically; essential motion (progress) may remain but must not move across the screen.
- No auto-playing motion longer than 5 s without a pause control (WCAG 2.2.2).

## 5. Iconography

- **One icon set per project**, chosen in the architecture proposal (prefer open-licensed sets with outline + filled variants and good coverage, e.g. Bootstrap Icons when using Bootstrap). Import icons individually or via an SVG sprite; do not load icon fonts.
- Sizes from `icon-size()`: 16 px inline with `sm` text, 20 px with `md` text and in buttons, 24 px standalone.
- Icons inherit color (`fill/stroke: currentColor`).
- **Decorative icons** next to text: `aria-hidden="true"`.
- **Icon-only buttons:** an accessible name (`aria-label` or visually hidden text) and a tooltip for sighted users; target ≥ 24 px (44 px on touch-first UIs).
- Directional icons (arrows, chevrons, "back") are mirrored in RTL; non-directional icons (search, settings, media "play") are not. See [rtl-ltr.md](rtl-ltr.md).
