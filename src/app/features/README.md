# features/

One folder per feature; each feature is self-contained and lazy-loaded.

```text
features/<feature>/
├── <feature>.routes.ts     default export; feature-scoped providers
├── components/             container (page) + presentational components
├── services/               <x>-api.ts (HTTP + mapping), <x>-store.ts (state)
├── models/                 <x>.model.ts (model + DTO types)
└── utils/                  feature-only helpers (optional)
```

Rules: no imports between features; adding a feature = new folder + one route in
`app.routes.ts`; feature state is provided on the feature route so it is destroyed with it.
Golden example: [placeholder-feature/](placeholder-feature/README.md).
