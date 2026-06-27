## 2026-06-27 - [Sanitize dangerouslySetInnerHTML with DOMPurify]
**Vulnerability:** Potential XSS via unsanitized HTML data passed to `dangerouslySetInnerHTML` in MathModal components.
**Learning:** The default DOMPurify configuration strips math-related elements (like `<math>` and `<svg>`) which breaks the visual rendering of technical content in this application.
**Prevention:** Use `DOMPurify.sanitize` alongside explicitly enabled profiles (`USE_PROFILES: { html: true, mathMl: true, svg: true }`) when rendering technical data to prevent XSS without destroying expected visualization elements.
