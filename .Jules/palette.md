## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-06-29 - Close Button Accessibility
**Learning:** Icon-only close buttons (like '×' inside modals) without ARIA labels are a common accessibility issue for screen readers.
**Action:** Always verify that 'x' buttons or icon-only buttons include an  attribute (e.g., `aria-label="Close modal"`) to clearly describe their function.

## 2025-06-29 - CodeExport Modal Close Button Accessibility
**Learning:** Found a pattern where custom modal close buttons (using just the "×" character) lack accessibility labels, which prevents screen readers from announcing their purpose.
**Action:** In future reviews, always verify that icon-only interactive elements, especially custom "close" buttons, are equipped with an `aria-label` attribute.
