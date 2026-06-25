## 2025-02-24 - [Critical] XSS Vulnerabilities in MathModal and LookingForward via dangerouslySetInnerHTML
**Vulnerability:** Several occurrences of `dangerouslySetInnerHTML` were found in `src/components/MathModal.jsx` and `src/pages/LookingForward.jsx` rendering unsanitized HTML data.
**Learning:** `dangerouslySetInnerHTML` allows arbitrary HTML execution (Cross-Site Scripting, XSS) if the source data is ever modified to contain malicious scripts.
**Prevention:** Always sanitize data parsed with `dangerouslySetInnerHTML` using a library like DOMPurify. Remember to configure DOMPurify to allow specific tags like `<math>`, `<svg>`, or `<iframe>` if they are required by the component content.
