import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork, ALLOWED_ACTIVATIONS, ALLOWED_OPTIMIZERS } from './NeuralNetwork.js';

describe('NeuralNetwork Security Validation', () => {
    let nn;

    beforeEach(() => {
        // Mock console.warn to suppress output during tests and verify calls
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        nn = new NeuralNetwork();
    });

    afterEach(() => {
        if (nn) {
            nn.dispose();
        }
        vi.restoreAllMocks();
        tf.disposeVariables();
    });

    describe('Constructor Validation', () => {
        it('should default to "relu" when invalid activation is provided', () => {
            const unsafeConfig = { activation: 'malicious-script-injection' };
            const safeNN = new NeuralNetwork(unsafeConfig);

            expect(safeNN.config.activation).toBe('relu');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid activation"));
            safeNN.dispose();
        });

        it('should default to "sigmoid" when invalid outputActivation is provided', () => {
            const unsafeConfig = { outputActivation: 'malicious-script-injection' };
            const safeNN = new NeuralNetwork(unsafeConfig);

            expect(safeNN.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid outputActivation"));
            safeNN.dispose();
        });

        it('should default to "adam" when invalid optimizer is provided', () => {
            const unsafeConfig = { optimizer: 'unsupported-optimizer' };
            const safeNN = new NeuralNetwork(unsafeConfig);

            expect(safeNN.config.optimizer).toBe('adam');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid optimizer"));
            safeNN.dispose();
        });

        it('should accept valid activations', () => {
            ALLOWED_ACTIVATIONS.forEach(activation => {
                const safeNN = new NeuralNetwork({ activation, outputActivation: activation });
                expect(safeNN.config.activation).toBe(activation);
                expect(safeNN.config.outputActivation).toBe(activation);
                safeNN.dispose();
            });
        });

        it('should accept valid optimizers', () => {
            ALLOWED_OPTIMIZERS.forEach(optimizer => {
                const safeNN = new NeuralNetwork({ optimizer });
                expect(safeNN.config.optimizer).toBe(optimizer);
                safeNN.dispose();
            });
        });

        it('should not mutate input configuration object', () => {
            const config = { activation: 'invalid' };
            const safeNN = new NeuralNetwork(config);

            // Check that config object was not changed
            expect(config.activation).toBe('invalid');
            expect(safeNN.config.activation).toBe('relu');
            safeNN.dispose();
        });
    });

    describe('UpdateConfig Validation', () => {
        it('should ignore invalid activation updates', () => {
            // Start with valid config
            nn = new NeuralNetwork({ activation: 'relu' });

            // Attempt update with invalid activation
            nn.updateConfig({ activation: 'malicious' });

            // Should remain 'relu'
            expect(nn.config.activation).toBe('relu');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid activation"));
        });

        it('should ignore invalid outputActivation updates', () => {
            nn = new NeuralNetwork({ outputActivation: 'sigmoid' });
            nn.updateConfig({ outputActivation: 'malicious' });
            expect(nn.config.outputActivation).toBe('sigmoid');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid outputActivation"));
        });

        it('should ignore invalid optimizer updates', () => {
            // Start with valid config
            nn = new NeuralNetwork({ optimizer: 'adam' });

            // Attempt update with invalid optimizer
            nn.updateConfig({ optimizer: 'invalid' });

            // Should remain 'adam'
            expect(nn.config.optimizer).toBe('adam');
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Invalid optimizer"));
        });

        it('should accept valid activation updates', () => {
            nn.updateConfig({ activation: 'tanh' });
            expect(nn.config.activation).toBe('tanh');
        });

        it('should accept valid optimizer updates', () => {
            nn.updateConfig({ optimizer: 'sgd' });
            expect(nn.config.optimizer).toBe('sgd');
        });

        it('should not mutate input configuration object during update', () => {
            nn = new NeuralNetwork({ activation: 'relu' });
            const update = { activation: 'invalid' };
            nn.updateConfig(update);

            expect(update.activation).toBe('invalid');
            expect(nn.config.activation).toBe('relu');
        });
    });
});
