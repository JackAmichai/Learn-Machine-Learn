## 2024-05-24 - Async Tensor Data Extraction
**Learning:** `dataSync()` in TensorFlow.js is a synchronous operation that blocks the main UI thread when downloading data from WebGL/GPU to the CPU. The `NetworkGraph` component already attempts to call an async alternative `getConnectionWeightsAsync` if it exists, but the `NeuralNetwork` engine only implemented the synchronous `getConnectionWeights` fallback.
**Action:** Always implement async tensor data extraction methods (e.g., `.data()` instead of `.dataSync()`) to avoid freezing the UI during rendering loops or network visualizations.

## 2024-05-24 - Async Tensor Data Extraction (Update)
**Learning:** Overwriting the `.jules/bolt.md` file using `cat << 'EOF' > .jules/bolt.md` deletes previous learnings. When using `replace_with_git_merge_diff` to add a new method using an existing comment block as the SEARCH anchor, failing to include that exact comment block in the REPLACE section deletes it.
**Action:** Always append to the journal using `>>`. Always include the original anchor code in the REPLACE block if it should not be removed.
