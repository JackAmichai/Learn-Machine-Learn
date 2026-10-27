## 2025-03-08 - Fix XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Unsanitized user inputs were being passed directly to `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`, posing an XSS risk.
**Learning:** In this React application, dynamic content rendered via `dangerouslySetInnerHTML` must always be sanitized to prevent malicious script injection.
**Prevention:** Always use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` before passing content to `dangerouslySetInnerHTML`. Ensure HTML, MathML, and SVG are explicitly allowed if they're used.
