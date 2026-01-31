## 2025-05-27 - Implicit Icons Need Explicit Voice

**Learning:** Buttons using text characters as icons (like '+', '-', '×') are visually intuitive but semantically ambiguous to screen readers. A '×' might be read as 'multiplication sign', failing to convey 'Remove Layer'.

**Action:** Always pair character-based icons with `aria-label` to describe the *action* and the *target* (e.g., 'Remove hidden layer 2'), not just the visual symbol.
