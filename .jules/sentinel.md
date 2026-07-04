## 2025-07-04 - DOMPurify with MathML and SVG
**Vulnerability:** XSS vulnerability through dangerouslySetInnerHTML rendering complex content from MATH_TOPICS.
**Learning:** When using DOMPurify in this project, the default configuration aggressively strips out `<math>` and `<svg>` elements which breaks rendering.
**Prevention:** Use built-in profiles instead of manually listing allowed tags: `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })`.
