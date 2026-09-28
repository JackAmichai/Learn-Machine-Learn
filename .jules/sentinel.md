## 2025-02-28 - XSS Risk in dangerouslySetInnerHTML
**Vulnerability:** Found multiple usages of `dangerouslySetInnerHTML` injecting dynamic HTML in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx` without sanitization.
**Learning:** Even if HTML content stems from internal configs, injecting it directly into `dangerouslySetInnerHTML` is an XSS vulnerability pattern that should be avoided.
**Prevention:** Always sanitize dynamic HTML content via a library like `dompurify` (e.g. `DOMPurify.sanitize()`) prior to injection.
