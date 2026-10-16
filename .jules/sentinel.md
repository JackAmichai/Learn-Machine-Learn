## 2025-02-23 - Prevent XSS in dangerouslySetInnerHTML with DOMPurify
**Vulnerability:** The application was using React's `dangerouslySetInnerHTML` to render HTML strings without proper sanitization, leading to potential Cross-Site Scripting (XSS) vulnerabilities.
**Learning:** Even though the content might currently come from trusted sources within the codebase, displaying HTML dynamically always carries a risk if the source data structure changes or user input is inadvertently included in the future.
**Prevention:** Always sanitize any HTML string using a trusted library like `dompurify` before passing it to `dangerouslySetInnerHTML`. Ensure that necessary tags like SVG and MathML are explicitly allowed if required by the application's content by configuring DOMPurify profiles.
