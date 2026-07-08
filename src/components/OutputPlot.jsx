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

            // ⚡ Bolt: Optimize rendering by using an offscreen canvas and ImageData
            // to avoid 2500 string allocations and ctx.fillRect calls per render.
            const offCanvas = document.createElement('canvas');
            offCanvas.width = gridSize;
            offCanvas.height = gridSize;
            const offCtx = offCanvas.getContext('2d');
            const imgData = offCtx.createImageData(gridSize, gridSize);
            const data = imgData.data;

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const val = preds[i * gridSize + j];
                    const rComp = 112 + (-112) * val; // c1[0] + (c2[0] - c1[0]) * val
                    const gComp = 0 + 242 * val;      // c1[1] + (c2[1] - c1[1]) * val
                    const bComp = 255;                // c1[2] + (c2[2] - c1[2]) * val

                    // Map math coordinates (j=0 at bottom) to image coordinates (y=0 at top)
                    const y = gridSize - 1 - j;
                    const idx = (y * gridSize + i) * 4;

                    data[idx] = rComp;
                    data[idx + 1] = gComp;
                    data[idx + 2] = bComp;
                    data[idx + 3] = 76; // 0.3 * 255 (alpha)
                }
            }
            offCtx.putImageData(imgData, 0, 0);

            // Draw scaled up to main canvas
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(offCanvas, 0, 0, width, height);
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
