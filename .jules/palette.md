## 2025-05-18 - Missing aria-labels in Modal Components
**Learning:** In this codebase, interactive standard buttons (such as '×' for close) used within custom modal components often lack `aria-label`s.
**Action:** When modifying or creating modals, explicitly ensure that icon-only buttons include an accessible name (e.g., `aria-label="Close modal"`).
