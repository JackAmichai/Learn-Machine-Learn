## 2024-05-23 - Async tensor downloads in React hooks
**Learning:** Using synchronous `dataSync()` inside a React `useEffect` hook for rendering blocks the main UI thread during tensor downloads from WebGL/WASM to CPU.
**Action:** Always migrate to asynchronous `await data()` pattern. Wrap tensor creation in `tf.tidy()` and return the final prediction tensor. Await its `.data()` outside the `tf.tidy()` block, manually dispose of it in a `try/finally` block, and use a cancellation flag (e.g., `isActive`) to prevent race conditions.
