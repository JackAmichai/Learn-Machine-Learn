## 2024-07-02 - Fix XSS Vulnerability in MathModal Component
**Vulnerability:** The MathModal component was using `dangerouslySetInnerHTML` directly with user input (`data.content`, `data.solved`, and `data.shortcomings`) without any sanitization, leaving the application open to Cross-Site Scripting (XSS) attacks.
**Learning:** In applications where dynamically generated or user-controlled content is rendered in React components via `dangerouslySetInnerHTML`, the framework cannot provide its normal XSS protections.
**Prevention:** Any untrusted or external HTML content rendered in React components must always be wrapped in a sanitization library, such as `DOMPurify.sanitize()`.
