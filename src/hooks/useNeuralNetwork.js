import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork } from '../engine/NeuralNetwork';
import { generateData, DataType } from '../engine/data';

export function useNeuralNetwork() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const [loss, setLoss] = useState(0);
    const [structure, setStructure] = useState([2, 5, 4, 1]); // default simple network
    const [datasetParams, setDatasetParams] = useState({ type: DataType.SPIRAL, size: 300 });
    const [mode, setMode] = useState('simple'); // 'simple' | 'vision'
    const [customData, setCustomData] = useState([]); // Array of {input: [], label: 0}
    const [hyperparams, setHyperparams] = useState({
        learningRate: 0.1,
        activation: 'relu',
        optimizer: 'adam'
    });

    // Refs to hold mutable non-react state
    const nn = useRef(new NeuralNetwork(hyperparams));
    const data = useRef(null);

    // We expose a "version" number to trigger strict re-renders of visualizations
    const [modelVersion, setModelVersion] = useState(0);

    // Initialize Data
    useEffect(() => {
        // If Mode is Vision, we don't generate random data automatically.
        // We rely on user adding samples.
        if (mode === 'vision') {
            if (data.current) {
                data.current.xs.dispose();
                data.current.ys.dispose();
                data.current = null;
            }
            return;
        }

        if (data.current) {
            data.current.xs.dispose();
            data.current.ys.dispose();
        }
        data.current = generateData(datasetParams.type, datasetParams.size);
        setEpoch(0);
        setLoss(0);
    }, [datasetParams, mode]);

    // Handle Mode Switching impact on Structure
    useEffect(() => {
        // If switching to Vision, set appropriate structure
        if (mode === 'vision') {
            setStructure([100, 16, 2]); // 10x10=100 input, 2 classes (A/B)
        } else {
            setStructure([2, 5, 4, 1]);
        }
        setCustomData([]); // Clear custom data on mode switch
        setIsPlaying(false);
    }, [mode]);

    // Initialize/Update Model Structure
    useEffect(() => {
        nn.current.createModel(structure);
        setModelVersion(v => v + 1);
        setEpoch(0);
        setLoss(0);
    }, [structure]);

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
                if (!data.current) return;
                xs = data.current.xs;
                ys = data.current.ys;
            }

            const history = await nn.current.train(xs, ys, 1);

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
    }, [isPlaying, mode, customData]); // Added mode and customData to dependencies

    const addLayer = () => {
        // Add a layer before the output
        const newStruct = [...structure];
        newStruct.splice(newStruct.length - 1, 0, 4); // add hidden layer of 4
        setStructure(newStruct);
    };

    const removeLayer = (index) => {
        // Prevent removing input/output
        if (structure.length <= 2) return;
        if (index <= 0 || index >= structure.length - 1) return;

        const newStruct = structure.filter((_, i) => i !== index);
        setStructure(newStruct);
    };

    const updateNodeCount = (layerIndex, delta) => {
        if (layerIndex === 0 || layerIndex === structure.length - 1) return; // Don't change input/output for now

        const newStruct = [...structure];
        newStruct[layerIndex] = Math.max(1, newStruct[layerIndex] + delta);
        setStructure(newStruct);
    };

    const addSample = (inputGrid, label) => {
        setCustomData(prev => [...prev, { input: inputGrid, label }]);
    };

    const updateHyperparams = (newParams) => {
        setHyperparams(prev => ({ ...prev, ...newParams }));
        const res = nn.current.updateConfig(newParams);
        if (res.rebuild) {
            nn.current.createModel(structure);
            setModelVersion(v => v + 1);
            setEpoch(0);
            setLoss(0);
        }
    };

    const predictSample = (inputGrid) => {
        if (!nn.current.model) return null;
        // return class probs
        const res = tf.tidy(() => {
            const input = tf.tensor2d([Array.from(inputGrid)]);
            return nn.current.predict(input).dataSync();
        });
        return res; // Float32Array
    };

    return {
        isPlaying,
        setIsPlaying,
        epoch,
        loss,
        structure,
        setStructure,
        datasetParams,
        setDatasetParams,
        addLayer,
        removeLayer,
        updateNodeCount,
        model: nn.current,
        data: data.current,
        modelVersion,
        mode,
        setMode,
        addSample,
        predictSample,
        customData,
        hyperparams,
        updateHyperparams,
        tf // expose if needed
    };
}
