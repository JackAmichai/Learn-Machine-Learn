## 2024-09-05 - Remove exposed API key from Vite config
**Vulnerability:** The application used `VITE_HF_TOKEN` which exposes the Hugging Face API token in the client-side Vite bundle, allowing any user to extract it.
**Learning:** Vite statically injects `VITE_` prefixed environment variables into the client bundle at build time, leading to unintentional secret exposure.
**Prevention:** Remove sensitive tokens from `import.meta.env` and enforce a Bring-Your-Own-Key (BYOK) approach using `localStorage` for client-side API calls.
