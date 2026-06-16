## 2025-02-15 - Unsanitized HTML passed to dangerouslySetInnerHTML
**Vulnerability:** Found `dangerouslySetInnerHTML` instances receiving unsanitized HTML data in `MathModal.jsx` and `LookingForward.jsx`, leading to XSS vulnerabilities if external data is manipulated.
**Learning:** React's built-in XSS protection is bypassed when using `dangerouslySetInnerHTML`. The project mixes math content, SVG visualizers, and raw HTML, requiring careful sanitization profiles.
**Prevention:** Always use `DOMPurify.sanitize()` when utilizing `dangerouslySetInnerHTML`. Ensure `USE_PROFILES: { html: true, mathMl: true, svg: true }` are configured when components expect rich multimedia content to prevent breaking expected visual components.
