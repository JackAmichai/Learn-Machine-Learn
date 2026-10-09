## 2024-05-30 - Prevent XSS in dynamically injected HTML content
**Vulnerability:** Unsanitized internal HTML string injections were used across MathModal and LookingForward via dangerouslySetInnerHTML.
**Learning:** Even though content originated from internal configurations/JSON files rather than direct user inputs, it violates best practices and introduces XSS vectors if the internal source is ever compromised or extended to user-generated contents.
**Prevention:** Always sanitize dynamically injected HTML content using DOMPurify (e.g., `DOMPurify.sanitize(content)`) before passing it to dangerouslySetInnerHTML. Ensure MathML and SVG are explicitly allowed in this codebase by passing `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` to prevent rendering regressions.
