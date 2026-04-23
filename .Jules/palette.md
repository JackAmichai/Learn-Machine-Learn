## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.
## 2024-05-18 - Component-scoped styles in Modals
**Learning:** When using component-scoped `<style>` tags alongside conditionally rendered components or portals (e.g., in `CodeExport.jsx`), rendering the `<style>` block conditionally within the modal causes external trigger elements to lose their styling when the modal is closed.
**Action:** Ensure the `<style>` block is rendered unconditionally in the main DOM so trigger elements retain their styling regardless of modal visibility state.
