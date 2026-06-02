## 2024-06-02 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Unsanitized dynamic content passed to dangerouslySetInnerHTML.
**Learning:** Dynamic content must be sanitized before rendering. However, because mathematical and interactive components are heavily used, DOMPurify configuration must retain specific profiles ({ USE_PROFILES: { html: true, mathMl: true, svg: true } }) to avoid breaking SVG visualizers and math formulas.
**Prevention:** Always wrap dynamically generated HTML with DOMPurify.sanitize() before passing to dangerouslySetInnerHTML and include appropriate allowed profiles based on the content type.
