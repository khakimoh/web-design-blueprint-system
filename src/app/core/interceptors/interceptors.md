# core/interceptors/

Functional HTTP interceptors registered in `app.config.ts` with
`provideHttpClient(withInterceptors([...]))`.

Golden example: [http-error-interceptor.ts](http-error-interceptor.ts) converts every failed
request into an `AppError` once, at the boundary. Other typical interceptors: attach
credentials to the API origin only, add correlation ids, bounded retries for idempotent
requests. Order matters: interceptors run in array order for requests.
