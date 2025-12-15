import { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

export function OutputPlot({ model, data, modelVersion }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !model || !data) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // 1. Draw Decision Boundary (Grid)
        // We create a grid of inputs
        const gridSize = 50; // resolution
        const inputs = [];

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                // Map 0..width to -1.5..1.5
                const x = (i / gridSize) * 3 - 1.5;
                const y = (j / gridSize) * 3 - 1.5; // Inverted Y usually in canvas? 
                // Actually, let's keep it simple math coords.
                inputs.push([x, y]); // TF logic handles y direction
            }
        }

        tf.tidy(() => {
            const inputTensor = tf.tensor2d(inputs);
            const preds = model.predict(inputTensor).dataSync();

            // Draw the heatmap
            const wCell = width / gridSize;
            const hCell = height / gridSize;

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const idx = i * gridSize + j;
                    // Grid traversal logic: i is usually Y or X depending on loop.
                    // inputs pushed: x varies in inner loop `j`.
                    // So idx corresponds to x=j, y=i if using that order.
                    // Wait, I pushed x=(i/gridSize). So x is constant for inner loop? No.

                    // Let's recheck loops:
                    // i = 0..gridSize (X axis approx)
                    // j = 0..gridSize (Y axis approx)
                    // x = map(i), y = map(j)
                    // inputs.push([x,y])
                    // So inputs are ordered by i then j.

                    const val = preds[i * gridSize + j];

                    // Color map: Blue (0) -> White/Black -> Orange (1)
                    // A nice gradient:
                    // 0.0 -> #3b42c4 (Dark Blue)
                    // 0.5 -> #20202a (Dark Grey)
                    // 1.0 -> #c47c3b (Orange/Cyan)

                    // Let's use simple lerp
                    const r = val * 255;
                    const b = (1 - val) * 255;
                    const g = 50;

                    // Premium look: Cyan vs Purple
                    // 0 = Purple (112, 0, 255)
                    // 1 = Cyan (0, 242, 255)

                    const c1 = [112, 0, 255];
                    const c2 = [0, 242, 255];

                    const rComp = c1[0] + (c2[0] - c1[0]) * val;
                    const gComp = c1[1] + (c2[1] - c1[1]) * val;
                    const bComp = c1[2] + (c2[2] - c1[2]) * val;

                    ctx.fillStyle = `rgba(${rComp}, ${gComp}, ${bComp}, 0.3)`;
                    // Correction for canvas Y axis (0 is top)
                    // Math y=-1.5 is bottom. Canvas y=height is bottom.
                    // x is i, y is j.

                    // Draw rect
                    ctx.fillRect(i * wCell, height - (j + 1) * hCell, wCell, hCell);
                }
            }
        });

        // 2. Draw Data Points
        if (data.points) {
            data.points.forEach((pt, idx) => {
                const x = (pt[0] + 1.5) / 3 * width;
                const y = height - (pt[1] + 1.5) / 3 * height;

                const label = data.labels[idx];

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = label === 1 ? '#00f2ff' : '#7000ff';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.fill();
                ctx.stroke();
            });
        }

    }, [model, data, modelVersion]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    background: '#000'
                }}
            />
        </div>
    );
}
