## 2023-10-08 - Unsanitized HTML rendering with dangerouslySetInnerHTML
**Vulnerability:** Use of dangerouslySetInnerHTML with unsanitized internal content properties (data.content, lesson.content) exposes the application to Cross-Site Scripting (XSS).
**Learning:** Even if HTML content originates from internal configurations or static sources initially, it should always be sanitized because data sources can evolve or become dynamic, introducing XSS risks.
**Prevention:** Always use a library like DOMPurify to sanitize HTML content before passing it to dangerouslySetInnerHTML.
