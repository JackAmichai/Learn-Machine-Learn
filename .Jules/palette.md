## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-10-26 - Action Feedback Patterns
**Learning:** High-value actions like "Export Code" in modals often lack immediate feedback loops (like copy-to-clipboard buttons), forcing users to perform manual OS-level interactions.
**Action:** When designing export or sharing features, always include a one-click action button with immediate visual feedback (e.g., "Copied!" text change + Toast notification) to reduce friction.
