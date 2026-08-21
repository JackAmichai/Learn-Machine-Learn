## 2024-05-24 - API Key Exposure in Client Bundle
**Vulnerability:** The Hugging Face API key was being exposed in the client-side JavaScript bundle via a `VITE_` prefixed environment variable.
**Learning:** Vite exposes environment variables prefixed with `VITE_` to the client bundle at build time, which means any tokens stored this way can be extracted by users.
**Prevention:** Remove sensitive tokens from `import.meta.env` and enforce a Bring-Your-Own-Key (BYOK) approach using `localStorage`, or proxy requests through a secure backend.
