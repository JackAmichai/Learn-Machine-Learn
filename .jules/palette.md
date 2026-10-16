## 2024-03-22 - Missing ARIA Labels in Modals
**Learning:** Standard interactive buttons within custom modal components (like the '×' close button in CodeExport.jsx) frequently lack `aria-label` attributes.
**Action:** Ensure all icon-only or visually explicit but semantically ambiguous buttons in modals receive appropriate `aria-label` attributes for accessibility.
