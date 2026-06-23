
## 2026-06-23 - DOMPurify for React dangerouslySetInnerHTML
**Vulnerability:** React components dynamically rendering rich text properties containing HTML through `dangerouslySetInnerHTML` without sanitization are vulnerable to Cross-Site Scripting (XSS).
**Learning:** When using `dangerouslySetInnerHTML`, it bypasses React's automatic string encoding. We must manually sanitize inputs. For math/diagram contexts, aggressive default sanitizers might strip valid elements like `<math>` or `<svg>`.
**Prevention:** Use `DOMPurify.sanitize` with explicit `ADD_TAGS` and `ADD_ATTR` configurations for any rich HTML content rendered via `dangerouslySetInnerHTML`.
