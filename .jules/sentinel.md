## Sentinel Journal
## 2024-05-18 - Vite Environment Variable Token Leak
**Vulnerability:** Found `VITE_HF_TOKEN` being injected statically into the client-side JavaScript bundle via `import.meta.env`, exposing the developer's Hugging Face API key to anyone inspecting the site.
**Learning:** In a Vite application, environment variables prefixed with `VITE_` are statically injected into the client bundle at build time and are not safe for secrets.
**Prevention:** Remove them from `import.meta.env` and enforce a Bring-Your-Own-Key (BYOK) approach using only `localStorage` when client-side API calls are necessary.
