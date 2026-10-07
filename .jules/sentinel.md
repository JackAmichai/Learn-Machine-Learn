## 2024-05-24 - DOMPurify usage with MathML and SVG
**Vulnerability:** XSS vulnerability through unsanitized `dangerouslySetInnerHTML` injections in MathModal and LookingForward.
**Learning:** This codebase relies on HTML configs to render content, including math equations and SVGs. Standard sanitization strips these necessary elements out.
**Prevention:** Always use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` when sanitizing dynamically injected React content in this repo to prevent breaking math and visualizer components.
