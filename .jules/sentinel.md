## 2024-05-14 - Fix XSS in MathModal
**Vulnerability:** The `dangerouslySetInnerHTML` React prop was being used to render mathematical content without proper sanitization, exposing the application to Cross-Site Scripting (XSS).
**Learning:** Raw HTML content strings with mathematical formatting needed proper sanitization before rendering in React. Default sanitization aggressively strips necessary math tags like `<math>` and `<svg>`.
**Prevention:** Always use `DOMPurify` to sanitize HTML content, and explicitly enable necessary profiles like `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` to preserve essential mathematical elements while stripping malicious scripts.
