# Typography System

Tokens: [`tokens/_typography.scss`](../../src/styles/tokens/_typography.scss).

## 1. Font families

| Token | Default | Configure with |
| --- | --- | --- |
| `--ds-font-family-base` | system UI stack | `$font-family-base` |
| `--ds-font-family-heading` | same as base | `$font-family-heading` |
| `--ds-font-family-mono` | system monospace stack | `$font-family-mono` |
| per language | none | `$font-families-by-lang: ("fa": (…))` |

- The default is the **system font stack**: zero download cost, native look.
- When web fonts are required, **self-host** them (e.g. via `@fontsource-variable/*` packages or files in the project's assets) with `font-display: swap`, subset to the scripts used, and preload only the primary weight.
- Declare at most two families (base + optional heading) plus mono.

### Persian and English content

No project is forced to use specific fonts. For mixed-script projects configure a stack
per language; `:lang()` switches the font for any subtree with a `lang` attribute:

```scss
$font-family-base: (Inter, system-ui, sans-serif);
$font-families-by-lang: (
  "fa": ("Vazirmatn", Tahoma, system-ui, sans-serif),
);
```

```html
<html lang="fa" dir="rtl"> … <span lang="en" dir="ltr">API</span> … </html>
```

Rules for Arabic-script languages (fa, ar, ur, ps, ckb):

- never apply `letter-spacing` or `text-transform` (they break letter joining) — `type-role()` resets both automatically for these languages;
- prefer `line-height-relaxed` (1.75) for body text;
- choose fonts with good Persian glyph coverage, including Persian digits (۰–۹), and decide per project whether numbers display in Persian or Latin digits (format with `Intl.NumberFormat('fa-IR')` when Persian digits are wanted — never by font substitution);
- avoid italics (most Arabic-script fonts have none); use weight for emphasis.

## 2. Scale

Fixed rem steps (1 rem = the user's browser default, normally 16 px; never set a px root size):

| Key | rem | px | Typical use |
| --- | --- | --- | --- |
| `xs` | 0.75 | 12 | captions, overlines |
| `sm` | 0.875 | 14 | secondary UI text, labels, table cells in dense layouts |
| `md` | 1 | 16 | body text, inputs |
| `lg` | 1.125 | 18 | lead paragraphs, h5 |
| `xl` | 1.25 | 20 | h4 |
| `2xl` | 1.5 | 24 | h3 |
| `3xl` | 1.875 | 30 | h2 |
| `4xl` | 2.25 | 36 | h1 |
| `5xl` | 3 | 48 | display (medium screens) |
| `6xl` | 3.75 | 60 | display |

Weights: `regular 400`, `medium 500`, `semibold 600`, `bold 700`.
Line heights: `tight 1.2` (large headings), `snug 1.35` (small headings, labels), `normal 1.5` (body, UI), `relaxed 1.75` (long-form, Arabic-script body).
Letter spacing: `tight -0.015em` (display/h1), `normal 0`, `wide 0.04em` (overline).

Projects may adjust individual steps with `$font-size-overrides`; they may not add ad-hoc sizes.

## 3. Text roles

Components use **roles**, not raw sizes:

| Role | Size | Weight | Line height | Notes |
| --- | --- | --- | --- | --- |
| `display` | 4xl → 6xl (fluid) | bold | tight | hero headings only |
| `h1` | 3xl → 4xl (fluid) | bold | tight | one per page |
| `h2` | 2xl → 3xl (fluid) | semibold | tight | |
| `h3` | xl → 2xl (fluid) | semibold | snug | |
| `h4`, `h5`, `h6` | xl, lg, md | semibold | snug | |
| `body-lg` | lg | regular | relaxed | lead text |
| `body` | md | regular | normal | default |
| `body-sm` | sm | regular | normal | secondary text |
| `label` | sm | medium | snug | form labels, buttons in dense UIs |
| `caption` | xs | regular | normal | help text, metadata |
| `overline` | xs | semibold | snug | uppercase + wide tracking (Latin only) |
| `code` | sm | regular | normal | monospace |
| numeric | — | — | — | `.ds-numeric`: tabular, lining figures for tables and metrics |

Apply in Sass with `@include ds.type-role("label")`, or in markup with
`.ds-type-label`. Keep heading **levels** semantic (document outline) and change their
**look** with a role class: `<h2 class="ds-type-h4">`.

## 4. Responsive typography

- Roles with a minimum size are **fluid**: `clamp(min, intercept + slope·vw, max)` between 320 px and 1200 px viewports. The `vw` term is combined with rem so user zoom still works (WCAG 1.4.4).
- Body text does not scale with the viewport; it stays at `md`.
- Bootstrap headings (`h1`–`h6`, `.h1`–`.h6`) are configured from the same roles; Bootstrap's RFS is disabled to avoid a second fluid system.

## 5. Rules

- Line length 45–75 characters for reading text (`.ds-measure` = 68ch).
- Minimum body size 16 px; minimum UI text 12 px (`xs`) and only for non-essential metadata.
- Do not use weight below 400 or color below `text-tertiary` for text users must read.
- Underline links in running text; color alone is not enough.
