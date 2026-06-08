## 2026-06-08 - DOMPurify Configuration for Interactive Math Content
**Vulnerability:** XSS via unsanitized `dangerouslySetInnerHTML` rendering educational content containing HTML, SVG, and MathML.
**Learning:** The default DOMPurify configuration strips SVG and MathML tags, which are essential for rendering math equations and visual icons in educational components like `MathModal`. Sanitization must carefully balance security with the application's functional rendering requirements.
**Prevention:** When using DOMPurify in contexts that require rich mathematical or vector visual representations, explicitly enable the necessary profiles (e.g., `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`) to prevent breaking the UI while maintaining XSS protection.
