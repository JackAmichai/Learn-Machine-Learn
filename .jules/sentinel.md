## 2024-09-02 - Environment Variable Exposure in Vite
**Vulnerability:** Developer Hugging Face token was exposed in the client-side bundle via `VITE_HF_TOKEN`.
**Learning:** Environment variables prefixed with `VITE_` are statically injected into the client bundle at build time, making them accessible to anyone viewing the source.
**Prevention:** Do not use `VITE_` prefix for secrets. Enforce Bring-Your-Own-Key (BYOK) for client-side API calls.
