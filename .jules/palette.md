## 2024-05-24 - Missing ARIA labels in custom modals
**Learning:** Custom modal components in this application (like CodeExport) frequently omit `aria-label`s on standard interactive elements like the '×' close button, creating a recurring accessibility barrier.
**Action:** When implementing or modifying custom modal components, always verify that icon-only interactive standard buttons explicitly include an accessible name (e.g., `aria-label="Close modal"`).
