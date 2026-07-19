## 2025-02-28 - XSS via Math Content

**Vulnerability:** Use of `dangerouslySetInnerHTML` for lesson content and Math Topics without any sanitization in `MathModal.jsx`.
**Learning:** `dangerouslySetInnerHTML` is used for content dynamically loaded that contains HTML, which is a common practice in this app. However, if this content gets tainted by external user data or APIs, this would lead to stored XSS.
**Prevention:** Sanitization using DOMPurify should be a standard whenever using `dangerouslySetInnerHTML`. We specifically enabled `USE_PROFILES: { html: true, mathMl: true, svg: true }` to allow standard formatting alongside SVG and MathML elements used by math-centric content.
