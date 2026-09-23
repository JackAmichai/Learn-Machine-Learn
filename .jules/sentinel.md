## 2025-02-27 - XSS Vulnerability via dynamically injected configs
**Vulnerability:** Found multiple instances of `dangerouslySetInnerHTML` rendering unsanitized HTML content dynamically loaded from JS configuration files (`src/engine/mathContent.js` and `src/pages/LookingForward.jsx`).
**Learning:** Even if the dynamic HTML currently originates from internal configuration data, failing to sanitize it presents a High severity Cross-Site Scripting (XSS) vulnerability pattern. Any future external data injection or modification of these files could execute arbitrary code on the client.
**Prevention:** Always use `DOMPurify.sanitize()` (or a similar sanitization library) to clean HTML content before passing it to React's `dangerouslySetInnerHTML`, regardless of the data's current origin.
