
## 2024-05-24 - Insecure Developer Token Injection via Vite Env Vars
**Vulnerability:** The application was configured to fallback to a Hugging Face API token injected via `import.meta.env.VITE_HF_TOKEN` for the chatbot.
**Learning:** In Vite applications, environment variables prefixed with `VITE_` are statically compiled directly into the client-side JavaScript bundle. Any API keys or secrets provided this way are publicly exposed to end-users who inspect the source or network requests.
**Prevention:** Never use `VITE_` prefixed environment variables for sensitive API tokens or secrets. For frontend-only applications, enforce a Bring-Your-Own-Key (BYOK) architecture where users provide their own keys directly via the UI (stored securely in `localStorage` or session memory).
