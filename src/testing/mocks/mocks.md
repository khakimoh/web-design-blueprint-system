# testing/mocks/

Hand-written fakes and fixture builders shared across specs, e.g. `createItem(overrides)` or a
`FakeItemApi` implementing `Pick<ItemApi, 'list' | 'create'>` with signals or subjects.

Prefer small fakes over auto-mocking libraries; keep fixture data generic and minimal.
