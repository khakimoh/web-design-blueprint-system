# core/config/

Runtime configuration: values that differ per deployment (API base URL, public keys of
third-party services), provided through the `APP_CONFIG` injection token.

Golden example: [app-config.ts](app-config.ts) — typed `AppConfig`, `APP_CONFIG` token and
`provideAppConfig()` which validates and normalizes values (fails fast).

Loading at runtime (build once, deploy many): fetch a JSON file before bootstrapping and
provide it, e.g. in `main.ts`:

```ts
fetch('config.json')
  .then((response) => response.json())
  .then((config) => bootstrapApplication(App, {
    providers: [...appConfig.providers, provideAppConfig(config)],
  }));
```

Later providers override earlier ones, so the static development default in `app.config.ts`
is replaced. No secrets here: everything in the browser is public.
