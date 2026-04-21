## 2026-02-03 - Async Weight Retrieval
**Learning:** TensorFlow.js `dataSync()` blocks the main thread, causing UI jank during training/updates. Implementing `async` alternatives (like `await tensor.data()`) allows UI components (NetworkGraph, WeightHeatmap) to update smoothly without freezing the interface.
**Action:** Always prefer `async` data extraction from tensors in UI components, using `useEffect` to manage the promises and state updates.
