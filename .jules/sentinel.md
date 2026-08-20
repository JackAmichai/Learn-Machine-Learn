## 2025-02-12 - Exposing API Keys in Vite Client Bundle
**Vulnerability:** The application was configured to pass a Hugging Face API key via the `VITE_HF_TOKEN` environment variable.
**Learning:** In a Vite application, any environment variable prefixed with `VITE_` is statically injected into the client-side JavaScript bundle at build time, completely exposing the secret to anyone who inspects the application's source code.
**Prevention:** Remove `VITE_` prefixed sensitive keys from `.env` and `import.meta.env`. Enforce a Bring-Your-Own-Key (BYOK) approach storing user-provided keys only in `localStorage`, or proxy API requests through a secure backend server.
