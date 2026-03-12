## 2024-05-24 - [DOMPurify required for dangerouslySetInnerHTML]
**Vulnerability:** XSS vulnerability through unsanitized HTML in `dangerouslySetInnerHTML` in `MathModal.jsx`.
**Learning:** React components (such as `MathModal`) that use `dangerouslySetInnerHTML` need their inputs sanitized to prevent Cross-Site Scripting (XSS) vulnerabilities.
**Prevention:** Always use `DOMPurify.sanitize()` when setting raw HTML using `dangerouslySetInnerHTML` in React components to prevent XSS.
