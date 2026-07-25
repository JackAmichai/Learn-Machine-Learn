## 2025-07-25 - XSS via dangerouslySetInnerHTML
**Vulnerability:** Direct rendering of unsanitized HTML input through `dangerouslySetInnerHTML` in `MathModal.jsx` exposed the application to XSS.
**Learning:** The lesson data provided to `dangerouslySetInnerHTML` was completely unsanitized, which means malicious scripts injected via API or content manipulation could execute arbitrary JavaScript in the victim's browser context.
**Prevention:** Always use a well-tested HTML sanitizer like `DOMPurify` before rendering dynamic HTML via `dangerouslySetInnerHTML`.
