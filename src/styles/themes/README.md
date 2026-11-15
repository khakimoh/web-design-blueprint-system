# styles/themes/

Semantic color values per theme and the theme registry.

- [_light.scss](_light.scss), [_dark.scss](_dark.scss) — map every semantic key to primitives.
- [_index.scss](_index.scss) — merges built-ins, `$semantic-overrides` and `$custom-themes`;
  validates every theme against `tokens/_semantic.scss` (missing/unknown keys fail the build);
  checks WCAG contrast pairs; emits `--ds-color-*` under `:root, [data-bs-theme="…"]`.

Projects never edit these files — use `config/_project.scss`. Docs:
[themes.md](../../../docs/design-system/themes.md).
