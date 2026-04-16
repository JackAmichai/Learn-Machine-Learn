import React from 'react';

/**
 * LSTMVisualizer — visualises both LSTM scenarios from mathContent:
 *
 *   1. Forget Gate:   f_t = σ(W_f·h + W_f·x + b_f)
 *      sliders: wf_h, wf_x, bf
 *
 *   2. Cell State Update:  C_t = f_t·C_{t-1} + i_t·C̃_t
 *      sliders: ft, c_prev, it, ct_cand
 *
 * We render the LSTM cell with three gates (forget, input, output) drawn as
 * vertical "fill bars" whose level matches their sigmoid output (0..1). The
 * cell-state highway runs across the top — its color shifts red→neutral→blue
 * with the sign of C_t, and its width swells with |C_t|.
 *
 * Both scenarios feed the same picture so the learner sees a consistent cell
 * regardless of which slider set they're currently moving.
 */
export default function LSTMVisualizer({ values = {} }) {
    // Forget-gate scenario
    const wfH = values.wf_h ?? 0.5;
    const wfX = values.wf_x ?? 1.2;
    const bf = values.bf ?? 1.0;
    const sigForget = 1 / (1 + Math.exp(-(wfH + wfX + bf)));

    // Cell-state scenario
    const ft = values.ft ?? sigForget;          // fall back to computed forget gate
    const cPrev = values.c_prev ?? 1.5;
    const it = values.it ?? 0.6;
    const ctCand = values.ct_cand ?? 0.9;
    const cNew = ft * cPrev + it * ctCand;

    // Output gate is not driven by sliders — derive a plausible value from the cell.
    const ot = 1 / (1 + Math.exp(-Math.abs(cNew)));
    const hNew = ot * Math.tanh(cNew);

    const W = 360, H = 240;

    // Helper: vertical fill bar (gate value 0..1)
    const gateBar = (cx, cy, val, color, label) => {
        const w = 28, h = 56;
        const x = cx - w / 2, y = cy - h / 2;
        const fillH = Math.max(0, Math.min(1, val)) * h;
        return (
            <g>
                <rect x={x} y={y} width={w} height={h} rx="5" fill="rgba(0,0,0,0.45)" stroke={color} strokeWidth="1.4" />
                <rect x={x} y={y + h - fillH} width={w} height={fillH} rx="5" fill={color} opacity="0.85" />
                <text x={cx} y={cy + 4} fontSize="10" fill="#fff" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">{val.toFixed(2)}</text>
                <text x={cx} y={y + h + 14} fontSize="10" fill={color} textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">{label}</text>
            </g>
        );
    };

    // Color the cell-state highway by sign + magnitude
    const cellColor = (() => {
        const m = Math.max(0, Math.min(1, Math.abs(cNew) / 3));
        if (cNew >= 0) return `rgba(52,211,153,${0.4 + 0.5 * m})`;
        return `rgba(251,146,60,${0.4 + 0.5 * m})`;
    })();

    const verdict = (() => {
        if (ft > 0.85 && it < 0.2) return 'f≈1, i≈0 — perfect memory: cell state passes through unchanged.';
        if (ft < 0.2 && it > 0.8) return 'f≈0, i≈1 — full reset: cell is replaced by the new candidate.';
        if (ft < 0.3 && it < 0.3) return 'Both gates closed — cell collapses toward zero (memory wipe).';
        if (sigForget > 0.95) return 'Forget gate saturated open — very stable long-term memory.';
        if (sigForget < 0.1) return 'Forget gate saturated closed — context is being aggressively dropped.';
        return 'Mixed regime — partly remembering, partly absorbing new information.';
    })();

    return (
        <div className="lstm-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="240" role="img" aria-label="LSTM cell visualization">
                <defs>
                    <marker id="lstm-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="rgba(255,255,255,0.55)" />
                    </marker>
                </defs>

                {/* Cell wall */}
                <rect x="20" y="40" width={W - 40} height="160" rx="14" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.15)" strokeDasharray="4,3" />
                <text x="30" y="36" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-monospace,monospace">LSTM cell</text>

                {/* Cell-state highway across the top */}
                <text x={W / 2} y="58" fontSize="10" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                    cell state highway   C_t = f·C_{`{t-1}`} + i·C̃_t
                </text>
                <line x1="30" y1="78" x2={W - 30} y2="78" stroke="rgba(255,255,255,0.15)" strokeWidth="14" strokeLinecap="round" />
                <line x1="30" y1="78" x2={W - 30} y2="78" stroke={cellColor} strokeWidth={6 + Math.min(8, Math.abs(cNew) * 3)} strokeLinecap="round" />
                <text x={W - 36} y="74" fontSize="10" fill="#fff" textAnchor="end" fontFamily="ui-monospace,monospace" fontWeight="700">C_t = {cNew.toFixed(2)}</text>

                {/* Forget gate "tap" pulling down from highway */}
                <line x1="80" y1="78" x2="80" y2="120" stroke="rgba(251,146,60,0.7)" strokeWidth="1.4" markerEnd="url(#lstm-arr)" />
                {gateBar(80, 150, sigForget, '#fb923c', 'forget')}

                {/* Input gate */}
                <line x1="180" y1="120" x2="180" y2="78" stroke="rgba(0,242,255,0.7)" strokeWidth="1.4" markerEnd="url(#lstm-arr)" />
                {gateBar(180, 150, it, '#00f2ff', 'input')}

                {/* Candidate (tanh) feeding the input gate */}
                <text x={140} y={148} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">C̃_t</text>
                <text x={140} y={160} fontSize="11" fill="#fff" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">{ctCand.toFixed(2)}</text>

                {/* Previous cell label */}
                <text x={50} y={148} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">C_{`{t-1}`}</text>
                <text x={50} y={160} fontSize="11" fill="#fff" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">{cPrev.toFixed(2)}</text>

                {/* Output gate */}
                <line x1="280" y1="120" x2="280" y2="78" stroke="rgba(124,58,237,0.7)" strokeWidth="1.4" markerEnd="url(#lstm-arr)" />
                {gateBar(280, 150, ot, '#c084fc', 'output')}

                {/* Hidden state output */}
                <line x1="280" y1="78" x2={W - 24} y2="78" stroke="transparent" />
                <text x={W - 30} y="92" fontSize="9" fill="rgba(192,132,252,0.85)" textAnchor="end" fontFamily="ui-monospace,monospace">h_t = {hNew.toFixed(2)}</text>

                {/* Pre-sigmoid sum for forget gate (helps connect formula 1) */}
                <text x={80} y={220} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                    σ({(wfH + wfX + bf).toFixed(2)})
                </text>
            </svg>

            <div className="lstm-readout">
                <div><span>f_t</span><strong style={{ color: '#fb923c' }}>{ft.toFixed(2)}</strong></div>
                <div><span>i_t</span><strong style={{ color: '#00f2ff' }}>{it.toFixed(2)}</strong></div>
                <div><span>C_t</span><strong style={{ color: cNew >= 0 ? '#34d399' : '#fb923c' }}>{cNew.toFixed(2)}</strong></div>
                <div><span>h_t</span><strong style={{ color: '#c084fc' }}>{hNew.toFixed(2)}</strong></div>
            </div>

            <div className="lstm-verdict">{verdict}</div>

            <p className="lstm-caption">
                The horizontal pipe at the top is the <strong>cell-state highway</strong>. Each
                gate either taps off it (forget) or pours into it (input), and the output gate
                decides what leaks out as <code>h_t</code>. This additive highway is why gradients
                don't vanish across long sequences.
            </p>

            <style>{`
                .lstm-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .lstm-readout {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 14px;
                    justify-content: center;
                    margin-top: 6px;
                    padding: 8px 10px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 8px;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                }
                .lstm-readout > div { display: flex; flex-direction: column; align-items: center; gap: 2px; }
                .lstm-readout span {
                    font-size: 10px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .lstm-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 8px 0 4px;
                }
                .lstm-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
                .lstm-caption code {
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
