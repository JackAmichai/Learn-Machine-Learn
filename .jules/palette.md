## 2025-02-18 - Invalid Interactive Element Nesting
**Learning:** `label` elements cannot contain interactive elements (like buttons), as this creates invalid HTML and confuses assistive technologies.
**Action:** When a label needs to contain an interactive element (like a Tooltip), separate the label and the interactive element. Use `aria-label` or `aria-labelledby` to associate the input with its description if the visual label is not a standard `<label>`.
