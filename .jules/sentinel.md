## 2024-10-02 - XSS Vulnerability in dynamically injected HTML
**Vulnerability:** XSS vulnerability through unsanitized input rendered via `dangerouslySetInnerHTML`.
**Learning:** Dynamically setting HTML without sanitization opens applications to XSS attacks, especially when the content originates from internal configurations or users, highlighting an architectural gap.
**Prevention:** Always sanitize dynamically injected HTML content using a library like `dompurify` (e.g., `DOMPurify.sanitize(content)`) before passing it to `dangerouslySetInnerHTML`. Use profiles to preserve necessary elements like HTML, MathML, and SVG.
