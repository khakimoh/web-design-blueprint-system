# RTL and LTR Support

No project is assumed to be LTR. Direction is configured per project
(`design.direction: ltr | rtl | both` in `project.config.yaml`) and set in markup.

## 1. Configuring direction

```html
<!-- LTR -->   <html lang="en" dir="ltr">
<!-- RTL -->   <html lang="fa" dir="rtl">
```

- `lang` and `dir` are set on `<html>` (and updated together when the user switches language).
- Mixed content: wrap opposite-direction fragments with `dir` and `lang`
  (`<span lang="en" dir="ltr">`), use `dir="auto"` for user-generated text, and `<bdi>` for
  inserted values whose direction is unknown (names, search terms).
- Fonts per language come from `$font-families-by-lang` (see [typography.md](typography.md)).

## 2. Authoring rules

- Use **logical properties** everywhere:

  | Instead of | Use |
  | --- | --- |
  | `margin-left`, `padding-right` | `margin-inline-start`, `padding-inline-end` |
  | `left`, `right` | `inset-inline-start`, `inset-inline-end` |
  | `border-left` | `border-inline-start` |
  | `text-align: left` | `text-align: start` |
  | `width` / `height` | `inline-size` / `block-size` (where direction-relevant) |
  | `float: left` | `float: inline-start` (or avoid floats) |

- Avoid `transform: translateX()` for direction-dependent positioning; use logical insets.
- Flexbox and Grid follow direction automatically; do not reverse with `row-reverse` for RTL.
- **Icons:** mirror directional icons (arrows, chevrons, back/forward, progress, "send", lists with bullets on the start side) with `transform: scaleX(-1)` under `:dir(rtl)`; never mirror logos, checkmarks, media controls, clocks, or icons representing real objects.
- **Numbers, code, URLs, email addresses, phone numbers** are always LTR runs; wrap them with `dir="ltr"` inside RTL text.
- Keyboard arrow semantics follow visual direction.

All styles in `src/styles/` follow these rules (enforced by review; logical properties throughout).

## 3. Bootstrap and RTL

Bootstrap 5.3 source uses physical properties (`.ms-3` compiles to `margin-left`), and
its official RTL approach is to post-process the compiled CSS with RTLCSS.

**Recommended approach** (single bundle that supports both directions at runtime):

1. Install `postcss-rtlcss` as a dev dependency **only** if `direction` is `rtl` or `both`.
2. Add a PostCSS configuration the build reads (Angular CLI reads `postcss.config.json` or `.postcssrc.json` from the project or workspace root):

   ```json
   { "plugins": { "postcss-rtlcss": {} } }
   ```

   Default ("combined") mode keeps LTR rules and adds `[dir="rtl"]` overrides only for
   physical properties. The design-system CSS needs no overrides because it is logical.
3. Use Bootstrap's start/end utilities (`ms-*`, `me-*`, `text-start`, `float-end`) — they flip correctly.

Verified for this blueprint: compiling `main.scss` and running `postcss-rtlcss` produces
`[dir="rtl"] .ms-2 { margin-right: … }` overrides for Bootstrap and none for `ds-` classes
(≈ +18 % CSS). RTL-only projects may alternatively use RTLCSS "override" mode to emit
only RTL rules — record that as a project decision.

Not recommended: loading the prebuilt `bootstrap.rtl.css`, because it bypasses token configuration.

## 4. Testing checklist

- [ ] Layout mirrored correctly at xs, md and xl.
- [ ] Off-canvas sidebar enters from the inline-start side.
- [ ] Directional icons mirrored; non-directional icons unchanged.
- [ ] Mixed-direction strings (numbers, Latin terms) display in the right order.
- [ ] Form inputs for email/URL/phone are `dir="ltr"`.
- [ ] Persian/Arabic text has no letter-spacing or uppercase transforms.
