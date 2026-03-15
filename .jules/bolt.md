## 2024-03-15 - Synchronous TF.js Calls Block React Main Thread
**Learning:** Using `tensor.dataSync()` within React component rendering loops (like `useMemo` for weight heatmaps) acts as a synchronous, blocking operation that copies data from the GPU to the CPU, causing significant UI jank and stalling the main thread.
**Action:** Replace `dataSync()` with asynchronous `await tensor.data()` and manage the fetched data via `useEffect` and `useState` to prevent UI thread blockage during visualizations and updates.
