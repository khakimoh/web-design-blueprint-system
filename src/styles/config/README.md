# styles/config/

[`_project.scss`](_project.scss) — the project's design inputs: brand seeds, neutral and status
seeds, font stacks (also per language), type-scale overrides, radius scale factor, density,
theme attribute, enabled/default/custom themes, semantic overrides, contrast-check mode.

It is the single compile-time configuration read by `tokens/` and `themes/`. Because it is a
file (not `@use … with`), every stylesheet — including each Angular component stylesheet —
sees the same values. Mirror `design.*` from `project.config.yaml` here.
