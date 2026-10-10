
## 2025-02-14 - XSS via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized dynamic content was passed to dangerouslySetInnerHTML in MathModal.jsx and LookingForward.jsx, risking XSS vulnerabilities.
**Learning:** Even internal static text from configuration files can introduce XSS if the files are modified or user inputs are injected at build/runtime. The use of DOMPurify with { USE_PROFILES: { html: true, mathMl: true, svg: true } } is necessary to safely render HTML, MathML, and SVG without breaking standard math visuals.
**Prevention:** Always sanitize any dynamic content passed to dangerouslySetInnerHTML using DOMPurify with the appropriate profiles allowed.
