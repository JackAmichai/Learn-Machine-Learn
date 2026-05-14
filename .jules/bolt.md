## 2024-05-22 - TensorFlow.js dataSync() Bottleneck
**Learning:** `dataSync()` in TensorFlow.js blocks the main thread. Using it inside React components (especially during high-frequency updates like training loops) causes severe UI jank. Even small tensors can cause delays waiting for GPU-CPU synchronization.
**Action:** Always prefer `await tensor.data()` for extracting values for visualization. Wrap extraction logic in `useEffect` and manage the data in React state to decouple rendering from weight fetching.

## 2024-10-24 - Synchronous TensorFlow.js Operations in Render Loop
**Learning:** TensorFlow.js `dataSync()` is a blocking synchronous operation that transfers data from GPU to CPU. Calling this inside a React component's render body (via an IIFE) causes significant performance degradation as it blocks the main thread on every render.
**Action:** Always wrap `dataSync()` or any heavy TF.js extraction logic in `useMemo` or `useEffect` to ensure it only runs when necessary (e.g., when model version changes).

## 2026-01-27 - TensorFlow.js dataSync in Render Loop
**Learning:** `tf.Tensor.dataSync()` is a blocking operation that halts the JS thread until the GPU is done. Using it inside a React component's render body (even inside an IIFE) without memoization causes severe performance degradation on every re-render, even if the data hasn't changed.
**Action:** Always wrap `dataSync()` calls or any tensor extraction logic in `useMemo` dependent on the model version or weights revision.

## 2024-05-22 - Synchronous TF.js Operations in Render
**Learning:** TensorFlow.js `dataSync()` is a synchronous blocking operation. Using it directly inside a React component's render body (e.g., in `NetworkGraph`) causes significant performance degradation on every re-render.
**Action:** Always wrap weight extraction logic or any TF.js `dataSync()` calls in `useMemo` to ensure they only run when the model or structure actually changes.

## 2024-05-22 - TensorFlow.js synchronous operations (dataSync) blocking the main thread during component renders
**Learning:** `dataSync()` in TensorFlow.js is a synchronous, blocking operation that retrieves data from the GPU/WebGL backend to the CPU. Calling this directly in React component methods (like inside `useEffect` or utility functions such as `computeMetrics`) forces the main UI thread to wait, causing severe rendering jank—especially for large visual elements like the 50x50 `OutputPlot` grid. Additionally, `tf.tidy()` cannot be used with async functions, necessitating manual tensor disposal via `.dispose()` when switching to `await tensor.data()`.
**Action:** Always replace `tensor.dataSync()` with `await tensor.data()` inside async functions. To prevent memory leaks without `tf.tidy()`, manually dispose tensors using a `try...finally` block.
