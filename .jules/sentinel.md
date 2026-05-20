## 2024-05-24 - Unsanitized HTML Rendering in React

**Vulnerability:** The application was passing raw HTML strings (like `data.content` or `lesson.solved`) directly into React's `dangerouslySetInnerHTML` prop in `MathModal.jsx` and `LookingForward.jsx` without any sanitization.
**Learning:** This architectural gap allows any malicious HTML or JavaScript embedded in the content files to be executed by the user's browser (Cross-Site Scripting - XSS). React specifically names the prop `dangerouslySetInnerHTML` to warn developers of this exact risk.
**Prevention:** Always use a well-maintained HTML sanitizer like `DOMPurify` before injecting dynamic or external HTML. Be sure to configure it appropriately for your app's needs (e.g., enabling `mathMl: true` and `svg: true` to prevent stripping legitimate equations or visuals in a math app).
