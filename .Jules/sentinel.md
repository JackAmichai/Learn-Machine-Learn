## 2024-05-23 - NeuralNetwork Config Validation
**Vulnerability:** The `NeuralNetwork` class accepted arbitrary configuration strings and unbounded structure arrays, potentially leading to application crashes or Denial of Service via memory exhaustion (DoS).
**Learning:** Core engine classes in TensorFlow.js wrappers must strictly validate all inputs (activations, optimizers, layer sizes) because they often interact directly with WebGL/WASM backends where errors can be fatal or unrecoverable. Relying on UI-layer validation is insufficient ("Defense in Depth").
**Prevention:** Implemented a `_validateConfig` pattern and strict constants (`ALLOWED_ACTIVATIONS`, `MAX_NEURONS`) within the class itself to ensure it defaults to safe values rather than crashing.

## 2024-05-24 - Unbounded Dataset Size in Model Import
**Vulnerability:** The `importModelJSON` feature allowed importing a model with an unbounded `datasetParams.size` value. This value was passed directly to the dataset generator, allowing an attacker to craft a JSON file that causes the browser to hang or crash (DoS) by allocating massive arrays.
**Learning:** Input validation must extend beyond direct model parameters (like weights/hyperparams) to all auxiliary configuration data loaded from external sources. "Safe defaults" (like `...DEFAULT_DATASET_PARAMS`) are not enough if user input overwrites them without clamping.
**Prevention:** Added clamping to `sanitizeDatasetParams` to enforce a maximum dataset size (5000 samples) and added a file size limit (5MB) for uploads to prevent memory exhaustion during parsing.
