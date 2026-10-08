## $(date +%Y-%m-%d) - CodeExport Close Button Accessibility
**Learning:** Found a missing accessible name on the close button ('×') inside the `CodeExport` modal. Icon-only buttons using just text like '×' or SVGs without labels cannot be announced correctly by screen readers.
**Action:** Always verify that interactive standard buttons (like '×' for close) used within custom modals include an accessible name via `aria-label` (e.g., `aria-label="Close modal"`).
