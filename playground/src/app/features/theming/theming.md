# playground/src/app/features/theming/

Theme page: page-level theme switching (light, dark, system) and side-by-side previews that scope
`data-bs-theme` to a subtree, plus how projects configure themes.

- Files: `theming-page.ts/.html`
- Data source: `PreferencesStore` for the page theme; previews set `data-bs-theme` on their own element.
