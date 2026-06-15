## 2025-06-15 - XSS Vulnerability in MathModal
**Vulnerability:** Dynamic content rendered via dangerouslySetInnerHTML without sanitization.
**Learning:** This codebase uses dangerouslySetInnerHTML to render math and text. If standard HTML tags are missing or untrusted data is passed, it risks XSS. We must use { USE_PROFILES: { html: true, mathMl: true, svg: true } } for DOMPurify to preserve equations and SVG visuals while maintaining security.
**Prevention:** Always sanitize dynamically rendered inputs passed to dangerouslySetInnerHTML using DOMPurify with appropriate profiles for standard HTML and MathML.
