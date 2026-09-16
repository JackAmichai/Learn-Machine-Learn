import { NeuralNetwork } from './src/engine/NeuralNetwork.js';
import * as tf from '@tensorflow/tfjs';

async function main() {
    const nn = new NeuralNetwork();
    nn.createModel([2, 4, 1]);

    // Simulate what happens in OutputPlot.jsx
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
        tf.tidy(() => {
            const inputTensor = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
            const preds = nn.predict(inputTensor).dataSync();
        });
    }
    const end = performance.now();
    console.log(`Sync took: ${end - start}ms`);

    const start2 = performance.now();
    for (let i = 0; i < 100; i++) {
        const tensorData = await tf.tidy(() => {
            const inputTensor = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
            return nn.predict(inputTensor);
        }).data();
    }
    const end2 = performance.now();
    console.log(`Async took: ${end2 - start2}ms`);
}

main();
