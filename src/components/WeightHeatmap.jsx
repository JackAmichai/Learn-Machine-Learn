import { useRef, useEffect, useState } from 'react';

export function WeightHeatmap({ model, modelVersion }) {
    const [weightsData, setWeightsData] = useState(null); // Array of Float32Arrays
    const containerRef = useRef(null);

    useEffect(() => {
        if (!model || !model.model) return;

        // Find first dense layer that comes after input
        // The model might have a 'flatten' layer if used with Conv2D later, but for now it's Dense directly on input.
        // However, input layer is implicit in TFJS Sequential usually? No, first layer is layer[0].

        const layer = model.model.layers[0];
        if (!layer) return;

        try {
            const wTensor = layer.getWeights()[0]; // Shape [100, units]
            const wData = wTensor.dataSync();
            const units = layer.units;
            const inputDim = wTensor.shape[0];

            if (inputDim !== 100) return; // Only for Vision 10x10

            // Split into arrays per unit
            // Weights are stored [input0_unit0, input0_unit1, ... ] row-major?
            // Actually usually [input, output] -> [100, 16]
            // So wData[i * units + j] is weight from input i to unit j.
            // We want for each Unit, the 100 input weights.

            const unitsWeights = [];
            for (let u = 0; u < units; u++) {
                const arr = new Float32Array(100);
                for (let i = 0; i < 100; i++) {
                    arr[i] = wData[i * units + u];
                }
                unitsWeights.push(arr);
            }

            setWeightsData(unitsWeights);
        } catch (e) {
            console.error("Heatmap error", e);
        }

    }, [model, modelVersion]);

    return (
        <div className="heatmap-container" ref={containerRef}>
            <h3>what the brain sees (layer 1 weights)</h3>
            <div className="heatmap-grid">
                {weightsData && weightsData.slice(0, 8).map((w, i) => (
                    <UnitHeatmap key={i} weights={w} index={i} />
                ))}
            </div>
            <p className="caption">Red = Positive connection, Blue = Negative connection</p>

            <style>{`
            .heatmap-container {
                margin-top: 20px;
                text-align: center;
                width: 100%;
            }
            .heatmap-container h3 {
                font-size: 12px;
                text-transform: uppercase;
                color: var(--text-secondary);
                margin-bottom: 10px;
            }
            .heatmap-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 8px;
            }
            .unit-heatmap {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .unit-heatmap canvas {
                border: 1px solid var(--glass-border);
                border-radius: 4px;
                image-rendering: pixelated;
            }
            .caption {
                font-size: 10px;
                color: var(--text-secondary);
                opacity: 0.7;
                margin-top: 5px;
            }
        `}</style>
        </div>
    );
}

function UnitHeatmap({ weights, index }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        // 10x10 grid
        const cellW = w / 10;

        // Normalize weights for color? 
        // Or simple threshold. Typically weights are -1 to 1 initially.
        // Let's assume range -1 to 1 roughly.

        for (let i = 0; i < 100; i++) {
            const val = weights[i];
            const r = Math.floor(i / 10);
            const c = i % 10;

            // Color map: Blue (-1) -> Black (0) -> Red (1)
            let color = 'black';
            const intensity = Math.min(255, Math.abs(val) * 255);

            if (val > 0) {
                ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
            } else {
                ctx.fillStyle = `rgb(0, 0, ${intensity})`;
            }

            ctx.fillRect(c * cellW, r * cellW, cellW, cellW);
        }

    }, [weights]);

    return (
        <div className="unit-heatmap">
            <canvas ref={canvasRef} width={40} height={40} title={`Node ${index}`} />
        </div>
    );
}
