## 2025-05-18 - Prevent XSS in dynamically injected HTML via dangerouslySetInnerHTML
**Vulnerability:** React components (e.g., `MathModal.jsx`, `LookingForward.jsx`) injected dynamic string content using `dangerouslySetInnerHTML` directly from data sources without sanitization, posing a High-Severity XSS risk if the content data was ever compromised or became user-controllable.
**Learning:** Even internal content configurations can pose risks if they contain HTML elements that are dynamically loaded without validation or sanitization.
**Prevention:** Always wrap dynamically injected HTML in a sanitization library like `DOMPurify.sanitize()` when using React's `dangerouslySetInnerHTML` to enforce defense-in-depth and prevent XSS.
