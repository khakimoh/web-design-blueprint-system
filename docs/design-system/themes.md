# Theme Architecture

## 1. Tokens versus themes

- **Design tokens** are the scales and the semantic *names* (the contract).
- A **theme** is a complete set of *values* for the semantic color names.
- Static tokens (spacing, type, radius, motion, z-index) do not change per theme. Only semantic colors (and the shadow base color) do.

## 2. Built-in and custom themes

| Theme | Source | Notes |
| --- | --- | --- |
| `light` | [`themes/_light.scss`](../../src/styles/themes/_light.scss) | Default. Brand seeds used exactly. |
| `dark` | [`themes/_dark.scss`](../../src/styles/themes/_dark.scss) | Surfaces lighten as they rise; brand uses lighter steps. |
| project themes | `$custom-themes` in `config/_project.scss` | Extend `light` or `dark` and override selected tokens. |

The registry ([`themes/_index.scss`](../../src/styles/themes/_index.scss)) merges built-ins,
`$semantic-overrides` and custom themes, then **validates** each theme: every semantic key
present, no unknown keys, and contrast pairs above their minimums.

```scss
// config/_project.scss
$enabled-themes: ("light", "dark");
$default-theme: "light";
$semantic-overrides: (
  "light": ("background": #fafaf9, "surface-subtle": #f5f5f4),
);
$custom-themes: (
  "high-contrast": ("extends": "light", "tokens": (
    "text-secondary": #1a1a1a,
    "border": #4a4a4a,
  )),
);
```

## 3. Runtime switching

Each theme is emitted as CSS custom properties:

```css
:root, [data-bs-theme="light"] { color-scheme: light; --ds-color-background: …; … }
[data-bs-theme="dark"]          { color-scheme: dark;  --ds-color-background: …; … }
```

- The active theme is selected by the attribute named in `$theme-attribute` on `<html>`.
  The default, `data-bs-theme`, is the attribute Bootstrap 5.3 uses for color modes, so **one attribute drives both** systems.
- Themes can be scoped: putting `data-bs-theme="dark"` on any element themes that subtree.
- The application stores the user's choice (`light`, `dark`, or `system`) and resolves `system` with `matchMedia('(prefers-color-scheme: dark)')`. See the `ColorModeStore` golden example in `src/app/core/services/`.
- To avoid a flash of the wrong theme, set the attribute before first paint with a tiny inline script in `index.html` (reads the stored preference); keep it in sync with the store.

## 4. Bootstrap integration

[`vendors/bootstrap/_bridge.scss`](../../src/styles/vendors/bootstrap/_bridge.scss) redefines
Bootstrap's runtime variables (`--bs-body-bg`, `--bs-border-color`, `--bs-*-text-emphasis`, …)
for every theme from the same semantic tokens. There is one theme system; Bootstrap consumes it.

**Limitation:** Bootstrap compiles button/alert variants from static colors, so the brand
primary/secondary are compile-time values. Runtime themes should vary neutrals and surfaces.
A different brand hue per tenant requires a separate build (or custom components that use
`--ds-color-primary`).

## 5. Adding a theme — checklist

- [ ] Purpose stated (accessibility, sub-brand, kiosk/print…) in `project.config.yaml` → `design.themes.custom`.
- [ ] Added to `$custom-themes`, extending the closest built-in.
- [ ] Style build passes with no contrast warnings.
- [ ] UI reviewed with the theme applied (all states, both directions if applicable).
- [ ] Theme switcher exposes it if users may choose it.
