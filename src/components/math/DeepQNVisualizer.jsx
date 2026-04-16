import React from 'react';

/**
 * DeepQNVisualizer — visualises the DQN Bellman target chase.
 *
 * Sliders in the lesson:
 *   target  : T   (Bellman target  R + γ·max Q')
 *   qpred   : Q   (network's current prediction)
 *
 * We render two stacked bars (Target and Q) side by side, plus the residual
 * (T − Q) and the squared loss (T − Q)². The "training arrow" pulls Q toward
 * T, with magnitude proportional to the residual — exactly what gradient
 * descent does with the MSE loss.
 */
export default function DeepQNVisualizer({ values = {} }) {
    const T = values.target ?? 75;
    const Q = values.qpred ?? 60;

    const residual = T - Q;
    const loss = residual * residual;
    const W = 320, H = 220;
    const baseY = 170;
    const maxBarH = 140;
    const max = 100;
    const tH = (T / max) * maxBarH;
    const qH = (Q / max) * maxBarH;

    const tX = 70, qX = 200, barW = 50;

    // Pull arrow magnitude
    const arrowSign = residual >= 0 ? 1 : -1;
    const arrowFromY = baseY - qH;
    const arrowToY = baseY - tH;

    return (
        <div className="dqn-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="240" role="img" aria-label="DQN Bellman target chase">
                <defs>
                    <linearGradient id="dqn-target" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#0f7c5a" />
                    </linearGradient>
                    <linearGradient id="dqn-q" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f2ff" />
                        <stop offset="100%" stopColor="#055e6c" />
                    </linearGradient>
                    <marker id="dqn-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#fb923c" />
                    </marker>
                </defs>

                {/* Baseline */}
                <line x1="20" y1={baseY} x2={W - 20} y2={baseY} stroke="rgba(255,255,255,0.25)" strokeDasharray="3,3" />

                {/* Target bar */}
                <rect x={tX} y={baseY - tH} width={barW} height={tH} rx="6" fill="url(#dqn-target)" />
                <text x={tX + barW / 2} y={baseY - tH - 6} fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="ui-monospace,monospace">T = {T.toFixed(0)}</text>
                <text x={tX + barW / 2} y={baseY + 14} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">Bellman Target</text>

                {/* Q bar */}
                <rect x={qX} y={baseY - qH} width={barW} height={qH} rx="6" fill="url(#dqn-q)" />
                <text x={qX + barW / 2} y={baseY - qH - 6} fill="#00f2ff" fontSize="10" textAnchor="middle" fontFamily="ui-monospace,monospace">Q = {Q.toFixed(0)}</text>
                <text x={qX + barW / 2} y={baseY + 14} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">Network Pred</text>

                {/* Update arrow: from Q toward T */}
                <line
                    x1={qX + barW / 2} y1={arrowFromY}
                    x2={qX + barW / 2} y2={arrowToY + (arrowSign * 6)}
                    stroke="#fb923c"
                    strokeWidth="2"
                    markerEnd="url(#dqn-arr)"
                />
                <text x={qX + barW / 2 + 14} y={(arrowFromY + arrowToY) / 2} fill="#fb923c" fontSize="10" fontFamily="ui-monospace,monospace">∇</text>

                {/* Residual / loss readout */}
                <g transform={`translate(20, 28)`}>
                    <rect x="0" y="0" width="135" height="44" rx="6" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.08)" />
                    <text x="8" y="16" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">residual T − Q</text>
                    <text x="8" y="34" fontSize="14" fill={residual >= 0 ? '#34d399' : '#f87171'} fontFamily="ui-monospace,monospace" fontWeight="700">{residual.toFixed(0)}</text>
                </g>
                <g transform={`translate(165, 28)`}>
                    <rect x="0" y="0" width="135" height="44" rx="6" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.08)" />
                    <text x="8" y="16" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">loss (T − Q)²</text>
                    <text x="8" y="34" fontSize="14" fill="#fb923c" fontFamily="ui-monospace,monospace" fontWeight="700">{loss.toFixed(0)}</text>
                </g>
            </svg>

            <div className="dqn-verdict">
                {Math.abs(residual) < 1
                    ? 'Converged — Q ≈ Target. Update step ≈ 0.'
                    : residual > 0
                        ? 'Network underestimates Q — gradient pushes it UP toward target.'
                        : 'Network overestimates Q — gradient pushes it DOWN toward target.'}
            </div>

            <p className="dqn-caption">
                The DQN <strong>loss is just the squared distance</strong> between the
                network's current Q-value and a "Bellman target" computed from the
                next state. Training nudges Q toward the target every step.
            </p>

            <style>{`
                .dqn-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .dqn-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 4px 0 8px;
                }
                .dqn-caption {
                    margin: 8px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.5;
                }
            `}</style>
        </div>
    );
}
