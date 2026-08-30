## 2024-05-18 - TF.js dataSync() UI Blocking in React
**Learning:** Using `model.predict().dataSync()` inside a React `useEffect` for canvas rendering synchronously blocks the main thread, causing severe UI jank during frequent model updates.
**Action:** Convert to an asynchronous `draw` function using `await tensor.data()`. To prevent memory leaks, `tf.tidy()` must be carefully managed by returning the prediction tensor, awaiting data outside the tidy block, and manually calling `tensor.dispose()` in a `finally` block, paired with an `isActive` cancellation flag.
