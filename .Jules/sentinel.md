## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-24 - File Upload Denial of Service (DoS)
**Vulnerability:** The application was susceptible to a client-side Denial of Service attack because it read user-uploaded files directly into memory using `FileReader.readAsText()` without checking the file size first.
**Learning:** In client-side applications, processing large files synchronously or loading them entirely into memory can block the main thread and cause the browser tab to crash or freeze.
**Prevention:** Always enforce strict file size limits (e.g., 5MB) using `file.size` before attempting to read or process user-uploaded files.
