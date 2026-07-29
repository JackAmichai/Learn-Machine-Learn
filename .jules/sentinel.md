## 2026-07-29 - Prevent XSS in HTML injection
**Vulnerability:** Direct usage of `dangerouslySetInnerHTML` without sanitizing the input data in `src/components/MathModal.jsx`.
**Learning:** External or user-provided data directly rendered into the DOM bypassing React's built-in escaping can be weaponized. Even if current sources seem safe, the pattern is extremely risky if the component is reused.
**Prevention:** Always use a well-vetted HTML sanitizer (like `DOMPurify`) before rendering unescaped HTML via `dangerouslySetInnerHTML`.
