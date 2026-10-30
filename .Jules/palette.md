## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Missing Aria Labels on Custom Modals
**Learning:** Icon-only close buttons (like the `×` button) in custom modals often lack `aria-label`s, creating screen reader issues, as seen in `CodeExport.jsx` and potentially other custom modal dialogs.
**Action:** Always verify custom modal implementations include accessible names (like `aria-label`) on icon-only controls.
