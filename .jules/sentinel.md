## 2024-05-30 - Added HTML Sanitization to dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability through dangerouslySetInnerHTML in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx`.
**Learning:** Even internal configurations or static content should be sanitized to prevent potential future vulnerabilities when data sources change.
**Prevention:** Always use `DOMPurify.sanitize()` when injecting HTML content using `dangerouslySetInnerHTML`. Remember to pass `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` to avoid stripping necessary tags in this specific codebase.
