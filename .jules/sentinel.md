## 2025-02-14 - XSS via dangerouslySetInnerHTML in MathModal
**Vulnerability:** XSS vulnerability found due to unsanitized user-provided or dynamically loaded HTML injected via `dangerouslySetInnerHTML` in `src/components/MathModal.jsx`.
**Learning:** React's `dangerouslySetInnerHTML` inherently trusts the input, meaning any unsanitized HTML can execute arbitrary JavaScript. When using `DOMPurify` to fix this, it's necessary to pass `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` so that mathematical symbols and SVGs are not aggressively stripped out.
**Prevention:** Always sanitize dynamically loaded HTML with a library like `DOMPurify` before injecting it into the DOM, and make sure the appropriate profiles are configured.
