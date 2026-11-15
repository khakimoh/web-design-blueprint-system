# Spacing and Sizing

Tokens: [`tokens/_spacing.scss`](../../src/styles/tokens/_spacing.scss),
[`tokens/_sizing.scss`](../../src/styles/tokens/_sizing.scss).

## 1. Spacing scale (4 px base)

The key is the number of 4 px units: `space(4)` = 1rem = 16 px.

| Key | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 |
| --- | - | - | - | - | - | - | - | - | -- | -- | -- | -- | -- |
| px  | 0 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96 |

**Why 4 px:** fine enough for dense UI (icon gaps, compact controls), coarse enough to
keep rhythm; aligns with common icon sizes (16/20/24) and control heights (32/40/48).
The scale becomes sparse above 24 px on purpose: large gaps should differ visibly.

### Semantic aliases

| Alias | Value | Use |
| --- | --- | --- |
| `inline-xs` / `inline-sm` | 1 / 2 | icon ↔ label; between inline controls |
| `stack-xs` / `stack-sm` / `stack-md` / `stack-lg` | 1 / 2 / 4 / 8 | label ↔ input; within a group; between form fields/groups; between blocks |
| `section-sm` / `section` | 10 / 16 | vertical space between page sections (small / large screens) |
| `gutter-sm` / `gutter` | 4 / 6 | page side padding (small / large screens), grid gutter |

`ds.space("stack-md")` reads better than `ds.space(4)` where the purpose is a stack gap.

### With Bootstrap

Bootstrap spacing utilities use the **same keys**: `.p-4` = 16 px, `.gap-2` = 8 px,
`.mb-6` = 24 px. Available keys: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16. (This differs from
stock Bootstrap, where `.p-4` = 24 px — always think in 4 px units.)

## 2. When a custom value is justified

Use scale values for padding, margin, gap and positioning. A custom value is acceptable only when:

- it is derived from another dimension (e.g. `calc(header-height + space(2))`);
- it aligns optical details smaller than 4 px (1–2 px borders/nudges);
- it comes from intrinsic content (image aspect ratios, `ch`-based widths).

Write custom values as expressions of tokens where possible and add a comment.
Never use a custom value to "fix" alignment; fix the structure.

## 3. Sizing

| Group | Tokens | Values |
| --- | --- | --- |
| Control heights | `control-height("sm" / "md" / "lg")` | 32 / 40 / 48 px (comfortable); compact 28/36/44; spacious 36/44/52 |
| Pointer targets | `$target-size-min`, `$target-size-touch` | 24 px (WCAG 2.2 AA minimum), 44 px (touch recommendation) |
| Icons | `icon-size("xs"…"xl")` | 12 / 16 / 20 / 24 / 32 px |
| Content widths | `content-width("measure" / "narrow" / "default" / "wide")` | 68ch / 40rem / 72rem / 90rem |
| Containers | `$container-max-widths` | sm 540, md 720, lg 960, xl 1140, xxl 1320 px |
| Shell | `layout-size("header-height" / "sidebar-width" / "sidebar-width-collapsed")` | 4rem / 16rem / 4.5rem |

**Density** (`$density` in project config) changes control heights and component padding
together, so a "compact" admin tool and a "spacious" marketing site use the same
components and scale.

## 4. Rules

- Width: prefer intrinsic sizing (`max-inline-size`, `min()`, `fr`) over fixed widths.
- Height: avoid fixed heights on text containers; use `min-block-size`.
- Use logical properties (`padding-inline`, `margin-block-start`, `inline-size`) so spacing follows text direction.
- Spacing between siblings belongs to the parent (`gap`) rather than to children's margins.
