## 2024-10-28 - XSS in dangerouslySetInnerHTML with Math/SVG content
**Vulnerability:** XSS vulnerability in MathModal.jsx and LookingForward.jsx due to unsanitized use of dangerouslySetInnerHTML.
**Learning:** DOMPurify is needed for sanitization, but when dealing with math equations and diagrams, default sanitization will strip them out. The USE_PROFILES: { html: true, mathMl: true, svg: true } configuration must be used to preserve them while still stopping XSS.
**Prevention:** Always use DOMPurify with dangerouslySetInnerHTML, and remember to configure appropriate profiles if the content legitimately requires MathML or SVGs.
