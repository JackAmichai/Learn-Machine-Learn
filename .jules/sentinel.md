
## 2024-05-24 - Safe DOMPurify Usage for MathML and SVG
**Vulnerability:** Unsanitized `dangerouslySetInnerHTML` usage leading to potential XSS in content components (MathModal, LookingForward).
**Learning:** Standard DOMPurify strips out MathML and SVG which are essential for rendering mathematical formulas and visualizations in this application.
**Prevention:** Always explicitly allow HTML, MathML, and SVG by passing `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` when using `DOMPurify.sanitize()` in this project.
