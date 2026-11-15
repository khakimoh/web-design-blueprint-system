# shared/components/modal/

**Guidance only.** Choose one dialog implementation per project and record it:

1. **Native `<dialog>` + `showModal()`** (preferred for simple dialogs): built-in focus
   handling, Escape to close, top-layer rendering. Style it with tokens
   (`overlay` component tokens, `::backdrop` with `--ds-color-overlay-rgb`).
2. **`@angular/cdk/dialog`** for programmatic dialogs with data passing and focus trapping.
3. **`@ng-bootstrap/ng-bootstrap` `NgbModal`** when the project already uses ng-bootstrap.

Requirements regardless of choice: labelled by its title, focus moves in and returns to the
trigger, Escape closes, one primary action, full-screen sheet below `sm`. See
[components.md](../../../../../docs/design-system/components.md#3-specifications).
