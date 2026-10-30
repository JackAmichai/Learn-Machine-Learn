## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-18 - MathML/SVG XSS Sanitization Pattern
**Vulnerability:** Unsanitized dangerouslySetInnerHTML in MathModal.jsx and LookingForward.jsx leading to XSS.
**Learning:** Standard DOMPurify configurations can break rendering for complex math notation because it strips out MathML and SVG by default, making generic XSS fixes insufficient for this codebase.
**Prevention:** When using DOMPurify for mathematical or diagram-heavy content, always explicitly allow HTML, MathML, and SVG via { USE_PROFILES: { html: true, mathMl: true, svg: true } }.
