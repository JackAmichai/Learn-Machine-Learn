## 2025-02-18 - Nested Interactive Elements Pattern
**Learning:** Found a pattern where interactive `Tooltip` components are nested inside `button` elements (e.g., "Add Layer" button). This creates invalid HTML and confusing keyboard navigation, as users might focus the button and then the tooltip inside it.
**Action:** In future refactors, separate the label text/tooltip from the action button, or ensure the tooltip is non-interactive when used in this context.

## 2026-01-27 - Icon-Only Buttons in Controls
**Learning:** The 'Controls' component heavily relies on symbolic buttons (+, -, ×) for layer management without text labels, creating accessibility gaps.
**Action:** When working on complex control panels in this app, always check for icon-only buttons and ensure dynamic aria-labels (including indices) are present.
