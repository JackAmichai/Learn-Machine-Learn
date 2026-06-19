
## 2024-06-19 - React dangerouslySetInnerHTML XSS Vector
**Vulnerability:** The `MathModal` component used `dangerouslySetInnerHTML` to render dynamic HTML content directly from the `MATH_TOPICS` data structure without any sanitization, creating a potential Cross-Site Scripting (XSS) vulnerability if the content source is compromised or accepts user input.
**Learning:** While static data objects might seem safe, treating any dynamically injected HTML as trusted violates defense-in-depth principles. React's `dangerouslySetInnerHTML` lives up to its name and must always be paired with a sanitization step.
**Prevention:** Always wrap variables passed to `dangerouslySetInnerHTML` with `DOMPurify.sanitize()` (or equivalent) to strip executable scripts and unsafe tags before rendering.
