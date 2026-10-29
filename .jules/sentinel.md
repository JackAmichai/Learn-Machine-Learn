## 2024-05-15 - XSS Vulnerability in React dynamically set HTML
**Vulnerability:** React components dynamically rendering HTML string without sanitization.
**Learning:** Usage of `dangerouslySetInnerHTML` without `DOMPurify` leads to XSS vulnerabilities.
**Prevention:** Use `dompurify` library to sanitize user inputs before dynamically rendering it using `dangerouslySetInnerHTML`.
