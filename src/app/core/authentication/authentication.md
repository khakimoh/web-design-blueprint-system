# core/authentication/

Session state and authentication plumbing, **only when the project requires authentication**
(`architecture.authentication` in `project.config.yaml`).

Typical contents: a session store (signals: current user, status), an auth interceptor that
attaches credentials to API-origin requests only, a functional `authGuard`, and integration
with the chosen identity provider (OIDC Authorization Code + PKCE).

The blueprint ships no implementation on purpose: authentication is project work. Follow
[docs/principles/security.md](../../../../docs/principles/security.md#3-authentication-and-session-data);
guards are UX only, the API enforces authorization.
