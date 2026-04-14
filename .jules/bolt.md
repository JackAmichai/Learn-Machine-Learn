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

## 2024-05-22 - Asynchronous TF.js Operations and React State
**Learning:** Replacing synchronous `.dataSync()` with asynchronous `.data()` inside React `useEffect` hooks introduces risks of out-of-order execution, memory leaks, and updating unmounted components. Furthermore, asynchronous tensor resolution cannot be wrapped in `tf.tidy()`.
**Action:** Always implement a manual `.dispose()` cleanup in a `finally` block and use an `isMounted` flag pattern when fetching tensor data asynchronously in React to guarantee cleanup and prevent warnings.

## 2024-05-22 - GitHub Actions npm Dependency Bug
**Learning:** `npm` sometimes fails with missing optional dependencies (like `@rollup/rollup-linux-x64-gnu`) on GitHub Actions Linux runners.
**Action:** When working on this codebase, always switch `.github/workflows/ci.yml` from using `npm` to using `pnpm` (which handles optional dependencies reliably). Use `corepack enable pnpm` before the `actions/setup-node` step.
