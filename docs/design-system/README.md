# Layer 2 — Generic Design System

A brand-neutral foundation for establishing the visual identity of any website.
Each project supplies its brand (colors, fonts, shape, density, themes) through
**one settings file**, [`src/styles/config/_project.scss`](../../src/styles/config/_project.scss),
plus optional project-owned CSS in [`src/styles/project/`](../../src/styles/project/README.md);
the architecture, scales and rules stay the same.

The design system is defined in documentation (this folder) and implemented once,
in SCSS, in [`src/styles/`](../../src/styles/README.md). The SCSS implementation is
framework-agnostic; Bootstrap is an optional consumer (see
[technologies/bootstrap](../technologies/bootstrap/README.md)).

## Documents

| Topic | Document |
| --- | --- |
| Token architecture, levels, naming, canonical source | [design-tokens.md](design-tokens.md) |
| Primitive palettes, semantic colors, component colors, brand customization | [color-system.md](color-system.md) |
| Light, dark and custom themes; runtime switching | [themes.md](themes.md) |
| Font families, type scale, roles, responsive type, Persian/English | [typography.md](typography.md) |
| 4px spacing scale, sizing, control heights, containers | [spacing-and-sizing.md](spacing-and-sizing.md) |
| Breakpoints, containers, grid, flexbox, page regions, responsive patterns | [layout-and-responsive.md](layout-and-responsive.md) |
| Radius, borders, shadows, z-index, motion, iconography | [shape-elevation-motion.md](shape-elevation-motion.md) |
| Component classification and specifications | [components.md](components.md) |
| Default, hover, focus, active, selected, disabled, loading, validation states | [interaction-states.md](interaction-states.md) |
| Right-to-left and left-to-right support | [rtl-ltr.md](rtl-ltr.md) |
| WCAG 2.2 AA requirements | [accessibility.md](accessibility.md) |

## Principles

1. **Tokens, not values.** Components use tokens; raw values exist only in token definitions.
2. **Meaning over appearance.** Semantic names (`text-secondary`, `danger`) survive rebrands; appearance names (`gray-600`) do not.
3. **Systematic scales.** Spacing, type, radius, elevation and motion are closed sets. Off-scale values need a documented reason.
4. **Configurable identity.** Brand values are inputs; nothing in the foundation assumes a brand.
5. **Accessible by construction.** Contrast is checked at compile time; focus, motion and direction are handled globally.
6. **Use, then extend.** Native HTML and the chosen CSS framework come first; custom components fill real gaps.
