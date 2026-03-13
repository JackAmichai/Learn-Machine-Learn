## 2026-03-13 - DOMPurify usage missing
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` without sanitization.
**Learning:** The application was vulnerable to XSS attacks because user data or external HTML content was being rendered without sanitization.
**Prevention:** Use DOMPurify.sanitize() when using `dangerouslySetInnerHTML` to sanitize the HTML string and prevent Cross-Site Scripting (XSS) vulnerabilities.
