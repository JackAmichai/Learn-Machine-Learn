## 2024-05-24 - Cross-Site Scripting via dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability in MathModal and LookingForward components caused by unsanitized dangerouslySetInnerHTML usages.
**Learning:** Using DOMPurify to sanitize content in this project requires explicitly passing { USE_PROFILES: { html: true, mathMl: true, svg: true } } so that math equations and SVGs are preserved without getting stripped out along with XSS payloads.
**Prevention:** Always sanitize dynamically rendered HTML with DOMPurify, especially when mathematical formulas or SVG representations are involved, ensuring proper profiles are allowed.
