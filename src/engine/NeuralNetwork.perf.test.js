import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork } from './NeuralNetwork.js';

describe('NeuralNetwork Performance', () => {
    let nn;

    beforeEach(() => {
        nn = new NeuralNetwork();
    });

    afterEach(() => {
        if (nn) {
            nn.dispose();
        }
        tf.disposeVariables();
        vi.restoreAllMocks();
    });

    it('getConnectionWeightsAsync should not use dataSync', async () => {
        nn.createModel([2, 4, 1]);

        // Spy on dataSync
        // Note: dataSync is a method on the prototype of Tensor
        const dataSyncSpy = vi.spyOn(tf.Tensor.prototype, 'dataSync');

        const weights = await nn.getConnectionWeightsAsync(0);

        expect(weights).not.toBeNull();
        expect(weights.length).toBe(8); // 2 inputs * 4 units

        // Ensure dataSync was NOT called
        expect(dataSyncSpy).not.toHaveBeenCalled();
    });

    it('scanForDeadNeurons should not use dataSync', async () => {
        nn.createModel([2, 4, 1]);

        // Spy on dataSync
        const dataSyncSpy = vi.spyOn(tf.Tensor.prototype, 'dataSync');

        const xs = tf.tensor2d([[0, 0]]);
        await nn.scanForDeadNeurons(xs);

        // Ensure dataSync was NOT called
        expect(dataSyncSpy).not.toHaveBeenCalled();

        xs.dispose();
    });
});
