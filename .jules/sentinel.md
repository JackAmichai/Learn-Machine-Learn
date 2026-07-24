## 2024-07-24 - Cross-Site Scripting (XSS) in MathModal Component
**Vulnerability:** Found `dangerouslySetInnerHTML` being used directly with dynamic data (`data.content`, `data.solved`, `data.shortcomings`) inside `src/components/MathModal.jsx`, presenting an XSS vulnerability.
**Learning:** React requires explicit instruction to render raw HTML via `dangerouslySetInnerHTML`. However, doing so with unsanitized data, such as dynamically injected strings from the engine, exposes the client to XSS risks.
**Prevention:** Always sanitize dynamically loaded HTML using a trusted library like `dompurify` before passing it to `dangerouslySetInnerHTML`.
