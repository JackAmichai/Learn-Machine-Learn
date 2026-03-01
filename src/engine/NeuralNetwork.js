import * as tf from '@tensorflow/tfjs';

export const ALLOWED_ACTIVATIONS = ['relu', 'sigmoid', 'tanh', 'linear', 'softmax'];
export const ALLOWED_OPTIMIZERS = ['adam', 'sgd'];
export const MAX_NEURONS = 4096;
export const MAX_LAYERS = 32;

/**
 * Clamps a value between min and max bounds.
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} The clamped value
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Neural network wrapper class for TensorFlow.js.
 * Provides a simplified interface for creating, training, and managing
 * neural network models with support for various architectures and features.
 * 
 * @example
 * const nn = new NeuralNetwork({ learningRate: 0.01 });
 * nn.createModel([2, 8, 4, 1]); // 2 inputs, 2 hidden layers, 1 output
 * await nn.train(xs, ys, 100); // Train for 100 epochs
 * const prediction = nn.predict(inputTensor);
 */
export class NeuralNetwork {
  /**
   * Creates a new NeuralNetwork instance.
   * @param {Object} [config={}] - Configuration options
   * @param {number} [config.learningRate=0.1] - Learning rate for optimizer
   * @param {string} [config.optimizer='adam'] - Optimizer type ('adam' or 'sgd')
   * @param {string} [config.loss='meanSquaredError'] - Loss function
   * @param {string} [config.activation='relu'] - Hidden layer activation function
   * @param {string} [config.outputActivation='sigmoid'] - Output layer activation
   * @param {number} [config.gradientClip=0] - Gradient clipping threshold (0 = disabled)
   */
  constructor(config) {
    this.model = null;
    this.connectionLayers = [];
    this.layerFeatures = {};

    // Initial validation
    const safeConfig = this._validateConfig(config || {});

    this.config = {
      learningRate: 0.1,
      optimizer: 'adam',
      loss: 'meanSquaredError',
      activation: 'relu',
      outputActivation: 'sigmoid',
      gradientClip: 0,
      batchSize: 32,
      ...safeConfig
    };
  }

  /**
   * Validates and sanitizes configuration.
   * @param {Object} config - Raw configuration object
   * @returns {Object} Sanitized configuration
   * @private
   */
  _validateConfig(config) {
    const safeConfig = { ...config };

    // Validate activation
    if (safeConfig.activation && !ALLOWED_ACTIVATIONS.includes(safeConfig.activation)) {
      console.warn(`Invalid activation '${safeConfig.activation}'. Defaulting to 'relu'.`);
      safeConfig.activation = 'relu';
    }

    // Validate output activation
    if (safeConfig.outputActivation && !ALLOWED_ACTIVATIONS.includes(safeConfig.outputActivation)) {
      console.warn(`Invalid output activation '${safeConfig.outputActivation}'. Defaulting to 'sigmoid'.`);
      safeConfig.outputActivation = 'sigmoid';
    }

    // Validate optimizer
    if (safeConfig.optimizer && !ALLOWED_OPTIMIZERS.includes(safeConfig.optimizer)) {
      console.warn(`Invalid optimizer '${safeConfig.optimizer}'. Defaulting to 'adam'.`);
      safeConfig.optimizer = 'adam';
    }

    // Clamp numeric values
    if (typeof safeConfig.learningRate === 'number') {
        safeConfig.learningRate = clamp(safeConfig.learningRate, 0.000001, 1.0);
    }

    if (typeof safeConfig.batchSize === 'number') {
        safeConfig.batchSize = Math.floor(clamp(safeConfig.batchSize, 1, 1024));
    }

    if (typeof safeConfig.gradientClip === 'number') {
        safeConfig.gradientClip = clamp(safeConfig.gradientClip, 0, 10);
    }

    return safeConfig;
  }

  /**
   * Updates the network configuration.
   * @param {Object} newConfig - New configuration values to merge
   * @returns {{rebuild: boolean}} Object indicating if model needs rebuilding
   */
  updateConfig(newConfig) {
    const safeConfig = this._validateConfig(newConfig);

    const needsRebuild = safeConfig.activation !== undefined && safeConfig.activation !== this.config.activation;
    const needsRecompile = safeConfig.learningRate !== this.config.learningRate ||
      safeConfig.optimizer !== this.config.optimizer ||
      safeConfig.loss !== this.config.loss ||
      safeConfig.gradientClip !== this.config.gradientClip;

    this.config = { ...this.config, ...safeConfig };

    if (this.model) {
      if (needsRebuild) {
        // We need the current structure to rebuild
        // We can get it from the model layers
        // Or better, let the hook handle rebuild if structure is needed.
        // Actually, let's return a flag and let the hook call createModel
        return { rebuild: true };
      }
      if (needsRecompile) {
        const outputShape = this.model.layers[this.model.layers.length - 1].units;
        this.compile(this.model, outputShape);
      }
    }
    return { rebuild: false };
  }

  /**
   * Creates a new sequential neural network model.
   * @param {number[]} structure - Array of node counts per layer, e.g., [2, 8, 4, 1]
   * @param {Object} [layerFeatures={}] - Per-layer feature configuration
   * @param {boolean} [layerFeatures[].batchNorm] - Enable batch normalization
   * @param {boolean} [layerFeatures[].dropout] - Enable dropout
   * @param {number} [layerFeatures[].dropoutRate=0.2] - Dropout rate (0.01-0.9)
   * @returns {tf.Sequential} The created TensorFlow.js model
   */
  createModel(structure, layerFeatures = {}) {
    // structure: array of node counts, e.g. [2, 4, 1] OR [100, 16, 2]
    if (!Array.isArray(structure)) {
        console.error("Invalid structure: must be an array.");
        return null;
    }

    let safeStructure = structure;

    if (structure.length < 2) {
         console.warn(`Structure too short (${structure.length}).`);
         return null;
    }

    if (structure.length > MAX_LAYERS) {
        console.warn(`Structure too deep (${structure.length}). Truncating to ${MAX_LAYERS}.`);
        safeStructure = structure.slice(0, MAX_LAYERS);
    }

    // Validate neuron counts
    safeStructure = safeStructure.map(s => {
        const n = Math.floor(s);
        if (n < 1) return 1;
        if (n > MAX_NEURONS) return MAX_NEURONS;
        return n;
    });

    if (this.model) {
      this.model.dispose();
    }

    this.layerFeatures = layerFeatures || {};
    this.connectionLayers = [];

    const model = tf.sequential();
    const inputShape = safeStructure[0];
    const outputShape = safeStructure[safeStructure.length - 1];

    // Hidden layers
    for (let i = 1; i < safeStructure.length - 1; i++) {
      const denseLayer = tf.layers.dense({
        units: safeStructure[i],
        activation: this.config.activation,
        inputShape: i === 1 ? [inputShape] : undefined
      });
      model.add(denseLayer);
      this.connectionLayers.push(denseLayer);

      const featureConfig = this.layerFeatures[i] || {};
      if (featureConfig.batchNorm) {
        model.add(tf.layers.batchNormalization());
      }
      if (featureConfig.dropout) {
        const rate = clamp(
          typeof featureConfig.dropoutRate === 'number' ? featureConfig.dropoutRate : 0.2,
          0.01,
          0.9
        );
        model.add(tf.layers.dropout({ rate }));
      }
    }

    // Output layer
    // For classification > 2 classes, use softmax. For binary/regression, use sigmoid/linear.
    // For simplicity in this playground, if output > 1 we assume classification -> softmax.
    // If output == 1, we use config.outputActivation (sigmoid default).

    let finalActivation = this.config.outputActivation;
    if (outputShape > 1) {
      finalActivation = 'softmax';
    }

    const outputLayer = tf.layers.dense({
      units: outputShape,
      activation: finalActivation
    });
    model.add(outputLayer);
    this.connectionLayers.push(outputLayer);

    this.compile(model, outputShape);
    this.model = model;
    return model;
  }

  /**
   * Compiles the model with optimizer and loss function.
   * @param {tf.Sequential} model - The model to compile
   * @param {number} outputShape - Number of output units
   * @private
   */
  compile(model, outputShape) {
    let optimizer;
    if (this.config.optimizer === 'sgd') optimizer = tf.train.sgd(this.config.learningRate);
    else optimizer = tf.train.adam(this.config.learningRate);

    let loss = this.config.loss;
    if (outputShape > 1) {
      // Force categorical for multi-class
      loss = 'categoricalCrossentropy';
    } else if (loss === 'categoricalCrossentropy') {
      // Fallback if binary
      loss = 'meanSquaredError';
    }

    const compileConfig = {
      optimizer: optimizer,
      loss: loss,
      metrics: ['accuracy']
    };

    if (this.config.gradientClip && this.config.gradientClip > 0) {
      compileConfig.clipnorm = this.config.gradientClip;
    }

    model.compile(compileConfig);
  }

  /**
   * Trains the model on provided data.
   * @param {tf.Tensor2D} xs - Input tensor of shape [samples, features]
   * @param {tf.Tensor2D} ys - Target tensor of shape [samples, outputs]
   * @param {number} [epochs=1] - Number of training epochs
   * @returns {Promise<tf.History|null>} Training history or null on error
   */
  async train(xs, ys, epochs = 1) {
    if (!this.model) return null;

    // Check shapes
    // xs shape should be [batch, inputDim]
    // ys shape should be [batch, outputDim]

    try {
      const h = await this.model.fit(xs, ys, {
        epochs: epochs,
        shuffle: true,
        batchSize: this.config.batchSize || 32,
      });
      return h;
    } catch (e) {
      console.error("Training error:", e);
      return null;
    }
  }

  /**
   * Makes predictions on input data.
   * @param {tf.Tensor2D} xs - Input tensor
   * @returns {tf.Tensor|null} Prediction tensor or null if no model
   */
  predict(xs) {
    if (!this.model) return null;
    return tf.tidy(() => {
      return this.model.predict(xs);
    });
  }

  /**
   * Gets the weight tensor for a specific layer.
   * @param {number} layerIndex - Index of the connection layer
   * @returns {tf.Tensor|null} Weight tensor or null if invalid index
   */
  getLayerWeights(layerIndex) {
    if (!this.connectionLayers[layerIndex]) return null;
    try {
      const weights = this.connectionLayers[layerIndex].getWeights()[0];
      return weights;
    } catch (e) {
      console.error('Error getting weights:', e);
      return null;
    }
  }

  /**
   * Gets connection weights as a flat Float32Array.
   * @param {number} layerIndex - Index of the connection layer
   * @returns {Float32Array|null} Weight values or null if invalid
   */
  getConnectionWeights(layerIndex) {
    if (!this.connectionLayers[layerIndex]) return null;
    try {
      const weights = this.connectionLayers[layerIndex].getWeights();
      if (!weights.length) return null;
      const kernel = weights[0];
      // dataSync returns a copy - do NOT dispose the original tensors
      // as they are the layer's internal state
      return kernel.dataSync();
    } catch (e) {
      console.error('Error fetching connection weights:', e);
      return null;
    }
  }

  /**
   * Gets connection weights asynchronously as a flat Float32Array.
   * Prevents blocking the main UI thread during visualization updates.
   * @param {number} layerIndex - Index of the connection layer
   * @returns {Promise<Float32Array|null>} Weight values or null if invalid
   */
  async getConnectionWeightsAsync(layerIndex) {
    if (!this.connectionLayers[layerIndex]) return null;
    try {
      const weights = this.connectionLayers[layerIndex].getWeights();
      if (!weights.length) return null;
      const kernel = weights[0];
      // tensor.data() is asynchronous and non-blocking
      return await kernel.data();
    } catch (e) {
      console.error('Error fetching connection weights asynchronously:', e);
      return null;
    }
  }

  /**
   * Serializes all model weights to nested arrays.
   * Useful for saving/restoring model state.
   * @returns {Array} Serialized weights per layer
   */
  getWeights() {
    if (!this.model) return [];
    return this.model.layers.map(l => {
      return l.getWeights().map(w => w.arraySync());
    });
  }

  /**
   * Restores model weights from serialized arrays.
   * @param {Array} [serializedWeights=[]] - Weights from getWeights()
   * @returns {boolean} True if successful, false on error
   */
  setWeights(serializedWeights = []) {
    if (!this.model || !Array.isArray(serializedWeights)) return false;
    try {
      serializedWeights.forEach((layerWeights, layerIdx) => {
        const layer = this.model.layers[layerIdx];
        if (!layer || !Array.isArray(layerWeights)) return;
        const tensors = layerWeights.map(weightArray => tf.tensor(weightArray));
        layer.setWeights(tensors);
        tensors.forEach(t => t.dispose());
      });
      return true;
    } catch (err) {
      console.error('Failed to set weights:', err);
      return false;
    }
  }

  /**
   * Scans the network for dead neurons (always zero activation).
   * @param {tf.Tensor2D} xs - Input batch
   * @returns {Object} Map of layerIndex -> Array of dead neuron indices
   */
  scanForDeadNeurons(xs) {
    if (!this.model) return {};

    // We need to traverse the model layers manually.
    // structure index 0 is input.
    // structure index 1 is first hidden layer (first Dense).

    return tf.tidy(() => {
      const deadMap = {};
      let current = xs;
      let denseLayerIndex = 1;

      for (const layer of this.model.layers) {
        // Apply layer to current tensor
        current = layer.apply(current);

        // Check if it's a Dense layer (which has the activation)
        if (layer.getClassName() === 'Dense') {
          // If activation is ReLU (or similar), dead means always <= 0 (or close to 0)
          // We check max activation across the batch.
          const maxActivations = current.max(0); // Shape [units]
          const isDead = maxActivations.lessEqual(1e-5);
          const deadIndices = [];
          const deadData = isDead.dataSync(); // safe for small layer sizes

          for (let j = 0; j < deadData.length; j++) {
            if (deadData[j]) deadIndices.push(j);
          }

          if (deadIndices.length > 0) {
            deadMap[denseLayerIndex] = deadIndices;
          }

          denseLayerIndex++;
        }
      }
      return deadMap;
    });
  }

  /**
   * Disposes the model and releases GPU/memory resources.
   * Should be called when the network is no longer needed.
   */
  dispose() {
    if (this.model) this.model.dispose();
  }
}
