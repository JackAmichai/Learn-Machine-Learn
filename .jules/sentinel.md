## 2024-05-24 - XSS Vulnerability in dynamically loaded content
**Vulnerability:** Use of `dangerouslySetInnerHTML` directly mapping JSON strings without proper sanitization.
**Learning:** Even internal content from data objects (like `MATH_TOPICS` and `lesson.content`) might contain unescaped content that exposes XSS vulnerabilities.
**Prevention:** Use DOMPurify and call `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to neutralize XSS payloads while preserving visual content.
