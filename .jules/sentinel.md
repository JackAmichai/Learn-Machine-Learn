## 2024-05-18 - Missing DOMPurify with dangerouslySetInnerHTML

**Vulnerability:** The application was passing un-sanitized content directly to `dangerouslySetInnerHTML` in multiple components (e.g. `MathModal.jsx`, `LookingForward.jsx`), which is a known vector for Cross-Site Scripting (XSS) attacks.
**Learning:** Even internal content from a seemingly safe source (like `mathContent.js`) should be sanitized before rendering, to apply defense-in-depth and prevent future vulnerabilities as content sources evolve.
**Prevention:** Always use `DOMPurify.sanitize()` (with appropriate configuration profiles, like `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` for complex content) before passing dynamic content to `dangerouslySetInnerHTML`.
