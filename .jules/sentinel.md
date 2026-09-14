## YYYY-MM-DD - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Several components use `dangerouslySetInnerHTML` to render HTML strings without first sanitizing them, such as `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx`. This makes the application vulnerable to Cross-Site Scripting (XSS).
**Learning:** Even if data currently originates from internal configurations or static data files, relying on the assumption that it's safe is dangerous. It's a best practice to always sanitize input given to `dangerouslySetInnerHTML`.
**Prevention:** Always use a sanitation library like `dompurify` (e.g. `DOMPurify.sanitize(content)`) before passing data to `dangerouslySetInnerHTML` to ensure no malicious scripts can be executed.
