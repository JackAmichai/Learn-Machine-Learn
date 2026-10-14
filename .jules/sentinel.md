## 2024-05-24 - XSS in dangerouslySetInnerHTML with DOMPurify
**Vulnerability:** Found multiple instances where unsanitized user or external content could be passed directly to `dangerouslySetInnerHTML`.
**Learning:** Using DOMPurify is necessary, but standard profiles will strip out math equations and SVG graphics needed by the visualizers.
**Prevention:** When using `DOMPurify` in this repository, always explicitly allow HTML, MathML, and SVG by passing `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` to `DOMPurify.sanitize()`.
