## 2026-05-10 - XSS via dangerouslySetInnerHTML
**Vulnerability:** Found multiple usages of `dangerouslySetInnerHTML` rendering untrusted HTML strings without sanitization in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** By directly rendering variables like `data.content` which come from a data file, we expose the application to potential XSS attacks if the content source is ever compromised or user-influenced. Even if the data currently originates from static local files, defensively sanitizing it is a crucial best practice for long-term security.
**Prevention:** Always use a sanitization library like `DOMPurify` to clean HTML content before passing it to `dangerouslySetInnerHTML`. Ensure USE_PROFILES: { mathMl: true, svg: true } is enabled for contexts requiring specific tags.
