import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as tf from '@tensorflow/tfjs';
import { NeuralNetwork } from './NeuralNetwork.js';

describe('NeuralNetwork', () => {
    let nn;

    beforeEach(() => {
        nn = new NeuralNetwork();
    });

    afterEach(() => {
        if (nn) {
            nn.dispose();
        }
        tf.disposeVariables();
    });

    describe('constructor', () => {
        it('should create instance with default config', () => {
            expect(nn.model).toBeNull();
            expect(nn.config.learningRate).toBe(0.1);
            expect(nn.config.optimizer).toBe('adam');
            expect(nn.config.activation).toBe('relu');
            expect(nn.config.outputActivation).toBe('sigmoid');
        });

        it('should accept custom config', () => {
            const customNN = new NeuralNetwork({
                learningRate: 0.01,
                optimizer: 'sgd',
                activation: 'tanh'
            });
            expect(customNN.config.learningRate).toBe(0.01);
            expect(customNN.config.optimizer).toBe('sgd');
            expect(customNN.config.activation).toBe('tanh');
            customNN.dispose();
        });
    });

    describe('createModel', () => {
        it('should create a model with correct structure', () => {
            const structure = [2, 4, 1];
            nn.createModel(structure);
            
            expect(nn.model).not.toBeNull();
            // Model should have layers: 1 hidden (4 units) + 1 output (1 unit)
            // Note: tf.sequential only counts actual layers, not input
            expect(nn.model.layers.length).toBeGreaterThanOrEqual(2);
        });

        it('should create model with multiple hidden layers', () => {
            const structure = [2, 8, 4, 1];
            nn.createModel(structure);
            
            expect(nn.model).not.toBeNull();
            expect(nn.connectionLayers.length).toBe(3); // 2 hidden + 1 output
        });

        it('should support softmax for multi-class output', () => {
            const structure = [2, 4, 3]; // 3 output classes
            nn.createModel(structure);
            
            const outputLayer = nn.model.layers[nn.model.layers.length - 1];
            expect(outputLayer.getConfig().activation).toBe('softmax');
        });

        it('should dispose previous model on rebuild', () => {
            nn.createModel([2, 4, 1]);
            const firstModel = nn.model;
            
            nn.createModel([2, 8, 4, 1]);
            
            // New model should be different
            expect(nn.model).not.toBe(firstModel);
        });

        it('should support batch normalization', () => {
            nn.createModel([2, 4, 1], { 1: { batchNorm: true } });
            
            // Model should have more layers due to batch norm
            const layerTypes = nn.model.layers.map(l => l.getClassName());
            expect(layerTypes).toContain('BatchNormalization');
        });

        it('should support dropout', () => {
            nn.createModel([2, 4, 1], { 1: { dropout: true, dropoutRate: 0.3 } });
            
            const layerTypes = nn.model.layers.map(l => l.getClassName());
            expect(layerTypes).toContain('Dropout');
        });
    });

    describe('updateConfig', () => {
        it('should update config values', () => {
            nn.updateConfig({ learningRate: 0.05 });
            expect(nn.config.learningRate).toBe(0.05);
        });

        it('should flag rebuild needed when activation changes', () => {
            nn.createModel([2, 4, 1]);
            const result = nn.updateConfig({ activation: 'tanh' });
            expect(result.rebuild).toBe(true);
        });

        it('should not flag rebuild for learning rate change', () => {
            nn.createModel([2, 4, 1]);
            const result = nn.updateConfig({ learningRate: 0.001 });
            expect(result.rebuild).toBe(false);
        });
    });

    describe('predict', () => {
        it('should return predictions for input tensor', () => {
            nn.createModel([2, 4, 1]);
            
            const input = tf.tensor2d([[0.5, 0.5]]);
            const prediction = nn.predict(input);
            
            expect(prediction).not.toBeNull();
            expect(prediction.shape).toEqual([1, 1]);
            
            input.dispose();
            prediction.dispose();
        });

        it('should return null if model not created', () => {
            const input = tf.tensor2d([[0.5, 0.5]]);
            const prediction = nn.predict(input);
            
            expect(prediction).toBeNull();
            input.dispose();
        });

        it('should handle batch predictions', () => {
            nn.createModel([2, 4, 1]);
            
            const input = tf.tensor2d([
                [0.1, 0.2],
                [0.3, 0.4],
                [0.5, 0.6]
            ]);
            const prediction = nn.predict(input);
            
            expect(prediction.shape).toEqual([3, 1]);
            
            input.dispose();
            prediction.dispose();
        });
    });

    describe('train', () => {
        it('should train the model and return history', async () => {
            nn.createModel([2, 4, 1]);
            
            const xs = tf.tensor2d([
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1]
            ]);
            const ys = tf.tensor2d([[0], [1], [1], [0]]);
            
            const history = await nn.train(xs, ys, 1);
            
            expect(history).not.toBeNull();
            expect(history.history).toBeDefined();
            expect(history.history.loss).toBeDefined();
            
            xs.dispose();
            ys.dispose();
        });

        it('should return null if model not created', async () => {
            const xs = tf.tensor2d([[0, 0]]);
            const ys = tf.tensor2d([[0]]);
            
            const history = await nn.train(xs, ys, 1);
            
            expect(history).toBeNull();
            
            xs.dispose();
            ys.dispose();
        });
    });

    describe('getWeights / setWeights', () => {
        it('should serialize and deserialize weights', () => {
            nn.createModel([2, 4, 1]);
            
            const originalWeights = nn.getWeights();
            expect(originalWeights.length).toBeGreaterThan(0);
            
            // Create new network and set weights
            const nn2 = new NeuralNetwork();
            nn2.createModel([2, 4, 1]);
            
            const success = nn2.setWeights(originalWeights);
            expect(success).toBe(true);
            
            nn2.dispose();
        });

        it('should return empty array if no model', () => {
            const weights = nn.getWeights();
            expect(weights).toEqual([]);
        });

        it('should return false for invalid weights', () => {
            nn.createModel([2, 4, 1]);
            const success = nn.setWeights(null);
            expect(success).toBe(false);
        });
    });

    describe('getConnectionWeights', () => {
        it('should return weights for valid layer index', () => {
            nn.createModel([2, 4, 1]);
            
            const weights = nn.getConnectionWeights(0);
            expect(weights).not.toBeNull();
            // Layer 0 connects 2 inputs to 4 hidden = 8 weights
            expect(weights.length).toBe(8);
        });

        it('should return null for invalid layer index', () => {
            nn.createModel([2, 4, 1]);
            
            const weights = nn.getConnectionWeights(99);
            expect(weights).toBeNull();
        });
    });

    describe('dispose', () => {
        it('should dispose the model', () => {
            const testNN = new NeuralNetwork();
            testNN.createModel([2, 4, 1]);
            expect(testNN.model).not.toBeNull();
            
            testNN.dispose();
            // After dispose, model is cleaned up (no double dispose in afterEach)
        });

        it('should handle dispose when no model exists', () => {
            const emptyNN = new NeuralNetwork();
            // Should not throw
            expect(() => emptyNN.dispose()).not.toThrow();
        });
    });
});
