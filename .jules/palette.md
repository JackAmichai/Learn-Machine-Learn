## 2023-10-01 - CodeExport Modal Accessibility and UX
**Learning:** React modals in this codebase (like `CodeExport`) often lack basic keyboard accessibility (Escape to close) and click-outside-to-close behavior. Icon-only close buttons also frequently lack `aria-label`s.
**Action:** Always verify that custom modal implementations have `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, an accessible close mechanism (Escape key + overlay click), and ensure icon-only buttons have an `aria-label`.
