## 2026-08-31 - Exposed API Key in Client Bundle
**Vulnerability:** The Hugging Face API key was being exposed in the client-side bundle via the `VITE_HF_TOKEN` environment variable.
**Learning:** Vite statically injects any environment variables prefixed with `VITE_` into the client-side bundle at build time, meaning that these secrets are exposed to any end user who inspects the application code.
**Prevention:** Remove `VITE_` prefixed environment variables for sensitive API keys and enforce a Bring-Your-Own-Key (BYOK) approach by having users provide their tokens dynamically (e.g. via `localStorage`).
