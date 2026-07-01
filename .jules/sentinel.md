## 2025-02-23 - DOMPurify Configuration for Specialized Rendering
**Vulnerability:** XSS vulnerability via \`dangerouslySetInnerHTML\` rendering un-sanitized external content in React components (e.g., \`MathModal.jsx\`).
**Learning:** Default DOMPurify configuration is too restrictive for specialized educational content, aggressively stripping valid elements like \`<math>\` and \`<svg>\` which are necessary for the interactive visualizers to function correctly.
**Prevention:** Always specify appropriate built-in \`USE_PROFILES\` (e.g., \`{ html: true, mathMl: true, svg: true }\`) when configuring DOMPurify for components that require rendering specialized mathematical or vector graphics content.
