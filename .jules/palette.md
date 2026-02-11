## 2025-05-27 - MathModal Formula Accessibility
**Learning:** Interactive visualizations often rely solely on mouse hover for feedback, excluding keyboard users. By mapping `onFocus` and `onBlur` handlers on focusable elements (like sliders) to the same state change logic as `onMouseEnter`/`onMouseLeave`, we can provide an equivalent experience for keyboard users.
**Action:** When building interactive educational components, always ensure that "hover" effects are also triggered by focus events on the associated interactive control.
