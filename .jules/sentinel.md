## 2024-05-29 - Unsanitized dynamically injected HTML
**Vulnerability:** Found `dangerouslySetInnerHTML` used directly with dynamically loaded content (e.g. `data.content`) without any sanitization in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx`, leading to a high-risk Cross-Site Scripting (XSS) vulnerability.
**Learning:** Using React's `dangerouslySetInnerHTML` bypassed React's built-in XSS protection, allowing external or dynamic content strings to directly execute scripts within the browser if maliciously crafted.
**Prevention:** Always sanitize dynamic or external HTML content using `DOMPurify.sanitize()` (with `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`) before passing it to `dangerouslySetInnerHTML`.
