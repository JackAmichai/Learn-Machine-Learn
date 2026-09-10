## 2024-05-19 - XSS Vulnerability via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized user input and external content injected into the DOM via `dangerouslySetInnerHTML` in `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** `dangerouslySetInnerHTML` is extremely risky in React if the HTML content comes from CMS or any dynamic source. The application assumed the lesson content was safe, leading to a Cross-Site Scripting (XSS) vector.
**Prevention:** Always sanitize any dynamic HTML content before injecting it into the DOM, even if the source is considered internal. Use libraries like `DOMPurify` by default.
