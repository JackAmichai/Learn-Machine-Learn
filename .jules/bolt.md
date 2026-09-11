## 2024-05-18 - Async rendering to avoid blocking the main thread
**Learning:** `dataSync()` blocks the UI thread because it synchronously pulls data from WebGL to CPU. Even simple 50x50 grids block for ~20-50ms which causes noticeable stutter when interacting with sliders/animations.
**Action:** Use `.data()` with `await` for rendering components (OutputPlot, WeightHeatmap) to avoid dropping frames. Ensure the component cleanup checks an `isActive` flag.
