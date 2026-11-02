## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-05-19 - Accessible Close Buttons
**Learning:** Icon-only close buttons (like '×') in custom modals across the app often lack accessible names, making them unreadable by screen readers.
**Action:** Always verify that interactive icon-only buttons include an `aria-label` attribute (e.g., `aria-label="Close modal"`) when modifying or creating new UI components.
