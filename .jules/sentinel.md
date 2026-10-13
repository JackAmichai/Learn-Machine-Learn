## 2025-02-12 - Prevent XSS in dynamically injected content
**Vulnerability:** XSS vulnerability through unsanitized 'dangerouslySetInnerHTML'.
**Learning:** In React, 'dangerouslySetInnerHTML' can execute malicious scripts if content is not properly sanitized, even if the content originates from configuration files.
**Prevention:** Always use 'DOMPurify' with appropriate configurations (like allowing MathML/SVG if needed) before passing dynamic content to 'dangerouslySetInnerHTML'.
