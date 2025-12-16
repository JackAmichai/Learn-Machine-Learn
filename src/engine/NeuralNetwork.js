import * as tf from '@tensorflow/tfjs';

export class NeuralNetwork {
  constructor(config) {
    this.model = null;
    this.config = {
      learningRate: 0.1,
      optimizer: 'adam',
      loss: 'meanSquaredError',
      activation: 'relu',
      outputActivation: 'sigmoid',
      ...config
    };
  }

  updateConfig(newConfig) {
    const needsRebuild = newConfig.activation !== this.config.activation;
    const needsRecompile = newConfig.learningRate !== this.config.learningRate ||
      newConfig.optimizer !== this.config.optimizer ||
      newConfig.loss !== this.config.loss;

    this.config = { ...this.config, ...newConfig };

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

  createModel(structure) {
    // structure: array of node counts, e.g. [2, 4, 1] OR [100, 16, 2]
    if (this.model) {
      this.model.dispose();
    }

    const model = tf.sequential();
    const inputShape = structure[0];
    const outputShape = structure[structure.length - 1];

    // Hidden layers
    for (let i = 1; i < structure.length - 1; i++) {
      model.add(tf.layers.dense({
        units: structure[i],
        activation: this.config.activation,
        inputShape: i === 1 ? [inputShape] : undefined
      }));
    }

    // Output layer
    // For classification > 2 classes, use softmax. For binary/regression, use sigmoid/linear.
    // For simplicity in this playground, if output > 1 we assume classification -> softmax.
    // If output == 1, we use config.outputActivation (sigmoid default).

    let finalActivation = this.config.outputActivation;
    if (outputShape > 1) {
      finalActivation = 'softmax';
    }

    model.add(tf.layers.dense({
      units: outputShape,
      activation: finalActivation
    }));

    this.compile(model, outputShape);
    this.model = model;
    return model;
  }

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

    model.compile({
      optimizer: optimizer,
      loss: loss,
      metrics: ['accuracy']
    });
  }

  async train(xs, ys, epochs = 1) {
    if (!this.model) return null;

    // Check shapes
    // xs shape should be [batch, inputDim]
    // ys shape should be [batch, outputDim]

    try {
      const h = await this.model.fit(xs, ys, {
        epochs: epochs,
        shuffle: true,
        batchSize: 32,
      });
      return h;
    } catch (e) {
      console.error("Training error:", e);
      return null;
    }
  }

  predict(xs) {
    if (!this.model) return null;
    return tf.tidy(() => {
      return this.model.predict(xs);
    });
  }

  getLayerWeights(layerIndex) {
    if (!this.model) return null;
    try {
      // layerIndex 0 is usually dense_Dense1 if structure is [100, 16, 2]
      // But in tfjs sequential, layers are indexed 0, 1...
      // If inputLayer is implicit, then model.layers[0] is the first hidden layer.
      const layer = this.model.layers[layerIndex];
      const weights = layer.getWeights()[0]; // 0 is weights, 1 is bias
      return weights; // Tensor
    } catch (e) {
      console.error("Error getting weights:", e);
      return null;
    }
  }

  getWeights() {
    if (!this.model) return [];
    return this.model.layers.map(l => {
      return l.getWeights().map(w => w.arraySync());
    });
  }

  dispose() {
    if (this.model) this.model.dispose();
  }
}
