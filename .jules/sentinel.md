## 2025-02-12 - Prevent XSS in dynamically injected HTML (dangerouslySetInnerHTML)
**Vulnerability:** XSS vulnerability through usage of `dangerouslySetInnerHTML` for content loaded from `src/engine/mathContent.js`.
**Learning:** React requires explicit XSS protection for raw HTML injection.
**Prevention:** Sanitize data with DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } }) before using it in `dangerouslySetInnerHTML`.
