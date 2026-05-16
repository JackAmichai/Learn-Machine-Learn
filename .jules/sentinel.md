## 2024-05-18 - Unsanitized HTML passed to dangerouslySetInnerHTML

**Vulnerability:** React's `dangerouslySetInnerHTML` was used in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx` directly with variables (`data.content`, `data.solved`, etc.) sourced from topic objects or data. If these topic strings ever contained untrusted user input or were maliciously manipulated, it would lead to a Cross-Site Scripting (XSS) vulnerability.
**Learning:** Using `dangerouslySetInnerHTML` without proper validation or sanitization creates potential XSS attack vectors in the DOM.
**Prevention:** Always wrap dynamically injected HTML strings using `DOMPurify.sanitize(..., { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to safely filter out malicious scripts while preserving required mathematical formatting and inline SVGs.
