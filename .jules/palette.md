## 2025-02-12 - Nested Tooltips in Buttons
**Learning:** Nesting interactive components like `Tooltip` (which has `role="button"` or `tabIndex="0"`) inside a `<button>` creates an accessibility violation and confusing UX.
**Action:** Always separate the tooltip trigger from the action button. Place them side-by-side using a flex container to maintain visual association without semantic nesting.
