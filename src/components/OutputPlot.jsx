import { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

export function OutputPlot({ model, data, modelVersion }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !model || !data) return;

        let isMounted = true;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const renderPlot = async () => {
            // 1. Draw Decision Boundary (Grid)
            // We create a grid of inputs
            const gridSize = 50; // resolution
            const inputs = [];

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    // Map 0..width to -1.5..1.5
                    const x = (i / gridSize) * 3 - 1.5;
                    const y = (j / gridSize) * 3 - 1.5;
                    inputs.push([x, y]);
                }
            }

            const inputTensor = tf.tensor2d(inputs);
            const predictionTensor = model.predict(inputTensor);

            // ⚡ Bolt: Use async data() instead of synchronous dataSync() to avoid blocking the main thread.
            // Impact: Prevents UI stutters during continuous training visualizations.
            const preds = await predictionTensor.data();

            if (!isMounted) {
                inputTensor.dispose();
                predictionTensor.dispose();
                return;
            }

            // Draw the heatmap
            const wCell = width / gridSize;
            const hCell = height / gridSize;

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const val = preds[i * gridSize + j];

                    // Premium look: Purple (0) → Cyan (1)
                    const c1 = [112, 0, 255];
                    const c2 = [0, 242, 255];

                    const rComp = c1[0] + (c2[0] - c1[0]) * val;
                    const gComp = c1[1] + (c2[1] - c1[1]) * val;
                    const bComp = c1[2] + (c2[2] - c1[2]) * val;

                    ctx.fillStyle = `rgba(${rComp}, ${gComp}, ${bComp}, 0.3)`;
                    ctx.fillRect(i * wCell, height - (j + 1) * hCell, wCell, hCell);
                }
            }

            inputTensor.dispose();
            predictionTensor.dispose();

            // 2. Draw Data Points (moved inside async block to paint on top of the heatmap)
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
        };

        renderPlot();

        return () => {
            isMounted = false;
        };
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
