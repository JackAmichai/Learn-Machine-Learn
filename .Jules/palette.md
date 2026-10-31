## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-05-15 - Missing ARIA Labels on Modals
**Learning:** Custom modal components in this application frequently lack `aria-label`s on their generic close ("×") buttons, making them inaccessible to screen readers.
**Action:** Always verify accessibility on custom "×" buttons, particularly inside dynamically rendered modals.
