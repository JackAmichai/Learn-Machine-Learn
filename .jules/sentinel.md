## 2025-01-20 - Ensure Safe HTML Injection via DOMPurify
**Vulnerability:** XSS vulnerability through usage of dangerouslySetInnerHTML without sanitization on mathematical topic objects rendering html content.
**Learning:** Even internal object contents and configurations are not immune to XSS risks, using raw dangerouslySetInnerHTML without wrapping data exposes the UI to unsafe markup injection.
**Prevention:** Use DOMPurify.sanitize() whenever exposing raw markup through dangerouslySetInnerHTML.
