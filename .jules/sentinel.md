## 2024-05-24 - VITE_ Environment Variables Expose Secrets
**Vulnerability:** The Hugging Face API token (`VITE_HF_TOKEN`) was exposed in the client-side bundle because Vite statically injects any variable prefixed with `VITE_` into the final JavaScript output at build time.
**Learning:** Developers often mistake `VITE_` variables as secure server-side secrets, when in fact they are public. This leads to API keys being easily extracted by inspecting the site's source code.
**Prevention:** Remove sensitive tokens from `import.meta.env`. Enforce a Bring-Your-Own-Key (BYOK) approach by having users input their own tokens stored locally (e.g., in `localStorage`) or route API requests through a secure backend proxy.
