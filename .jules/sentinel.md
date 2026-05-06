## 2024-05-15 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability where `dangerouslySetInnerHTML` is used without DOMPurify for user-provided or dynamic content, specifically in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx`.
**Learning:** Reacts `dangerouslySetInnerHTML` passes raw HTML directly to the DOM. When using content from files or state that can contain un-sanitized tags, this causes XSS vectors.
**Prevention:** Always use `DOMPurify.sanitize()` before passing any string to `dangerouslySetInnerHTML`.
