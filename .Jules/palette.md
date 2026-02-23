## 2024-05-21 - Tooltip Nesting Patterns
**Learning:** Nesting `<Tooltip>` components directly inside interactive elements (like `<button>` or `<label>`) creates invalid HTML (buttons inside buttons) and breaks accessibility trees.
**Action:** Always place the Tooltip component *adjacent* to the trigger element, using a flex wrapper or positioned container to maintain the visual relationship without nesting the DOM elements.
