# styles/base/

Global CSS output that every page needs.

| File | Entry | Emits |
| --- | --- | --- |
| [_root.scss](_root.scss) | both | `--ds-*` custom properties (static tokens), per-language font stacks, theme blocks, reduced-motion overrides |
| [_global.scss](_global.scss) | both | `:focus-visible` ring, `::selection`, `<mark>`, reduced motion, `.ds-skip-link` |
| [_typography.scss](_typography.scss) | both | `.ds-type-<role>` classes, `.ds-numeric` |
| [_reset.scss](_reset.scss) | standalone | Minimal modern reset (Bootstrap's Reboot replaces it) |
| [_headings.scss](_headings.scss) | standalone | Heading element defaults from type roles |

Element rules use `:where()` so components can override them without specificity fights.
