## 2025-03-08 - Added DOMPurify to prevent XSS in dynamic HTML content
**Vulnerability:** React components rendering user-provided or externally sourced HTML strings directly into the DOM via `dangerouslySetInnerHTML`.
**Learning:** Using `dangerouslySetInnerHTML` without proper sanitization can expose the app to Cross-Site Scripting (XSS).
**Prevention:** Always use `DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` when dynamically rendering HTML inside React components, ensuring math and SVG logic remain functional.
