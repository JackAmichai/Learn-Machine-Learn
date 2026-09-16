## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-24 - Unsanitized dangerouslySetInnerHTML Usage
**Vulnerability:** Found `dangerouslySetInnerHTML` being used directly with application data (`data.content`, `data.solved`, etc.) in `MathModal.jsx` and `LookingForward.jsx` without any sanitization.
**Learning:** Even if data originates from internal configurations or static data files, it represents an XSS risk if those data sources are ever modified by users or compromised. React's built-in protections are bypassed by `dangerouslySetInnerHTML`.
**Prevention:** Always sanitize any dynamic HTML content using `DOMPurify.sanitize()` before passing it to `dangerouslySetInnerHTML`, regardless of the data's apparent current source.
