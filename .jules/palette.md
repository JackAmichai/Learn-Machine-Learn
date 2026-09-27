
## 2024-05-18 - Missing ARIA label in CodeExport modal close button
**Learning:** Found a pattern where interactive standard buttons (like '×' for close) nested inside custom modal components often lack `aria-label`s, making them invisible to screen readers despite being functional and focusable.
**Action:** When adding or reviewing modal/dialog components, explicitly ensure that any close icon/button contains an accessible name (e.g. `aria-label="Close modal"`).
