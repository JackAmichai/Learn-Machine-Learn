## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.
## 2024-05-24 - FileReader Denial of Service
**Vulnerability:** Reading a user-uploaded file using `FileReader` without checking the file size.
**Learning:** Loading arbitrarily large files via the `FileReader` object into memory client-side can cause the user's browser tab to crash due to out-of-memory errors (Client-Side Denial-of-Service).
**Prevention:** Implement strict file size limits (`file.size > LIMIT`) before proceeding to initialize `FileReader` instances when working with user inputs.
