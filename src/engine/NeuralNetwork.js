import * as tf from '@tensorflow/tfjs';

export class NeuralNetwork {
  constructor(config) {
    this.model = null;
    this.learningRate = config.learningRate || 0.1;
    this.optimizerStr = config.optimizer || 'adam';
    this.lossStr = config.loss || 'meanSquaredError';
    this.activationStr = config.activation || 'relu';
    this.outputActivationStr = config.outputActivation || 'sigmoid'; // sigmoid for classification
  }

  createModel(structure) {
    // structure: array of node counts, e.g. [2, 4, 1]
    // 2 inputs, 4 hidden, 1 output
    if (this.model) {
      this.model.dispose();
    }

    const model = tf.sequential();
    const inputShape = structure[0];
    
    // Hidden layers
    for (let i = 1; i < structure.length - 1; i++) {
        model.add(tf.layers.dense({
            units: structure[i],
            activation: this.activationStr,
            inputShape: i === 1 ? [inputShape] : undefined
        }));
    }

    // Output layer
    model.add(tf.layers.dense({
        units: structure[structure.length - 1],
        activation: this.outputActivationStr
    }));

    this.compile(model);
    this.model = model;
    return model;
  }

  compile(model) {
    let optimizer;
    if (this.optimizerStr === 'sgd') optimizer = tf.train.sgd(this.learningRate);
    else optimizer = tf.train.adam(this.learningRate);

    model.compile({
      optimizer: optimizer,
      loss: this.lossStr,
      metrics: ['accuracy']
    });
  }

  async train(xs, ys, epochs = 1) {
    if (!this.model) return null;
    
    const h = await this.model.fit(xs, ys, {
      epochs: epochs,
      shuffle: true,
      batchSize: 32, // mini-batch
    });
    return h;
  }

  predict(xs) {
    if (!this.model) return null;
    return tf.tidy(() => {
        return this.model.predict(xs);
    });
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
