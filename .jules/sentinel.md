## 2025-02-14 - Fix XSS vulnerabilities with dangerouslySetInnerHTML
**Vulnerability:** Unsanitized dynamic HTML content was passed directly to `dangerouslySetInnerHTML`.
**Learning:** The application uses `dangerouslySetInnerHTML` to render dynamic content, but lacked proper sanitization, exposing it to potential Cross-Site Scripting (XSS) attacks. Even if the data originates from internal configurations, XSS vectors could still be introduced.
**Prevention:** Always use a library like `dompurify` to sanitize dynamically injected HTML content before passing it to `dangerouslySetInnerHTML`. When using `DOMPurify` with MathML or SVG, ensure you pass `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` to `DOMPurify.sanitize()`.
