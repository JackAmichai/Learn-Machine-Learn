
## 2026-05-28 - XSS via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized HTML passed to dangerouslySetInnerHTML in MathModal.jsx and LookingForward.jsx.
**Learning:** Dynamic HTML content must be sanitized before rendering to prevent Cross-Site Scripting (XSS) in React applications.
**Prevention:** Always use DOMPurify.sanitize() when using dangerouslySetInnerHTML, and ensure correct USE_PROFILES are set for specific content like mathMl/svg to preserve necessary visual structures.
