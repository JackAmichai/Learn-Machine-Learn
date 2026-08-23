## 2024-03-24 - Network Graph Performance Bottleneck
**Learning:** `dataSync()` blocks the main UI thread during tensor data retrieval, which can cause frame drops and UI stuttering during the continuous updates of the network graph (called from `NetworkGraph.jsx`). The `NetworkGraph.jsx` component expects `model.getConnectionWeightsAsync` to exist to avoid this, but it was never implemented in `NeuralNetwork.js`.
**Action:** Implement `getConnectionWeightsAsync(layerIndex)` in `NeuralNetwork.js` using `tensor.data()` to perform the extraction asynchronously, preventing UI lockups and significantly improving visualization framerates.

## 2024-03-24 - Network Graph Performance Bottleneck
**Learning:** `dataSync()` blocks the main UI thread during tensor data retrieval, which can cause frame drops and UI stuttering during the continuous updates of the network graph (called from `NetworkGraph.jsx`). The `NetworkGraph.jsx` component expects `model.getConnectionWeightsAsync` to exist to avoid this, but it was never implemented in `NeuralNetwork.js`.
**Action:** Implement `getConnectionWeightsAsync(layerIndex)` in `NeuralNetwork.js` using `tensor.data()` to perform the extraction asynchronously, preventing UI lockups and significantly improving visualization framerates.
