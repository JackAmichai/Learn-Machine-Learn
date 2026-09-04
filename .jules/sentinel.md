## 2024-09-04 - Fix API Token Exposure in Vite Bundle
**Vulnerability:** The Hugging Face API token (`VITE_HF_TOKEN`) was statically injected into the client-side JavaScript bundle.
**Learning:** Vite statically injects any environment variable prefixed with `VITE_` into the client-side bundle at build time, exposing secrets to anyone who inspects the source code.
**Prevention:** Do not use `VITE_` prefixed environment variables for sensitive API keys or secrets in frontend-only applications. Use a Bring-Your-Own-Key (BYOK) approach or a secure backend proxy.
