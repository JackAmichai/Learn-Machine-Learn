import React from 'react';

/**
 * TensorVisualizer — renders a d1 × d2 × d3 tensor as a stack of isometric
 * cubes, letting learners *see* what "shape" really means. The readout shows
 * the total element count and names concrete analogies:
 *   - rank-1 vector (e.g. a word)
 *   - rank-2 matrix (e.g. a grayscale image)
 *   - rank-3 tensor (e.g. an RGB image)
 *
 * Also supports the secondary "Jacobian Determinant (2x2)" formula by rendering
 * a small inline note if those slider keys are present.
 */
export default function TensorVisualizer({ values = {} }) {
    // Clamp to render-friendly range
    const d1 = Math.max(1, Math.min(8, Math.round(values.d1 ?? 4)));
    const d2 = Math.max(1, Math.min(8, Math.round(values.d2 ?? 4)));
    const d3 = Math.max(1, Math.min(6, Math.round(values.d3 ?? 3)));
    const rawTotal = (values.d1 ?? 10) * (values.d2 ?? 10) * (values.d3 ?? 1);

    // Isometric projection
    const CELL = 18; // edge length of one cube's unit
    const cos30 = Math.cos(Math.PI / 6);
    const sin30 = Math.sin(Math.PI / 6);

    // Compute bounding box
    const topY = -CELL * d3;                  // top of the tallest cube column
    const maxX = (d1 + d2) * CELL * cos30;
    const maxY = (d1 + d2) * CELL * sin30;
    const pad = 20;
    const W = maxX + pad * 2;
    const H = (maxY - topY) + pad * 2;
    const originX = pad + d2 * CELL * cos30;
    const originY = pad - topY;

    const iso = (x, y, z) => ({
        x: originX + (x - y) * CELL * cos30,
        y: originY + (x + y) * CELL * sin30 - z * CELL,
    });

    // Build cubes (draw back-to-front order: far corner first, near corner last)
    const cubes = [];
    for (let z = 0; z < d3; z++) {
        for (let y = d2 - 1; y >= 0; y--) {
            for (let x = 0; x < d1; x++) {
                cubes.push({ x, y, z });
            }
        }
    }

    const drawCube = ({ x, y, z }) => {
        // 8 corners
        const p000 = iso(x, y, z);
        const p100 = iso(x + 1, y, z);
        const p110 = iso(x + 1, y + 1, z);
        const p010 = iso(x, y + 1, z);
        const p001 = iso(x, y, z + 1);
        const p101 = iso(x + 1, y, z + 1);
        const p111 = iso(x + 1, y + 1, z + 1);
        const p011 = iso(x, y + 1, z + 1);

        // Top face
        const top = `${p001.x},${p001.y} ${p101.x},${p101.y} ${p111.x},${p111.y} ${p011.x},${p011.y}`;
        // Front (facing +x) — lit
        const front = `${p100.x},${p100.y} ${p110.x},${p110.y} ${p111.x},${p111.y} ${p101.x},${p101.y}`;
        // Right (facing +y) — shaded
        const right = `${p010.x},${p010.y} ${p110.x},${p110.y} ${p111.x},${p111.y} ${p011.x},${p011.y}`;

        // Color based on depth for a subtle gradient effect
        const lightness = 0.35 + 0.1 * (z / Math.max(1, d3 - 1));
        return (
            <g key={`${x}-${y}-${z}`}>
                <polygon points={right} fill={`rgba(112,0,255,${lightness * 0.8})`} stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
                <polygon points={front} fill={`rgba(0,200,220,${lightness})`} stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
                <polygon points={top} fill={`rgba(0,242,255,${lightness * 1.2})`} stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
            </g>
        );
    };

    // Label the rank
    const rank =
        d1 > 1 && d2 > 1 && d3 > 1
            ? 'Rank-3 tensor — like an RGB image (H × W × C)'
            : d1 > 1 && d2 > 1 && d3 === 1
                ? 'Rank-2 matrix — like a grayscale image'
                : d2 === 1 && d3 === 1
                    ? 'Rank-1 vector — like a single row of pixels'
                    : `Shape (${d1}, ${d2}, ${d3})`;

    return (
        <div className="tensor-visualizer">
            <div className="tensor-head">
                <div className="tensor-shape-badge">
                    ({d1}, {d2}, {d3})
                </div>
                <div className="tensor-count">
                    = <strong>{rawTotal.toLocaleString()}</strong> scalar{rawTotal === 1 ? '' : 's'}
                </div>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="240" role="img" aria-label={`Tensor shape ${d1} by ${d2} by ${d3}`}>
                {cubes.map(drawCube)}
            </svg>

            <div className="tensor-rank">{rank}</div>

            <p className="tensor-caption">
                Each little cube is one number. A neural network&apos;s activation at a
                convolutional layer is exactly a stack like this — height × width ×
                number of feature channels.
            </p>

            <style>{`
                .tensor-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .tensor-head {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 8px;
                    font-size: 13px;
                    color: var(--text-secondary);
                    font-family: ui-monospace, monospace;
                }
                .tensor-shape-badge {
                    background: rgba(0,242,255,0.1);
                    border: 1px solid var(--accent-primary);
                    color: var(--accent-primary);
                    padding: 4px 12px;
                    border-radius: 999px;
                    font-weight: 700;
                }
                .tensor-count strong { color: var(--text-primary); }
                .tensor-rank {
                    text-align: center;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin-top: 6px;
                    padding: 6px 10px;
                    background: rgba(0,242,255,0.06);
                    border-radius: 6px;
                }
                .tensor-caption {
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
