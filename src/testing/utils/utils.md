# testing/utils/

Reusable test helpers: querying by role or label, typing into inputs and dispatching events,
waiting for `fixture.whenStable()`, accessibility assertions with axe-core.

Helpers must not hide what a test asserts; if a helper needs documentation to understand a
failure, inline it instead.
