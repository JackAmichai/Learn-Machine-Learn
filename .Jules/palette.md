## 2025-02-12 - Tooltip Nesting Patterns
**Learning:** Interactive tooltips (via `Tooltip.jsx`) are frequently nested inside or adjacent to other interactive elements (buttons, labels), creating potential invalid HTML (nested interactive controls) and focus management issues.
**Action:** In future, refactor `Tooltip` to be a non-interactive icon unless explicitly focused, or restructure UI to place help icons *outside* buttons/labels.

## 2026-02-16 - Interactive Canvas Touch Support
**Learning:** HTML5 `<canvas>` elements require explicit touch handling (`onTouchStart`, `onTouchMove`, `touch-action: none`) as they do not automatically map touch gestures to mouse events. This prevents mobile users from interacting with core features like drawing inputs.
**Action:** Always verify canvas interactions on mobile viewports and implement touch event listeners alongside mouse listeners for drawing components.
