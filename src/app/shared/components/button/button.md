# shared/components/button/

`Button` — golden example of wrapping a **native element** without hiding it.

- Selector `button[appButton]`: the host *is* the native `<button>`, so `type`, form
  submission, `name`, `aria-*` and every native attribute keep working.
- Adds only what Bootstrap does not: a `loading` state (spinner, `aria-busy`, disabled while
  loading, status text for screen readers) and typed `variant`/`size` inputs mapped to
  Bootstrap classes.

```html
<button appButton type="submit" variant="primary" [loading]="saving()" loadingLabel="Saving">Save</button>
```

Files: [button.ts](button.ts), [button.html](button.html). No stylesheet — Bootstrap classes suffice.
