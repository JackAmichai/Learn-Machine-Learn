## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2024-09-17 - React dangerouslySetInnerHTML XSS Prevention
**Vulnerability:** React components (`MathModal.jsx` and `LookingForward.jsx`) were directly rendering HTML strings from data sources (like `data.content`) using `dangerouslySetInnerHTML` without prior sanitization. This is a classic Cross-Site Scripting (XSS) vulnerability.
**Learning:** Even if the content seems safe (e.g., loaded from local data files), dynamically injected HTML must always be sanitized to prevent malicious script injection if the data source is ever modified or user-generated in the future.
**Prevention:** Always use a trusted sanitization library like `DOMPurify` (e.g., `DOMPurify.sanitize(content)`) before passing data to `dangerouslySetInnerHTML`.
