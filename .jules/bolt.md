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

## 2024-04-06 - Memory leaks and canvas opacity build-ups when switching to async tf operations
**Learning:** Replacing synchronous `dataSync()` operations with `await tensor.data()` requires careful attention to the React component lifecycle and memory management. `tf.tidy()` does not support async functions, which means tensors must be manually disposed inside `finally` blocks to prevent GPU memory leaks. Secondly, if the React component unmounts while waiting for `await`, any subsequent state update or DOM manipulation (like `ctx.fillRect`) will fail or cause memory leaks; this requires an `isMounted` flag pattern. Lastly, when rendering to a canvas using partial opacity (e.g., `rgba(x,y,z,0.3)`), asynchronous rendering can cause multiple frames to layer on top of each other unintentionally.
**Action:** When replacing `dataSync()` with `tensor.data()` inside a React `useEffect`: (1) manually `.dispose()` all tensors in a `finally` block, (2) check an `isMounted` variable after the `await` before touching the DOM or React state, and (3) forcefully clear the canvas (`ctx.clearRect(0,0,width,height)`) immediately before drawing to prevent opacity/pixel buildup.