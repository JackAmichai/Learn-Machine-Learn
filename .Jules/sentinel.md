## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2025-01-28 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability via un-sanitized dynamic inputs (`data.content`, `lesson.content`, etc.) passed directly to React's `dangerouslySetInnerHTML`.
**Learning:** `dangerouslySetInnerHTML` must never be given dynamic inputs without thorough sanitization to prevent arbitrary script execution. Even static-looking components might be fed malicious content.
**Prevention:** Always use a robust HTML sanitization library like `DOMPurify` before rendering raw HTML strings in React. For technical content involving equations and diagrams, configure `DOMPurify` to allow specific profiles like `mathMl` and `svg`.
