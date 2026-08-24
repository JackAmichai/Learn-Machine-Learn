## 2025-02-13 - API Key Statically Injected

**Vulnerability:** The application was bundling a Hugging Face API key into the frontend bundle via `import.meta.env.VITE_HF_TOKEN` in Vite.
**Learning:** In frontend build tools like Vite, variables prefixed with `VITE_` are statically injected into the client bundle at build time. This means developer keys or secrets could be exposed directly to all users accessing the site.
**Prevention:** Remove environment-based configuration for secrets on the frontend entirely and enforce BYOK (Bring-Your-Own-Key) through mechanisms like `localStorage`, where users input their own tokens, or use backend proxy services instead.
