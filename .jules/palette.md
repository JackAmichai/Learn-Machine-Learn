## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Icon-only buttons
**Learning:** Icon-only buttons frequently lack an ARIA label which is critical for screen reader accessiblity. We found this in \`CodeExport.jsx\`
**Action:** When creating icon-only buttons, add an aria-label and set aria-hidden to "true" for the child icon character.
