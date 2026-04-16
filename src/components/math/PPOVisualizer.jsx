import React from 'react';

/**
 * PPOVisualizer — visualises PPO's clipped surrogate objective.
 *
 *   L = min( r·A , clip(r, 1-ε, 1+ε) · A )
 *
 * where r is the probability ratio π_new / π_old and A is the advantage.
 * We draw the clip band [1-ε, 1+ε] as a shaded rectangle and place a marker
 * at the current r. We also plot the unclipped vs clipped objective as two
 * thin curves so the learner can see the "flat" zone where PPO refuses to
 * reward an over-eager update.
 */
export default function PPOVisualizer({ values = {} }) {
    const r = values.ratio ?? 1.2;
    const A = values.adv ?? 2;
    const eps = values.eps ?? 0.2;

    const W = 360, H = 220;
    const padX = 40, padY = 30;
    const plotW = W - padX * 2;
    const plotH = H - padY * 2 - 20;
    const xMin = 0.5, xMax = 1.5;
    const yMax = Math.max(Math.abs(A) * (1 + eps), 0.5);
    const yMin = -yMax;
    const xToPx = (x) => padX + ((x - xMin) / (xMax - xMin)) * plotW;
    const yToPx = (y) => padY + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    const sampleX = [];
    for (let i = 0; i <= 60; i++) sampleX.push(xMin + (i / 60) * (xMax - xMin));

    const unclipped = sampleX.map(x => x * A);
    const clipped = sampleX.map(x => Math.min(Math.max(x, 1 - eps), 1 + eps) * A);
    const ppo = sampleX.map((x, i) => Math.min(unclipped[i], clipped[i]));

    const polyline = (vals) => vals.map((y, i) => `${xToPx(sampleX[i])},${yToPx(y)}`).join(' ');

    const currentLoss = Math.min(r * A, Math.min(Math.max(r, 1 - eps), 1 + eps) * A);
    const inClip = r >= 1 - eps && r <= 1 + eps;

    return (
        <div className="ppo-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="220" role="img" aria-label="PPO clipped surrogate objective">
                {/* Clip band */}
                <rect
                    x={xToPx(1 - eps)} y={padY}
                    width={xToPx(1 + eps) - xToPx(1 - eps)} height={plotH}
                    fill="rgba(0,242,255,0.08)" stroke="rgba(0,242,255,0.3)" strokeDasharray="3,3"
                />
                {/* Axes */}
                <line x1={padX} y1={yToPx(0)} x2={padX + plotW} y2={yToPx(0)} stroke="rgba(255,255,255,0.25)" />
                <line x1={xToPx(1)} y1={padY} x2={xToPx(1)} y2={padY + plotH} stroke="rgba(255,255,255,0.18)" strokeDasharray="2,4" />

                {/* Unclipped (translucent) */}
                <polyline points={polyline(unclipped)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2,3" />
                {/* PPO clipped objective */}
                <polyline points={polyline(ppo)} fill="none" stroke="#fb923c" strokeWidth="2.5" />

                {/* Current marker */}
                <line x1={xToPx(r)} y1={yToPx(0)} x2={xToPx(r)} y2={yToPx(currentLoss)} stroke="#00f2ff" strokeWidth="1.5" />
                <circle cx={xToPx(r)} cy={yToPx(currentLoss)} r="5" fill="#00f2ff" stroke="#fff" strokeWidth="1" />

                {/* Labels */}
                <text x={padX} y={padY - 8} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="ui-monospace,monospace">L (clipped objective)</text>
                <text x={W - padX} y={H - 6} fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end" fontFamily="ui-monospace,monospace">r = π_new / π_old →</text>
                <text x={xToPx(1 - eps)} y={padY + plotH + 14} fill="rgba(0,242,255,0.7)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">1−ε</text>
                <text x={xToPx(1 + eps)} y={padY + plotH + 14} fill="rgba(0,242,255,0.7)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">1+ε</text>
                <text x={xToPx(1)} y={padY + plotH + 14} fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">1</text>
            </svg>

            <div className="ppo-readout">
                <div><strong>r</strong> = {r.toFixed(2)}</div>
                <div><strong>A</strong> = {A.toFixed(1)}</div>
                <div><strong>ε</strong> = {eps.toFixed(2)}</div>
                <div className="ppo-state" style={{ color: inClip ? '#00f2ff' : '#fb923c' }}>
                    {inClip ? 'inside clip range' : 'CLIPPED — gradient flat'}
                </div>
            </div>

            <p className="ppo-caption">
                When the policy update ratio leaves the band <code>[1−ε, 1+ε]</code>, the
                objective <strong>flattens</strong>, so the gradient is zero. PPO can still
                <em> punish</em> a worse action (it just won't <em>reward</em> a too-confident one).
            </p>

            <style>{`
                .ppo-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .ppo-readout {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                    margin: 8px 0;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .ppo-state {
                    margin-left: auto;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 10.5px;
                    font-weight: 700;
                }
                .ppo-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
                .ppo-caption code {
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
