# Security Baseline (frontend)

The browser is an untrusted environment: everything shipped to it is public and
everything coming from it can be forged. Server-side enforcement is always
required; frontend security reduces exposure and protects users.

## 1. Secrets and configuration

- No secrets in source, bundles, runtime config or local storage. API keys that must reach the browser are *public identifiers*, restricted by origin/quotas on the provider side.
- `.env` files are git-ignored; `.env.example` lists variable names only.
- Never log tokens, passwords or personal data.

## 2. Untrusted data

- Rely on the framework's automatic output escaping; never bypass sanitization with raw HTML APIs unless the content is sanitized by a vetted library and the bypass is reviewed.
- Never build HTML, URLs or styles by string concatenation with user data.
- Validate and normalize all external data at the boundary (shape, types, ranges) — see [api/api.md](../api/api.md).
- Validate URLs before using them in `href`/`src` (allow `https:`, relative paths; reject `javascript:`).
- Client-side validation is for usability; the server validates again.

## 3. Authentication and session data

- Prefer HTTP-only, `Secure`, `SameSite` cookies managed by the server over tokens in `localStorage`.
- If tokens must live in the client, keep them in memory, short-lived, and attach them only to the API origin.
- Route guards improve UX only; authorization is enforced by the API.
- Use the identity provider's standard flows (OIDC Authorization Code with PKCE); never handle third-party passwords.

## 4. Transport and headers (set by the hosting layer)

- HTTPS only, with HSTS.
- `Content-Security-Policy` without `unsafe-inline` scripts (frameworks with build-time compilation support this; use nonces/hashes where needed).
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` limiting unused features, `frame-ancestors` in CSP to prevent clickjacking.
- Subresource Integrity for any third-party script or stylesheet loaded from a CDN (prefer self-hosting).

## 5. Dependencies and supply chain

- Lockfile committed; installs in CI use the lockfile (`npm ci`).
- Run `npm audit` (or equivalent) in CI; fix high/critical findings before release.
- Review new dependencies for maintenance, popularity, install scripts and permissions.
- Do not load scripts from unknown CDNs; self-host fonts and assets.

## 6. Privacy

- Collect the minimum personal data; document what is stored client-side and why.
- Analytics and third-party embeds load only after consent where regulation requires it.
- Respect `Do Not Track`/Global Privacy Control signals when the project's policy says so.

## 7. Review checklist

- [ ] No secrets or credentials in the diff.
- [ ] No raw HTML insertion, or it is sanitized and justified.
- [ ] External data validated/normalized at the boundary.
- [ ] Errors do not leak stack traces or internal identifiers to users.
- [ ] New dependencies justified and audited.
