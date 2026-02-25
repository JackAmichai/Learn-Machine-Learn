## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2025-02-12 - Accessibility of Custom Tables
**Learning:** The application uses `div`-based tables (like in `StatsPanel`) with `role="table"` but often omits required child roles (`row`, `columnheader`, `cell`), making them inaccessible to screen readers.
**Action:** When implementing custom data grids, always include the full hierarchy of ARIA roles and ensure cells are keyboard-accessible if they contain information (e.g., via `tabIndex="0"` and `aria-label`).

## 2025-02-12 - Testing TensorFlow.js Components
**Learning:** Playwright verification of components relying on `tfjs-backend-webgl` fails in headless environments due to missing WebGL context, causing application crashes.
**Action:** Use `vi.mock` to stub `tfjs` behavior in unit tests for reliable verification of UI logic, rather than relying solely on end-to-end tests for ML-heavy components.
