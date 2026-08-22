## 2024-05-20 - Prevented VITE_ environment variable client injection leak
**Vulnerability:** The Hugging Face API token (`VITE_HF_TOKEN`) was statically injected by Vite into the client-side JavaScript bundle, making it accessible to any user in production.
**Learning:** In Vite applications, `import.meta.env.*` variables prefixed with `VITE_` are designed to be exposed to the client. This codebase erroneously relied on a `VITE_` variable to securely hold an API key, putting the author's credentials at risk.
**Prevention:** Developer-provided API keys intended for external services must never be read from `import.meta.env` if the application runs entirely client-side. Enforce a Bring-Your-Own-Key (BYOK) architecture via secure storage (e.g., `localStorage`) to prevent token leakage.
