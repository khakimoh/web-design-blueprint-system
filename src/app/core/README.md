# core/

Application-wide singletons and infrastructure. Exactly one instance exists per application;
`core` is wired in `app.config.ts` and used by the shell, layout and features.

**Belongs here:** runtime configuration, error model and global error handling, HTTP
interceptors, cross-feature guards, authentication/session state (when the project has it),
app initializers, app-wide services (color mode, page title, analytics).

**Does not belong here:** UI components (→ `shared/` or `layout/`), feature state (→ the
feature), anything imported only by one feature.

`core` may import `shared` models/utils; it never imports `features` or `layout`.
