# Color System

## 1. Architecture

```text
seed colors (config)  →  primitive palettes (50…950)  →  semantic tokens per theme  →  component tokens
#3366cc                  palette("primary", 700)          --ds-color-text-link          input border, card background
```

### A. Primitive colors

- Generated from seeds by `generate-palette()` in [`abstracts/_color.scss`](../../src/styles/abstracts/_color.scss).
- Steps: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`.
- Each step has a **fixed OKLCH lightness** (97.5 % → 21 %), with chroma reduced towards the extremes. Consequence: the same step has comparable contrast in every palette, so semantic mappings stay accessible when the brand changes.
- Palettes: `neutral`, `primary`, `secondary`, `success`, `warning`, `danger`, `info`, plus any `$brand-extra` palettes.
- Access in Sass: `ds.palette("neutral", 200)`. **Primitives are never used directly in components.**

Equivalent mental model of the generated variables:

```scss
// palette("primary", 50) … palette("primary", 950)
// palette("neutral", 50) … palette("neutral", 950)
```

### B. Semantic colors

Defined by purpose in [`tokens/_semantic.scss`](../../src/styles/tokens/_semantic.scss);
values per theme in `themes/`. Emitted as `--ds-color-<name>`.

| Group | Tokens | Use |
| --- | --- | --- |
| Surfaces | `background`, `surface`, `surface-subtle`, `surface-raised`, `surface-sunken`, `overlay` | Page canvas, cards/panels/inputs, zebra rows/bands, menus/dialogs, wells/disabled fields, backdrops |
| Text | `text-primary`, `text-secondary`, `text-tertiary`, `text-disabled`, `text-inverse`, `text-link`, `text-link-hover` | Body/headings, supporting text, meta/placeholder text, disabled, text on inverse surfaces, links |
| Borders | `border`, `border-subtle`, `border-strong`, `border-interactive` | Dividers and cards, low-emphasis separators, emphasis, **form control boundaries (≥ 3:1)** |
| Brand | `primary`, `primary-hover`, `primary-active`, `on-primary`, `primary-subtle`, `primary-text`, `primary-border` (same set for `secondary`) | Main actions, tinted backgrounds, brand-colored text |
| Feedback | `success`, `warning`, `danger`, `info`, each with `-subtle`, `-text`, `-border` | Status icons/borders, alert backgrounds, status text |
| Interaction | `focus-ring`, `selection-bg`, `highlight-bg`, `shadow` | Focus indicator, text selection, `<mark>`, shadow base |

Pattern for any colored role `<r>`:
`<r>` (solid fill / icon), `<r>-subtle` (tinted background), `<r>-text` (text on `<r>-subtle` or background),
`<r>-border` (border on `<r>-subtle`), `on-<r>` (content on solid `<r>`).

### C. Component-level colors

Only where a component needs a color decision that differs from the semantic
default (e.g. inputs use `border-interactive`, not `border`). Defined in
[`tokens/_components.scss`](../../src/styles/tokens/_components.scss), always as
references to semantic custom properties.

## 2. Brand customization

```scss
// src/styles/config/_project.scss
$brand-primary: #0f766e;     // exact color for primary actions in the light theme
$brand-secondary: #475569;
$brand-extra: ("accent": #c2410c);  // optional additional palettes
$neutral-seed: #64748b;      // cool gray family; use a warmer seed for warm grays
```

What happens automatically:

- the seed is used **exactly** as `primary` in the light theme (buttons show the real brand color);
- hover/active states darken the seed in perceptual (OKLCH) lightness;
- `on-primary` is chosen (white or near-black) by WCAG contrast — a light brand color gets dark text;
- the dark theme uses lighter palette steps for legibility on dark surfaces;
- Bootstrap's `$primary`, `$secondary` and theme maps are configured from the same values.

If a brand color cannot reach the required contrast in some role, the compile-time
contrast check warns (or fails, with `$contrast-check: "error"`). Fix it with
`$semantic-overrides` rather than editing themes.

## 3. Rules

- Use semantic tokens in all component and layout code.
- Never convey meaning by color alone; pair with text or an icon.
- Status colors keep their meaning across projects: green success, amber warning, red danger, blue info.
- Text on colored backgrounds uses the matching `on-*` or `*-text` token.
- Transparent overlays use `rgb(var(--ds-color-overlay-rgb) / <alpha>)`; do not invent rgba values.
- Data visualizations need a separate categorical palette checked for color-vision deficiencies; add it as a project extension, not as semantic tokens.

## 4. Contrast guarantees (checked at compile time)

| Foreground | Background | Minimum |
| --- | --- | --- |
| `text-primary`, `text-secondary` | `background`, `surface` | 4.5:1 |
| `text-tertiary`, `text-link` | `background` | 4.5:1 |
| `on-primary`, `on-secondary` | `primary`, `secondary` | 4.5:1 |
| `*-text` | `*-subtle` | 4.5:1 |
| `border-interactive` | `surface` | 3:1 |
| `focus-ring` | `background` | 3:1 |

Configured by `$contrast-check` (`"warn"` default, `"error"` recommended for CI, `"off"` for experiments).
