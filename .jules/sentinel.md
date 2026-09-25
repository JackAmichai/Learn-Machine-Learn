
## 2024-05-24 - Cross-Site Scripting (XSS) via dangerouslySetInnerHTML
**Vulnerability:** Found multiple instances where dynamic content (`data.content`, `data.solved`, etc.) was being injected directly into the DOM using `dangerouslySetInnerHTML` without any prior sanitization. This is a critical vulnerability as it opens the application to Cross-Site Scripting (XSS) attacks if any of that data is ever influenced by user input or compromised sources.
**Learning:** Even if data currently comes from internal configuration (`MATH_TOPICS`), using `dangerouslySetInnerHTML` without sanitization creates a fragile architecture that can easily become vulnerable as the application evolves and new data sources are introduced.
**Prevention:** Always use a robust HTML sanitization library, such as `DOMPurify` (e.g., `DOMPurify.sanitize(content)`), to sanitize any HTML content before passing it to `dangerouslySetInnerHTML`.
