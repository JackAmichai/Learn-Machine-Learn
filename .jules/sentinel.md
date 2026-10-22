
## 2023-10-25 - Prevent XSS with DOMPurify while Preserving Math and SVG
**Vulnerability:** XSS vulnerabilities due to unsanitized use of `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** Using `DOMPurify` directly without specifying profiles strips out standard HTML, MathML, and SVG components from the input. We need to explicitly allow them to maintain functionality in this codebase while stopping XSS.
**Prevention:** Always use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to safely render dynamic content that requires HTML, MathML, and SVG.
