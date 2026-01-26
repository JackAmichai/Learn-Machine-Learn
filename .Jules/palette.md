## 2025-02-19 - Tooltip Focus Trap
**Learning:** Tooltips that close on `blur` can trap keyboard users if the tooltip contains interactive elements. The `blur` event fires on the trigger before the focus moves to the tooltip content.
**Action:** Use `e.relatedTarget` in the `onBlur` handler to check if the new focus target is inside the component container before closing the tooltip.
