## 2025-07-15 - Fix XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Direct assignment of dynamic HTML strings into dangerouslySetInnerHTML in React components.
**Learning:** MathML and SVG elements are heavily used here and stripped by default DOMPurify configurations, breaking visual content if not carefully profiled.
**Prevention:** Always sanitize dangerouslySetInnerHTML and use DOMPurify USE_PROFILES configuration to allow standard mathematical tags.
