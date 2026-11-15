# core/guards/

Functional route guards (`CanActivateFn`, `CanMatchFn`, `CanDeactivateFn`) used by more than
one feature, e.g. an unsaved-changes guard or a role check.

Guards decide navigation for user experience only; the server enforces access. Feature-only
guards live in the feature folder. Generate with `ng generate guard core/guards/<name>`
(produces `<name>-guard.ts`).
