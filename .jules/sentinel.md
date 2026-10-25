## 2024-10-25 - DOMPurify with MathML and SVG profiles
**Vulnerability:** XSS vulnerability through dangerouslySetInnerHTML rendering math concepts.
**Learning:** DOMPurify strips out standard HTML when using specific profiles. Math equations and SVG graphics require { USE_PROFILES: { html: true, mathMl: true, svg: true } } to be properly sanitized without breaking functionality.
**Prevention:** Always use DOMPurify when using dangerouslySetInnerHTML, and ensure appropriate profiles are enabled if MathML or SVGs are present.
