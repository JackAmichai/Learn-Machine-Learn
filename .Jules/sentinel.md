## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-11-07 - Refactoring dangerouslySetInnerHTML for XSS Protection
**Vulnerability:** XSS vulnerability from improperly sanitizing dangerouslySetInnerHTML.
**Learning:** dangerouslySetInnerHTML should never be directly passed arbitrary external data such as Markdown content or math formulas. This data could contain malicious XSS payloads. Always sanitize with tools like DOMPurify.
**Prevention:** Make sure dangerouslySetInnerHTML properties wrap their inputs in DOMPurify.sanitize() using safe profiles (like { html: true, mathMl: true, svg: true }) to remove script tags while leaving HTML, math, and SVG valid.
