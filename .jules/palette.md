## 2025-04-15 - ARIA attributes on Canvas elements
**Learning:** Canvas elements used for data visualization (like OutputPlot's model decision boundary) are not accessible by default to screen readers.
**Action:** Always add `role="img"` and a descriptive `aria-label` to such canvas elements so that their purpose and content is perceivable by assistive technologies.
