# placeholder-detail/

`PlaceholderDetail` — presentational component.

- `item = input.required<Item>()`, `active = input(false)`, `selectItem = output<string>()`.
- Bootstrap card markup; status badge uses subtle theme utilities whose contrast is checked at
  compile time; selected state is a border change (not color only) with `aria-pressed`.
- Component SCSS uses only `@use "abstracts" as ds` tokens and mixins.
- Unit test: [placeholder-detail.spec.ts](placeholder-detail.spec.ts) (Vitest + TestBed,
  zoneless `whenStable`, DOM queries by role/content).
