## 2026-06-18 - Prevent XSS in dynamically injected HTML
**Vulnerability:** Found multiple instances of `dangerouslySetInnerHTML` rendering untrusted content without sanitization, posing a High-Severity Cross-Site Scripting (XSS) risk.
**Learning:** The UI components dynamically render mathematical content which contains HTML tags, introducing an XSS vector if data sources are compromised.
**Prevention:** Always use `DOMPurify.sanitize()` when injecting external or complex HTML content into React components to ensure malicious scripts are stripped before rendering.
