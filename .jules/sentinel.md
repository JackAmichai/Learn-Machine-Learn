## 2025-07-18 - MathModal XSS Vulnerability
**Vulnerability:** XSS vulnerability found in `MathModal.jsx` where user-provided content in `dangerouslySetInnerHTML` was not sanitized.
**Learning:** `dangerouslySetInnerHTML` poses an injection risk if not sanitized. MathML/SVG content requires specific sanitization profiles in DOMPurify.
**Prevention:** Always use `DOMPurify.sanitize` with appropriate profiles when rendering dynamic HTML containing complex structures.
