## 2024-08-16 - Exposed Hugging Face API Token in Client Bundle
**Vulnerability:** The Hugging Face inference provider token was being injected into the client-side JavaScript bundle via `import.meta.env.VITE_HF_TOKEN`.
**Learning:** Any environment variable prefixed with `VITE_` in a Vite application is statically replaced at build time and exposed to the user's browser, posing a critical risk of token theft and misuse.
**Prevention:** Never use `VITE_` prefix for secrets or API keys. Enforce a Bring-Your-Own-Key (BYOK) approach using only client-side storage (e.g., `localStorage`) for external API dependencies.
