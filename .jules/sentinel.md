## 2024-10-24 - Cross-Site Scripting (XSS) via dangerouslySetInnerHTML
**Vulnerability:** Unsanitized dynamic content passed directly to dangerouslySetInnerHTML in MathModal and LookingForward components.
**Learning:** Hardcoded/static content data loaded at runtime is still susceptible to injection if the data source becomes compromised or user-influenced.
**Prevention:** Always use a sanitizer like DOMPurify when utilizing dangerouslySetInnerHTML, enabling specific profiles (like mathMl/svg) if needed, rather than trusting the content source.
