## 2023-10-24 - Cross-Site Scripting (XSS) via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized variables passed to `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** Even internal configuration content injected directly into the DOM needs to be sanitized. Using `dangerouslySetInnerHTML` exposes applications to Cross-Site Scripting (XSS).
**Prevention:** Always use `DOMPurify.sanitize(content)` before injecting raw HTML via `dangerouslySetInnerHTML`.
