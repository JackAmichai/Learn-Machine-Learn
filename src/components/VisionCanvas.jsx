import { useRef, useState, useEffect } from 'react';

export function VisionCanvas({ onAddSample, onPredict, disabled }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(0); // 0 or 1 for A/B
    const [grid, setGrid] = useState(new Float32Array(100).fill(0)); // 10x10

    const draw = (e) => {
        if (!isDrawing || disabled) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Map to 10x10 grid
        const col = Math.floor(x / (rect.width / 10));
        const row = Math.floor(y / (rect.height / 10));

        if (col >= 0 && col < 10 && row >= 0 && row < 10) {
            const idx = row * 10 + col;
            const newGrid = new Float32Array(grid);
            newGrid[idx] = 1;
            setGrid(newGrid);

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-primary');
            ctx.fillRect(col * (rect.width / 10), row * (rect.height / 10), rect.width / 10, rect.height / 10);
        }
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setGrid(new Float32Array(100).fill(0));

        // Draw Grid Lines
        drawGridLines();
    };

    const drawGridLines = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cellW = w / 10;
        const cellH = h / 10;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 10; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellW, 0);
            ctx.lineTo(i * cellW, h);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * cellH);
            ctx.lineTo(w, i * cellH);
            ctx.stroke();
        }
    };

    useEffect(() => {
        drawGridLines();
    }, []);

    const GENERATORS = {
        cross: () => {
            const g = new Float32Array(100).fill(0);
            for (let i = 1; i < 9; i++) {
                g[i * 10 + i] = 1; // Diagonal \
                g[i * 10 + (9 - i)] = 1; // Diagonal /
            }
            return g;
        },
        square: () => {
            const g = new Float32Array(100).fill(0);
            for (let r = 2; r < 8; r++) {
                for (let c = 2; c < 8; c++) {
                    g[r * 10 + c] = 1;
                }
            }
            return g;
        }
    };

    const loadPreset = (type, label) => {
        const g = GENERATORS[type]();
        onAddSample(g, label);

        // Visual feedback: show on canvas briefly
        setGrid(g);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const cellW = w / 10;
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-primary');
        for (let i = 0; i < 100; i++) {
            if (g[i]) {
                const r = Math.floor(i / 10);
                const c = i % 10;
                ctx.fillRect(c * cellW, r * cellW, cellW, cellW);
            }
        }
        setTimeout(clear, 500);
    };

    const handleAdd = () => {
        onAddSample(grid, selectedLabel);
        clear();
    };

    const handlePredict = () => {
        onPredict(grid);
    };

    return (
        <div className="vision-stage">
            <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className={`pixel-canvas ${disabled ? 'disabled' : ''}`}
                onMouseDown={() => setIsDrawing(true)}
                onMouseMove={draw}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
            />

            <div className="vision-controls">
                <div className="label-selector">
                    <button
                        className={selectedLabel === 0 ? 'active' : ''}
                        onClick={() => setSelectedLabel(0)}
                    >Train as 'A'</button>
                    <button
                        className={selectedLabel === 1 ? 'active' : ''}
                        onClick={() => setSelectedLabel(1)}
                    >Train as 'B'</button>
                </div>

                <div className="actions">
                    <button onClick={clear}>Clear</button>
                    <button onClick={handleAdd}>Add Sample</button>
                    <button className="btn-predict" onClick={handlePredict}>Predict</button>
                </div>

                <div className="presets">
                    <span className="label">Presets:</span>
                    <button onClick={() => loadPreset('cross', 0)}>+ Cross (A)</button>
                    <button onClick={() => loadPreset('square', 1)}>+ Square (B)</button>
                </div>
            </div>

            <style>{`
            .vision-stage {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            .pixel-canvas {
                background: #000;
                border: 2px solid var(--accent-secondary);
                border-radius: 4px;
                cursor: crosshair;
                image-rendering: pixelated;
            }
            .pixel-canvas.disabled {
                opacity: 0.5;
                pointer-events: none;
            }
            .vision-controls {
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;
            }
            .label-selector {
                display: flex;
                gap: 5px;
            }
            .label-selector button {
                flex: 1;
                padding: 6px;
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border: 1px solid transparent;
                border-radius: 4px;
            }
            .label-selector button.active {
                background: var(--accent-primary);
                color: black;
                font-weight: bold;
            }
            .actions {
                display: flex;
                gap: 5px;
            }
            .actions button {
                flex: 1;
                padding: 6px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: 4px;
            }
            .actions button.btn-predict {
                background: var(--accent-secondary);
                font-weight: bold;
            }
            .presets {
                display: flex;
                gap: 5px;
                align-items: center;
                margin-top: 5px;
            }
            .presets .label {
                font-size: 11px;
                color: var(--text-secondary);
            }
            .presets button {
                padding: 4px 8px;
                font-size: 10px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: 4px;
                opacity: 0.8;
            }
            .presets button:hover {
                opacity: 1;
                background: var(--glass-border);
            }
         `}</style>
        </div>
    );
}
