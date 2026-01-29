import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork } from './NeuralNetwork.js';

describe('NeuralNetwork Security', () => {
    let nn;
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    beforeEach(() => {
        nn = new NeuralNetwork();
        consoleSpy.mockClear();
    });

    afterEach(() => {
        if (nn) nn.dispose();
        tf.disposeVariables();
    });

    it('should validate activation function in constructor', () => {
        const unsafeNN = new NeuralNetwork({ activation: 'exploit_script' });

        // Desired behavior:
        // 1. Should not have 'exploit_script' as activation
        // 2. Should fallback to 'relu' (or default)
        // 3. Should log a warning

        // Current behavior (likely):
        // 1. Accepts 'exploit_script'
        // 2. Fails later when used

        // We assert the "Fixed" state. If this fails, we know we need to fix it.
        expect(unsafeNN.config.activation).toBe('relu');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid activation'));
    });

    it('should validate optimizer in constructor', () => {
        const unsafeNN = new NeuralNetwork({ optimizer: 'mining_script' });

        expect(unsafeNN.config.optimizer).toBe('adam');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid optimizer'));
    });

    it('should validate activation function in updateConfig', () => {
        nn.updateConfig({ activation: 'malicious' });

        expect(nn.config.activation).toBe('relu');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid activation'));
    });

    it('should validate optimizer in updateConfig', () => {
        nn.updateConfig({ optimizer: 'bad_opt' });

        expect(nn.config.optimizer).toBe('adam');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid optimizer'));
    });
});
