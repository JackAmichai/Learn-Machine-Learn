## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-08-01 - CodeExport Accessibility
**Learning:** Found that the code export modal close button `×` was completely inaccessible to screen readers because it relied on the visual meaning of the multiplication symbol without any `aria-label`.
**Action:** Always add descriptive `aria-label`s to any icon-only buttons (especially common ones like "close"), and don't assume visual cues like `×` are sufficient for screen readers.
