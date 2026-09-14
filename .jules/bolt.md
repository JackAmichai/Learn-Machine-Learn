## 2024-05-24 - Async Tensor Extraction in React Components
**Learning:** Synchronous TensorFlow.js operations like `dataSync()` block the main thread and degrade UI responsiveness, especially when called frequently during renders (e.g. inside `useMemo`).
**Action:** Replace `dataSync()` with asynchronous `.data()` inside `useEffect` blocks. Implement an `isActive` cancellation flag to prevent state updates after component unmounts and handle rapid sequential updates gracefully.
