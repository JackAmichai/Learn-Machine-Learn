import { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

export function OutputPlot({ model, data, modelVersion }) {
    const canvasRef = useRef(null);
    const [heatmapData, setHeatmapData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (!model || !data) {
            if (isMounted) setHeatmapData(null);
            return;
        }

        async function fetchHeatmap() {
            const gridSize = 50;
            const inputs = [];

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const x = (i / gridSize) * 3 - 1.5;
                    const y = (j / gridSize) * 3 - 1.5;
                    inputs.push([x, y]);
                }
            }

            let inputTensor, predsTensor;
            try {
                inputTensor = tf.tensor2d(inputs);
                predsTensor = model.predict(inputTensor);
                // ⚡ Bolt Optimization: Use await tensor.data() instead of synchronous dataSync().
                // dataSync blocks the main thread causing UI jank on every render.
                // We use a try...finally block for manual tensor disposal since tf.tidy does not support async.
                const preds = await predsTensor.data();
                if (isMounted) {
                    setHeatmapData(preds);
                }
            } catch (err) {
                console.error("Heatmap generation error:", err);
            } finally {
                if (inputTensor) inputTensor.dispose();
                if (predsTensor) predsTensor.dispose();
            }
        }

        fetchHeatmap();

        return () => {
            isMounted = false;
        };
    }, [model, data, modelVersion]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Decision Boundary (Grid)
        if (heatmapData) {
            const gridSize = 50;
            const wCell = width / gridSize;
            const hCell = height / gridSize;

            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const val = heatmapData[i * gridSize + j];

                    const c1 = [112, 0, 255];
                    const c2 = [0, 242, 255];

                    const rComp = c1[0] + (c2[0] - c1[0]) * val;
                    const gComp = c1[1] + (c2[1] - c1[1]) * val;
                    const bComp = c1[2] + (c2[2] - c1[2]) * val;

                    ctx.fillStyle = `rgba(${rComp}, ${gComp}, ${bComp}, 0.3)`;
                    ctx.fillRect(i * wCell, height - (j + 1) * hCell, wCell, hCell);
                }
            }
        }

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
    }, [heatmapData, data]);

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
