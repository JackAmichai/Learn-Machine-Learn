## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2024-05-18 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** Raw string data passed into dangerouslySetInnerHTML in MathModal.jsx and LookingForward.jsx creates High risk of Cross-Site Scripting (XSS).
**Learning:** Even internal static content data (like lesson content or topic shortcomings) that renders raw HTML strings must be treated as untrusted to ensure defense in depth, especially when rendering MathML or SVG elements.
**Prevention:** Always use DOMPurify to sanitize dangerouslySetInnerHTML props, specifically using profiles `{ USE_PROFILES: { html: true, mathMl: true, svg: true } }` in this repository to prevent XSS without stripping necessary visual formulas.
