## 2024-05-18 - XSS Vulnerability in MathModal and LookingForward via dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability through usage of `dangerouslySetInnerHTML` with untrusted data in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** `dangerouslySetInnerHTML` must always be sanitized before injection.
**Prevention:** Use `dompurify` and explicitly allow HTML, MathML, and SVG when standard HTML/math/SVG inputs are expected via `dangerouslySetInnerHTML`.
