import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork } from '../engine/NeuralNetwork';
import { generateData, DataType } from '../engine/data';

const DEFAULT_STRUCTURE = [2, 5, 4, 1];
const VISION_STRUCTURE = [100, 16, 2];

const structuresEqual = (a, b) => (
    a.length === b.length && a.every((val, idx) => val === b[idx])
);

const disposeDataset = (ds) => {
    if (!ds) return;
    ds.xs.dispose();
    ds.ys.dispose();
};

export function useNeuralNetwork() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const [loss, setLoss] = useState(0);
    const [structure, setStructureState] = useState(DEFAULT_STRUCTURE);
    const [datasetParams, setDatasetParamsState] = useState({ type: DataType.SPIRAL, size: 300 });
    const [mode, setModeState] = useState('simple'); // 'simple' | 'vision'
    const [customData, setCustomData] = useState([]); // Array of {input: [], label: 0}
    const [hyperparams, setHyperparams] = useState({
        learningRate: 0.1,
        activation: 'relu',
        optimizer: 'adam'
    });

    const [network] = useState(() => {
        const nn = new NeuralNetwork(hyperparams);
        nn.createModel(DEFAULT_STRUCTURE);
        return nn;
    });
    const datasetRef = useRef(null);
    const [dataset, setDatasetState] = useState(() => generateData(DataType.SPIRAL, 300));

    // We expose a "version" number to trigger strict re-renders of visualizations
    const [modelVersion, setModelVersion] = useState(0);

    useEffect(() => {
        datasetRef.current = dataset;
    }, [dataset]);

    useEffect(() => () => {
        disposeDataset(datasetRef.current);
    }, []);

    const resetTrainingStats = () => {
        setEpoch(0);
        setLoss(0);
    };

    const rebuildModel = (nextStructure) => {
        network.createModel(nextStructure);
        setModelVersion(v => v + 1);
        resetTrainingStats();
    };

    const applyStructure = (nextStructure) => {
        setStructureState(prev => {
            const target = typeof nextStructure === 'function' ? nextStructure(prev) : nextStructure;
            if (structuresEqual(prev, target)) {
                return prev;
            }
            rebuildModel(target);
            return target;
        });
    };

    const replaceDataset = (type, size) => {
        const next = generateData(type, size);
        setDatasetState(prev => {
            disposeDataset(prev);
            return next;
        });
        resetTrainingStats();
    };

    const clearDataset = () => {
        setDatasetState(prev => {
            disposeDataset(prev);
            return null;
        });
        resetTrainingStats();
    };

    // Training Loop
    useEffect(() => {
        let animId;

        const loop = async () => {
            if (!isPlaying) return;

            let xs, ys;
            let disposeTensors = false; // Flag to indicate if we need to dispose xs, ys after training

            if (mode === 'vision') {
                if (customData.length === 0) {
                    setIsPlaying(false);
                    return;
                }
                // Convert customData to tensors
                // We do this every frame which is inefficient but OK for small datasets

                // Non-tidy simple conversion
                const xArr = customData.map(d => Array.from(d.input));
                const yArr = customData.map(d => {
                    // One-hot encode for 2 classes
                    const label = d.label;
                    return label === 0 ? [1, 0] : [0, 1];
                });
                xs = tf.tensor2d(xArr);
                ys = tf.tensor2d(yArr);
                disposeTensors = true; // We created new tensors, so we must dispose them

            } else {
                if (!dataset) return;
                xs = dataset.xs;
                ys = dataset.ys;
            }

            const history = await network.train(xs, ys, 1);

            if (disposeTensors) {
                xs.dispose();
                ys.dispose();
            }

            if (history) {
                const lossVal = history.history.loss[0];
                setLoss(lossVal);
                setEpoch(e => e + 1);
                // Trigger visual update
                setModelVersion(v => v + 1);
            }

            animId = requestAnimationFrame(loop);
        };

        if (isPlaying) {
            loop();
        } else {
            cancelAnimationFrame(animId);
        }

        return () => cancelAnimationFrame(animId);
    }, [isPlaying, mode, customData, dataset, network]);

    const addLayer = () => {
        applyStructure(prev => {
            const next = [...prev];
            next.splice(next.length - 1, 0, 4);
            return next;
        });
    };

    const removeLayer = (index) => {
        // Prevent removing input/output
        if (structure.length <= 2) return;
        if (index <= 0 || index >= structure.length - 1) return;

        applyStructure(prev => prev.filter((_, i) => i !== index));
    };

    const updateNodeCount = (layerIndex, delta) => {
        if (layerIndex === 0 || layerIndex === structure.length - 1) return; // Don't change input/output for now

        applyStructure(prev => {
            const next = [...prev];
            next[layerIndex] = Math.max(1, next[layerIndex] + delta);
            return next;
        });
    };

    const addSample = (inputGrid, label) => {
        setCustomData(prev => [...prev, { input: inputGrid, label }]);
    };

    const updateDatasetParams = (update) => {
        setDatasetParamsState(prev => {
            const next = typeof update === 'function' ? update(prev) : { ...prev, ...update };
            if (mode === 'simple') {
                replaceDataset(next.type, next.size);
            }
            return next;
        });
    };

    const changeMode = (nextMode) => {
        if (nextMode === mode) return;
        setModeState(nextMode);
        setIsPlaying(false);
        setCustomData([]);
        if (nextMode === 'vision') {
            applyStructure(VISION_STRUCTURE);
            clearDataset();
        } else {
            applyStructure(DEFAULT_STRUCTURE);
            replaceDataset(datasetParams.type, datasetParams.size);
        }
    };

    const updateHyperparams = (newParams) => {
        setHyperparams(prev => ({ ...prev, ...newParams }));
        const res = network.updateConfig(newParams);
        if (res.rebuild) {
            rebuildModel(structure);
        }
    };

    const predictSample = (inputGrid) => {
        if (!network.model) return null;
        // return class probs
        const res = tf.tidy(() => {
            const input = tf.tensor2d([Array.from(inputGrid)]);
            return network.predict(input).dataSync();
        });
        return res; // Float32Array
    };

    return {
        isPlaying,
        setIsPlaying,
        epoch,
        loss,
        structure,
        datasetParams,
        setDatasetParams: updateDatasetParams,
        addLayer,
        removeLayer,
        updateNodeCount,
        model: network,
        data: dataset,
        modelVersion,
        mode,
        setMode: changeMode,
        addSample,
        predictSample,
        customData,
        hyperparams,
        updateHyperparams
    };
}
