## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Copy Friction in Code Exports
**Learning:** Users instinctively look for a "Copy" button on any code block. Selecting text manually is high-friction, especially in modals.
**Action:** Always include a "Copy to Clipboard" button with visual feedback ("Copied!") for any read-only code or token display.
