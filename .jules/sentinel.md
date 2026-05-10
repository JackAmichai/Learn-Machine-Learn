## 2026-05-10 - False Positive: XSS in dangerouslySetInnerHTML
**Vulnerability:** Initially suspected XSS vulnerabilities in `dangerouslySetInnerHTML` usages within `MathModal.jsx` and `LookingForward.jsx`.
**Learning:** The content injected (e.g., `data.content`, `lesson.content`) originates from hardcoded application constants (like `MATH_TOPICS` in `mathContent.js`), not user input. Sanitizing this trusted, local content with libraries like DOMPurify is unnecessary security theater and can lead to functional regressions by stripping out essential tags (e.g., `<math>`, `<svg>`).
**Prevention:** Before applying HTML sanitization, trace the source of the data to verify if it is genuinely untrusted or user-controlled. Do not sanitize trusted application source code.
