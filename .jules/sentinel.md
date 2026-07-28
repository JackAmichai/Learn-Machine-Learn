## 2024-05-18 - Unsanitized HTML rendering via dangerouslySetInnerHTML
**Vulnerability:** Found `dangerouslySetInnerHTML` being used directly with potentially user-influenced inputs (`data.content`, `data.solved`, etc.) without sanitization in `MathModal.jsx`.
**Learning:** `dangerouslySetInnerHTML` is widely used in the codebase for rendering lesson data. Since this content might be loaded dynamically or constructed from external sources in the future, failing to sanitize it opens up serious XSS risks.
**Prevention:** Always sanitize variables injected into `dangerouslySetInnerHTML` using libraries like `DOMPurify` to prevent Cross-Site Scripting (XSS).
