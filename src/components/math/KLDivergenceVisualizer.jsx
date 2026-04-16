import React from 'react';

/**
 * KLDivergenceVisualizer — Comparative PDF plots for two distributions.
 * 
 * KL(P || Q) measures "information gain" or "mismatch" when using Q to approximate P.
 * 
 * Formula sliders provide:
 *  - muP, sigmaP: Mean and StdDev for distribution P (the "truth")
 *  - muQ, sigmaQ: Mean and StdDev for distribution Q (the "approximation")
 */
export default function KLDivergenceVisualizer({ values = {} }) {
    const muP = values.muP ?? 0;
    const sigmaP = values.sigmaP ?? 1.0;
    const muQ = values.muQ ?? 1.5;
    const sigmaQ = values.sigmaQ ?? 1.2;

    // Normal PDF function
    const pdf = (x, mu, sigma) => {
        const s = Math.max(0.1, sigma);
        return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / s, 2));
    };

    // Calculate KL Divergence for two Univariate Normals
    // KL(N0 || N1) = log(s1/s0) + (s0^2 + (m0-m1)^2)/(2*s1^2) - 0.5
    const s0 = sigmaP, s1 = sigmaQ, m0 = muP, m1 = muQ;
    const kl = Math.log(s1 / s0) + (Math.pow(s0, 2) + Math.pow(m0 - m1, 2)) / (2 * Math.pow(s1, 2)) - 0.5;

    // Plotting
    const W = 300, H = 180;
    const padding = 20;
    const plotW = W - padding * 2;
    const plotH = H - padding * 2;
    
    const range = 8;
    const steps = 60;
    const points = [];
    for (let i = 0; i <= steps; i++) {
        const x = -range/2 + (i / steps) * range;
        points.push(x);
    }

    const xScale = (x) => padding + (x + range/2) * (plotW / range);
    const yScale = (y) => H - padding - y * (plotH * 2); // PDF values are small, scale up

    const pathP = points.map((x, i) => `${i===0?'M':'L'}${xScale(x)},${yScale(pdf(x, muP, sigmaP))}`).join(' ');
    const pathQ = points.map((x, i) => `${i===0?'M':'L'}${xScale(x)},${yScale(pdf(x, muQ, sigmaQ))}`).join(' ');

    const colorP = '#ff6b8a';
    const colorQ = '#00f2ff';

    return (
        <div className="kl-visualizer">
            <div className="kl-header">
                <h5>Distribution Mismatch</h5>
                <div className="kl-value">
                    KL(P||Q) = <strong>{kl.toFixed(3)}</strong> nats
                </div>
            </div>

            <div className="kl-plot">
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="160">
                    {/* Grid/Axes */}
                    <line x1={padding} y1={H-padding} x2={W-padding} y2={H-padding} stroke="rgba(255,255,255,0.1)" />
                    <line x1={W/2} y1={padding} x2={W/2} y2={H-padding} stroke="rgba(255,255,255,0.05)" />

                    {/* Area under P */}
                    <path d={`${pathP} L${xScale(range/2)},${H-padding} L${padding},${H-padding} Z`} fill={colorP} fillOpacity="0.1" />
                    
                    {/* Curves */}
                    <path d={pathP} fill="none" stroke={colorP} strokeWidth="2.5" />
                    <path d={pathQ} fill="none" stroke={colorQ} strokeWidth="2.5" strokeDasharray="4,2" />

                    {/* Labels */}
                    <text x={xScale(muP)} y={yScale(pdf(muP, muP, sigmaP)) - 8} fill={colorP} fontSize="10" textAnchor="middle" fontWeight="bold">P (True)</text>
                    <text x={xScale(muQ)} y={yScale(pdf(muQ, muQ, sigmaQ)) - 8} fill={colorQ} fontSize="10" textAnchor="middle" fontWeight="bold">Q (Approx)</text>
                </svg>
            </div>

            <div className="kl-legend">
                <div className="legend-item">
                    <span className="line" style={{ background: colorP }}></span>
                    <span>Target Distribution</span>
                </div>
                <div className="legend-item">
                    <span className="line dashed" style={{ borderColor: colorQ }}></span>
                    <span>Model Prediction</span>
                </div>
            </div>

            <p className="kl-caption">
                KL Divergence is always ≥ 0. It is 0 only when P and Q are identical. 
                In VAEs and LLMs, we minimize this to force the model (Q) to match the target (P).
            </p>

            <style>{`
                .kl-visualizer {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .kl-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .kl-header h5 { margin: 0; font-size: 13px; color: var(--text-secondary); }
                .kl-value { font-family: ui-monospace, monospace; font-size: 13px; color: var(--accent-primary); }
                .kl-value strong { font-size: 16px; }
                .kl-legend {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    margin-top: 8px;
                }
                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    color: var(--text-secondary);
                }
                .line { width: 20px; height: 2px; border-radius: 2px; }
                .line.dashed { background: transparent; border-top: 2px dashed; height: 0; }
                .kl-caption {
                    margin: 12px 0 0;
                    font-size: 11px;
                    color: var(--text-tertiary);
                    text-align: center;
                    line-height: 1.4;
                }
            `}</style>
        </div>
    );
}
