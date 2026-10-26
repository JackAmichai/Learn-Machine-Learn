## 2024-05-18 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** Icon-only close buttons (like the `x` in custom modals) often lack accessible names, causing screen readers to announce them ambiguously. This pattern was observed in the `CodeExport` component.
**Action:** Always ensure that icon-only interactive elements, such as close buttons, include an `aria-label` attribute (e.g., `aria-label="Close modal"`) to provide context for assistive technologies.
