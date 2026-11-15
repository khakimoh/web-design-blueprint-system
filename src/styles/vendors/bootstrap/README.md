# styles/vendors/bootstrap/

Bootstrap 5.3 configured from design tokens.

| File | Role |
| --- | --- |
| [_index.scss](_index.scss) | `@use "bootstrap/scss/bootstrap" with (…)` — colors, typography, spacing (4 px keys), breakpoints, containers, radius, shadows, z-index, motion, focus, component tokens, Utility API additions |
| [_helpers.scss](_helpers.scss) | Token → Bootstrap format helpers (control padding from height tokens, spacer map, unquoted keys, fluid heading sizes) |
| [_bridge.scss](_bridge.scss) | Re-emits Bootstrap runtime variables (`--bs-body-bg`, `--bs-border-color`, `--bs-*-text-emphasis` …) for every theme from the design-system themes |

Sass rejects configuration of variables Bootstrap does not define, so typos fail the build.
Docs: [Bootstrap profile](../../../../docs/technologies/bootstrap/README.md), ADR-0003.
