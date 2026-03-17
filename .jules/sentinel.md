## 2024-05-24 - XSS in MathModal
**Vulnerability:** XSS vulnerability in `MathModal.jsx` due to unsanitized `dangerouslySetInnerHTML`.
**Learning:** `dangerouslySetInnerHTML` is used without sanitization, trusting the source `mathContent`.
**Prevention:** Always sanitize HTML input using `DOMPurify.sanitize()` before passing it to `dangerouslySetInnerHTML`.
