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
## 2026-06-26 - tf.tidy() Async Incompatibility
**Learning:** `tf.tidy()` is strictly synchronous and does not support asynchronous callbacks. When converting synchronous `dataSync()` calls to asynchronous `await tensor.data()` to prevent UI thread blocking, `tf.tidy()` will fail to execute or clean up tensors properly.
**Action:** When migrating TF.js operations from sync to async inside React effects, always remove the `tf.tidy()` wrapper. Instead, assign tensors to variables, execute the async extraction, and manually dispose of the tensors using a `try...finally` block. Also include an `isMounted` check to prevent attempting to update state or draw to canvases if the component has unmounted during the async operation.
## 2026-06-26 - Extraneous keys and React Component extraction
**Learning:** Extracted functional React components inside the render body will be flagged by `react-hooks/static-components`. Duplicated keys in objects (like trailing `interactiveFormulas`) will break CI.
**Action:** Always extract inner functional components (like `Cell`) outside the main component or convert them to simple helper functions. Pay close attention to trailing object keys when refactoring config files.
## 2026-06-26 - Proper casing for component props
**Learning:** Capitalized properties (like `Tile`) when mapped directly in React JSX map functions (like `{items.map(({ Tile }) => <Tile />)}`) can cause unused variable lint errors if the linter doesn't recognize the dynamic component usage.
**Action:** Use a lower-camelCase prop name (like `tileComponent`) and then assign it to a PascalCase variable inside the map function (`const TileComponent = tileComponent;`) before rendering it as `<TileComponent />` to ensure React and the linter both handle it correctly.
