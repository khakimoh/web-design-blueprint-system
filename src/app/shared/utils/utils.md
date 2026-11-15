# shared/utils/

Pure, framework-free functions: coercion, formatting, comparison, small algorithms.

Golden example: [coerce.ts](coerce.ts) — `asString`, `asNumber`, `asOneOf`, `asArray` used at
API boundaries to normalize untrusted data with safe defaults (see the item API client).

Rules: no Angular imports, no side effects, fully unit-testable, one concern per file.
