## 2024-05-24 - DOMPurify Configuration Risk
**Vulnerability:** XSS mitigation introduced a functional regression by stripping standard HTML tags.
**Learning:** Using `DOMPurify.sanitize(..., { USE_PROFILES: { mathMl: true, svg: true } })` explicitly overrides the default behavior and *only* allows MathML and SVG, completely breaking text formatting by stripping all standard HTML tags (div, p, b, span, etc.).
**Prevention:** When using `USE_PROFILES` to allow MathML/SVG in DOMPurify, you must explicitly include `html: true` in the configuration object (i.e., `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`) to preserve standard UI structure.
