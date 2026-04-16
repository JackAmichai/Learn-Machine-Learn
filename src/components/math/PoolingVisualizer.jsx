import React from 'react';

/**
 * PoolingVisualizer — visualises a 2D pooling operation parameterized by
 *   input size, kernel size, stride.
 *
 * Sliders supported (from mathContent):
 *   input, kernel, stride        (Output Size Calculator)
 *   layers, stride               (Receptive Field Growth)
 *
 * Visual:
 *   - A grid that represents the input feature map (capped to ~14 cells per
 *     side so it stays legible — the formula uses the real input value)
 *   - Each pooling window is drawn as a colored translucent rectangle
 *   - The output grid on the right has one cell per window, coloured to
 *     match the source window
 *   - A computed-out badge shows floor((W - k) / s) + 1
 *   - If `layers` is provided, also shows receptive-field growth as a stack
 */
export default function PoolingVisualizer({ values = {} }) {
    const inputSize = Math.round(values.input ?? 8);
    const kernel = Math.round(values.kernel ?? 2);
    const stride = Math.round(values.stride ?? 2);
    const layers = values.layers !== undefined ? Math.round(values.layers) : null;

    const outSize = Math.max(0, Math.floor((inputSize - kernel) / stride) + 1);

    // Cap how many cells we draw, but keep proportions accurate for the formula
    const drawN = Math.min(inputSize, 14);
    const cellPx = Math.floor(160 / drawN);
    const inputPx = drawN * cellPx;

    // Build window list — only those that actually fit on the drawing
    const drawnWindows = [];
    for (let i = 0; i + kernel <= drawN; i += stride) {
        for (let j = 0; j + kernel <= drawN; j += stride) {
            drawnWindows.push({ i, j });
        }
    }
    const drawnPerRow = Math.floor((drawN - kernel) / stride) + 1;

    // Output grid sizing for the drawing
    const outDrawN = Math.max(1, drawnPerRow);
    const outCellPx = Math.min(28, Math.floor(110 / outDrawN));
    const outPx = outDrawN * outCellPx;

    const W = 360, H = layers !== null ? 280 : 230;

    const colorFor = (idx) => {
        const hue = (idx * 47) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    };

    return (
        <div className="pooling-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" aria-label="Pooling operation">
                {/* Header */}
                <text x="20" y="18" fontSize="11" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">
                    input W={inputSize}, kernel k={kernel}, stride s={stride}
                </text>
                <text x={W - 20} y="18" fontSize="11" fill="#34d399" textAnchor="end" fontFamily="ui-monospace,monospace" fontWeight="700">
                    out = ⌊(W−k)/s⌋ + 1 = {outSize}
                </text>

                {/* Input grid (drawn) */}
                <g transform={`translate(20, 36)`}>
                    {Array.from({ length: drawN }).flatMap((_, i) =>
                        Array.from({ length: drawN }).map((_, j) => (
                            <rect key={`c-${i}-${j}`}
                                x={j * cellPx} y={i * cellPx}
                                width={cellPx} height={cellPx}
                                fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"
                            />
                        ))
                    )}
                    {/* Window overlays */}
                    {drawnWindows.map((win, idx) => (
                        <rect key={`w-${idx}`}
                            x={win.j * cellPx} y={win.i * cellPx}
                            width={kernel * cellPx} height={kernel * cellPx}
                            fill={colorFor(idx)} fillOpacity="0.25"
                            stroke={colorFor(idx)} strokeOpacity="0.85" strokeWidth="1"
                        />
                    ))}
                    <text x={inputPx / 2} y={inputPx + 14} fontSize="10" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                        input {drawN}×{drawN}{drawN < inputSize ? ` (showing first ${drawN}×${drawN} of ${inputSize}×${inputSize})` : ''}
                    </text>
                </g>

                {/* Arrow */}
                <line x1="200" y1="116" x2="232" y2="116" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" markerEnd="url(#pool-arr)" />
                <defs>
                    <marker id="pool-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="rgba(255,255,255,0.35)" />
                    </marker>
                </defs>

                {/* Output grid */}
                <g transform={`translate(240, ${36 + (inputPx - outPx) / 2})`}>
                    {drawnWindows.map((_, idx) => {
                        const oi = Math.floor(idx / outDrawN);
                        const oj = idx % outDrawN;
                        return (
                            <rect key={`o-${idx}`}
                                x={oj * outCellPx} y={oi * outCellPx}
                                width={outCellPx} height={outCellPx}
                                rx="3" fill={colorFor(idx)} fillOpacity="0.7" stroke="rgba(255,255,255,0.4)"
                            />
                        );
                    })}
                    <text x={outPx / 2} y={outPx + 14} fontSize="10" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                        output {outDrawN}×{outDrawN}
                    </text>
                </g>

                {/* Receptive field growth (only if layers set) */}
                {layers !== null && (
                    <g transform={`translate(20, 220)`}>
                        <text x="0" y="0" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">
                            receptive field after {layers} pooling layers (stride {stride})
                        </text>
                        {Array.from({ length: layers }).map((_, i) => {
                            const w = Math.min(W - 40, 24 + i * 36);
                            return (
                                <rect key={i}
                                    x={(W - 40 - w) / 2} y={10 + i * 6}
                                    width={w} height="6"
                                    rx="2"
                                    fill={`hsl(${190 + i * 20}, 70%, 55%)`}
                                    fillOpacity="0.7"
                                />
                            );
                        })}
                    </g>
                )}
            </svg>

            <p className="pooling-caption">
                Each colored window in the input collapses to a single cell of the same color
                in the output. Increase the <code>stride</code> to skip windows; raise the
                <code> kernel</code> to make each window swallow more pixels. Pooling layers
                stack: receptive field grows exponentially with depth.
            </p>

            <style>{`
                .pooling-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .pooling-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
                .pooling-caption code {
                    font-family: ui-monospace, monospace;
                    background: rgba(0,242,255,0.08);
                    padding: 1px 5px;
                    border-radius: 3px;
                    color: var(--accent-primary);
                }
            `}</style>
        </div>
    );
}
