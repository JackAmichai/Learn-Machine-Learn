## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2025-02-12 - Missing Aria-labels on Custom Modal Closures
**Learning:** Custom modals (like in `CodeExport.jsx`, `MathModal.jsx`) that use a raw `<button>×</button>` frequently lack explicit `aria-label`s, creating silent interaction points for screen readers.
**Action:** Always verify that 'x' style dismiss buttons across all custom overlay components explicitly include `aria-label="Close [context]"` to ensure robust keyboard/screen-reader navigation.
