## 2026-06-17 - XSS via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized HTML rendering via dangerouslySetInnerHTML in MathModal.jsx component, potentially leading to XSS.
**Learning:** React's dangerouslySetInnerHTML bypasses XSS protection. If the rendered content originates from user input or external sources without strict control, malicious scripts can execute.
**Prevention:** Always use a sanitizer library like DOMPurify before passing data to dangerouslySetInnerHTML.
