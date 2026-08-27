## 2024-05-27 - Exposed Developer API Key in Vite Build
**Vulnerability:** Developer API keys (`VITE_HF_TOKEN`) injected via Vite's `import.meta.env` are statically compiled into the client-side JavaScript bundle, making them accessible to any user who inspects the frontend code.
**Learning:** In a Vite application, variables prefixed with `VITE_` are exposed client-side. The Hugging Face inference provider token used by the Chatbot was set to fall back on this environment variable, exposing the key to the public.
**Prevention:** Remove environment variable fallbacks for client-side API tokens in Vite. Enforce a Bring-Your-Own-Key (BYOK) model relying exclusively on local storage for tokens provided by the user.
