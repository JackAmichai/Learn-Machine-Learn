import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork } from '../engine/NeuralNetwork';
import { generateData, DataType } from '../engine/data';

const DEFAULT_STRUCTURE = [2, 5, 4, 1];
const VISION_STRUCTURE = [100, 16, 2];
const STORAGE_KEY = 'learn-ml-model-state-v1';
const DEFAULT_DATASET_PARAMS = { type: DataType.SPIRAL, size: 300, noise: 0.15 };
const DEFAULT_LAYER_FEATURE = { batchNorm: false, dropout: false, dropoutRate: 0.2 };

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const sanitizeLayerFeature = (feature = {}) => ({
    batchNorm: Boolean(feature.batchNorm),
    dropout: Boolean(feature.dropout),
    dropoutRate: clamp(
        typeof feature.dropoutRate === 'number' ? feature.dropoutRate : DEFAULT_LAYER_FEATURE.dropoutRate,
        0,
        0.9
    )
});

const buildLayerFeatureMap = (structure, previous = {}) => {
    if (!Array.isArray(structure) || structure.length <= 2) return {};
    const map = {};
    for (let i = 1; i < structure.length - 1; i++) {
        map[i] = sanitizeLayerFeature(previous[i]);
    }
    return map;
};

const createStepState = (status = 'Ready for forward pass') => ({
    phase: 'forward',
    lastForwardLoss: null,
    lastBackwardLoss: null,
    status,
    busy: false
});

const structuresEqual = (a, b) => (
    a.length === b.length && a.every((val, idx) => val === b[idx])
);

const serializeCustomSamples = (samples = []) => samples.map(sample => ({
    label: sample.label,
    input: Array.from(sample.input || [])
}));

const deserializeCustomSamples = (samples = []) => samples.map(sample => ({
    label: sample.label,
    input: new Float32Array(sample.input || [])
}));

const sanitizeDatasetParams = (params = {}) => ({
    ...DEFAULT_DATASET_PARAMS,
    ...params,
    noise: typeof params.noise === 'number' ? params.noise : DEFAULT_DATASET_PARAMS.noise
});

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
    const [datasetParams, setDatasetParamsState] = useState(DEFAULT_DATASET_PARAMS);
    const [mode, setModeState] = useState('simple'); // 'simple' | 'vision'
    const [customData, setCustomData] = useState([]); // Array of {input: [], label: 0}
    const [hyperparams, setHyperparams] = useState({
        learningRate: 0.1,
        activation: 'relu',
        optimizer: 'adam',
        gradientClip: 0
    });
    const [trainingMode, setTrainingModeState] = useState('continuous'); // 'continuous' | 'slow' | 'step'
    const [slowDelay, setSlowDelay] = useState(600);
    const [stepState, setStepState] = useState(() => createStepState());
    const [layerFeatures, setLayerFeatures] = useState(() => buildLayerFeatureMap(DEFAULT_STRUCTURE));
    const [deadNeurons, setDeadNeurons] = useState({});
    const layerFeatureRef = useRef(layerFeatures);
    const scanCounterRef = useRef(0);

    useEffect(() => {
        layerFeatureRef.current = layerFeatures;
    }, [layerFeatures]);

    const [network] = useState(() => {
        const nn = new NeuralNetwork(hyperparams);
        nn.createModel(DEFAULT_STRUCTURE, layerFeatures);
        return nn;
    });
    const datasetRef = useRef(null);
    const [dataset, setDatasetState] = useState(() => generateData(
        DEFAULT_DATASET_PARAMS.type,
        DEFAULT_DATASET_PARAMS.size,
        DEFAULT_DATASET_PARAMS.noise
    ));
    const resetStepState = (status = 'Ready for forward pass') => {
        setStepState(createStepState(status));
    };

    const buildVisionBatch = useCallback(() => {
        if (customData.length === 0) return null;
        const xArr = customData.map(d => Array.from(d.input));
        const yArr = customData.map(d => (d.label === 0 ? [1, 0] : [0, 1]));
        const xs = tf.tensor2d(xArr);
        const ys = tf.tensor2d(yArr);
        return { xs, ys, dispose: true };
    }, [customData]);

    const getTrainingBatch = useCallback(() => {
        if (mode === 'vision') {
            return buildVisionBatch();
        }
        if (!dataset) return null;
        return { xs: dataset.xs, ys: dataset.ys, dispose: false };
    }, [mode, dataset, buildVisionBatch]);

    const evaluateBatchLoss = async (xs, ys) => {
        if (!network.model) return null;
        const evalResult = await network.model.evaluate(xs, ys, { batchSize: 32 });
        const tensors = Array.isArray(evalResult) ? evalResult : [evalResult];
        const lossTensor = tensors[0];
        const data = await lossTensor.data();
        tensors.forEach(t => t.dispose());
        return data[0];
    };

    const applyTrainingHistory = (history) => {
        if (!history || !history.history) return;
        const lossHistory = history.history.loss;
        const lossVal = Array.isArray(lossHistory) ? lossHistory[0] : lossHistory;
        if (typeof lossVal === 'number' && !Number.isNaN(lossVal)) {
            setLoss(lossVal);
        }
        setEpoch(e => e + 1);
        setModelVersion(v => v + 1);
    };

    // We expose a "version" number to trigger strict re-renders of visualizations
    const [modelVersion, setModelVersion] = useState(0);

    useEffect(() => {
        datasetRef.current = dataset;
    }, [dataset]);

    useEffect(() => () => {
        disposeDataset(datasetRef.current);
    }, []);

    useEffect(() => {
        if (trainingMode === 'step' && isPlaying) {
            setIsPlaying(false);
        }
    }, [trainingMode, isPlaying]);

    useEffect(() => {
        resetStepState('Configuration changed - run forward pass.');
    }, [datasetParams.type, datasetParams.size, datasetParams.noise, mode, structure]);

    useEffect(() => {
        if (mode === 'vision') {
            resetStepState('Custom samples updated - run forward pass.');
        }
    }, [customData.length, mode]);

    const resetTrainingStats = () => {
        setEpoch(0);
        setLoss(0);
    };

    const rebuildModel = (nextStructure, featureOverride) => {
        const appliedFeatures = featureOverride || layerFeatureRef.current;
        network.createModel(nextStructure, appliedFeatures);
        setModelVersion(v => v + 1);
        resetTrainingStats();
    };

    const applyStructure = (nextStructure, featureOverride = null) => {
        setStructureState(prev => {
            const target = typeof nextStructure === 'function' ? nextStructure(prev) : nextStructure;
            const sameStructure = structuresEqual(prev, target);
            if (sameStructure && !featureOverride) {
                return prev;
            }
            const nextFeatures = featureOverride || buildLayerFeatureMap(target, layerFeatureRef.current);
            layerFeatureRef.current = nextFeatures;
            setLayerFeatures(nextFeatures);
            rebuildModel(target, nextFeatures);
            return sameStructure ? prev : target;
        });
    };

    const replaceDataset = (type, size, noise) => {
        const next = generateData(type, size, typeof noise === 'number' ? noise : DEFAULT_DATASET_PARAMS.noise);
        setDatasetState(prev => {
            disposeDataset(prev);
            return next;
        });
        resetTrainingStats();
        resetStepState('Dataset regenerated - run forward pass.');
    };

    const clearDataset = () => {
        setDatasetState(prev => {
            disposeDataset(prev);
            return null;
        });
        resetTrainingStats();
        resetStepState('Dataset cleared - add samples to continue.');
    };

    // Training Loop
    useEffect(() => {
        if (!isPlaying || trainingMode === 'step') return;

        let cancelled = false;
        let frameId = null;
        let timerId = null;

        const scheduleNext = () => {
            if (cancelled || !isPlaying) return;
            if (trainingMode === 'slow') {
                timerId = setTimeout(runIteration, slowDelay);
            } else {
                frameId = requestAnimationFrame(runIteration);
            }
        };

        const runIteration = async () => {
            if (cancelled || !isPlaying) return;

            const batch = getTrainingBatch();
            if (!batch) {
                setIsPlaying(false);
                setStepState(prev => ({ ...prev, status: 'Provide training data to continue.', phase: 'forward', busy: false }));
                return;
            }

            const { xs, ys, dispose } = batch;
            let history = null;
            try {
                history = await network.train(xs, ys, 1);

                // Check for dead neurons periodically within the same scope
                // before tensors are potentially disposed
                scanCounterRef.current++;
                if (scanCounterRef.current >= 20 && !cancelled && history) {
                    scanCounterRef.current = 0;
                    const deadMap = network.scanForDeadNeurons(xs);
                    setDeadNeurons(deadMap);
                }

            } catch (error) {
                console.error('Training error:', error);
                setIsPlaying(false);
            } finally {
                if (dispose) {
                    xs.dispose();
                    ys.dispose();
                }
            }

            if (!history || cancelled) {
                return;
            }

            applyTrainingHistory(history);

            if (!cancelled && isPlaying) {
                scheduleNext();
            }
        };

        scheduleNext();

        return () => {
            cancelled = true;
            if (frameId) cancelAnimationFrame(frameId);
            if (timerId) clearTimeout(timerId);
        };
    }, [isPlaying, trainingMode, slowDelay, network, getTrainingBatch]);

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

    const updateLayerFeatures = (layerIndex, update) => {
        if (layerIndex <= 0 || layerIndex >= structure.length - 1) return;
        setLayerFeatures(prev => {
            const current = prev[layerIndex] || DEFAULT_LAYER_FEATURE;
            const patch = typeof update === 'function' ? update(current) : update;
            const nextFeature = sanitizeLayerFeature({ ...current, ...patch });
            const next = { ...prev, [layerIndex]: nextFeature };
            layerFeatureRef.current = next;
            rebuildModel(structure, next);
            return next;
        });
    };

    const addSample = (inputGrid, label) => {
        setCustomData(prev => [...prev, { input: inputGrid, label }]);
        resetStepState('Custom samples updated - run forward pass.');
    };

    const updateDatasetParams = (update) => {
        setDatasetParamsState(prev => {
            const proposed = typeof update === 'function' ? update(prev) : { ...prev, ...update };
            const next = sanitizeDatasetParams(proposed);
            if (mode === 'simple') {
                replaceDataset(next.type, next.size, next.noise);
            }
            return next;
        });
    };

    const updateTrainingMode = (nextMode) => {
        setTrainingModeState(nextMode);
        if (nextMode === 'step') {
            setIsPlaying(false);
            resetStepState('Step mode active - run forward pass.');
        }
    };

    const updateSlowDelayValue = (value) => {
        const numeric = typeof value === 'number' ? value : slowDelay;
        setSlowDelay(clamp(numeric, 150, 2000));
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
            replaceDataset(datasetParams.type, datasetParams.size, datasetParams.noise);
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

    const runForwardPass = async () => {
        const batch = getTrainingBatch();
        if (!batch) {
            setStepState(prev => ({ ...prev, status: 'Need training data before running forward pass.', busy: false }));
            return null;
        }
        setStepState(prev => ({ ...prev, busy: true, status: 'Running forward pass...' }));
        try {
            const lossVal = await evaluateBatchLoss(batch.xs, batch.ys);
            setStepState(prev => ({
                ...prev,
                busy: false,
                phase: 'backward',
                lastForwardLoss: lossVal,
                status: 'Forward pass complete. Execute backward pass to update weights.'
            }));
            return lossVal;
        } catch (error) {
            console.error('Forward pass failed:', error);
            setStepState(prev => ({ ...prev, busy: false, status: 'Forward pass failed. Check console for details.' }));
            throw error;
        } finally {
            if (batch.dispose) {
                batch.xs.dispose();
                batch.ys.dispose();
            }
        }
    };

    const runBackwardPass = async () => {
        if (stepState.phase !== 'backward') {
            setStepState(prev => ({ ...prev, status: 'Run a forward pass before applying backward updates.' }));
            return null;
        }
        const batch = getTrainingBatch();
        if (!batch) {
            setStepState(prev => ({ ...prev, status: 'Need training data before running backward pass.', busy: false }));
            return null;
        }
        setStepState(prev => ({ ...prev, busy: true, status: 'Running backward pass...' }));
        let history = null;
        try {
            history = await network.train(batch.xs, batch.ys, 1);
        } catch (error) {
            console.error('Backward pass failed:', error);
            setStepState(prev => ({ ...prev, busy: false, status: 'Backward pass failed. Check console for details.' }));
            throw error;
        } finally {
            if (batch.dispose) {
                batch.xs.dispose();
                batch.ys.dispose();
            }
        }

        if (history) {
            applyTrainingHistory(history);
            const lossHistory = history.history?.loss;
            const lossVal = Array.isArray(lossHistory) ? lossHistory[0] : lossHistory;
            setStepState(prev => ({
                ...prev,
                busy: false,
                phase: 'forward',
                lastBackwardLoss: typeof lossVal === 'number' ? lossVal : prev.lastBackwardLoss,
                status: 'Backward step applied. Run forward pass to inspect new loss.'
            }));
            return lossVal ?? null;
        }

        setStepState(prev => ({ ...prev, busy: false, status: 'Backward pass produced no history results.' }));
        return null;
    };

    const buildModelSnapshot = () => ({
        version: 1,
        timestamp: new Date().toISOString(),
        structure: [...structure],
        mode,
        datasetParams: { ...datasetParams },
        hyperparams: { ...hyperparams },
        layerFeatures: { ...layerFeatures },
        customData: serializeCustomSamples(customData),
        weights: network.getWeights()
    });

    const applySnapshot = (snapshot) => {
        if (!snapshot || !Array.isArray(snapshot.structure) || snapshot.structure.length < 2) {
            throw new Error('Invalid model snapshot.');
        }

        setIsPlaying(false);

        const targetStructure = snapshot.structure;
        const nextMode = snapshot.mode || 'simple';
        const nextHyperparams = snapshot.hyperparams
            ? { ...hyperparams, ...snapshot.hyperparams }
            : { ...hyperparams };
        const persistedDatasetParams = sanitizeDatasetParams(snapshot.datasetParams || datasetParams);
        const persistedLayerFeatures = buildLayerFeatureMap(targetStructure, snapshot.layerFeatures || {});

        setHyperparams(nextHyperparams);
        network.updateConfig(nextHyperparams);
        setModeState(nextMode);
        setDatasetParamsState(persistedDatasetParams);

        applyStructure(targetStructure, persistedLayerFeatures);

        if (nextMode === 'vision') {
            clearDataset();
            setCustomData(deserializeCustomSamples(snapshot.customData || []));
        } else {
            const type = persistedDatasetParams.type;
            const size = persistedDatasetParams.size;
            setCustomData([]);
            replaceDataset(type, size, persistedDatasetParams.noise);
        }

        if (Array.isArray(snapshot.weights) && snapshot.weights.length) {
            network.setWeights(snapshot.weights);
        }

        resetTrainingStats();
        setModelVersion(v => v + 1);
    };

    const saveModelToLocal = () => {
        if (typeof window === 'undefined' || !window.localStorage) {
            throw new Error('Local storage is unavailable in this environment.');
        }
        const snapshot = buildModelSnapshot();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        return snapshot;
    };

    const loadModelFromLocal = () => {
        if (typeof window === 'undefined' || !window.localStorage) {
            throw new Error('Local storage is unavailable in this environment.');
        }
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const snapshot = JSON.parse(raw);
        applySnapshot(snapshot);
        return snapshot;
    };

    const exportModelJSON = () => JSON.stringify(buildModelSnapshot(), null, 2);

    const importModelJSON = (payload) => {
        const snapshot = typeof payload === 'string' ? JSON.parse(payload) : payload;
        applySnapshot(snapshot);
        return snapshot;
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
        layerFeatures,
        updateLayerFeatures,
        model: network,
        data: dataset,
        modelVersion,
        mode,
        setMode: changeMode,
        addSample,
        predictSample,
        customData,
        hyperparams,
        updateHyperparams,
        trainingMode,
        setTrainingMode: updateTrainingMode,
        slowDelay,
        setSlowDelay: updateSlowDelayValue,
        stepState,
        deadNeurons,
        runForwardPass,
        runBackwardPass,
        saveModelToLocal,
        loadModelFromLocal,
        exportModelJSON,
        importModelJSON
    };
}
