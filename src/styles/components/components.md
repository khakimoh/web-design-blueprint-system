# styles/components/

Global, framework-agnostic styles for UI patterns that Bootstrap lacks. Framework components
(e.g. Angular's `EmptyState`) render this markup instead of duplicating styles.

| File | Pattern |
| --- | --- |
| [_empty-state.scss](_empty-state.scss) | `.ds-empty-state` for empty and error states (golden example of a reusable SCSS component style) |

Add a pattern here only when it is generic and not available in Bootstrap. Naming:
`.ds-<block>__<element>`, modifiers via `data-*` attributes; tokens only; nesting ≤ 2.
