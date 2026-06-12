## 2024-06-12 - DOMPurify Integration with Custom Profiles
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` directly rendering unvalidated content from `mathContent.js`.
**Learning:** Standard DOMPurify sanitization strips essential SVG and MathML tags used extensively for interactive visualizations and equations.
**Prevention:** When mitigating XSS in React via `DOMPurify.sanitize()`, always configure custom profiles (`{ USE_PROFILES: { html: true, mathMl: true, svg: true } }`) if the component relies on inline SVG graphics or mathematical formulas to preserve functionality.
