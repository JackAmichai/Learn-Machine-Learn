## 2026-07-07 - Sanitize HTML to prevent XSS
**Vulnerability:** Found multiple instances of `dangerouslySetInnerHTML` taking content strings directly without any sanitization in `MathModal.jsx`.
**Learning:** `dangerouslySetInnerHTML` opens the door for Cross-Site Scripting (XSS) if the content is user-controlled or compromised. Even if the current content seems static, it's a critical security risk.
**Prevention:** Always use a robust HTML sanitization library like `dompurify` before injecting HTML using `dangerouslySetInnerHTML`. Since this project renders math elements, `dompurify` must be configured with `USE_PROFILES: { html: true, mathMl: true, svg: true }` to avoid stripping valid math elements.
