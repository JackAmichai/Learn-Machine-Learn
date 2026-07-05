## 2024-05-18 - Fix XSS Vulnerability in MathModal
**Vulnerability:** Unsanitized user inputs in `dangerouslySetInnerHTML`.
**Learning:** `dangerouslySetInnerHTML` directly renders HTML from strings which can expose the application to cross-site scripting (XSS) attacks. Using DOMPurify to sanitize inputs ensures malicious scripts aren't executed.
**Prevention:** Always sanitize inputs meant for `dangerouslySetInnerHTML` using `DOMPurify.sanitize(input)`. Ensure you configure appropriate DOMPurify profiles like `USE_PROFILES: { html: true, mathMl: true, svg: true }` if required for styling/structure.
