## 2024-03-24 - Cross-Site Scripting (XSS) vulnerability in MathModal and LookingForward pages.
**Vulnerability:** XSS vulnerability through usage of dangerouslySetInnerHTML with unvalidated HTML content derived from configuration.
**Learning:** React dangerouslySetInnerHTML is a common source of XSS. Content injection, even when originally sourced from internal data, needs sanitization, especially if configurations can be injected or loaded from untrusted locations in the future.
**Prevention:** Always sanitize any dynamic HTML content with a library like DOMPurify before setting it using dangerouslySetInnerHTML, irrespective of the current source of that data.
