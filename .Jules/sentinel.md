## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2024-05-24 - Client-Side File Processing DoS
**Vulnerability:** The application allowed arbitrary file uploads via `FileReader.readAsText()` without checking `file.size`, enabling a Denial of Service (DoS) attack where a large file (e.g., 1GB) could crash the browser tab due to memory exhaustion.
**Learning:** Browser-based file processing (like `JSON.parse` or `FileReader`) happens on the main thread and shares memory limits with the tab. Validating `file.size` *before* reading is critical because once `readAsText` starts, the memory allocation begins.
**Prevention:** Always check `file.size` against a reasonable limit (e.g., 5MB for JSON config) before initializing `FileReader` or processing the file.
