# core/errors/

The application error model and global error handling.

Golden example: [app-error.ts](app-error.ts) — `AppError` with a closed set of kinds
(`network`, `timeout`, `unauthorized`, `forbidden`, `not-found`, `validation`, `conflict`,
`server`, `unknown`), a message key and field errors; `toAppError()` maps anything thrown
(including `HttpErrorResponse`) to it. Adapt `readFieldErrors()` to the project's API.

Add a custom `ErrorHandler` here for unexpected errors (log to monitoring, show a generic
message). Stores and components only ever see `AppError`.
