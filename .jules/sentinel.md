## 2025-02-17 - React DOM XSS via dangerouslySetInnerHTML
**Vulnerability:** Cross-Site Scripting (XSS) vulnerability due to raw HTML injection using React's `dangerouslySetInnerHTML`.
**Learning:** `dangerouslySetInnerHTML` is inherently dangerous as it bypasses React's built-in XSS protection (auto-escaping). Hardcoding content with innerHTML introduces a significant risk if the content data source ever changes or accepts external input.
**Prevention:** Always use `DOMPurify.sanitize(htmlString)` whenever `dangerouslySetInnerHTML` is strictly necessary to clean out potentially malicious script tags or attributes before injecting HTML directly into the DOM.
