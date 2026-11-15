# Architecture Decision Records

Decisions that shape the blueprint, with their context and consequences. Template:
[templates/adr.md](../../templates/adr.md). Projects keep their own ADRs in their own
`docs/decisions/`.

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](0001-five-layer-architecture.md) | Organize the blueprint in five layers; reference docs, copy only `src/styles` | accepted |
| [0002](0002-sass-tokens-canonical-source.md) | Sass token maps seeded from one project file are the canonical token source | accepted |
| [0003](0003-bootstrap-via-sass-module-configuration.md) | Integrate Bootstrap 5.3 through `@use … with` and a runtime theme bridge | accepted |
| [0004](0004-angular-modern-defaults.md) | Angular 22 defaults: standalone, zoneless, signals, OnPush, 2025 file names, Vitest | accepted |
| [0005](0005-rtl-logical-properties-and-rtlcss.md) | RTL via logical properties plus RTLCSS post-processing for Bootstrap | accepted |
| [0006](0006-audit-as-reference-not-standard.md) | Treat the engineering audit as reference input, not as the standard | accepted |

## When to write an ADR

- Choosing between technologies or integration methods.
- Changing a convention projects rely on (naming, structure, token architecture).
- Accepting a known limitation.

Status values: proposed → accepted → superseded/deprecated. Superseded ADRs are kept and
link to their replacement.
