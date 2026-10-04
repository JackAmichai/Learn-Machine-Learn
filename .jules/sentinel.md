## 2024-05-24 - DOMPurify Usage with MathML and SVG Profiles
**Vulnerability:** XSS vulnerability through unsanitized `dangerouslySetInnerHTML` in components rendering mathematical content (`MathModal.jsx`, `LookingForward.jsx`).
**Learning:** In this specific codebase, using standard DOMPurify sanitization strips out critical MathML and SVG equations, breaking the visual representations.
**Prevention:** Always explicitly allow HTML, MathML, and SVG by passing `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` to `DOMPurify.sanitize()` when mitigating XSS here.
