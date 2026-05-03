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

## 2024-05-22 - OutputPlot.jsx tf.tidy with Async Compatibility
**Learning:** `tf.tidy()` cannot be used with asynchronous operations like `await tensor.data()`. Attempting to wrap an async tensor extraction in `tf.tidy()` results in immediate failure or memory leaks, because `tf.tidy()` is designed for synchronous cleanup.
**Action:** When refactoring to async data extraction, always remove `tf.tidy()` and manually track created tensors (`inputTensor`, `predsTensor`) in variables, ensuring they are explicitly cleaned up using `tensor.dispose()` in a `finally` block to prevent leaks even on failure.

## 2024-05-22 - Canvas Context React Unmount Bug
**Learning:** Performing asynchronous tensor operations (like `await tensor.data()`) inside a `useEffect` can cause the component to unmount before the `await` resolves. If a canvas operation (`ctx.fillRect`) executes after unmount, it causes unexpected artifacts or memory warnings.
**Action:** Always include an `isMounted` flag pattern in `useEffect` when performing async TF.js data extraction, and check `if (!isMounted) return;` immediately after the `await` before touching DOM nodes or canvas contexts.

## 2024-05-22 - Async Tensor Visualization Overlaps
**Learning:** Refactoring synchronous canvas rendering (which completely replaced the frame inline) to async tensor rendering introduced frame overlaps. Because the prediction regions are drawn with semi-transparent rectangles (`rgba(..., 0.3)`), failure to clear the canvas after the async wait causes opacity buildup over multiple renders.
**Action:** Add explicit canvas clearing (`ctx.clearRect(0, 0, width, height)`) immediately before the rendering loops when switching to async tensor extraction to guarantee a fresh frame.
