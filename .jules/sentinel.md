## 2025-02-27 - DOMPurify Configuration for Math/SVG
**Vulnerability:** XSS vulnerabilities found in `dangerouslySetInnerHTML` in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx` due to unsanitized raw HTML from lesson content.
**Learning:** This codebase heavily relies on `dangerouslySetInnerHTML` to render complex math topics, which can include standard HTML formatting, MathML, and SVG. Simply applying basic DOMPurify drops legitimate elements like `<math>` and breaks the presentation.
**Prevention:** Always use `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to safely render complex math content while preventing XSS. Do not use manual tag allowlists.
