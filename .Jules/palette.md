## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-23 - Interactive Element Nesting
**Learning:** React elements with \`role="button"\` or interactive roles like \`Tooltip\` must not be nested inside other buttons or interactive controls, as it creates invalid HTML semantics, breaks focus management, and degrades screen reader experiences.
**Action:** Always structure interactive elements as siblings inside a wrapper (like a flex container) to maintain visual alignment without compromising DOM validity or accessibility.
