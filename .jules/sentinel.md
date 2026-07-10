## 2024-07-10 - Fixed XSS vulnerability in dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability in dangerouslySetInnerHTML used in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx` due to unsanitized math contents
**Learning:** Using DOMPurify to sanitize HTML content that contains MathML or SVG elements.
**Prevention:** Use DOMPurify.sanitize with `USE_PROFILES: { html: true, mathMl: true, svg: true }` when rendering math-related content.
