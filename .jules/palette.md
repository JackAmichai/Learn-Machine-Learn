
## 2025-02-12 - Missing ARIA Labels on Custom Modal Close Buttons
**Learning:** Custom modals (like in `CodeExport.jsx`) frequently use simple '×' characters for their close buttons without an accessible name, making them unreadable to screen readers. This pattern appears to be a common issue across various custom overlay components in this codebase.
**Action:** Whenever reviewing or creating new custom modal components or dialogs, explicitly check that any icon-only dismiss controls (like '×' buttons) include a descriptive `aria-label` (e.g., `aria-label="Close modal"`).
