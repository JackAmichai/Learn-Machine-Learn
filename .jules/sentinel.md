## 2025-01-20 - Hardcoded API Token in Client Bundle
**Vulnerability:** The Hugging Face API token was statically injected into the client-side JavaScript bundle via `import.meta.env.VITE_HF_TOKEN`.
**Learning:** In Vite, any environment variable prefixed with `VITE_` is statically replaced in the code at build time, exposing it to anyone who inspects the client-side bundle.
**Prevention:** Never use `VITE_` prefixed environment variables for sensitive API keys or tokens. Implement a Bring-Your-Own-Key (BYOK) approach using `localStorage` or proxy requests through a secure backend.
