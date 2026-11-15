# shared/components/loading-spinner/

`LoadingSpinner` — content-area loading indicator.

- Appears after `delay` ms (default 300) so fast responses do not flash.
- `role="status"` with a visible text label; the spinner graphic is `aria-hidden`.
- Uses Bootstrap's `.spinner-border`; no custom styles. Timer cleared via `DestroyRef`.

```html
<app-loading-spinner label="Loading items…" />
```

For skeleton placeholders use Bootstrap's `.placeholder` classes. File: [loading-spinner.ts](loading-spinner.ts).
