## 2024-05-20 - Unsanitized HTML rendering via dangerouslySetInnerHTML

**Vulnerability:** Found multiple uses of `dangerouslySetInnerHTML` taking directly from a global dictionary of content (`MATH_TOPICS`) and components without any form of sanitization.
**Learning:** This could easily lead to an XSS (Cross Site Scripting) attack if those contents were to be dynamically modified.
**Prevention:** Using `dompurify` and calling `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` is the best approach to scrub inputs for malicious tags while keeping valid html/math tags.
