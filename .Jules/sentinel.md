## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2024-05-24 - Large File Upload Denial of Service
**Vulnerability:** The file upload handler in `Controls.jsx` processed files of any size, allowing a malicious user to upload extremely large JSON files (e.g., gigabytes), potentially causing the browser tab to freeze or crash (Client-Side Denial of Service).
**Learning:** Client-side file processing using `FileReader` is synchronous and memory-intensive for the main thread. Even if the backend isn't involved, crashing the user's browser via a simple file input is a valid security (availability) concern.
**Prevention:** Added an explicit file size check (`file.size > 5MB`) in the `handleImportFile` function before initializing the `FileReader`. This fails fast and provides feedback without locking the UI.
