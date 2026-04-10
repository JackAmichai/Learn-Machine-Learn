## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-13 - Code Block Copy Interaction
**Learning:** Absolute-positioned utility buttons (like "Copy") placed inside scrollable code blocks (`<pre>`) often obscure text lines if the content container lacks sufficient padding, especially when text wrapping occurs.
**Action:** When adding absolute-positioned interactive elements over text or code blocks, ensure the underlying scrollable container (e.g., `<pre>`) has adequate padding on the corresponding side to prevent overlap and maintain readability.
