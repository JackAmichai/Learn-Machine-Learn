## 2025-02-14 - Fix XSS vulnerability in dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability due to un-sanitized dynamic HTML content passed directly into `dangerouslySetInnerHTML` in React components (`MathModal.jsx` and `LookingForward.jsx`).
**Learning:** Dynamic HTML insertion points in this codebase were missing essential sanitation. Even if current inputs seem internal, this poses a high risk if external data sources are later introduced, which could execute malicious scripts in the user's browser.
**Prevention:** Always use `DOMPurify.sanitize()` before passing any string to `dangerouslySetInnerHTML`, regardless of the data's apparent origin.
