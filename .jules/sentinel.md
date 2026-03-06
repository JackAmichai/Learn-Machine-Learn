## 2024-05-24 - Cross-Site Scripting (XSS) in dynamically loaded math content
**Vulnerability:** The `MathModal` component renders content from `MATH_TOPICS` using `dangerouslySetInnerHTML` directly without sanitization, leading to a DOM-based XSS vulnerability if `data.content` (e.g. math explanations and interactive formulas content) is poisoned or manipulated.
**Learning:** React provides `dangerouslySetInnerHTML` as a feature, but relying entirely on static JSON or JS objects (`mathContent.js`) to be safe can backfire if those objects become dynamically fetched or user-generated in the future.
**Prevention:** We must consistently wrap all data fed into `dangerouslySetInnerHTML` with `DOMPurify.sanitize()` to ensure any script tags or malicious payloads are stripped before rendering.
