## 2024-07-26 - Missing ARIA Labels on Custom Modal Close Buttons
**Learning:** Found that custom modal close buttons using the "×" character lack ARIA labels, which causes screen readers to read the character literally (e.g., "times" or "multiply").
**Action:** Always add `aria-label="Close [modal context]"` to any custom close buttons in modals or overlays.
