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

## 2026-08-13 - Async tensor data operations in React
**Learning:** Using `tf.tidy()` with synchronous `.dataSync()` calls inside `useEffect` blocks the main UI thread, causing significant stuttering during continuous operations like training animations where the heatmap renders frequently.
**Action:** Replace `tf.tidy()` and `.dataSync()` with manual tensor management (using `try/finally` blocks) and asynchronous `.data()` calls. Implement a cancellation token (`isStale` flag) in the `useEffect` cleanup function to prevent race conditions from out-of-order execution during rapid successive renders.

## 2024-05-18 - Asynchronous canvas rendering flicker
**Learning:** Moving synchronous canvas drawing in a `useEffect` to an asynchronous function (e.g., yielding to `await predictionTensor.data()`) can cause severe visual flickering if `ctx.clearRect()` is called *before* the `await`. The browser paints the cleared canvas during the yield.
**Action:** Always call synchronous canvas clearing functions (`ctx.clearRect`) immediately *after* the `await` statement right before the new drawing logic to prevent flickering.

## 2024-05-18 - Memory leaks in manual tensor management
**Learning:** Replacing `tf.tidy()` entirely with a manual `try/finally` block for tensor disposal is prone to memory leaks. If an error occurs during tensor creation or prediction *before* the `try` block is entered, the intermediate tensors are never disposed.
**Action:** Encapsulate intermediate tensor operations inside `tf.tidy()` and return only the final tensor to the outer scope, which is then manually disposed of in a `finally` block if asynchronous methods like `.data()` are needed on it.
