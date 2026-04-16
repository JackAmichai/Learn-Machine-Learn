import React from 'react';

/**
 * LogisticRegressionVisualizer — visualises P(y=1) = σ(w·x + b).
 *
 * Sliders supported (from mathContent):
 *   w, x, b   — Sigmoid Decision scenario
 *   threshold — Threshold Tuning scenario (defaults to 0.5)
 *
 * Visual:
 *   - Sigmoid curve plotted over z ∈ [-6, 6]
 *   - A vertical band marking the decision threshold (P = threshold)
 *   - A live marker at z = w·x + b showing the current probability
 *   - Bottom strip showing class verdict and confidence
 */
export default function LogisticRegressionVisualizer({ values = {} }) {
    const w = values.w ?? 2.0;
    const x = values.x ?? 0.5;
    const b = values.b ?? -1.0;
    const threshold = values.threshold ?? 0.5;

    const z = w * x + b;
    const sigmoid = (zz) => 1 / (1 + Math.exp(-zz));
    const p = sigmoid(z);
    const predClass = p >= threshold ? 1 : 0;

    const W = 360, H = 220;
    const padL = 36, padR = 24, padT = 28, padB = 36;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const zMin = -6, zMax = 6;
    const xToPx = (zz) => padL + ((zz - zMin) / (zMax - zMin)) * plotW;
    const yToPx = (pp) => padT + plotH - pp * plotH;

    // Sigmoid polyline
    const N = 80;
    const curve = Array.from({ length: N + 1 }, (_, i) => {
        const zz = zMin + (i / N) * (zMax - zMin);
        return `${xToPx(zz)},${yToPx(sigmoid(zz))}`;
    }).join(' ');

    // Threshold band — find the z where σ(z) = threshold => z = -ln(1/t - 1)
    const thresholdZ = -Math.log(1 / Math.max(0.001, Math.min(0.999, threshold)) - 1);

    const verdict = (() => {
        const conf = Math.abs(p - 0.5) * 2;
        if (conf > 0.85) return predClass === 1
            ? `Confident positive — z=${z.toFixed(2)} pushes well above the boundary.`
            : `Confident negative — z=${z.toFixed(2)} sits well below the boundary.`;
        if (conf < 0.2) return `Near the decision boundary — small slider changes flip the class.`;
        return predClass === 1 ? 'Likely positive but not strongly so.' : 'Likely negative but not strongly so.';
    })();

    return (
        <div className="logreg-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="220" role="img" aria-label="Logistic regression sigmoid">
                <defs>
                    <linearGradient id="sigGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                </defs>

                {/* Frame */}
                <rect x={padL} y={padT} width={plotW} height={plotH} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)" />

                {/* Y gridlines */}
                {[0.25, 0.5, 0.75, 1].map(g => (
                    <g key={g}>
                        <line x1={padL} y1={yToPx(g)} x2={padL + plotW} y2={yToPx(g)} stroke="rgba(255,255,255,0.06)" />
                        <text x={padL - 4} y={yToPx(g) + 3} fontSize="9" fill="rgba(255,255,255,0.4)" textAnchor="end" fontFamily="ui-monospace,monospace">{g}</text>
                    </g>
                ))}

                {/* X axis */}
                {[-6, -3, 0, 3, 6].map(g => (
                    <g key={g}>
                        <line x1={xToPx(g)} y1={padT} x2={xToPx(g)} y2={padT + plotH} stroke="rgba(255,255,255,0.06)" />
                        <text x={xToPx(g)} y={padT + plotH + 12} fontSize="9" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontFamily="ui-monospace,monospace">{g}</text>
                    </g>
                ))}

                {/* Threshold band */}
                <line x1={padL} y1={yToPx(threshold)} x2={padL + plotW} y2={yToPx(threshold)} stroke="#c084fc" strokeDasharray="4,3" strokeWidth="1.4" />
                <line x1={xToPx(thresholdZ)} y1={padT} x2={xToPx(thresholdZ)} y2={padT + plotH} stroke="#c084fc" strokeDasharray="4,3" strokeWidth="1.2" opacity="0.6" />
                <text x={padL + plotW - 4} y={yToPx(threshold) - 4} fontSize="9" fill="#c084fc" textAnchor="end" fontFamily="ui-monospace,monospace">
                    threshold {threshold.toFixed(2)}
                </text>

                {/* Sigmoid curve */}
                <polyline points={curve} fill="none" stroke="url(#sigGrad2)" strokeWidth="2.5" />

                {/* Current point */}
                <line x1={xToPx(z)} y1={padT + plotH} x2={xToPx(z)} y2={yToPx(p)} stroke="#fb923c" strokeDasharray="2,2" strokeWidth="1.2" />
                <line x1={padL} y1={yToPx(p)} x2={xToPx(z)} y2={yToPx(p)} stroke="#fb923c" strokeDasharray="2,2" strokeWidth="1.2" />
                <circle cx={xToPx(z)} cy={yToPx(p)} r="6" fill={predClass === 1 ? '#34d399' : '#fb923c'} stroke="#fff" strokeWidth="1.5" />

                {/* Header */}
                <text x={padL} y={padT - 8} fontSize="11" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">
                    z = {w.toFixed(2)}·{x.toFixed(2)} + ({b.toFixed(2)}) = {z.toFixed(2)}
                </text>
                <text x={padL + plotW} y={padT - 8} fontSize="11" fill={predClass === 1 ? '#34d399' : '#fb923c'} textAnchor="end" fontFamily="ui-monospace,monospace" fontWeight="700">
                    P = {p.toFixed(3)} → class {predClass}
                </text>
            </svg>

            <div className="logreg-verdict">{verdict}</div>

            <p className="logreg-caption">
                The sigmoid <code>σ(z)</code> bends any real number into a probability. Move
                <code> w</code>, <code>x</code>, <code>b</code> to slide the dot along the
                S-curve; raise the <code>threshold</code> to make the model more conservative.
            </p>

            <style>{`
                .logreg-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .logreg-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 8px 0 4px;
                }
                .logreg-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
                .logreg-caption code {
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
