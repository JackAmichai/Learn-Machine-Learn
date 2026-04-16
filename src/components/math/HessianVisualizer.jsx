import React from 'react';

/**
 * HessianVisualizer — the two eigenvalues of the Hessian dictate the local
 * shape of the loss surface:
 *   - both positive → bowl (minimum)
 *   - both negative → dome (maximum)
 *   - opposite signs → saddle
 * We render z = (λ₁·x² + λ₂·y²) / 2 as a contour-lined isometric surface.
 */
export default function HessianVisualizer({ values = {} }) {
    const l1 = values.l1 ?? 2.0;
    const l2 = values.l2 ?? 1.5;

    const surfaceType =
        l1 > 0 && l2 > 0 ? 'minimum'
            : l1 < 0 && l2 < 0 ? 'maximum'
                : l1 * l2 < 0 ? 'saddle'
                    : 'flat';

    const label =
        surfaceType === 'minimum' ? 'Minimum (bowl) — gradient descent converges'
            : surfaceType === 'maximum' ? 'Maximum (dome) — gradient descent diverges'
                : surfaceType === 'saddle' ? 'Saddle point — the trap of deep learning'
                    : 'Flat region — no local curvature';

    const color =
        surfaceType === 'minimum' ? '#34d399'
            : surfaceType === 'maximum' ? '#fb923c'
                : surfaceType === 'saddle' ? '#a78bfa'
                    : '#60a5fa';

    // Sample the surface on an N×N grid, project isometrically.
    const N = 15;
    const range = 2; // -range..+range in x,y
    const W = 320, H = 240;
    const originX = W / 2;
    const originY = H * 0.65;
    const scaleXY = 16;
    const scaleZ = 18;

    // Clamp z for display so extreme eigenvalues don't blow out of frame
    const maxZ = 2;
    const clampZ = (z) => Math.max(-maxZ, Math.min(maxZ, z));

    const project = (x, y, z) => ({
        sx: originX + (x - y) * scaleXY * Math.cos(Math.PI / 6),
        sy: originY + (x + y) * scaleXY * Math.sin(Math.PI / 6) - z * scaleZ,
    });

    const pts = [];
    for (let i = 0; i <= N; i++) {
        const row = [];
        const x = -range + (2 * range * i) / N;
        for (let j = 0; j <= N; j++) {
            const y = -range + (2 * range * j) / N;
            const z = clampZ((l1 * x * x + l2 * y * y) / 2);
            row.push({ x, y, z, ...project(x, y, z) });
        }
        pts.push(row);
    }

    // Build grid lines (X-lines = constant i, varying j; Y-lines = reverse)
    const xLines = pts.map((row, i) => (
        <polyline
            key={`xl${i}`}
            points={row.map(p => `${p.sx},${p.sy}`).join(' ')}
            fill="none"
            stroke={color}
            strokeOpacity={0.4 + 0.3 * (i / N)}
            strokeWidth="1"
        />
    ));
    const yLines = [];
    for (let j = 0; j <= N; j++) {
        const col = pts.map(row => row[j]);
        yLines.push(
            <polyline
                key={`yl${j}`}
                points={col.map(p => `${p.sx},${p.sy}`).join(' ')}
                fill="none"
                stroke={color}
                strokeOpacity={0.4 + 0.3 * (j / N)}
                strokeWidth="1"
            />
        );
    }

    // Base axes
    const axO = project(0, 0, 0);
    const axX = project(range + 0.4, 0, 0);
    const axY = project(0, range + 0.4, 0);
    const axZ = project(0, 0, maxZ);

    return (
        <div className="hess-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="250" role="img" aria-label="Hessian eigenvalue surface">
                {/* Axes */}
                <line x1={axO.sx} y1={axO.sy} x2={axX.sx} y2={axX.sy} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <line x1={axO.sx} y1={axO.sy} x2={axY.sx} y2={axY.sy} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <line x1={axO.sx} y1={axO.sy} x2={axZ.sx} y2={axZ.sy} stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="3,3" />
                <text x={axX.sx + 4} y={axX.sy + 10} fill="rgba(255,255,255,0.6)" fontSize="10">x</text>
                <text x={axY.sx - 14} y={axY.sy + 10} fill="rgba(255,255,255,0.6)" fontSize="10">y</text>
                <text x={axZ.sx - 4} y={axZ.sy - 4} fill="rgba(255,255,255,0.6)" fontSize="10">z</text>

                {/* Mesh */}
                {xLines}
                {yLines}
            </svg>

            <div className="hess-verdict" style={{ color, borderColor: color }}>
                <strong>
                    λ₁ = {l1.toFixed(1)}, λ₂ = {l2.toFixed(1)}
                </strong>
                <span>{label}</span>
            </div>

            <p className="hess-caption">
                The Hessian&apos;s <strong>eigenvalues</strong> tell you the local shape of the
                loss. In practice, deep-learning loss surfaces are dominated by
                <strong> saddle points</strong>, which is why momentum-based optimizers
                are so effective at escaping them.
            </p>

            <style>{`
                .hess-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .hess-verdict {
                    margin-top: 6px;
                    padding: 8px 12px;
                    border: 1px solid;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    text-align: center;
                    font-size: 12px;
                    font-family: ui-monospace, monospace;
                    background: rgba(255,255,255,0.02);
                }
                .hess-verdict strong { font-size: 13px; }
                .hess-caption {
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
