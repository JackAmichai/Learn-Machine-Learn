## 2024-05-18 - XSS Vulnerability in MathModal
**Vulnerability:** The `MathModal` component used `dangerouslySetInnerHTML` to render HTML content for Math topics without any sanitization, creating a Cross-Site Scripting (XSS) vulnerability if malicious content is introduced.
**Learning:** Using `dangerouslySetInnerHTML` directly with unsanitized content (even if the content is seemingly "safe" internal data like `mathContent.js`) is an anti-pattern and a significant security risk. React explicitly names this prop "dangerously" to warn developers.
**Prevention:** Always use `dompurify` (`DOMPurify.sanitize()`) to sanitize HTML strings before passing them to `dangerouslySetInnerHTML`. Ensure this is a mandated project practice for any dynamic HTML rendering.
