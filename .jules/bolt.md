## 2024-05-09 - Async TF.js Rendering
**Learning:** Synchronous `dataSync()` calls inside `useEffect` block the main UI thread during React rendering and canvas drawing. Using `await tensor.data()` requires manual memory management (`tf.dispose`) since `tf.tidy()` doesn't support promises, and we need to `clearRect` before drawing due to the asynchronous nature.
**Action:** Replace `dataSync()` with `await tensor.data()` inside a `try...finally` block with manual `dispose`, use `isMounted` flags, and call `clearRect` when rendering to canvas.
## 2024-05-09 - Async TF.js Rendering
**Learning:** Synchronous `dataSync()` calls inside `useEffect` block the main UI thread during React rendering and canvas drawing. Using `await tensor.data()` requires manual memory management (`tf.dispose`) since `tf.tidy()` doesn't support promises, and we need to `clearRect` before drawing due to the asynchronous nature.
**Action:** Replace `dataSync()` with `await tensor.data()` inside a `try...finally` block with manual `dispose`, use `isMounted` flags, and call `clearRect` when rendering to canvas.
