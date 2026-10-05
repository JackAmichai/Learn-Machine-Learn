## 2024-10-05 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** In this application's custom modal implementations (like `CodeExport.jsx`, `MathModal.jsx`, `AccessibilityPanel.jsx`), interactive close buttons using only a multiplication symbol character (`×`) frequently lack accessible names (`aria-label`), making them opaque to screen reader users.
**Action:** When inspecting or refactoring custom modal UI components in this codebase, explicitly verify that all icon-only buttons (like `×` for close or `+`/`-` for adjustments) have descriptive `aria-label`s attached to them.
