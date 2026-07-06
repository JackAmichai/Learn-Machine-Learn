## 2025-02-23 - DOMPurify Configuration for Specialized Content
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` rendering `MATH_TOPICS` data without sanitization.
**Learning:** When sanitizing content that intentionally includes MathML or SVG elements alongside HTML, the default DOMPurify configuration aggressively strips them.
**Prevention:** Always use `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to safely allow specialized mathematical and vector graphic elements without sacrificing XSS protection.
