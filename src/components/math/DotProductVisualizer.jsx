import React from 'react';

/**
 * DotProductVisualizer — shows two 2D vectors, their angle, and the
 * projection of a onto b. The shaded projection length IS the dot product
 * divided by |b|, which makes the geometric meaning tangible.
 *
 * Supports both slider sets from the mathContent "Dot Product" topic:
 *   - Component form: ax, ay, (az) and bx, by, (bz) — we ignore z for the 2D view
 *   - Angle form: magA, magB, theta (degrees)
 *
 * Whichever set of sliders has been touched most recently drives the view.
 */
export default function DotProductVisualizer({ values = {} }) {
    const hasAngleForm =
        values.magA !== undefined ||
        values.magB !== undefined ||
        values.theta !== undefined;

    let aVec, bVec;
    if (hasAngleForm) {
        const mA = values.magA ?? 2;
        const mB = values.magB ?? 1.5;
        const t = (values.theta ?? 35) * Math.PI / 180;
        aVec = { x: mA, y: 0 };
        bVec = { x: mB * Math.cos(t), y: mB * Math.sin(t) };
    } else {
        aVec = { x: values.ax ?? 0.8, y: values.ay ?? 0.4 };
        bVec = { x: values.bx ?? 1.1, y: values.by ?? -0.6 };
    }

    const dot = aVec.x * bVec.x + aVec.y * bVec.y;
    const magA = Math.hypot(aVec.x, aVec.y);
    const magB = Math.hypot(bVec.x, bVec.y);
    const cosT = magA && magB ? dot / (magA * magB) : 0;
    const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosT))) * 180 / Math.PI;

    // Projection of a onto unit-b
    const projLen = magB > 0 ? dot / magB : 0;
    const projX = magB > 0 ? (bVec.x / magB) * projLen : 0;
    const projY = magB > 0 ? (bVec.y / magB) * projLen : 0;

    // Canvas
    const W = 340, H = 220;
    const cx = 170, cy = 110;
    const s = 38; // px per unit
    const tx = (x) => cx + x * s;
    const ty = (y) => cy - y * s;

    // Sampled arc for the angle
    const angleA = Math.atan2(aVec.y, aVec.x);
    const angleB = Math.atan2(bVec.y, bVec.x);
    const arcR = 0.5; // units
    const startAng = Math.min(angleA, angleB);
    const endAng = Math.max(angleA, angleB);
    const arcPoints = [];
    const N = 24;
    for (let i = 0; i <= N; i++) {
        const t = startAng + (endAng - startAng) * (i / N);
        arcPoints.push(`${tx(Math.cos(t) * arcR)},${ty(Math.sin(t) * arcR)}`);
    }

    const verdictColor = dot > 0.05 ? '#34d399' : dot < -0.05 ? '#fb923c' : '#60a5fa';
    const verdict = dot > 0.05 ? '→ aligned' : dot < -0.05 ? '→ opposing' : '→ orthogonal';

    const grid = [-3, -2, -1, 0, 1, 2, 3];

    return (
        <div className="dp-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="230" role="img" aria-label="Dot product visualization">
                <defs>
                    <marker id="dp-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" fill="#00f2ff" />
                    </marker>
                    <marker id="dp-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" fill="#ff6b8a" />
                    </marker>
                </defs>

                {/* Grid */}
                {grid.map(i => (
                    <g key={`g${i}`}>
                        <line x1={tx(i)} y1={0} x2={tx(i)} y2={H} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                        <line x1={0} y1={ty(i)} x2={W} y2={ty(i)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    </g>
                ))}
                <line x1={0} y1={cy} x2={W} y2={cy} stroke="rgba(255,255,255,0.3)" />
                <line x1={cx} y1={0} x2={cx} y2={H} stroke="rgba(255,255,255,0.3)" />

                {/* Projection highlight (on b direction) */}
                {magB > 0 && (
                    <>
                        <line
                            x1={tx(0)} y1={ty(0)} x2={tx(projX)} y2={ty(projY)}
                            stroke={verdictColor} strokeWidth="6" opacity="0.3" strokeLinecap="round"
                        />
                        {/* Dashed drop-line from tip of a to projection point */}
                        <line
                            x1={tx(aVec.x)} y1={ty(aVec.y)} x2={tx(projX)} y2={ty(projY)}
                            stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3,3"
                        />
                    </>
                )}

                {/* Angle arc */}
                {magA > 0 && magB > 0 && (
                    <polyline points={arcPoints.join(' ')} fill="none" stroke="var(--accent-primary, #00f2ff)" strokeWidth="1.5" />
                )}

                {/* Vectors */}
                <line x1={tx(0)} y1={ty(0)} x2={tx(aVec.x)} y2={ty(aVec.y)} stroke="#00f2ff" strokeWidth="2.5" markerEnd="url(#dp-a)" style={{ transition: 'all 0.15s' }} />
                <line x1={tx(0)} y1={ty(0)} x2={tx(bVec.x)} y2={ty(bVec.y)} stroke="#ff6b8a" strokeWidth="2.5" markerEnd="url(#dp-b)" style={{ transition: 'all 0.15s' }} />

                {/* Labels */}
                <text x={tx(aVec.x) + 6} y={ty(aVec.y) - 4} fill="#00f2ff" fontSize="13" fontWeight="700">a</text>
                <text x={tx(bVec.x) + 6} y={ty(bVec.y) - 4} fill="#ff6b8a" fontSize="13" fontWeight="700">b</text>
                <text x={tx(arcR * 1.1)} y={ty(0) - 6} fill="var(--accent-primary)" fontSize="10">θ ≈ {angleDeg.toFixed(0)}°</text>
            </svg>

            <div className="dp-stats">
                <div><span className="lbl">a · b</span> = <span className="val">{dot.toFixed(3)}</span></div>
                <div><span className="lbl">|a|</span> = {magA.toFixed(2)} · <span className="lbl">|b|</span> = {magB.toFixed(2)}</div>
                <div style={{ color: verdictColor, fontWeight: 600 }}>{verdict}</div>
            </div>

            <p className="dp-caption">
                The <strong style={{ color: '#00f2ff' }}>cyan</strong> arrow is <em>a</em>,
                the <strong style={{ color: '#ff6b8a' }}>pink</strong> arrow is <em>b</em>.
                The thick coloured bar along <em>b</em> is <em>a</em>'s projection —
                its signed length is exactly <code>a·b / |b|</code>.
            </p>

            <style>{`
                .dp-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .dp-stats {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 8px;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--text-secondary);
                    margin-top: 6px;
                    padding: 6px 0;
                    border-top: 1px dashed rgba(255,255,255,0.08);
                }
                .dp-stats .lbl { color: var(--text-primary); font-weight: 700; }
                .dp-stats .val { color: var(--accent-primary); font-weight: 700; }
                .dp-caption {
                    margin: 8px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.5;
                }
                .dp-caption code {
                    background: rgba(0,242,255,0.08);
                    padding: 1px 6px;
                    border-radius: 4px;
                    color: var(--accent-primary);
                    font-size: 11px;
                }
            `}</style>
        </div>
    );
}
