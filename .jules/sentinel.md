## 2026-06-03 - Prevent XSS in HTML-injected Components
**Vulnerability:** Cross-Site Scripting (XSS) via un-sanitized content injected via dangerouslySetInnerHTML in MathModal.jsx.
**Learning:** The project relies on rendering raw HTML content representing Math equations without a secure barrier, assuming the provided content is inherently safe.
**Prevention:** Apply DOMPurify.sanitize with the options '{ USE_PROFILES: { html: true, mathMl: true, svg: true } }' to securely render the required tags while blocking potential XSS.
