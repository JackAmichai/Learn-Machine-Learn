import React, { useState, useEffect } from 'react';

/**
 * MatMulVisualizer — shows C = A·B for 2×2 matrices.
 * A coloured row of A "meets" a column of B, their dot product lands in C[i,j].
 * We cycle through (0,0) → (0,1) → (1,0) → (1,1) so learners can see every
 * row-times-column computation.
 */
const Cell = ({ value, highlight, color = '#00f2ff' }) => (
    <div className="mm-cell" style={{
        background: highlight ? `${color}22` : 'rgba(255,255,255,0.04)',
        borderColor: highlight ? color : 'rgba(255,255,255,0.08)',
        color: highlight ? color : 'var(--text-secondary)',
        fontWeight: highlight ? 700 : 400,
    }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
    </div>
);

export default function MatMulVisualizer({ values = {} }) {
    const a11 = values.a11 ?? 1;
    const a12 = values.a12 ?? 0.5;
    const a21 = values.a21 ?? -0.8;
    const a22 = values.a22 ?? 2.2;
    const b11 = values.b11 ?? 0.7;
    const b12 = values.b12 ?? -1;
    const b21 = values.b21 ?? 0.3;
    const b22 = values.b22 ?? 1.4;

    const c = [
        [a11 * b11 + a12 * b21, a11 * b12 + a12 * b22],
        [a21 * b11 + a22 * b21, a21 * b12 + a22 * b22],
    ];

    // Animated focus cell (i,j) — which output entry are we building right now?
    const [focus, setFocus] = useState({ i: 0, j: 0 });
    useEffect(() => {
        const id = setInterval(() => {
            setFocus(f => {
                const idx = (f.i * 2 + f.j + 1) % 4;
                return { i: Math.floor(idx / 2), j: idx % 2 };
            });
        }, 1400);
        return () => clearInterval(id);
    }, []);

    const A = [[a11, a12], [a21, a22]];
    const B = [[b11, b12], [b21, b22]];



    const focusedContribution =
        A[focus.i][0] * B[0][focus.j] + A[focus.i][1] * B[1][focus.j];

    return (
        <div className="mm-visualizer">
            <div className="mm-equation">
                <div className="mm-block">
                    <div className="mm-label">A</div>
                    <div className="mm-grid">
                        <Cell value={A[0][0]} highlight={focus.i === 0} color="#00f2ff" />
                        <Cell value={A[0][1]} highlight={focus.i === 0} color="#00f2ff" />
                        <Cell value={A[1][0]} highlight={focus.i === 1} color="#00f2ff" />
                        <Cell value={A[1][1]} highlight={focus.i === 1} color="#00f2ff" />
                    </div>
                </div>

                <div className="mm-op">×</div>

                <div className="mm-block">
                    <div className="mm-label">B</div>
                    <div className="mm-grid">
                        <Cell value={B[0][0]} highlight={focus.j === 0} color="#ff6b8a" />
                        <Cell value={B[0][1]} highlight={focus.j === 1} color="#ff6b8a" />
                        <Cell value={B[1][0]} highlight={focus.j === 0} color="#ff6b8a" />
                        <Cell value={B[1][1]} highlight={focus.j === 1} color="#ff6b8a" />
                    </div>
                </div>

                <div className="mm-op">=</div>

                <div className="mm-block">
                    <div className="mm-label">C</div>
                    <div className="mm-grid">
                        <Cell value={c[0][0]} highlight={focus.i === 0 && focus.j === 0} color="#a78bfa" />
                        <Cell value={c[0][1]} highlight={focus.i === 0 && focus.j === 1} color="#a78bfa" />
                        <Cell value={c[1][0]} highlight={focus.i === 1 && focus.j === 0} color="#a78bfa" />
                        <Cell value={c[1][1]} highlight={focus.i === 1 && focus.j === 1} color="#a78bfa" />
                    </div>
                </div>
            </div>

            <div className="mm-breakdown">
                <span className="mm-eq-label">
                    C[{focus.i}][{focus.j}]
                </span>
                &nbsp;=&nbsp;
                <span style={{ color: '#00f2ff' }}>{A[focus.i][0].toFixed(2)}</span>
                ·<span style={{ color: '#ff6b8a' }}>{B[0][focus.j].toFixed(2)}</span>
                &nbsp;+&nbsp;
                <span style={{ color: '#00f2ff' }}>{A[focus.i][1].toFixed(2)}</span>
                ·<span style={{ color: '#ff6b8a' }}>{B[1][focus.j].toFixed(2)}</span>
                &nbsp;=&nbsp;
                <span style={{ color: '#a78bfa', fontWeight: 700 }}>{focusedContribution.toFixed(3)}</span>
            </div>

            <p className="mm-caption">
                Every output cell is a <strong>dot product</strong> of one row of A with
                one column of B. Watch the highlight cycle through all four positions — this
                is literally what a dense neural-net layer does every forward pass.
            </p>

            <style>{`
                .mm-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .mm-equation {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .mm-block { display: flex; flex-direction: column; align-items: center; gap: 4px; }
                .mm-label { font-size: 11px; color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase; }
                .mm-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 3px;
                    padding: 6px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 8px;
                }
                .mm-cell {
                    width: 52px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid;
                    border-radius: 5px;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }
                .mm-op {
                    font-size: 22px;
                    color: var(--text-secondary);
                    padding: 0 4px;
                }
                .mm-breakdown {
                    margin-top: 14px;
                    padding: 10px 12px;
                    background: rgba(167, 139, 250, 0.06);
                    border: 1px solid rgba(167, 139, 250, 0.2);
                    border-radius: 8px;
                    font-family: ui-monospace, monospace;
                    font-size: 13px;
                    color: var(--text-secondary);
                    text-align: center;
                    letter-spacing: 0.3px;
                }
                .mm-eq-label { color: #a78bfa; font-weight: 700; }
                .mm-caption {
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
