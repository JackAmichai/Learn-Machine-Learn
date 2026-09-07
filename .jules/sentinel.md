## 2024-05-24 - Prevent exposure of developer HF token in client bundle
**Vulnerability:** Environment variables prefixed with `VITE_` (e.g., `VITE_HF_TOKEN`) are statically injected into the client-side JavaScript bundle at build time, exposing developer tokens to anyone inspecting the client code.
**Learning:** Never use `VITE_` prefixed environment variables for sensitive secrets or API keys that shouldn't be exposed to the client. Vite's design explicitly exposes these values.
**Prevention:** Enforce a Bring-Your-Own-Key (BYOK) approach by relying solely on `localStorage` or server-side proxying for sensitive tokens.
