## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Icon-only Buttons need ARIA labels
**Learning:** Found multiple instances of icon-only close buttons (`×`) without an `aria-label`, specifically in Modals and panels. Screen readers struggle with non-descriptive characters.
**Action:** Always verify modals and panels with close buttons have an appropriate `aria-label` attribute (e.g. `aria-label="Close modal"`).
