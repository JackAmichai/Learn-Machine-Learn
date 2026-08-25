## 2024-11-20 - Exposed API Token in Frontend Bundle
**Vulnerability:** Developer API key for Hugging Face Inference Providers (VITE_HF_TOKEN) was exposed in the client-side JavaScript bundle via `import.meta.env`.
**Learning:** Vite statically injects any environment variables prefixed with `VITE_` into the frontend bundle at build time, exposing them to anyone inspecting the source.
**Prevention:** Enforce a Bring-Your-Own-Key (BYOK) model for client-side API calls, storing tokens securely in `localStorage` rather than relying on build-time environment injection.
