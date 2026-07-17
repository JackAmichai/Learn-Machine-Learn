## 2024-07-17 - Asynchronous TensorFlow.js Rendering
**Learning:** Using synchronous `dataSync()` in React `useEffect` for TensorFlow.js predictions blocks the main UI thread, causing UI freezes during frequent re-renders (like training loops). `tf.tidy()` cannot be used with promises.
**Action:** Always use asynchronous `await tensor.data()` with manual memory management (`try/finally` with `dispose()`) instead of `tf.tidy()`, and include an `isStale` cancellation token to prevent out-of-order execution in effects.
