import React from 'react';

/**
 * JacobianVisualizer — visualises a 2×2 Jacobian as a local linear map.
 * A small grid of dots is pushed through J and you see how space stretches,
 * shears, or collapses near a point. The shaded area = |det J|.
 */
export default function JacobianVisualizer({ values = {} }) {
    const a = values.a ?? 1.0;   // ∂f₁/∂x₁
    const b = values.b ?? 0.2;   // ∂f₁/∂x₂
    const c = values.c ?? 0.3;   // ∂f₂/∂x₁
    const d = values.d ?? 1.0;   // ∂f₂/∂x₂

    const det = a * d - b * c;

    const W = 300, H = 240;
    const cx = 150, cy = 120;
    const s = 26;
    const tx = (x) => cx + x * s;
    const ty = (y) => cy - y * s;

    // A grid of sample points in the input; map each through J.
    const samples = [];
    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            samples.push({ x: i * 0.6, y: j * 0.6 });
        }
    }

    const transformed = samples.map(p => ({
        x: a * p.x + b * p.y,
        y: c * p.x + d * p.y,
    }));

    // The basis parallelogram
    const O = [tx(0), ty(0)];
    const Ja = [tx(a), ty(c)];       // J * [1,0]^T  = [a, c]
    const Jb = [tx(b), ty(d)];       // J * [0,1]^T  = [b, d]
    const Jab = [tx(a + b), ty(c + d)];

    const detColor = det >= 0 ? '#00f2ff' : '#fb923c';
    const verdict = Math.abs(det) < 0.02
        ? 'Collapsed — dimension lost'
        : det < 0
            ? 'Orientation flipped'
            : det > 1.5
                ? 'Stretching space'
                : det < 0.6
                    ? 'Compressing space'
                    : 'Near-identity';

    const grid = [-3, -2, -1, 0, 1, 2, 3];

    return (
        <div className="jac-visualizer">
            <div className="jac-grid">
                {/* Before */}
                <div className="jac-panel">
                    <h5>Input grid</h5>
                    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="200">
                        {grid.map(i => (
                            <g key={`ig${i}`}>
                                <line x1={tx(i)} y1={ty(-3)} x2={tx(i)} y2={ty(3)} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                                <line x1={tx(-3)} y1={ty(i)} x2={tx(3)} y2={ty(i)} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                            </g>
                        ))}
                        <line x1={0} y1={cy} x2={W} y2={cy} stroke="rgba(255,255,255,0.25)" />
                        <line x1={cx} y1={0} x2={cx} y2={H} stroke="rgba(255,255,255,0.25)" />
                        {/* Reference unit square */}
                        <polygon
                            points={`${tx(0)},${ty(0)} ${tx(1)},${ty(0)} ${tx(1)},${ty(1)} ${tx(0)},${ty(1)}`}
                            fill="rgba(255,255,255,0.06)"
                            stroke="rgba(255,255,255,0.3)"
                            strokeDasharray="3,3"
                        />
                        {samples.map((p, i) => (
                            <circle key={i} cx={tx(p.x)} cy={ty(p.y)} r="2" fill="rgba(255,255,255,0.5)" />
                        ))}
                    </svg>
                </div>

                {/* After */}
                <div className="jac-panel">
                    <h5>
                        J &middot; grid — <span style={{ color: detColor }}>|J| = {det.toFixed(2)}</span>
                    </h5>
                    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="200">
                        {grid.map(i => (
                            <g key={`og${i}`}>
                                <line x1={tx(i)} y1={ty(-3)} x2={tx(i)} y2={ty(3)} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                                <line x1={tx(-3)} y1={ty(i)} x2={tx(3)} y2={ty(i)} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                            </g>
                        ))}
                        <line x1={0} y1={cy} x2={W} y2={cy} stroke="rgba(255,255,255,0.25)" />
                        <line x1={cx} y1={0} x2={cx} y2={H} stroke="rgba(255,255,255,0.25)" />

                        {/* Reference unit square */}
                        <polygon
                            points={`${tx(0)},${ty(0)} ${tx(1)},${ty(0)} ${tx(1)},${ty(1)} ${tx(0)},${ty(1)}`}
                            fill="none"
                            stroke="rgba(255,255,255,0.18)"
                            strokeDasharray="3,3"
                        />

                        {/* Transformed parallelogram (|det| = area) */}
                        <polygon
                            points={`${O[0]},${O[1]} ${Ja[0]},${Ja[1]} ${Jab[0]},${Jab[1]} ${Jb[0]},${Jb[1]}`}
                            fill={det >= 0 ? 'rgba(0,242,255,0.18)' : 'rgba(251,146,60,0.18)'}
                            stroke={detColor}
                            strokeWidth="2"
                            style={{ transition: 'all 0.15s' }}
                        />

                        {/* Transformed sample dots */}
                        {transformed.map((p, i) => (
                            <circle key={i} cx={tx(p.x)} cy={ty(p.y)} r="2" fill="rgba(0,242,255,0.8)" style={{ transition: 'all 0.15s' }} />
                        ))}
                    </svg>
                </div>
            </div>

            <div className="jac-verdict" style={{ color: detColor }}>
                {verdict}
            </div>

            <p className="jac-caption">
                The Jacobian is the <strong>best-fit linear approximation</strong> of a nonlinear
                function at one point. Its determinant is the local volume scaling.
                Normalizing Flows require <code>|det J| &ne; 0</code> so the map is invertible.
            </p>

            <style>{`
                .jac-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .jac-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }
                @media (max-width: 640px) { .jac-grid { grid-template-columns: 1fr; } }
                .jac-panel {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    padding: 10px;
                }
                .jac-panel h5 {
                    margin: 0 0 4px;
                    font-size: 11px;
                    color: var(--text-secondary);
                    font-weight: 500;
                }
                .jac-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    margin-top: 8px;
                    padding: 4px;
                }
                .jac-caption {
                    margin: 8px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.5;
                }
                .jac-caption code {
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
