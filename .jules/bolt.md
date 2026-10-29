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
## 2025-01-28 - Refactoring OutputPlot to Async rendering
**Learning:** TensorFlow.js `dataSync()` blocks the main thread. In a canvas plotting component like OutputPlot, wrapping asynchronous predictions (`await data()`) requires moving subsequent synchronous drawing operations (like data points overlay) inside the async block. Otherwise, synchronous draws execute first and get painted over by the heatmap.
**Action:** Replace `dataSync` with `await tensor.data()` inside a custom async function within `useEffect`. Manually dispose tensors in `finally` and ensure dependent UI layers are rendered sequentially inside the async execution flow. Use `isMounted` flag to prevent race conditions.

## 2025-01-28 - Tensor dataSync with canvas rendering fix
**Learning:** When moving to async `tensor.data()`, if you don't clear the canvas at the exact right moment in the async flow, you can cause flickering as it renders intermediate states or blanks it while waiting for the promise. `tf.tensor2d` creation is synchronous and can throw if shape is wrong, leading to memory leaks if disposed inside `finally` but created outside the `try` block.
**Action:** Move tensor creation into the `try` block of the async operation. Run `clearRect` *after* the `await tensor.data()` call resolves but *before* drawing starts, so the canvas only updates when data is fully ready. Check for null tensors in `finally` before `dispose()`.
