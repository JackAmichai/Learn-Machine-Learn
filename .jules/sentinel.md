## 2024-05-27 - XSS in MathModal and LookingForward via dangerouslySetInnerHTML
**Vulnerability:** Cross-Site Scripting (XSS) vulnerability due to passing raw, un-sanitized content into `dangerouslySetInnerHTML` in multiple components (`MathModal.jsx`, `LookingForward.jsx`).
**Learning:** Hardcoded, unvalidated usage of `dangerouslySetInnerHTML` allows for malicious scripts to be executed if the data source (`data.content`, `lesson.solved`, etc.) becomes untrusted or poisoned. Even if the data originates locally, this is a dangerous pattern in React.
**Prevention:** Always wrap variables passed into `dangerouslySetInnerHTML` with `DOMPurify.sanitize()` (or a similar trusted HTML sanitizer) to strip potentially malicious scripts and tags.
