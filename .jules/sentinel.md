## 2024-10-26 - XSS vulnerabilities using dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerabilities using dangerouslySetInnerHTML were found when rendering dynamic content in src/components/MathModal.jsx and src/pages/LookingForward.jsx.
**Learning:** `dangerouslySetInnerHTML` can be exploited if rendering untrusted user input without sanitization. In a system dynamically loading UI elements, robust sanitization is required.
**Prevention:** Avoid rendering raw HTML strings without properly sanitizing it with a library like DOMPurify. Explicitly allow HTML profiles when sanitizing if needed, such as with mathML or SVG in this codebase.
