## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2026-03-01 - XSS Vulnerability in MathModal
**Vulnerability:** The `MathModal.jsx` component used `dangerouslySetInnerHTML` to render interactive math formula content directly from `data.content` without sanitization.
**Learning:** In React applications, using `dangerouslySetInnerHTML` with unsanitized data can lead to Cross-Site Scripting (XSS) vulnerabilities. Even if the data originates from seemingly safe sources (like a local dictionary or math content file), it is critical to sanitize the HTML to prevent potential exploitation if the data source is ever modified or user-controlled in the future.
**Prevention:** Always use a library like `DOMPurify` to sanitize HTML strings before passing them to `dangerouslySetInnerHTML`. For example: `dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}`.
