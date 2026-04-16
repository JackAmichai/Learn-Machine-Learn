import React from 'react';

// Isometric projection: puts +x forward-right, +y forward-left, +z up.
const project = (x, y, z, originX, originY, sXY = 18, sZ = 20) => ({
    x: originX + (x - y) * sXY,
    y: originY + (x + y) * 0.5 * sXY - z * sZ,
});

/**
 * LinearAlgebraVisualizer — two-panel visual for "Vectors & Matrices".
 *
 * Reads the same slider state that drives the Formula Playground below, so
 * moving a slider updates both the number AND the visual in real time.
 *
 *  Panel 1: a 3D vector (x, y, z) drawn as an arrow in an isometric cube.
 *           The magnitude is shown as a numeric readout and the arrow grows
 *           with the Euclidean norm.
 *  Panel 2: a 2×2 matrix applied to the unit square. The resulting
 *           parallelogram's signed area equals the determinant.
 */
export default function LinearAlgebraVisualizer({ values = {} }) {
    // --- 3D vector defaults match the formula playground defaults ---
    const vx = values.vx ?? 1.2;
    const vy = values.vy ?? -0.4;
    const vz = values.vz ?? 2.3;
    const mag = Math.sqrt(vx * vx + vy * vy + vz * vz);

    // --- 2×2 matrix defaults ---
    const a11 = values.a11 ?? 1;
    const a12 = values.a12 ?? 0.5;
    const a21 = values.a21 ?? -0.3;
    const a22 = values.a22 ?? 2;
    const det = a11 * a22 - a12 * a21;

    // ---------- 3D panel ----------
    const W = 300, H = 220;
    const cx = 150, cy = 135;
    const p = (x, y, z) => project(x, y, z, cx, cy);
    const axLen = 3.5;
    const O = p(0, 0, 0);
    const Xax = p(axLen, 0, 0);
    const Yax = p(0, axLen, 0);
    const Zax = p(0, 0, axLen);
    const V = p(vx, vy, vz);
    const Vxy = p(vx, vy, 0);

    const xColor = '#ff6b8a';
    const yColor = '#34d399';
    const zColor = '#60a5fa';
    const vColor = '#00f2ff';

    // ---------- 2×2 panel ----------
    const MW = 240, MH = 220;
    const mcx = 120, mcy = 115;
    const ms = 32; // px per unit
    const tx = (x) => mcx + x * ms;
    const ty = (y) => mcy - y * ms; // y+ up
    const Oxy = [tx(0), ty(0)];
    const E1 = [tx(a11), ty(a21)];
    const E2 = [tx(a12), ty(a22)];
    const E12 = [tx(a11 + a12), ty(a21 + a22)];

    const detColor = det >= 0 ? '#00f2ff' : '#fb923c';
    const gridVals = [-3, -2, -1, 0, 1, 2, 3];

    return (
        <div className="linalg-visualizer">
            <div className="linalg-grid">
                {/* ===== PANEL 1: 3D vector ===== */}
                <div className="linalg-panel">
                    <h5>
                        3D Vector →{' '}
                        <span style={{ color: vColor }}>
                            ({vx.toFixed(1)}, {vy.toFixed(1)}, {vz.toFixed(1)})
                        </span>
                    </h5>
                    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="220" role="img" aria-label="3D vector visualization">
                        <defs>
                            <marker id="la-arr-x" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M0,0 L10,5 L0,10 z" fill={xColor} />
                            </marker>
                            <marker id="la-arr-y" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M0,0 L10,5 L0,10 z" fill={yColor} />
                            </marker>
                            <marker id="la-arr-z" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M0,0 L10,5 L0,10 z" fill={zColor} />
                            </marker>
                            <marker id="la-arr-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto">
                                <path d="M0,0 L10,5 L0,10 z" fill={vColor} />
                            </marker>
                        </defs>

                        {/* Ground plane grid (xy at z=0) */}
                        {gridVals.map(i => {
                            const s = p(i, -3, 0), e = p(i, 3, 0);
                            return <line key={`gx${i}`} x1={s.x} y1={s.y} x2={e.x} y2={e.y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />;
                        })}
                        {gridVals.map(i => {
                            const s = p(-3, i, 0), e = p(3, i, 0);
                            return <line key={`gy${i}`} x1={s.x} y1={s.y} x2={e.x} y2={e.y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />;
                        })}

                        {/* Axes */}
                        <line x1={O.x} y1={O.y} x2={Xax.x} y2={Xax.y} stroke={xColor} strokeWidth="1.8" markerEnd="url(#la-arr-x)" />
                        <line x1={O.x} y1={O.y} x2={Yax.x} y2={Yax.y} stroke={yColor} strokeWidth="1.8" markerEnd="url(#la-arr-y)" />
                        <line x1={O.x} y1={O.y} x2={Zax.x} y2={Zax.y} stroke={zColor} strokeWidth="1.8" markerEnd="url(#la-arr-z)" />
                        <text x={Xax.x + 5} y={Xax.y + 10} fill={xColor} fontSize="11" fontWeight="700">x</text>
                        <text x={Yax.x - 14} y={Yax.y + 10} fill={yColor} fontSize="11" fontWeight="700">y</text>
                        <text x={Zax.x - 4} y={Zax.y - 4} fill={zColor} fontSize="11" fontWeight="700">z</text>

                        {/* Shadow: projection onto xy-plane */}
                        <line x1={O.x} y1={O.y} x2={Vxy.x} y2={Vxy.y} stroke="rgba(0,242,255,0.35)" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1={Vxy.x} y1={Vxy.y} x2={V.x} y2={V.y} stroke="rgba(0,242,255,0.35)" strokeWidth="1" strokeDasharray="3,3" />
                        <circle cx={Vxy.x} cy={Vxy.y} r="2" fill="rgba(0,242,255,0.5)" />

                        {/* Main vector arrow */}
                        <line
                            x1={O.x} y1={O.y} x2={V.x} y2={V.y}
                            stroke={vColor} strokeWidth="3" strokeLinecap="round"
                            markerEnd="url(#la-arr-v)"
                            style={{ transition: 'all 0.15s' }}
                        />
                        <circle cx={V.x} cy={V.y} r="3" fill={vColor} />
                    </svg>
                    <div className="linalg-stat">
                        <strong>|v|</strong> = √({vx.toFixed(1)}² + {vy.toFixed(1)}² + {vz.toFixed(1)}²) ={' '}
                        <span style={{ color: vColor }}>{mag.toFixed(3)}</span>
                    </div>
                </div>

                {/* ===== PANEL 2: 2×2 matrix transform ===== */}
                <div className="linalg-panel">
                    <h5>
                        Unit Square → <span style={{ color: detColor }}>det = {det.toFixed(2)}</span>
                    </h5>
                    <svg viewBox={`0 0 ${MW} ${MH}`} width="100%" height="220" role="img" aria-label="2x2 matrix transformation">
                        {/* Grid */}
                        {gridVals.map(i => (
                            <g key={`mg${i}`}>
                                <line x1={tx(i)} y1={ty(-3)} x2={tx(i)} y2={ty(3)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                                <line x1={tx(-3)} y1={ty(i)} x2={tx(3)} y2={ty(i)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                            </g>
                        ))}
                        {/* Axes */}
                        <line x1={0} y1={mcy} x2={MW} y2={mcy} stroke="rgba(255,255,255,0.25)" />
                        <line x1={mcx} y1={0} x2={mcx} y2={MH} stroke="rgba(255,255,255,0.25)" />

                        {/* Reference unit square (dashed) */}
                        <polygon
                            points={`${tx(0)},${ty(0)} ${tx(1)},${ty(0)} ${tx(1)},${ty(1)} ${tx(0)},${ty(1)}`}
                            fill="rgba(255,255,255,0.04)"
                            stroke="rgba(255,255,255,0.28)"
                            strokeDasharray="3,3"
                        />

                        {/* Transformed parallelogram */}
                        <polygon
                            points={`${Oxy[0]},${Oxy[1]} ${E1[0]},${E1[1]} ${E12[0]},${E12[1]} ${E2[0]},${E2[1]}`}
                            fill={det >= 0 ? 'rgba(0,242,255,0.18)' : 'rgba(251,146,60,0.18)'}
                            stroke={detColor}
                            strokeWidth="2"
                            style={{ transition: 'all 0.15s' }}
                        />

                        {/* Transformed basis vectors */}
                        <line x1={Oxy[0]} y1={Oxy[1]} x2={E1[0]} y2={E1[1]} stroke={xColor} strokeWidth="2" markerEnd="url(#la-arr-x)" />
                        <line x1={Oxy[0]} y1={Oxy[1]} x2={E2[0]} y2={E2[1]} stroke={yColor} strokeWidth="2" markerEnd="url(#la-arr-y)" />
                        <text x={E1[0] + 4} y={E1[1] + 12} fill={xColor} fontSize="10" fontWeight="700">A·ê₁</text>
                        <text x={E2[0] + 4} y={E2[1] - 4} fill={yColor} fontSize="10" fontWeight="700">A·ê₂</text>
                    </svg>
                    <div className="linalg-stat">
                        {det === 0
                            ? 'Collapsed — a dimension was lost'
                            : det < 0
                                ? 'Orientation flipped (negative area)'
                                : 'Orientation preserved'}
                    </div>
                </div>
            </div>

            <p className="linalg-caption">
                <strong>Left:</strong> drag the x, y, z sliders below and watch the arrow fly
                through 3D space — the magnitude readout is its length.{' '}
                <strong>Right:</strong> adjust the matrix entries to scale, shear, rotate,
                or flip the dashed unit square. The colored area is the determinant.
            </p>

            <style>{`
                .linalg-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .linalg-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                }
                @media (max-width: 640px) {
                    .linalg-grid { grid-template-columns: 1fr; }
                }
                .linalg-panel {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--glass-border);
                    border-radius: 10px;
                    padding: 10px 12px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .linalg-panel h5 {
                    margin: 0 0 4px;
                    font-size: 12px;
                    color: var(--text-secondary);
                    font-weight: 500;
                    letter-spacing: 0.3px;
                }
                .linalg-stat {
                    font-family: ui-monospace, monospace;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    padding-top: 4px;
                }
                .linalg-stat strong { color: var(--accent-primary); }
                .linalg-caption {
                    margin: 10px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.5;
                }
            `}</style>
        </div>
    );
}
