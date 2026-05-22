## 2025-05-22 - Prevent XSS in HTML rendering
**Vulnerability:** React components `MathModal.jsx` and `LookingForward.jsx` were rendering unsanitized HTML using `dangerouslySetInnerHTML`.
**Learning:** Using `dangerouslySetInnerHTML` directly with unsanitized data (e.g. `data.content`, `data.solved`, `data.shortcomings`, and `lesson.content`, `lesson.solved`, `lesson.shortcomings`) poses a serious Cross-Site Scripting (XSS) risk. In our case, the content may contain special tags for equations or SVG that get rendered directly to the DOM.
**Prevention:** Always sanitize dynamic HTML content using `DOMPurify.sanitize()` before passing it to `dangerouslySetInnerHTML`. Ensure `USE_PROFILES: { html: true, mathMl: true, svg: true }` is provided to `DOMPurify` to keep Math and SVG tags.
