## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-04-11 - Custom Modals without Dialog/ARIA Defaults
**Learning:** Custom modal components (like `CodeExport`) often lack basic accessibility attributes that native `<dialog>` elements or established libraries provide automatically, such as `aria-label`s on icon-only close buttons (`×`), `role="tablist"` for language switches, and focusability on scrollable content areas.
**Action:** Always verify scrollable code blocks have `tabIndex={0}` and `role="region"`, ensure icon-only buttons have `aria-label`, and implement proper ARIA roles for custom tabbed interfaces within modals.
