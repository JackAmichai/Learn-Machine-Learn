## 2024-06-26 - [DOMPurify Configuration for Interactive Math Content]
**Vulnerability:** XSS vulnerability in dynamically rendered math and lesson content using `dangerouslySetInnerHTML` with raw data variables.
**Learning:** Using DOMPurify to sanitize HTML content in this project requires specific profiles (e.g., `mathMl`, `svg`) to be enabled. The default DOMPurify configuration aggressively strips tags like `<math>` and `<svg>`, breaking legitimate visualizations.
**Prevention:** When adding DOMPurify for XSS protection on mathematical or complex interactive content, ensure built-in profiles are used instead of manually listing allowed tags, e.g., `DOMPurify.sanitize(data, { USE_PROFILES: { html: true, mathMl: true, svg: true } })`.
