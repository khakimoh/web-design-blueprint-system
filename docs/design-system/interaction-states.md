# Interaction and State Standards

Every interactive component defines these states. Visual changes use semantic tokens
and motion tokens (`duration-fast`, `easing-standard`).

| State | Trigger | Visual standard | Semantics / keyboard |
| --- | --- | --- | --- |
| **Default** | — | Base tokens of the component | Native element or correct role |
| **Hover** | Pointer over | Background/border shifts one step (`*-hover` tokens) or subtle surface change; cursor reflects action. Never the only affordance. | Wrapped in `@media (hover: hover)` when it would stick on touch |
| **Focus (visible)** | Keyboard focus | `focus-ring` token: 3 px outline, 2 px offset (Bootstrap components: equivalent ring). Always visible, never removed without replacement, not obscured by sticky elements (WCAG 2.4.11). | `:focus-visible`; tab order follows visual order |
| **Active (pressed)** | Pointer down / Enter / Space | `*-active` token (one step darker), no layout shift | Buttons respond to Enter and Space |
| **Selected / current** | Chosen item, current page | Persistent indicator beyond color: weight change, border/indicator bar, check icon | `aria-selected`, `aria-current`, `aria-pressed` or `checked` as appropriate |
| **Disabled** | Not available | `text-disabled`, `surface-sunken`; no hover effects; cursor `not-allowed` | Native `disabled` (removes from tab order). Prefer explaining *why* nearby; consider keeping focusable with `aria-disabled="true"` when the reason must be discoverable. |
| **Loading** | Async action in progress | Spinner in place of/next to the label, width preserved; content areas use skeletons | `aria-busy="true"` on the region; a `role="status"` message; prevent duplicate submissions |
| **Success** | Action completed | `success` tokens; transient confirmation (toast) or inline message | `role="status"` (polite) |
| **Warning** | Needs attention, not blocking | `warning-subtle` background + `warning-text` + icon | Text explains consequence |
| **Error / invalid** | Validation failed or action failed | `danger` border on the field, `danger-text` message below with icon; summary at the top for long forms | `aria-invalid="true"`, message linked via `aria-describedby`; focus moves to the first invalid field (or the summary) on submit |

## Rules

- **Never rely on color alone** to communicate state; add text, icon, shape or weight.
- **Order of precedence** when states combine: disabled > loading > error > selected > active > focus > hover.
- **No layout shift** between states (keep borders present but transparent in default if a border appears on focus/selected).
- **Validation timing:** validate on blur or on submit, not on every keystroke; clear an error as soon as the input becomes valid.
- **Preserve user input** after any error.
- **Toasts** are for non-critical confirmations; they do not steal focus, remain ≥ 5 s, can be dismissed, and pause on hover/focus. Critical errors are inline.

## Keyboard interaction summary

| Pattern | Keys |
| --- | --- |
| Button | Enter, Space |
| Link | Enter |
| Checkbox / switch | Space |
| Radio group | Arrow keys move and select; Tab enters/leaves the group |
| Tabs | Arrow keys between tabs; Home/End; Tab moves into the panel |
| Menu / dropdown | Enter/Space/Arrow Down opens; arrows move; Escape closes and restores focus |
| Dialog | Tab cycles inside; Escape closes; focus returns to the trigger |
| Combobox / listbox | Arrows move; Enter selects; Escape collapses |

In RTL layouts, Left/Right arrow semantics follow the visual direction (Right = previous in RTL tab lists).
Follow the WAI-ARIA Authoring Practices Guide pattern for anything not listed.
