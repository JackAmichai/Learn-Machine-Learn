import React from 'react';

/**
 * RNNVisualizer — visualises:
 *   1. The hidden-state recurrence h_t = tanh(W_h·h_{t-1} + W_x·x_t)
 *   2. The classic vanishing/exploding gradient: |∇| ≈ |W_h|^T
 *
 * Sliders we know about:
 *   wh / h_prev / wx / xt   → hidden update formula
 *   T / grad_T              → gradient through time
 *
 * We render an unrolled RNN of 8 timesteps. At every step we recompute h_t
 * from the current h_{t-1} using the slider weights, drawing each cell with
 * a colour proportional to |h|. Below it we draw the gradient signal as it
 * propagates backward — its bar shrinks (vanishing) or explodes step by step.
 */
export default function RNNVisualizer({ values = {} }) {
    const wh = values.wh ?? 0.8;
    const hPrev0 = values.h_prev ?? 0.5;
    const wx = values.wx ?? 1.2;
    const xt = values.xt ?? 0.3;

    // Optional second-formula sliders
    const T = values.T ?? 8;
    const gradT = values.grad_T ?? 1.0;

    // Forward roll out a small sequence using the formula
    const steps = 8;
    let h = hPrev0;
    const xs = [];
    for (let t = 0; t < steps; t++) {
        // Vary input slightly so the rollout is interesting
        const x = xt * Math.cos(t * 0.6);
        h = Math.tanh(wh * h + wx * x);
        xs.push({ t, x, h });
    }

    // Gradient propagation: |g_t| = |g_T| * |W_h|^(T-t)
    const grads = Array.from({ length: Math.max(1, Math.min(steps, T)) }, (_, t) => ({
        t,
        g: gradT * Math.pow(Math.abs(wh), Math.max(0, T - 1 - t)),
    }));

    const W = 360, H = 240;
    const padX = 20;
    const cellW = (W - padX * 2) / steps;
    const fwdY = 60;
    const cellSize = 28;

    const valueColor = (v) => {
        const c = Math.max(0, Math.min(1, (v + 1) / 2));
        const r = Math.round(255 * (1 - c));
        const b = Math.round(255 * c);
        return `rgba(${r},120,${b},0.9)`;
    };

    const maxGrad = Math.max(...grads.map(g => g.g), 0.001);
    const gradBarMax = 70;

    return (
        <div className="rnn-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="240" role="img" aria-label="RNN unroll and gradient propagation">
                <defs>
                    <marker id="rnn-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="rgba(0,242,255,0.7)" />
                    </marker>
                </defs>

                <text x={padX} y="22" fontSize="11" fill="rgba(255,255,255,0.65)" fontFamily="ui-monospace,monospace">forward: h_t = tanh(W_h·h_{`{t-1}`} + W_x·x_t)</text>

                {xs.map(({ t, h }, i) => {
                    const cx = padX + cellW / 2 + i * cellW;
                    const cy = fwdY;
                    return (
                        <g key={`f${i}`}>
                            <rect x={cx - cellSize / 2} y={cy - cellSize / 2} width={cellSize} height={cellSize} rx="6" fill={valueColor(h)} stroke="#fff" strokeOpacity="0.2" />
                            <text x={cx} y={cy + 4} fill="#fff" fontSize="10" textAnchor="middle" fontFamily="ui-monospace,monospace">{h.toFixed(1)}</text>
                            <text x={cx} y={cy - cellSize / 2 - 4} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">h{t}</text>
                            {i < xs.length - 1 && (
                                <line x1={cx + cellSize / 2} y1={cy} x2={cx + cellW - cellSize / 2} y2={cy} stroke="rgba(0,242,255,0.6)" strokeWidth="1.2" markerEnd="url(#rnn-arr)" />
                            )}
                        </g>
                    );
                })}

                {/* Backward gradients */}
                <text x={padX} y="140" fontSize="11" fill="rgba(255,255,255,0.65)" fontFamily="ui-monospace,monospace">backward: |∂L/∂h_t| ≈ |∂L/∂h_T|·|W_h|^{`{T-t}`}</text>

                {grads.map((g, i) => {
                    const cx = padX + cellW / 2 + i * cellW;
                    const ratio = g.g / maxGrad;
                    const barH = Math.min(gradBarMax, ratio * gradBarMax);
                    const exploded = g.g > 5;
                    return (
                        <g key={`b${i}`}>
                            <rect
                                x={cx - 8} y={170 - barH}
                                width="16" height={barH} rx="3"
                                fill={exploded ? '#fb923c' : 'rgba(124,58,237,0.85)'}
                            />
                            <text x={cx} y="186" fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">t={g.t}</text>
                            <text x={cx} y="200" fontSize="8" fill={exploded ? '#fb923c' : 'rgba(255,255,255,0.45)'} textAnchor="middle" fontFamily="ui-monospace,monospace">{g.g < 0.001 ? '~0' : g.g.toExponential(1)}</text>
                        </g>
                    );
                })}
            </svg>

            <div className="rnn-verdict">
                {Math.abs(wh) < 0.6 && T > 6
                    ? 'Vanishing — early-step gradient ≈ 0. The network can\'t learn long-term dependencies.'
                    : Math.abs(wh) > 1.2 && T > 6
                        ? 'Exploding — the gradient blows up. Need clipping or LSTM/GRU gates.'
                        : 'Stable — gradients propagate cleanly through time.'}
            </div>

            <p className="rnn-caption">
                The colored cells are the forward pass; the bars below are the gradient
                strength backward in time. Move <code>W_h</code> to feel the
                <strong> vanishing-gradient problem</strong> that motivated LSTMs.
            </p>

            <style>{`
                .rnn-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .rnn-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 4px 0 4px;
                }
                .rnn-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.5;
                }
                .rnn-caption code {
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
