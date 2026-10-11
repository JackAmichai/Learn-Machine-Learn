## 2025-02-14 - Prevent XSS in dynamically loaded lesson content
**Vulnerability:** React components (`MathModal`, `LookingForward`) used `dangerouslySetInnerHTML` to render lesson content strings without sanitization.
**Learning:** Even internal configuration content injected via `dangerouslySetInnerHTML` must be sanitized to prevent XSS. When sanitizing in this codebase, specific profiles (`{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`) must be explicitly passed to `DOMPurify.sanitize()` to avoid stripping valid math and SVG content.
**Prevention:** Always use `DOMPurify.sanitize()` with appropriate profiles before passing HTML strings to `dangerouslySetInnerHTML`.
