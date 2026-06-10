## 2024-06-10 - Fix Cross-Site Scripting via dangerouslySetInnerHTML
**Vulnerability:** XSS risk due to unsanitized payload passing from `mathContent.js` to `dangerouslySetInnerHTML` via variables `data.content`, `data.solved`, and `data.shortcomings`.
**Learning:** Utilizing DOMPurify required a specific profile `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` so that mathematical symbols, standard HTML tags, and icons were not stripped from the application.
**Prevention:** Always sanitize dynamic HTML properties with DOMPurify passing the required profiles rather than directly passing to `dangerouslySetInnerHTML`.
