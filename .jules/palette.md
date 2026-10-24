## 2023-10-24 - Missing aria-label on close modal buttons
**Learning:** Custom modal implementations in this codebase frequently use standard character entities (like "×") for close buttons without accompanying accessible names, rendering them invisible to screen readers.
**Action:** Audit icon-only buttons in custom modal implementations (`CodeExport.jsx`, `AccessibilityPanel.jsx`) and proactively add `aria-label` attributes for accessibility.
