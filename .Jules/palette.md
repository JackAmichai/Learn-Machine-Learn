## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2024-05-18 - Absolute Positioning in Scrollable Code Blocks
**Learning:** When adding absolute-positioned UI elements (like a "Copy" button) over a scrollable area (`overflow-x: auto` for a `<pre>` block), applying `overflow-x: auto` directly to the `position: relative` parent causes the absolutely positioned element to scroll with the content or get clipped.
**Action:** Always separate the scrollable content into an inner child wrapper (`.code-scroll-wrapper` with `overflow-x: auto`), leaving the parent as a static `position: relative` container. This ensures the absolutely positioned elements remain fixed relative to the container and do not scroll with the code.

## 2024-05-18 - Visual Feedback for Clipboard Actions
**Learning:** Users expect immediate visual confirmation when interacting with the clipboard.
**Action:** Use a temporary text change (e.g., from "Copy" to "Copied!") using `navigator.clipboard.writeText().then(...)` and a 2-second timeout to revert the state.
