
## 2024-03-20 - Unsanitized User Content in MathModal and LookingForward
**Vulnerability:** Direct rendering of dynamic object properties (`data.content`, `data.solved`, `lesson.content`, etc.) using `dangerouslySetInnerHTML` in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx` without any sanitization.
**Learning:** Even if data is primarily sourced from internal content files (like `mathContent.js`), relying on `dangerouslySetInnerHTML` directly creates a latent XSS vulnerability, especially if content becomes user-supplied or fetched from external APIs in the future.
**Prevention:** Always wrap dynamically injected HTML content using `DOMPurify.sanitize()` before passing it to `dangerouslySetInnerHTML`, regardless of the current data source.
