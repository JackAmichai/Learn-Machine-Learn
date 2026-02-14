## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-13 - Code Export Friction
**Learning:** Users exporting code expect a 'Copy to Clipboard' action. Reliance on manual text selection in code blocks is a friction point, especially for long snippets.
**Action:** Always include a copy action for read-only code/config blocks.
