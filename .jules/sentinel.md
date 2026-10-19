## 2025-01-20 - XSS in mathematically rich content via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized HTML rendering via `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** Rendering complex mathematical content (which requires custom elements and attributes like MathML) safely requires explicit configuration. A default sanitize will strip valid mathematical notation causing a functional regression alongside the security fix.
**Prevention:** Always use `DOMPurify.sanitize` when dynamically injecting HTML. For rich content like math, ensure specific profiles (e.g. `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`) are explicitly enabled to maintain functionality while stripping malicious scripts.
