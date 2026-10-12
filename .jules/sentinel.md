## 2025-02-14 - Prevent XSS Vulnerabilities in React
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` injection in React components.
**Learning:** Even if data originates from internal configurations or static data, any dynamic HTML injection is a potential vector for XSS if un-sanitized. `dompurify` should be used consistently.
**Prevention:** Always sanitize dynamically injected HTML content using a library like `dompurify` (e.g., `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })`) before passing it to `dangerouslySetInnerHTML`.
