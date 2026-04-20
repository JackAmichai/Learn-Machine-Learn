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
            expect(nn.config.batchSize).toBe(32);
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

        it('should update batch size', () => {
            nn.updateConfig({ batchSize: 64 });
            expect(nn.config.batchSize).toBe(64);
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

    describe('getConnectionWeightsAsync', () => {
        it('should return weights asynchronously for valid layer index', async () => {
            nn.createModel([2, 4, 1]);

            const weights = await nn.getConnectionWeightsAsync(0);
            expect(weights).not.toBeNull();
            // Layer 0 connects 2 inputs to 4 hidden = 8 weights
            expect(weights.length).toBe(8);
            expect(weights).toBeInstanceOf(Float32Array);
        });

        it('should return null for invalid layer index', async () => {
            nn.createModel([2, 4, 1]);

            const weights = await nn.getConnectionWeightsAsync(99);
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

    describe('Dead Neuron Detection', () => {
        beforeEach(() => {
            nn = new NeuralNetwork({
                learningRate: 0.1,
                activation: 'relu', // Important for dead neuron detection
                outputActivation: 'sigmoid'
            });
        });

        it('should detect dead neurons', () => {
            // Create a model: Input 2 -> Hidden 4 -> Output 1
            nn.createModel([2, 4, 1]);

            // Manually set weights of the first hidden layer.
            // We want some neurons to be always negative (dead for ReLU).
            // Hidden layer 1 has 4 units. Input has 2 units.
            // Weights shape: [2, 4], Bias shape: [4]

            const layer1 = nn.model.layers[0];

            // Weights: All negative large numbers
            const weights = tf.tensor2d([
                [-10, -10, 10, 10], // Input 1 weights
                [-10, -10, 10, 10]  // Input 2 weights
            ]);

            // Biases: First two are negative, last two are positive
            const biases = tf.tensor1d([-100, -100, 100, 100]);

            layer1.setWeights([weights, biases]);

            // Create input data that is positive (0 to 1)
            const xs = tf.tensor2d([
                [0.1, 0.1],
                [0.5, 0.5],
                [0.9, 0.9]
            ]);

            // Run scan
            const deadMap = nn.scanForDeadNeurons(xs);

            // Expected: Layer index 1 (first hidden) should have neurons 0 and 1 dead.
            // Neurons 2 and 3 should be active (positive weights/biases).

            // Clean up tensors
            weights.dispose();
            biases.dispose();
            xs.dispose();

            expect(deadMap).toBeDefined();
            expect(deadMap[1]).toBeDefined();
            expect(deadMap[1]).toContain(0);
            expect(deadMap[1]).toContain(1);
            expect(deadMap[1]).not.toContain(2);
            expect(deadMap[1]).not.toContain(3);
        });

        it('should return empty object for no dead neurons', () => {
            nn.createModel([2, 2, 1]);

            const layer1 = nn.model.layers[0];
            const weights = tf.tensor2d([[1, 1], [1, 1]]);
            const biases = tf.tensor1d([1, 1]);
            layer1.setWeights([weights, biases]);

            const xs = tf.tensor2d([[1, 1]]);

            const deadMap = nn.scanForDeadNeurons(xs);

            weights.dispose();
            biases.dispose();
            xs.dispose();

            expect(Object.keys(deadMap).length).toBe(0);
        });
    });

    describe('Security Validation', () => {
        it('should fallback to default activation if invalid', () => {
            const secureNN = new NeuralNetwork({ activation: 'malicious-func' });
            expect(secureNN.config.activation).toBe('relu');
            secureNN.dispose();
        });

        it('should fallback to default optimizer if invalid', () => {
            const secureNN = new NeuralNetwork({ optimizer: 'exploit-opt' });
            expect(secureNN.config.optimizer).toBe('adam');
            secureNN.dispose();
        });

        it('should clamp extremely small learning rate', () => {
            const secureNN = new NeuralNetwork({ learningRate: -0.1 });
            expect(secureNN.config.learningRate).toBe(0.000001);
            secureNN.dispose();
        });

        it('should clamp extremely large learning rate', () => {
            const secureNN = new NeuralNetwork({ learningRate: 100 });
            expect(secureNN.config.learningRate).toBe(1.0);
            secureNN.dispose();
        });

        it('should clamp large batch size', () => {
             const secureNN = new NeuralNetwork({ batchSize: 5000 });
             expect(secureNN.config.batchSize).toBe(1024);
             secureNN.dispose();
        });

        it('should validate structure on createModel', () => {
             const secureNN = new NeuralNetwork();
             const result = secureNN.createModel("invalid-structure");
             expect(result).toBeNull();
             secureNN.dispose();
        });

        it('should reject too short structure', () => {
             const secureNN = new NeuralNetwork();
             const result = secureNN.createModel([10]);
             expect(result).toBeNull();
             secureNN.dispose();
        });

        it('should truncate too deep structure', () => {
             const secureNN = new NeuralNetwork();
             const deepStructure = new Array(100).fill(10);
             // MAX_LAYERS is 32.
             secureNN.createModel(deepStructure);
             // Structure length 32 means 31 layers
             expect(secureNN.model.layers.length).toBeLessThanOrEqual(32);
             secureNN.dispose();
        });
    });
});
