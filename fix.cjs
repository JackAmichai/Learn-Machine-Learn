const fs = require('fs');

function patchFile(filepath, search, replace) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(search, replace);
    fs.writeFileSync(filepath, content, 'utf8');
}

// 1. NeuralNetwork.js
let nnPath = 'src/engine/NeuralNetwork.js';
let nnSearch = `  /**
   * Gets connection weights as a flat Float32Array.
   * @param {number} layerIndex - Index of the connection layer
   * @returns {Float32Array|null} Weight values or null if invalid
   */
  getConnectionWeights(layerIndex) {`;
let nnReplace = `  /**
   * Gets connection weights asynchronously.
   * Prevents blocking the main thread when transferring data from GPU to CPU.
   * @param {number} layerIndex - Index of the connection layer
   * @returns {Promise<Float32Array|null>} Weight values or null if invalid
   */
  async getConnectionWeightsAsync(layerIndex) {
    if (!this.connectionLayers[layerIndex]) return null;
    try {
      const weights = this.connectionLayers[layerIndex].getWeights();
      if (!weights.length) return null;
      const kernel = weights[0];
      return await kernel.data();
    } catch (e) {
      console.error('Error fetching connection weights async:', e);
      return null;
    }
  }

  /**
   * Gets connection weights as a flat Float32Array.
   * @param {number} layerIndex - Index of the connection layer
   * @returns {Float32Array|null} Weight values or null if invalid
   */
  getConnectionWeights(layerIndex) {`;
patchFile(nnPath, nnSearch, nnReplace);

// 2. OutputPlot.jsx
let outPath = 'src/components/OutputPlot.jsx';
let outSearch = `        tf.tidy(() => {
            const inputTensor = tf.tensor2d(inputs);
            const preds = model.predict(inputTensor).dataSync();

            // Draw the heatmap
            const wCell = width / gridSize;
            const hCell = height / gridSize;

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const val = preds[i * gridSize + j];

                    // Premium look: Purple (0) → Cyan (1)
                    const c1 = [112, 0, 255];
                    const c2 = [0, 242, 255];

                    const rComp = c1[0] + (c2[0] - c1[0]) * val;
                    const gComp = c1[1] + (c2[1] - c1[1]) * val;
                    const bComp = c1[2] + (c2[2] - c1[2]) * val;

                    ctx.fillStyle = \`rgba(\${rComp}, \${gComp}, \${bComp}, 0.3)\`;
                    // Correction for canvas Y axis (0 is top)
                    // Math y=-1.5 is bottom. Canvas y=height is bottom.
                    // x is i, y is j.

                    // Draw rect
                    ctx.fillRect(i * wCell, height - (j + 1) * hCell, wCell, hCell);
                }
            }
        });

        // 2. Draw Data Points
        if (data.points) {
            data.points.forEach((pt, idx) => {
                const x = (pt[0] + 1.5) / 3 * width;
                const y = height - (pt[1] + 1.5) / 3 * height;

                const label = data.labels[idx];

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = label === 1 ? '#00f2ff' : '#7000ff';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.fill();
                ctx.stroke();
            });
        }

    }, [model, data, modelVersion]);`;
let outReplace = `        let isMounted = true;

        const drawPlot = async () => {
            let inputTensor, predsTensor;
            try {
                inputTensor = tf.tensor2d(inputs);
                predsTensor = model.predict(inputTensor);
                const preds = await predsTensor.data();

                if (!isMounted) return;

                // Draw the heatmap
                const wCell = width / gridSize;
                const hCell = height / gridSize;

                for (let i = 0; i < gridSize; i++) {
                    for (let j = 0; j < gridSize; j++) {
                        const val = preds[i * gridSize + j];

                        // Premium look: Purple (0) → Cyan (1)
                        const c1 = [112, 0, 255];
                        const c2 = [0, 242, 255];

                        const rComp = c1[0] + (c2[0] - c1[0]) * val;
                        const gComp = c1[1] + (c2[1] - c1[1]) * val;
                        const bComp = c1[2] + (c2[2] - c1[2]) * val;

                        ctx.fillStyle = \`rgba(\${rComp}, \${gComp}, \${bComp}, 0.3)\`;
                        // Correction for canvas Y axis (0 is top)
                        // Math y=-1.5 is bottom. Canvas y=height is bottom.
                        // x is i, y is j.

                        // Draw rect
                        ctx.fillRect(i * wCell, height - (j + 1) * hCell, wCell, hCell);
                    }
                }

                // 2. Draw Data Points
                if (data.points) {
                    data.points.forEach((pt, idx) => {
                        const x = (pt[0] + 1.5) / 3 * width;
                        const y = height - (pt[1] + 1.5) / 3 * height;

                        const label = data.labels[idx];

                        ctx.beginPath();
                        ctx.arc(x, y, 4, 0, 2 * Math.PI);
                        ctx.fillStyle = label === 1 ? '#00f2ff' : '#7000ff';
                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 1.5;
                        ctx.fill();
                        ctx.stroke();
                    });
                }
            } finally {
                if (inputTensor) inputTensor.dispose();
                if (predsTensor) predsTensor.dispose();
            }
        };

        drawPlot();

        return () => {
            isMounted = false;
        };
    }, [model, data, modelVersion]);`;
patchFile(outPath, outSearch, outReplace);

// 3. StatsPanel.jsx imports
let statsPath = 'src/components/StatsPanel.jsx';
let statsSearchImports = `import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Tooltip } from './Tooltip';`;
let statsReplaceImports = `import { useEffect, useState } from 'react';
import { Tooltip } from './Tooltip';`;
patchFile(statsPath, statsSearchImports, statsReplaceImports);

// 3. StatsPanel.jsx computeMetrics
let statsSearchCompute = `/**
 * Computes classification metrics from model predictions
 * @param {Object} model - The neural network model wrapper
 * @param {Object} data - Dataset with xs, ys tensors and labels array
 * @param {number} modelVersion - Version trigger for recompute
 * @returns {Object} Metrics object with confusion matrix, accuracy, precision, recall, F1
 */
function computeMetrics(model, data, modelVersion) {
    if (!model?.model || !data?.xs || !data?.labels) {
        return null;
    }

    try {
        const predictions = tf.tidy(() => {
            const preds = model.predict(data.xs);
            // For binary classification with single output node
            const predData = preds.dataSync();
            return Array.from(predData).map(p => (p >= 0.5 ? 1 : 0));
        });

        const actual = data.labels;
        const n = Math.min(predictions.length, actual.length);

        // Confusion matrix: [[TN, FP], [FN, TP]]
        let tp = 0, tn = 0, fp = 0, fn = 0;

        for (let i = 0; i < n; i++) {
            const pred = predictions[i];
            const truth = actual[i];
            if (pred === 1 && truth === 1) tp++;
            else if (pred === 0 && truth === 0) tn++;
            else if (pred === 1 && truth === 0) fp++;
            else fn++;
        }

        const total = tp + tn + fp + fn;

        const acc = total > 0 ? (tp + tn) / total : 0;
        const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
        const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
        const f1 = (precision + recall) > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

        // Class specific accuracies
        const total0 = tn + fp;
        const total1 = tp + fn;
        const class0Acc = total0 > 0 ? tn / total0 : 0;
        const class1Acc = total1 > 0 ? tp / total1 : 0;

        return {
            cm: { tp, tn, fp, fn },
            accuracy: acc,
            precision,
            recall,
            f1,
            class0Accuracy: class0Acc,
            class1Accuracy: class1Acc
        };

    } catch (e) {
        console.error('Error computing metrics:', e);
        return null;
    }
}`;
let statsReplaceCompute = `/**
 * Computes classification metrics from model predictions
 * @param {Object} model - The neural network model wrapper
 * @param {Object} data - Dataset with xs, ys tensors and labels array
 * @param {number} modelVersion - Version trigger for recompute
 * @returns {Promise<Object>} Metrics object with confusion matrix, accuracy, precision, recall, F1
 */
async function computeMetrics(model, data, modelVersion) {
    if (!model?.model || !data?.xs || !data?.labels) {
        return null;
    }

    let preds;
    try {
        preds = model.predict(data.xs);
        // For binary classification with single output node
        const predData = await preds.data();
        const predictions = Array.from(predData).map(p => (p >= 0.5 ? 1 : 0));

        const actual = data.labels;
        const n = Math.min(predictions.length, actual.length);

        // Confusion matrix: [[TN, FP], [FN, TP]]
        let tp = 0, tn = 0, fp = 0, fn = 0;

        for (let i = 0; i < n; i++) {
            const pred = predictions[i];
            const truth = actual[i];
            if (pred === 1 && truth === 1) tp++;
            else if (pred === 0 && truth === 0) tn++;
            else if (pred === 1 && truth === 0) fp++;
            else fn++;
        }

        const total = tp + tn + fp + fn;

        const acc = total > 0 ? (tp + tn) / total : 0;
        const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
        const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
        const f1 = (precision + recall) > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

        // Class specific accuracies
        const total0 = tn + fp;
        const total1 = tp + fn;
        const class0Acc = total0 > 0 ? tn / total0 : 0;
        const class1Acc = total1 > 0 ? tp / total1 : 0;

        return {
            cm: { tp, tn, fp, fn },
            accuracy: acc,
            precision,
            recall,
            f1,
            class0Accuracy: class0Acc,
            class1Accuracy: class1Acc
        };

    } catch (e) {
        console.error('Error computing metrics:', e);
        return null;
    } finally {
        if (preds) preds.dispose();
    }
}`;
patchFile(statsPath, statsSearchCompute, statsReplaceCompute);

// 3. StatsPanel.jsx hook
let statsSearchHook = `export function StatsPanel({ model, data, modelVersion, epoch, loss }) {
    const [isOpen, setIsOpen] = useState(true);

    const metrics = computeMetrics(model, data, modelVersion);
    const cm = metrics?.cm;`;
let statsReplaceHook = `export function StatsPanel({ model, data, modelVersion, epoch, loss }) {
    const [isOpen, setIsOpen] = useState(true);
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const updateMetrics = async () => {
            const m = await computeMetrics(model, data, modelVersion);
            if (isMounted) {
                setMetrics(m);
            }
        };

        updateMetrics();

        return () => {
            isMounted = false;
        };
    }, [model, data, modelVersion]);

    const cm = metrics?.cm;`;
patchFile(statsPath, statsSearchHook, statsReplaceHook);

// 4. WeightHeatmap.jsx
let weightPath = 'src/components/WeightHeatmap.jsx';
let weightSearch = `import { useRef, useEffect, useMemo } from 'react';

export function WeightHeatmap({ model, modelVersion, structure }) {
    const containerRef = useRef(null);

// Memoize weight extraction to avoid expensive synchronous TF.js calls on every render
    const weightsData = useMemo(() => {
        if (modelVersion === null || modelVersion === undefined) {
            return null;
        }
        if (!model || !Array.isArray(structure) || structure.length < 2) return null;
        const inputDim = structure[0];
        const units = structure[1];
        if (inputDim !== 100 || !units) return null; // Only visualize 10x10 vision grids

        if (typeof model.getConnectionWeights === 'function') {
            try {
                const kernel = model.getConnectionWeights(0);
                if (!kernel) return null;
                const snapshot = [];
                for (let u = 0; u < units; u++) {
                    const arr = new Float32Array(inputDim);
                    for (let i = 0; i < inputDim; i++) {
                        arr[i] = kernel[i * units + u];
                    }
                    snapshot.push(arr);
                }
                return snapshot;
            } catch (error) {
                console.error('Heatmap error', error);
                return null;
            }
        }

        // Fallback to legacy direct layer access if helper is unavailable
        if (!model.model || !model.model.layers?.length) return null;
        const layer = model.model.layers[0];
        if (!layer) return null;
        try {
            const weights = layer.getWeights();
            if (!weights.length) return null;
            const wTensor = weights[0];
            const snapshot = [];
            // dataSync returns a copy - do NOT dispose the original tensors
            const wData = wTensor.dataSync();
            for (let u = 0; u < units; u++) {
                const arr = new Float32Array(inputDim);
                for (let i = 0; i < inputDim; i++) {
                    arr[i] = wData[i * units + u];
                }
                snapshot.push(arr);
            }
            return snapshot;
        } catch (error) {
            console.error('Heatmap error', error);
            return null;
        }
    }, [modelVersion, model, structure]);`;
let weightReplace = `import { useRef, useEffect, useState } from 'react';

export function WeightHeatmap({ model, modelVersion, structure }) {
    const containerRef = useRef(null);
    const [weightsData, setWeightsData] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchWeights = async () => {
            if (modelVersion === null || modelVersion === undefined) {
                if (isMounted) setWeightsData(null);
                return;
            }
            if (!model || !Array.isArray(structure) || structure.length < 2) {
                if (isMounted) setWeightsData(null);
                return;
            }
            const inputDim = structure[0];
            const units = structure[1];
            if (inputDim !== 100 || !units) {
                if (isMounted) setWeightsData(null);
                return;
            }

            // Prefer async extraction if available
            if (typeof model.getConnectionWeightsAsync === 'function') {
                try {
                    const wData = await model.getConnectionWeightsAsync(0);
                    if (!wData) {
                        if (isMounted) setWeightsData(null);
                        return;
                    }
                    const snapshot = [];
                    for (let u = 0; u < units; u++) {
                        const arr = new Float32Array(inputDim);
                        for (let i = 0; i < inputDim; i++) {
                            arr[i] = wData[i * units + u];
                        }
                        snapshot.push(arr);
                    }
                    if (isMounted) setWeightsData(snapshot);
                    return;
                } catch (error) {
                    console.error('Heatmap async error', error);
                    // fallback below
                }
            }

            if (typeof model.getConnectionWeights === 'function') {
                try {
                    const kernel = model.getConnectionWeights(0);
                    if (!kernel) {
                        if (isMounted) setWeightsData(null);
                        return;
                    }
                    const snapshot = [];
                    for (let u = 0; u < units; u++) {
                        const arr = new Float32Array(inputDim);
                        for (let i = 0; i < inputDim; i++) {
                            arr[i] = kernel[i * units + u];
                        }
                        snapshot.push(arr);
                    }
                    if (isMounted) setWeightsData(snapshot);
                    return;
                } catch (error) {
                    console.error('Heatmap error', error);
                    if (isMounted) setWeightsData(null);
                    return;
                }
            }

            // Fallback to legacy direct layer access if helper is unavailable
            if (!model.model || !model.model.layers?.length) {
                if (isMounted) setWeightsData(null);
                return;
            }
            const layer = model.model.layers[0];
            if (!layer) {
                if (isMounted) setWeightsData(null);
                return;
            }
            try {
                const weights = layer.getWeights();
                if (!weights.length) {
                    if (isMounted) setWeightsData(null);
                    return;
                }
                const wTensor = weights[0];
                const snapshot = [];
                // dataSync returns a copy - do NOT dispose the original tensors
                const wData = wTensor.dataSync();
                for (let u = 0; u < units; u++) {
                    const arr = new Float32Array(inputDim);
                    for (let i = 0; i < inputDim; i++) {
                        arr[i] = wData[i * units + u];
                    }
                    snapshot.push(arr);
                }
                if (isMounted) setWeightsData(snapshot);
                return;
            } catch (error) {
                console.error('Heatmap error', error);
                if (isMounted) setWeightsData(null);
                return;
            }
        };

        fetchWeights();

        return () => {
            isMounted = false;
        };
    }, [modelVersion, model, structure]);`;
patchFile(weightPath, weightSearch, weightReplace);

// 5. useNeuralNetwork.js hook fix
let hookPath = 'src/hooks/useNeuralNetwork.js';
let hookSearch = `        return () => {
            cancelled = true;
            if (frameId) cancelAnimationFrame(frameId);
            if (timerId) clearTimeout(timerId);
        };
    }, [isPlaying, trainingMode, slowDelay, network, getTrainingBatch]);`;
let hookReplace = `        return () => {
            cancelled = true;
            if (frameId) cancelAnimationFrame(frameId);
            if (timerId) clearTimeout(timerId);
        };
    }, [isPlaying, trainingMode, slowDelay, network, getTrainingBatch, batchSize]);`;
patchFile(hookPath, hookSearch, hookReplace);

// 6. NeuralNetwork.security.test.js
let secPath = 'src/engine/NeuralNetwork.security.test.js';
let secSearch1 = `        it('should default to "sigmoid" when invalid outputActivation is provided', () => {
            const unsafeConfig = { outputActivation: 'malicious-script-injection' };
            const safeNN = new NeuralNetwork(unsafeConfig);

            expect(safeNN.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid outputActivation"));

            safeNN.dispose();
        });`;
let secReplace1 = `        it('should default to "sigmoid" when invalid outputActivation is provided', () => {
            const unsafeConfig = { outputActivation: 'malicious-script-injection' };
            const safeNN = new NeuralNetwork(unsafeConfig);

            expect(safeNN.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid output activation"));

            safeNN.dispose();
        });`;
patchFile(secPath, secSearch1, secReplace1);

let secSearch2 = `        it('should ignore invalid outputActivation updates', () => {
            nn = new NeuralNetwork({ outputActivation: 'sigmoid' });
            nn.updateConfig({ outputActivation: 'malicious' });
            expect(nn.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid outputActivation"));
        });`;
let secReplace2 = `        it('should ignore invalid outputActivation updates', () => {
            nn = new NeuralNetwork({ outputActivation: 'sigmoid' });
            nn.updateConfig({ outputActivation: 'malicious' });
            expect(nn.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid output activation"));
        });`;
patchFile(secPath, secSearch2, secReplace2);

console.log("Patches applied successfully!");
