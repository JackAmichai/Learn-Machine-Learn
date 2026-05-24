
## 2024-05-24 - Unsanitized dynamically rendered HTML Content

**Vulnerability:** The application was passing unverified string fields from internal data structures directly into React's `dangerouslySetInnerHTML` in both `MathModal.jsx` and `LookingForward.jsx` without sanitization.
**Learning:** Even internal, "trusted" data sources (such as `mathContent.js`) should be treated as potentially malicious, as they often contain rich text or HTML and may be modified or extended externally.
**Prevention:** Always use `DOMPurify.sanitize()` when injecting raw HTML strings via `dangerouslySetInnerHTML`. Ensure that essential rendering profiles (e.g., SVG, MathML) are explicitly enabled so valid interactive and visual elements aren't stripped while XSS attacks are prevented.
