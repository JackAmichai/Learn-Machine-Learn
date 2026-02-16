import { useRef, useState, useEffect } from 'react';

const KERNEL_LIBRARY = {
    sobelX: {
        label: 'Edge X',
        matrix: [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ],
        description: 'Highlights vertical edges by subtracting left from right pixels (Sobel X).'
    },
    sobelY: {
        label: 'Edge Y',
        matrix: [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ],
        description: 'Highlights horizontal edges (Sobel Y) to detect top/bottom transitions.'
    },
    sharpen: {
        label: 'Sharpen',
        matrix: [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ],
        description: 'Boosts the center pixel and subtracts its neighbors to sharpen strokes.'
    }
};

export function VisionCanvas({ onAddSample, onPredict, disabled }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(0); // 0 or 1 for A/B
    const [grid, setGrid] = useState(new Float32Array(100).fill(0)); // 10x10
    const [kernelKey, setKernelKey] = useState('sobelX');

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const draw = (e, force = false) => {
        if ((!isDrawing && !force) || disabled) return;

        // Prevent scrolling on touch devices
        if (e.cancelable && (e.type === 'touchmove' || e.type === 'touchstart')) {
            e.preventDefault();
        }

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const { x, y } = getCoordinates(e);

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

    const activeKernel = KERNEL_LIBRARY[kernelKey];
    const flattened = Array.from(grid);
    const vectorPreview = flattened.slice(0, 12);
    const remainingVector = Math.max(0, flattened.length - vectorPreview.length);
    const activePixels = flattened.reduce((sum, value) => sum + (value > 0 ? 1 : 0), 0);

    return (
        <div className="vision-stage" role="group" aria-label="Image drawing canvas for training neural network">
            <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className={`pixel-canvas ${disabled ? 'disabled' : ''}`}
                onMouseDown={(e) => { setIsDrawing(true); draw(e, true); }}
                onMouseMove={draw}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                onTouchStart={(e) => { setIsDrawing(true); draw(e, true); }}
                onTouchMove={draw}
                onTouchEnd={() => setIsDrawing(false)}
                onTouchCancel={() => setIsDrawing(false)}
                style={{ touchAction: 'none' }}
                tabIndex={disabled ? -1 : 0}
                role="img"
                aria-label="10 by 10 pixel drawing canvas. Click or touch and drag to draw patterns for training."
                aria-disabled={disabled}
            />

            <div className="vision-controls">
                <div className="label-selector" role="group" aria-label="Select training label">
                    <button
                        className={selectedLabel === 0 ? 'active' : ''}
                        onClick={() => setSelectedLabel(0)}
                        aria-pressed={selectedLabel === 0}
                    >Train as 'A'</button>
                    <button
                        className={selectedLabel === 1 ? 'active' : ''}
                        onClick={() => setSelectedLabel(1)}
                        aria-pressed={selectedLabel === 1}
                    >Train as 'B'</button>
                </div>

                <div className="actions" role="group" aria-label="Canvas actions">
                    <button onClick={clear} aria-label="Clear canvas">Clear</button>
                    <button onClick={handleAdd} aria-label="Add current drawing as training sample">Add Sample</button>
                    <button className="btn-predict" onClick={handlePredict} aria-label="Predict label for current drawing">Predict</button>
                </div>

                <div className="presets" role="group" aria-label="Quick presets">
                    <span className="label" id="presets-label">Presets:</span>
                    <button onClick={() => loadPreset('cross', 0)} aria-label="Add cross pattern as sample A">+ Cross (A)</button>
                    <button onClick={() => loadPreset('square', 1)} aria-label="Add square pattern as sample B">+ Square (B)</button>
                </div>
            </div>

                <div className="vision-edu" role="region" aria-label="Kernel and feature map visualization">
                    <div className="kernel-panel" role="group" aria-label="Kernel explorer">
                        <div className="panel-head">
                            <h4>Kernel Explorer</h4>
                            <div className="kernel-tabs" role="group" aria-label="Choose kernel preset">
                                {Object.entries(KERNEL_LIBRARY).map(([key, kernel]) => (
                                    <button
                                        key={key}
                                        className={kernelKey === key ? 'active' : ''}
                                        onClick={() => setKernelKey(key)}
                                        aria-pressed={kernelKey === key}
                                    >
                                        {kernel.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="matrix-grid" role="table" aria-label={`${activeKernel.label} 3 by 3 kernel`}>
                            {activeKernel.matrix.map((row, rowIdx) => (
                                <div className="matrix-row" role="row" key={`row-${rowIdx}`}>
                                    {row.map((value, colIdx) => (
                                        <span
                                            key={`cell-${rowIdx}-${colIdx}`}
                                            className={`matrix-cell ${value > 0 ? 'pos' : value < 0 ? 'neg' : 'neu'}`}
                                            role="cell"
                                            aria-label={`Row ${rowIdx + 1} column ${colIdx + 1} value ${value}`}
                                        >
                                            {value > 0 ? `+${value}` : value}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <p className="kernel-desc">{activeKernel.description}</p>
                    </div>

                    <div className="feature-panel" role="group" aria-label="Feature map flattening demo">
                        <h4>Feature Map {'->'} 1D Vector</h4>
                        <p className="feature-desc">Your 10x10 drawing becomes a 100x1 vector with {activePixels} active pixels.</p>
                        <div className="feature-stack">
                            <div className="mini-grid" role="grid" aria-label="10 by 10 grid preview">
                                {flattened.map((value, idx) => (
                                    <span
                                        key={`mini-${idx}`}
                                        className={`mini-pixel ${value ? 'on' : ''}`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span className="flatten-arrow" aria-hidden="true">{'=>'}</span>
                            <div className="vector-preview" role="list" aria-label="First 12 values of flattened vector">
                                {vectorPreview.map((value, idx) => (
                                    <span
                                        key={`vec-${idx}`}
                                        className={`vector-cell ${value ? 'filled' : ''}`}
                                        role="listitem"
                                    >
                                        {value ? value.toFixed(1) : '0'}
                                    </span>
                                ))}
                                {remainingVector > 0 && (
                                    <span className="vector-more" role="listitem">+{remainingVector} more</span>
                                )}
                            </div>
                        </div>
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
            .vision-edu {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 16px;
                background: var(--bg-secondary);
                border: 1px solid var(--glass-border);
                border-radius: 12px;
                padding: 16px;
            }
            @media (min-width: 720px) {
                .vision-edu {
                    flex-direction: row;
                }
            }
            .kernel-panel,
            .feature-panel {
                flex: 1;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid var(--glass-border);
                border-radius: 10px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .panel-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                flex-wrap: wrap;
            }
            .kernel-tabs {
                display: flex;
                gap: 6px;
            }
            .kernel-tabs button {
                padding: 4px 10px;
                border-radius: 999px;
                border: 1px solid var(--glass-border);
                background: transparent;
                color: var(--text-secondary);
                font-size: 12px;
                min-height: 32px;
            }
            .kernel-tabs button.active {
                background: var(--accent-secondary);
                color: #000;
                font-weight: 600;
            }
            .matrix-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 6px;
            }
            .matrix-row {
                display: contents;
            }
            .matrix-cell {
                text-align: center;
                padding: 10px 0;
                border-radius: 8px;
                font-weight: 600;
                border: 1px solid var(--glass-border);
            }
            .matrix-cell.pos {
                background: rgba(0, 255, 149, 0.15);
                color: #00ff95;
            }
            .matrix-cell.neg {
                background: rgba(255, 64, 64, 0.1);
                color: #ff6464;
            }
            .matrix-cell.neu {
                background: rgba(255, 255, 255, 0.05);
            }
            .kernel-desc,
            .feature-desc {
                font-size: 12px;
                color: var(--text-secondary);
                margin: 0;
            }
            .feature-stack {
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            .mini-grid {
                display: grid;
                grid-template-columns: repeat(10, 10px);
                grid-template-rows: repeat(10, 10px);
                gap: 2px;
                padding: 6px;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 8px;
            }
            .mini-pixel {
                width: 10px;
                height: 10px;
                border-radius: 2px;
                background: rgba(255, 255, 255, 0.1);
            }
            .mini-pixel.on {
                background: var(--accent-primary);
            }
            .flatten-arrow {
                font-size: 24px;
                color: var(--text-secondary);
            }
            .vector-preview {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                background: rgba(255, 255, 255, 0.03);
                padding: 8px;
                border-radius: 8px;
                min-width: 160px;
            }
            .vector-cell {
                min-width: 32px;
                min-height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.06);
                font-size: 12px;
                color: var(--text-secondary);
            }
            .vector-cell.filled {
                background: rgba(0, 255, 149, 0.2);
                color: #00ff95;
                font-weight: 600;
            }
            .vector-more {
                align-self: center;
                font-size: 12px;
                color: var(--text-secondary);
            }
         `}</style>
        </div>
    );
}
