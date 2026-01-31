import { useRef, useEffect, useMemo } from 'react';

export function WeightHeatmap({ model, modelVersion, structure }) {
    const containerRef = useRef(null);

    const weightsData = useMemo(() => {
        if (modelVersion === null || modelVersion === undefined) {
            return null;
        }
        if (!model || !Array.isArray(structure) || structure.length < 2) return null;
        const inputDim = structure[0];
        const units = structure[1];
        if (inputDim !== 100 || !units) return null; // Only visualize 10x10 vision grids

        if (typeof model.getConnectionWeights === 'function') {
            try {
                const kernel = model.getConnectionWeights(0);
                if (!kernel) return null;
                const snapshot = [];
                for (let u = 0; u < units; u++) {
                    const arr = new Float32Array(inputDim);
                    for (let i = 0; i < inputDim; i++) {
                        arr[i] = kernel[i * units + u];
                    }
                    snapshot.push(arr);
                }
                return snapshot;
            } catch (error) {
                console.error('Heatmap error', error);
                return null;
            }
        }

        // Fallback to legacy direct layer access if helper is unavailable
        if (!model.model || !model.model.layers?.length) return null;
        const layer = model.model.layers[0];
        if (!layer) return null;
        try {
            const weights = layer.getWeights();
            if (!weights.length) return null;
            const wTensor = weights[0];
            const snapshot = [];
            // dataSync returns a copy - do NOT dispose the original tensors
            const wData = wTensor.dataSync();
            for (let u = 0; u < units; u++) {
                const arr = new Float32Array(inputDim);
                for (let i = 0; i < inputDim; i++) {
                    arr[i] = wData[i * units + u];
                }
                snapshot.push(arr);
            }
            return snapshot;
        } catch (error) {
            console.error('Heatmap error', error);
            return null;
        }
    }, [model, modelVersion, structure]);

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
