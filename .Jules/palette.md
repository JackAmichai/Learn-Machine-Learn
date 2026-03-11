## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-13 - Absolute Positioning in Scrollable Code Blocks
**Learning:** When adding absolute-positioned UI elements (like a "Copy" button) inside or over a scrollable container (e.g., `<pre>` with `overflow: auto`), placing the element directly inside the scrollable container causes it to scroll away with the content.
**Action:** Always introduce a relative positioning wrapper around the scrollable content, and place the absolute element as a sibling to the scrollable container, not inside it.
