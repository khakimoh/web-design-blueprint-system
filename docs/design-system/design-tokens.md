# Design Tokens

Design tokens are named design decisions (a color, a size, a duration). They are
the only place raw values appear.

## 1. Canonical source

```text
src/styles/config/_project.scss   project inputs (brand seeds, fonts, shape, density, themes)
            │
            ▼
src/styles/tokens/                canonical token definitions (Sass maps, no CSS output)
            │
   ┌────────┼──────────────────────────────┐
   ▼        ▼                              ▼
themes/   base/_root.scss               vendors/bootstrap/
(semantic  (CSS custom properties        (Bootstrap Sass variables
 values)    --ds-* at runtime)            + --bs-* bridge)
```

- **Sass token maps are the single source of truth.** CSS custom properties and Bootstrap variables are *generated* from them; never edit generated values or redefine a token elsewhere.
- Tokens are compile-time Sass values *and* runtime CSS custom properties. Use custom properties (`var(--ds-…)` or `ds.color-token()`) for anything that changes per theme; use Sass values (`ds.space(4)`) for static scales.

## 2. Three levels

| Level | What | Where | Example | Used by |
| --- | --- | --- | --- | --- |
| **1. Primitive** | Raw values with no meaning | `tokens/_palette.scss`, scale maps in `tokens/*` | `palette("neutral", 600)`, `$spacing` | Themes and token definitions only |
| **2. Semantic** | A purpose | `tokens/_semantic.scss` (names) + `themes/*` (values) | `--ds-color-text-secondary`, `space("stack-md")` | All components and layouts |
| **3. Component** | A decision for one component family | `tokens/_components.scss` | `component-token("card", "padding")` | That component (and the Bootstrap adapter) |

### Which level does a new token belong to?

1. Is it a raw value with no purpose yet (a new palette step, a new scale value)? → **Primitive**. Rare; scales are closed.
2. Does it express a purpose that more than one component shares (a surface, a text emphasis, a status)? → **Semantic**.
3. Is it specific to one component *and* shared by every instance of it (button padding, card radius)? → **Component**. It must reference semantic or scale tokens, never raw values.
4. Is it specific to one place in one project? → **Not a token.** Use existing tokens; if impossible, document the exception in the component.

## 3. Naming

```text
--ds-<category>-<role>[-<variant>][-<state>]
```

| Category | Pattern | Examples |
| --- | --- | --- |
| color | `color-<role>[-<variant>][-<state>]` | `color-primary`, `color-primary-hover`, `color-on-primary`, `color-danger-subtle`, `color-text-secondary` |
| space | `space-<n>` (n × 4px) | `space-4` (16px) |
| radius | `radius-<size>` | `radius-md`, `radius-pill` |
| font | `font-family-<role>`, `font-size-<size>`, `font-weight-<name>`, `line-height-<name>` | `font-size-lg` |
| shadow | `shadow-<size>` | `shadow-md` |
| z | `z-<layer>` | `z-modal` |
| motion | `duration-<speed>`, `easing-<curve>` | `duration-fast`, `easing-enter` |
| control | `control-height-<size>` | `control-height-md` |

Rules: lowercase, kebab-case, no appearance words (`blue`, `big`) at the semantic level,
states last (`-hover`, `-active`, `-disabled`), `on-<x>` for content placed on `<x>`.

## 4. Accessing tokens

In any stylesheet (including framework component styles):

```scss
@use "abstracts" as ds;

.panel {
  padding: ds.space(5);                         // static scale value
  border-radius: ds.radius("container");        // role → scale
  background: ds.color-token("surface");        // var(--ds-color-surface), themeable
  box-shadow: ds.shadow("card");                // role → var(--ds-shadow-sm)
  z-index: ds.z("sticky");
  @include ds.type-role("body-sm");
  @include ds.media-up("md") { padding: ds.space(6); }
}
```

Accessor functions raise a compile error on unknown keys, so typos never ship.
In plain CSS or inline styles use the custom properties directly: `var(--ds-space-4)`.

## 5. Customizing per project

Projects change **inputs**, never the token architecture:

| Want to change | Edit in `config/_project.scss` |
| --- | --- |
| Brand colors | `$brand-primary`, `$brand-secondary`, `$brand-extra` |
| Gray family | `$neutral-seed` |
| Status colors | `$status-seeds` |
| Fonts | `$font-family-*`, `$font-families-by-lang` |
| Type scale | `$font-size-overrides` |
| Roundness | `$radius-scale-factor` |
| Density | `$density` |
| Themes | `$enabled-themes`, `$default-theme`, `$semantic-overrides`, `$custom-themes` |

Project-owned CSS goes in `src/styles/project/`. Changing anything else in `src/styles/`
is a deviation and must be recorded
(see [configuration](../configuration/configuration.md)).

## 6. Extending the token system (blueprint maintainers)

1. Confirm the need is generic (would at least two unrelated projects use it?).
2. Add the token at the right level; semantic colors require a value in **every** theme (the build fails otherwise).
3. Emit it as a custom property if it must be themeable or used outside Sass.
4. Map it into Bootstrap in `vendors/bootstrap/` if Bootstrap has an equivalent variable.
5. Document it here and in the relevant topic doc; add a CHANGELOG entry (minor version).
