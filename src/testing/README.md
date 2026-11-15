# src/testing/

Shared test utilities that more than one spec uses. Specs themselves live next to the code
they test (`*.spec.ts`).

| Folder | Contents |
| --- | --- |
| [mocks/](mocks/README.md) | Fakes and fixture builders |
| [utils/](utils/README.md) | Test helpers (DOM queries, harness helpers) |

Excluded from production builds by the CLI's TypeScript configuration. Rules:
[docs/technologies/angular/testing.md](../../docs/technologies/angular/testing.md).
