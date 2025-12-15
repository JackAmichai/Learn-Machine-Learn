import * as tf from '@tensorflow/tfjs';

export const DataType = {
    XOR: 'xor',
    CIRCLE: 'circle',
    SPIRAL: 'spiral',
    LINEAR: 'linear'
};

export function generateData(type, samples = 200) {
    const points = [];
    const labels = [];

    for (let i = 0; i < samples; i++) {
        let x, y, label;

        if (type === DataType.XOR) {
            x = Math.random() * 2 - 1; // -1 to 1
            y = Math.random() * 2 - 1;
            label = (x > 0 && y > 0) || (x < 0 && y < 0) ? 0 : 1;
        } else if (type === DataType.CIRCLE) {
            const r = Math.random() * 2 * Math.PI;
            const d = Math.random() < 0.5 ? Math.random() * 0.5 : Math.random() * 0.5 + 0.6;
            x = Math.cos(r) * d;
            y = Math.sin(r) * d;
            label = d < 0.6 ? 0 : 1;
        } else if (type === DataType.SPIRAL) {
            // Logic for spiral... simplified
            const n = samples / 2;
            const isA = i < n;
            const t = (i % n) / n * 4 * Math.PI;
            const offset = isA ? 0 : Math.PI;
            const noise = (Math.random() - 0.5) * 0.2;
            const speed = 0.5;
            x = (t * speed) * Math.cos(t + offset) + noise;
            y = (t * speed) * Math.sin(t + offset) + noise;
            label = isA ? 0 : 1;
            // Normalize loosely
            x = x / 6;
            y = y / 6;
        } else {
            // LINEAR
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            label = x + y > 0 ? 1 : 0;
        }

        points.push([x, y]);
        labels.push([label]);
    }

    return {
        xs: tf.tensor2d(points),
        ys: tf.tensor2d(labels),
        points,
        labels: labels.flat()
    };
}
