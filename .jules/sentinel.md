## 2024-05-24 - VITE_ Static Token Injection Leak
**Vulnerability:** API Keys injected via `import.meta.env.VITE_*` in a Vite application expose the secrets directly to the client-side bundle.
**Learning:** Vite statically replaces `import.meta.env.VITE_*` occurrences at build time, meaning any server-side secret mapped this way becomes public frontend source code.
**Prevention:** Never use the `VITE_` prefix for sensitive keys. Enforce a Bring-Your-Own-Key (BYOK) pattern via localStorage for client-side tools or use a secure backend proxy to protect API credentials.
