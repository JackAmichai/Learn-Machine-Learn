## 2025-02-14 - Fix XSS vulnerability in dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability due to un-sanitized dynamic HTML content passed directly into `dangerouslySetInnerHTML` in React components (`MathModal.jsx` and `LookingForward.jsx`).
**Learning:** Dynamic HTML insertion points in this codebase were missing essential sanitation. Even if current inputs seem internal, this poses a high risk if external data sources are later introduced, which could execute malicious scripts in the user's browser.
**Prevention:** Always use `DOMPurify.sanitize()` before passing any string to `dangerouslySetInnerHTML`, regardless of the data's apparent origin.
## 2025-02-14 - DOMPurify configuration for math content
**Vulnerability:** Core functionality breakage when sanitizing MathML/SVG content.
**Learning:** By default, DOMPurify might strip out MathML or SVG elements. When sanitizing content in a math-heavy application, it's critical to configure DOMPurify to allow these profiles.
**Prevention:** Use `DOMPurify.sanitize(content, { USE_PROFILES: { mathMl: true, svg: true } })` to safely preserve mathematical and graphical content while preventing XSS.
## 2025-02-14 - DOMPurify USE_PROFILES config
**Vulnerability:** Core functionality breakage when sanitizing HTML content alongside MathML/SVG content due to misconfiguration.
**Learning:** DOMPurify allows HTML, MathML, and SVG by default. Explicitly providing `USE_PROFILES: { mathMl: true, svg: true }` restricts allowed tags to ONLY those profiles, silently stripping out all standard HTML elements and breaking layout formatting.
**Prevention:** Rely on DOMPurify's defaults (which safely permit HTML, MathML, and SVG without manual overrides) unless there is a specific need to forcefully restrict the allowed profiles.
## 2025-02-14 - Correct DOMPurify USE_PROFILES config
**Vulnerability:** Core functionality breakage when sanitizing HTML content alongside MathML/SVG content due to misconfiguration (or DOMPurify stripping MathML/SVG by default in newer versions to prevent mutation XSS).
**Learning:** When using DOMPurify in a math-focused application, using `USE_PROFILES` requires explicitly allowing all needed profiles. Omitting `html: true` will strip out standard HTML elements, while relying solely on default settings may strip MathML and SVG in stricter setups.
**Prevention:** Use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to explicitly and safely preserve standard HTML, mathematical, and graphical content while preventing XSS.
