import React from 'react';

/**
 * LinearRegressionVisualizer — visualises ŷ = w·x + b on a scatter plot.
 *
 * Sliders supported (from mathContent):
 *   w, b   — slope and intercept of the regression line (Simple Linear Prediction)
 *   x      — highlights a single test input on the x-axis
 *   ss_res, ss_tot — for the R² formula scenario, drives a small inset bar
 *
 * Visuals:
 *   - 6 fixed scatter points (a noisy y ≈ 1.5·x + 0.5 dataset)
 *   - The regression line for the current w, b
 *   - Vertical residual segments from each point to the line (red when large)
 *   - A live MSE readout
 *   - If x is provided, a marker on the line at x with ŷ called out
 *   - If ss_res/ss_tot are provided, a tiny R² bar on the right
 */
export default function LinearRegressionVisualizer({ values = {} }) {
    const w = values.w ?? 1.5;
    const b = values.b ?? 0.5;
    const xMark = values.x;          // optional: highlight a single input
    const ssRes = values.ss_res;     // optional: R² scenario
    const ssTot = values.ss_tot;

    // Fixed dataset (true relation roughly y ≈ 1.5x + 1)
    const points = [
        { x: 1, y: 2.4 },
        { x: 2, y: 3.1 },
        { x: 3, y: 5.0 },
        { x: 4, y: 6.2 },
        { x: 5, y: 8.1 },
        { x: 6, y: 9.5 },
    ];

    // Plot frame
    const W = 360, H = 220;
    const padL = 36, padR = 30, padT = 30, padB = 36;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const xMin = 0, xMax = 7;
    const yMin = 0, yMax = 12;
    const xToPx = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const yToPx = (y) => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    const yHat = (x) => w * x + b;
    const residuals = points.map(p => p.y - yHat(p.x));
    const mse = residuals.reduce((s, r) => s + r * r, 0) / residuals.length;

    // Line endpoints
    const lineX1 = xMin, lineX2 = xMax;
    const lineY1 = yHat(lineX1);
    const lineY2 = yHat(lineX2);

    // Optional R² inset
    const showR2 = ssRes !== undefined && ssTot !== undefined && ssTot > 0;
    const r2 = showR2 ? 1 - ssRes / ssTot : null;

    return (
        <div className="linreg-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="220" role="img" aria-label="Linear regression scatter and fit">
                {/* Frame & grid */}
                <rect x={padL} y={padT} width={plotW} height={plotH} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)" />
                {[2, 4, 6, 8, 10].map(g => (
                    <g key={g}>
                        <line x1={padL} y1={yToPx(g)} x2={padL + plotW} y2={yToPx(g)} stroke="rgba(255,255,255,0.06)" />
                        <text x={padL - 4} y={yToPx(g) + 3} fontSize="9" fill="rgba(255,255,255,0.4)" textAnchor="end" fontFamily="ui-monospace,monospace">{g}</text>
                    </g>
                ))}
                {[1, 2, 3, 4, 5, 6].map(g => (
                    <g key={g}>
                        <line x1={xToPx(g)} y1={padT} x2={xToPx(g)} y2={padT + plotH} stroke="rgba(255,255,255,0.06)" />
                        <text x={xToPx(g)} y={padT + plotH + 12} fontSize="9" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontFamily="ui-monospace,monospace">{g}</text>
                    </g>
                ))}

                {/* Regression line */}
                <line x1={xToPx(lineX1)} y1={yToPx(lineY1)} x2={xToPx(lineX2)} y2={yToPx(lineY2)}
                    stroke="#00f2ff" strokeWidth="2.5" />

                {/* Residual segments */}
                {points.map((p, i) => {
                    const r = residuals[i];
                    const big = Math.abs(r) > 1.5;
                    return (
                        <line key={`res-${i}`}
                            x1={xToPx(p.x)} y1={yToPx(p.y)}
                            x2={xToPx(p.x)} y2={yToPx(yHat(p.x))}
                            stroke={big ? '#fb923c' : 'rgba(255,255,255,0.35)'}
                            strokeWidth="1.4" strokeDasharray="2,2"
                        />
                    );
                })}

                {/* Data points */}
                {points.map((p, i) => (
                    <circle key={`pt-${i}`} cx={xToPx(p.x)} cy={yToPx(p.y)} r="4.5" fill="#fb923c" stroke="#fff" strokeWidth="1" />
                ))}

                {/* Optional x marker */}
                {xMark !== undefined && (
                    <g>
                        <line x1={xToPx(xMark)} y1={padT} x2={xToPx(xMark)} y2={padT + plotH} stroke="#c084fc" strokeDasharray="3,3" />
                        <circle cx={xToPx(xMark)} cy={yToPx(yHat(xMark))} r="5" fill="#c084fc" stroke="#fff" strokeWidth="1.2" />
                        <text x={xToPx(xMark)} y={yToPx(yHat(xMark)) - 8} fontSize="10" fill="#c084fc" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">
                            ŷ={yHat(xMark).toFixed(2)}
                        </text>
                    </g>
                )}

                {/* Equation header */}
                <text x={padL} y={padT - 8} fontSize="11" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">
                    ŷ = {w.toFixed(2)}·x + {b.toFixed(2)}
                </text>
                <text x={padL + plotW} y={padT - 8} fontSize="11" fill="#34d399" textAnchor="end" fontFamily="ui-monospace,monospace" fontWeight="700">
                    MSE = {mse.toFixed(2)}
                </text>

                {/* Optional R² inset */}
                {showR2 && (
                    <g transform={`translate(${padL + plotW - 84}, ${padT + 8})`}>
                        <rect width="80" height="36" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(124,58,237,0.5)" />
                        <text x="40" y="14" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="ui-monospace,monospace">R²</text>
                        <text x="40" y="29" fontSize="14" fill={r2 >= 0.7 ? '#34d399' : r2 >= 0.3 ? '#fbbf24' : '#fb923c'} textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">
                            {r2.toFixed(2)}
                        </text>
                    </g>
                )}
            </svg>

            <p className="linreg-caption">
                Orange dots are the data; the cyan line is the model. Dashed segments are
                <strong> residuals</strong> — squared and averaged, they make the MSE that
                training tries to minimize. Find the slope/intercept that flattens those segments.
            </p>

            <style>{`
                .linreg-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .linreg-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
            `}</style>
        </div>
    );
}
