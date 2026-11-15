# playground/src/app/core/services/

| File | Service |
| --- | --- |
| `preferences-store.ts` | `PreferencesStore`: theme (light/dark/system) and direction (ltr/rtl), applied to `<html>` (`data-bs-theme`, `dir`, `lang`) and persisted in localStorage |
| `design-tokens.ts` | `DesignTokens`: collects `--ds-*`/`--pg-*` custom properties and class names from the compiled stylesheet; values re-read for the active theme |
| `page-title-strategy.ts` | `<Section> · Design System Playground` document titles |
