import React from 'react';

/**
 * MDPVisualizer — visualises the discounted return G_t = R₁ + γR₂ + γ²R₃ + …
 *
 * Sliders map to:
 *   r1     : R₁  (immediate reward)
 *   r2     : R₂  (next reward)
 *   gamma  : γ   (discount factor 0..0.99)
 *
 * We render an MDP-style state diagram showing s₀ → s₁ → s₂, label each
 * transition with its reward, draw a horizontal "discounted contribution"
 * bar for each step (R₁ vs γ·R₂ vs γ²·R₃…), and show the running total.
 * The visual makes the geometric decay obvious — high γ keeps the future
 * tall, low γ flattens it to almost nothing.
 */
export default function MDPVisualizer({ values = {} }) {
    const r1 = values.r1 ?? 10;
    const r2 = values.r2 ?? 5;
    const gamma = values.gamma ?? 0.9;

    // Compute discounted contributions for first 6 timesteps using r1, r2 then r2 fading.
    const horizon = 6;
    const rewards = [r1, r2, r2, r2, r2, r2].slice(0, horizon);
    const contributions = rewards.map((r, i) => Math.pow(gamma, i) * r);
    const G = contributions.reduce((a, b) => a + b, 0);
    const reportedG = r1 + gamma * r2; // matches the formula in mathContent

    const W = 360, H = 280;

    return (
        <div className="mdp-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="280" role="img" aria-label="Discounted return visualization">
                <defs>
                    <marker id="mdp-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="rgba(0,242,255,0.8)" />
                    </marker>
                </defs>

                {/* State chain */}
                {[0, 1, 2].map(i => {
                    const cx = 60 + i * 120;
                    return (
                        <g key={i}>
                            <circle cx={cx} cy="48" r="22" fill="rgba(0,242,255,0.10)" stroke="#00f2ff" strokeWidth="1.5" />
                            <text x={cx} y="52" fill="#fff" fontSize="13" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">s{i}</text>
                            {i < 2 && (
                                <>
                                    <line x1={cx + 22} y1="48" x2={cx + 100} y2="48" stroke="rgba(0,242,255,0.7)" strokeWidth="1.5" markerEnd="url(#mdp-arr)" />
                                    <text x={cx + 60} y="40" textAnchor="middle" fontSize="10" fill="#fb923c" fontFamily="ui-monospace,monospace">
                                        R = {(i === 0 ? r1 : r2).toFixed(0)}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}

                {/* Discounted contribution bars */}
                <text x="20" y="100" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="ui-monospace,monospace">discounted contribution at each step:</text>
                {contributions.map((c, i) => {
                    const y = 116 + i * 22;
                    const maxAbs = Math.max(...contributions.map(Math.abs), 0.01);
                    const wPx = (Math.abs(c) / maxAbs) * 240;
                    return (
                        <g key={i}>
                            <text x="20" y={y + 9} fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="ui-monospace,monospace">
                                γ^{i}·R_{i + 1}
                            </text>
                            <rect x="74" y={y} width={wPx} height="14" rx="3" fill={i === 0 ? '#34d399' : '#00f2ff'} opacity={0.4 + 0.6 * (1 - i / horizon)} />
                            <text x={84 + wPx} y={y + 11} fontSize="10" fill="#fff" fontFamily="ui-monospace,monospace">{c.toFixed(2)}</text>
                        </g>
                    );
                })}
            </svg>

            <div className="mdp-readout">
                <div className="mdp-readout-row">
                    <span>γ</span><strong>{gamma.toFixed(2)}</strong>
                </div>
                <div className="mdp-readout-row">
                    <span>G (2-step)</span><strong style={{ color: '#34d399' }}>{reportedG.toFixed(2)}</strong>
                </div>
                <div className="mdp-readout-row">
                    <span>G (6-step)</span><strong>{G.toFixed(2)}</strong>
                </div>
            </div>

            <p className="mdp-caption">
                {gamma < 0.4
                    ? 'Shortsighted agent — future rewards barely register.'
                    : gamma > 0.95
                        ? 'Farsighted agent — distant rewards still matter a lot.'
                        : 'Balanced — present matters most, but the future still counts.'}
            </p>

            <style>{`
                .mdp-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .mdp-readout {
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
                .mdp-readout-row { display: flex; flex-direction: column; align-items: center; gap: 2px; }
                .mdp-readout-row span {
                    font-size: 10px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .mdp-caption {
                    margin: 8px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
            `}</style>
        </div>
    );
}
