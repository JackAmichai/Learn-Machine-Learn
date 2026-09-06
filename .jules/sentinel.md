## 2026-09-06 - VITE_ Prefix Environment Variable Exposure
**Vulnerability:** The Hugging Face API token (`VITE_HF_TOKEN`) was hardcoded into the client-side bundle via the Vite environment variable prefix (`VITE_`).
**Learning:** Vite statically injects any environment variable prefixed with `VITE_` into the client-side JavaScript bundle at build time, exposing secrets to anyone who inspects the site.
**Prevention:** Remove `VITE_` prefixed secrets from `import.meta.env` and strictly enforce a Bring-Your-Own-Key (BYOK) approach using only `localStorage` for sensitive tokens in purely client-side applications.
