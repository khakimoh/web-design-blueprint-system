# Angular Testing

Implements [testing principles](../../principles/quality-standards.md#1-testing-principles).

## 1. Tooling

| Level | Tool | Command |
| --- | --- | --- |
| Unit / component | **Vitest** via the Angular CLI `unit-test` builder (Angular 21+ default) with `TestBed` | `ng test` |
| End-to-end (optional) | Playwright | `npx playwright test` |
| Accessibility automation (optional) | `@axe-core/playwright` in e2e tests | part of e2e |

Projects created before Vitest became the default may keep Karma/Jasmine until migration;
new projects use Vitest.

## 2. What to test where

| Unit | Test type | Focus |
| --- | --- | --- |
| Mappers (`toModel`), utils, validators | plain unit test (no TestBed) | edge cases, defaults, invalid input |
| API client | TestBed + `provideHttpClientTesting()` | URL, params, mapping, error mapping |
| Store | TestBed with a fake API client | state transitions: loading → success/empty/error |
| Presentational component | TestBed, set inputs with `fixture.componentRef.setInput()` | rendered output, emitted outputs, ARIA attributes |
| Container component | TestBed with fake store | wiring and state-to-view mapping |
| Guards / interceptors | `TestBed.runInInjectionContext` | decisions and transformations |

## 3. Conventions

- Spec file next to the unit: `item-card.spec.ts`.
- `describe('<ClassName>')`, test names describe behaviour.
- Query the DOM by role/label/text the way users perceive it; avoid CSS-class selectors for assertions.
- Fakes over mocks: small hand-written fakes implementing the public surface (`Pick<ItemApi, 'list'>`).
- Zoneless: call `await fixture.whenStable()` after changing inputs/state, instead of relying on zone-based `fakeAsync`.
- No real HTTP, timers or random values; inject clocks/ids when time or randomness matters.

## 4. Examples

- Presentational component: [`placeholder-detail.spec.ts`](../../../src/app/features/placeholder-feature/components/placeholder-detail/placeholder-detail.spec.ts)
- API client mapping: [`item-api.spec.ts`](../../../src/app/features/placeholder-feature/services/item-api.spec.ts)
