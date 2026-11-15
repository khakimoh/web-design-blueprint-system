# styles/abstracts/

The public Sass API. Emits **no CSS**, so any stylesheet can `@use "abstracts" as ds`.

| File | Provides |
| --- | --- |
| [_index.scss](_index.scss) | Forwards tokens, color math, functions, breakpoints, mixins |
| [_color.scss](_color.scss) | `generate-palette()`, `contrast-ratio()`, `best-on()`, `rgb-triplet()` (pure color math) |
| [_functions.scss](_functions.scss) | Token accessors: `space()`, `radius()`, `font-size()`, `z()`, `shadow()`, `duration()`, `color-token()`, `component-token()`, `fluid()` … |
| [_breakpoints.scss](_breakpoints.scss) | `media-up()`, `media-down()`, `media-between()`, `container-up()` |
| [_mixins.scss](_mixins.scss) | `focus-ring`, `visually-hidden`, `truncate`, `line-clamp`, `type-role`, `transition`, `motion-safe`, `forced-colors`, `target-size` |

Accessors raise compile errors on unknown keys.
