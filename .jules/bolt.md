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

## 2024-03-24 - Network Graph Performance Bottleneck
**Learning:** `dataSync()` blocks the main UI thread during tensor data retrieval, which can cause frame drops and UI stuttering during the continuous updates of the network graph (called from `NetworkGraph.jsx`). The `NetworkGraph.jsx` component expects `model.getConnectionWeightsAsync` to exist to avoid this, but it was never implemented in `NeuralNetwork.js`.
**Action:** Implement `getConnectionWeightsAsync(layerIndex)` in `NeuralNetwork.js` using `tensor.data()` to perform the extraction asynchronously, preventing UI lockups and significantly improving visualization framerates.

## 2024-03-24 - WeightHeatmap Performance Optimization Opportunity
**Learning:** While `NetworkGraph.jsx` was successfully offloaded to async weight extraction using `getConnectionWeightsAsync`, `WeightHeatmap.jsx` still relies on the synchronous `model.getConnectionWeights(0)` inside a `useMemo` block. Even though it's memoized, the synchronous call still executes during the React render cycle when `modelVersion` changes (which is frequent during training), blocking the main thread.
**Action:** Future performance optimization should convert `WeightHeatmap.jsx` to fetch weights asynchronously inside a `useEffect` and store them in local state, similar to `NetworkGraph.jsx`.
