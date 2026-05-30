## 2026-05-30 - DOMPurify usage for Math/SVG content
**Vulnerability:** XSS from unsanitized HTML in `dangerouslySetInnerHTML` using dynamic content from `mathContent.js`.
**Learning:** The application uses MathML and SVG to render complex equations and diagrams. Standard sanitization strips these elements.
**Prevention:** Always use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to prevent stripping standard HTML tags along with essential math equations and icon visuals.
