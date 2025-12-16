import * as tf from '@tensorflow/tfjs';

export const DataType = {
    XOR: 'xor',
    CIRCLE: 'circle',
    SPIRAL: 'spiral',
    LINEAR: 'linear'
};

export function generateData(type, samples = 200, noise = 0.15) {
    const points = [];
    const labels = [];
    const noiseLevel = Math.max(0, noise);
    const jitter = () => (Math.random() * 2 - 1) * noiseLevel;

    for (let i = 0; i < samples; i++) {
        let x, y, label;

        if (type === DataType.XOR) {
            x = Math.random() * 2 - 1; // -1 to 1
            y = Math.random() * 2 - 1;
            label = (x > 0 && y > 0) || (x < 0 && y < 0) ? 0 : 1;
            x += jitter();
            y += jitter();
        } else if (type === DataType.CIRCLE) {
            const angle = Math.random() * 2 * Math.PI;
            const isInner = Math.random() < 0.5;
            const baseRadius = isInner ? 0.35 : 0.75;
            const radius = baseRadius + ((Math.random() - 0.5) * 0.15) + jitter();
            x = Math.cos(angle) * radius + jitter();
            y = Math.sin(angle) * radius + jitter();
            label = radius < 0.55 ? 0 : 1;
        } else if (type === DataType.SPIRAL) {
            // Logic for spiral... simplified
            const n = samples / 2;
            const isA = i < n;
            const t = (i % n) / n * 4 * Math.PI;
            const offset = isA ? 0 : Math.PI;
            const spiralNoise = jitter();
            const speed = 0.5;
            x = (t * speed) * Math.cos(t + offset) + spiralNoise;
            y = (t * speed) * Math.sin(t + offset) + jitter();
            label = isA ? 0 : 1;
            // Normalize loosely
            x = x / 6;
            y = y / 6;
        } else {
            // LINEAR
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            label = x + y + jitter() > 0 ? 1 : 0;
            x += jitter();
            y += jitter();
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
