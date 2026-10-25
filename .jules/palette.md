## 2024-10-25 - Missing aria-label on code export close button
**Learning:** Found an icon-only close button `×` in `src/components/CodeExport.jsx` without an `aria-label`. This makes it inaccessible for screen readers.
**Action:** Always ensure that icon-only buttons, especially in modals and dialogs, have descriptive `aria-label` attributes.
