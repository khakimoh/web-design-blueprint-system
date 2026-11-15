# placeholder-form/

`PlaceholderForm` — golden example of a form with validation states.

- Typed reactive form (`NonNullableFormBuilder`), required + max-length validators.
- Visible labels, help text, inline errors shown after touch or submit; `aria-invalid` and
  `aria-describedby` (help + error) wired; Bootstrap `.is-invalid` / `.invalid-feedback`.
- On invalid submit, focus moves to the first invalid field.
- Server-side field errors from `AppError.fieldErrors` take precedence over client messages;
  a general error alert uses `role="alert"`.
- Submit button shows the loading state and prevents duplicate submissions; the container
  calls `reset()` after a successful save.
- Unique ids per instance so the form can appear more than once on a page.
