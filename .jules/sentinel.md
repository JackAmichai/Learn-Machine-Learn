## 2025-02-09 - Fix XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Unsanitized user input or content passed to `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`, leading to potential Cross-Site Scripting (XSS).
**Learning:** `dangerouslySetInnerHTML` requires explicit sanitization when rendering HTML, especially if the data structure changes to include user input later or if the content is externally sourced.
**Prevention:** Always sanitize HTML input using a library like `DOMPurify` before injecting it into the DOM, making sure to explicitly allow safe formats like SVG and MathML if necessary.
