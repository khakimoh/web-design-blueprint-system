# placeholder-feature/services/

| File | Role |
| --- | --- |
| [item-api.ts](item-api.ts) | `ItemApi` — stateless HTTP client. Base URL from `APP_CONFIG`; `toItem()` normalizes untrusted responses (drops entries without id, defaults, status whitelist). |
| [item-api.spec.ts](item-api.spec.ts) | Mapper tests + HTTP test with `provideHttpClientTesting()`. |
| [item-store.ts](item-store.ts) | `ItemStore` — signal state with `LoadState`, derived `items`/`isEmpty`/`selected`, cancellation of superseded loads, save state with duplicate-submit protection. |

Both use `@Service({ autoProvided: false })` and are provided in the feature route, so they
live only while the feature is active.
