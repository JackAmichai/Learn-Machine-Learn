## 2024-05-24 - API Token Exposure in Client Bundle
**Vulnerability:** Hugging Face API tokens (VITE_HF_TOKEN) were statically injected into the client-side JavaScript bundle using `import.meta.env.VITE_HF_TOKEN`.
**Learning:** Any environment variable prefixed with `VITE_` in a Vite application is replaced at build time and exposed to the client. This exposes developer API keys to any user who inspects the source code.
**Prevention:** Remove sensitive API keys from `import.meta.env` and enforce a Bring-Your-Own-Key (BYOK) approach using only `localStorage` for client-side API calls, or route API calls through a secure backend proxy.
