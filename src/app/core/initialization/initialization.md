# core/initialization/

Startup tasks registered with `provideAppInitializer()`: loading user preferences, warming a
cache, registering icons, restoring a session.

Keep initializers fast and resilient — a failing initializer blocks the whole application.
Prefer lazy work inside features over global startup work. Runtime configuration that must
exist before DI is created is loaded in `main.ts` instead (see `core/config/`).
