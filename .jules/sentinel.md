## 2026-06-20 - XSS Vulnerability in MathModal
**Vulnerability:** XSS vulnerability due to dangerouslySetInnerHTML.
**Learning:** dangerouslySetInnerHTML should always be sanitized, even if data looks safe.
**Prevention:** Use DOMPurify.sanitize() when using dangerouslySetInnerHTML.
