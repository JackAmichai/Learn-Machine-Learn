## 2024-03-05 - DOMPurify Configuration for MathML/SVG
**Vulnerability:** XSS risk via `dangerouslySetInnerHTML` rendering math topic data.
**Learning:** Default DOMPurify sanitization aggressively strips `<math>` and `<svg>` elements necessary for standard math components.
**Prevention:** Always use `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to safely allow math/SVG elements in React rendering without opening up XSS vectors.
