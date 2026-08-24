1. **Analyze the performance bottleneck**
   - Read the codebase to understand where synchronous operations block the UI.
   - Identified `OutputPlot.jsx` as a bottleneck due to `dataSync()` on 2500 grid points.

2. **Refactor OutputPlot.jsx to use async `data()`**
   - Wrap the prediction logic in an async `draw` function.
   - Use `const predTensor = tf.tidy(() => model.predict(tf.tensor2d(inputs)));` and `await predTensor.data();`.
   - Execute `ctx.clearRect` after `await`.
   - Move all drawing (heatmap and data points) inside the async block.
   - Manually dispose `predTensor` in a `finally` block.
   - Call `draw().catch(console.error);` within the `useEffect`.

3. **Verify the change**
   - Run `pnpm lint`.
   - Run `pnpm test:run`.
   - Run frontend verification.

4. **Complete pre commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

5. **Submit the PR**
   - Title: `⚡ Bolt: Use async data() in OutputPlot to unblock UI thread`
   - Description containing What, Why, Impact, and Measurement.
