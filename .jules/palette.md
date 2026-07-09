## 2024-07-09 - CodeExport Modal Aria Label
**Learning:** Icon-only modal close buttons (like "×") lack context and read out confusingly (e.g., "multiply" or "button") for screen readers. A simple \`aria-label\` provides crucial context to visually impaired users navigating complex applications.
**Action:** Consistently ensure all visually implied but text-less actionable elements (e.g. `×` buttons) include descriptive `aria-label` attributes for accessibility.
