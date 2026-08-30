## 2024-05-24 - Cross-Site Scripting (XSS) via dangerouslySetInnerHTML
**Vulnerability:** Found multiple instances of `dangerouslySetInnerHTML` being used to render HTML strings without proper sanitization in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** React provides `dangerouslySetInnerHTML` as a way to directly manipulate the DOM using a string, but this exposes the application to XSS attacks if the string contains malicious scripts, especially when rendering external or user-generated content like `lesson.content` or `data.content`.
**Prevention:** Always use a reputable library like `DOMPurify` to sanitize HTML strings before passing them to `dangerouslySetInnerHTML` or avoid using it altogether if possible.
