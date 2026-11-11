## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-03-24 - Math/SVG Safe XSS Sanitization
**Vulnerability:** XSS vulnerability through unsanitized user content rendering in `dangerouslySetInnerHTML`.
**Learning:** In a math-heavy application, standard `DOMPurify.sanitize()` strips out essential `<math>` and `<svg>` tags.
**Prevention:** Always use `DOMPurify.sanitize(content, { USE_PROFILES: { html: true, mathMl: true, svg: true } })` to safely render interactive math and graphics while preventing XSS.
