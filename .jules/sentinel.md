## 2024-05-24 - Unsanitized innerHTML in MathModal
**Vulnerability:** Found a Cross-Site Scripting (XSS) vulnerability in `src/components/MathModal.jsx` where `dangerouslySetInnerHTML` is used to render `data.content` directly without sanitization.
**Learning:** React's `dangerouslySetInnerHTML` is susceptible to XSS if not properly handled, especially when using user inputs or dynamic data. The system requires standard practices, like sanitization before rendering HTML strings, to prevent such XSS attacks.
**Prevention:** Always use an established security library, like `dompurify` and its `DOMPurify.sanitize()` method, when setting inner HTML dynamically.
