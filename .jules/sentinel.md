## 2024-06-28 - Sanitize XSS vulnerability in MathModal
**Vulnerability:** dangerouslySetInnerHTML was used to render content without sanitizing it in MathModal.
**Learning:** When using DOMPurify to sanitize HTML content in this project (e.g., evaluating MATH_TOPICS data), the default configuration aggressively strips elements like <math> or <svg>. To robustly allow standard HTML alongside MathML and SVG elements, use built-in profiles instead of manually listing tags (e.g., DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })).
**Prevention:** Never use dangerouslySetInnerHTML on unsanitized data, and remember to use USE_PROFILES when using DOMPurify with MathML and SVG.
