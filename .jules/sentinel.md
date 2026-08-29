## 2024-05-24 - VITE_ Prefix Client Exposure
**Vulnerability:** Environment variables prefixed with `VITE_` (e.g. `VITE_HF_TOKEN`) were being used for API keys in the React frontend.
**Learning:** Vite statically injects any `VITE_`-prefixed environment variable into the compiled client-side JavaScript bundle during the build process, exposing these secrets to any user downloading the frontend code. This is an architectural trap for those coming from Node.js environments.
**Prevention:** Never use the `VITE_` prefix for sensitive secrets like API keys or tokens in frontend repositories. API keys should be handled by a backend proxy or enforced as a BYOK (Bring-Your-Own-Key) user-provided input stored securely locally.
