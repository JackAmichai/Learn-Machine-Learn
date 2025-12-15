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

    // Refs to hold mutable non-react state
    const nn = useRef(new NeuralNetwork({ learningRate: 0.1 }));
    const data = useRef(null);

    // We expose a "version" number to trigger strict re-renders of visualizations
    const [modelVersion, setModelVersion] = useState(0);

    // Initialize Data
    useEffect(() => {
        if (data.current) {
            data.current.xs.dispose();
            data.current.ys.dispose();
        }
        data.current = generateData(datasetParams.type, datasetParams.size);
        // Reset model when data changes? Optional.
        setEpoch(0);
        setLoss(0);
    }, [datasetParams]);

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
            if (!data.current) return;

            const history = await nn.current.train(data.current.xs, data.current.ys, 1);

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
    }, [isPlaying]);

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
        tf // expose if needed
    };
}
