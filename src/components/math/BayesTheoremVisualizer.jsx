import React from 'react';

/**
 * BayesTheoremVisualizer — Interactive Venn diagram for conditional probability.
 *
 * Reads values from the formula sliders:
 *  - pA: P(A) — overall probability of A
 *  - pB_A: P(B|A) — probability of B given A
 *  - pB_notA: P(B|~A) — probability of B given not A
 */
export default function BayesTheoremVisualizer({ values = {} }) {
    const pA = values.prior ?? 0.01;
    const pB_A = values.sensitivity ?? 0.95;
    const spec = values.specificity ?? 0.90;
    const pB_notA = 1 - spec; // P(+|~D)

    // Derived values
    const pNotA = 1 - pA;
    const pAnB = pA * pB_A;
    const pNotAnB = pNotA * pB_notA;
    const pB = pAnB + pNotAnB;
    const pA_B = pB > 0 ? pAnB / pB : 0;

    // UI scaling
    const size = 200;
    const scale = size * 0.8;

    // Simplified visualization: two circles representing A and B
    // Circle A area proportional to pA
    // Circle B area proportional to pB
    // Overlap proportional to p(A and B)
    
    const rA = Math.sqrt(pA / Math.PI) * scale;
    const rB = Math.sqrt(pB / Math.PI) * scale;
    
    // We want the overlap area to be pAnB. 
    // This is hard to calculate exactly for distance between centers, 
    // so we use a simplified horizontal representation.
    const dist = scale * 0.4 * (1 - pAnB / Math.max(pA, pB, 0.01));

    const colorA = '#ff6b8a';
    const colorB = '#60a5fa';
    const colorAnB = '#d946ef';

    return (
        <div className="bayes-visualizer">
            <div className="bayes-grid">
                <div className="bayes-panel">
                    <h5>Visual Logic: P(A|B) = {pA_B.toFixed(3)}</h5>
                    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="180">
                        <defs>
                            <mask id="overlap-mask">
                                <circle cx={size/2 - dist/2} cy={size/2} r={rA} fill="white" />
                            </mask>
                        </defs>
                        
                        {/* Circle A */}
                        <circle 
                            cx={size/2 - dist/2} cy={size/2} r={rA} 
                            fill={colorA} fillOpacity="0.3" 
                            stroke={colorA} strokeWidth="2"
                        />
                        
                        {/* Circle B */}
                        <circle 
                            cx={size/2 + dist/2} cy={size/2} r={rB} 
                            fill={colorB} fillOpacity="0.3" 
                            stroke={colorB} strokeWidth="2"
                        />

                        {/* Overlap Area (A and B) */}
                        <circle 
                            cx={size/2 + dist/2} cy={size/2} r={rB} 
                            fill={colorAnB} fillOpacity="0.6" 
                            mask="url(#overlap-mask)"
                        />

                        <text x={size/2 - dist/2} y={size/2 - rA - 5} fill={colorA} fontSize="10" textAnchor="middle" fontWeight="bold">Event A</text>
                        <text x={size/2 + dist/2} y={size/2 + rB + 15} fill={colorB} fontSize="10" textAnchor="middle" fontWeight="bold">Event B</text>
                    </svg>
                </div>

                <div className="bayes-stats">
                    <div className="stat-row">
                        <span className="dot" style={{ background: colorA }}></span>
                        <span>P(A) = <strong>{(pA * 100).toFixed(0)}%</strong></span>
                    </div>
                    <div className="stat-row">
                        <span className="dot" style={{ background: colorB }}></span>
                        <span>P(B) = <strong>{(pB * 100).toFixed(0)}%</strong></span>
                    </div>
                    <div className="stat-row highlight">
                        <span className="dot" style={{ background: colorAnB }}></span>
                        <span>P(A|B) = <strong>{(pA_B * 100).toFixed(1)}%</strong></span>
                    </div>
                    <p className="bayes-explanation">
                        If Event B happened, the chance that A was the cause is { (pA_B * 100).toFixed(1) }%.
                    </p>
                </div>
            </div>

            <style>{`
                .bayes-visualizer {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 12px;
                }
                .bayes-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 12px;
                    align-items: center;
                }
                .bayes-panel h5 { margin: 0 0 8px; font-size: 13px; color: var(--text-secondary); text-align: center; }
                .bayes-stats { display: flex; flex-direction: column; gap: 8px; }
                .stat-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-secondary); }
                .stat-row.highlight { margin-top: 4px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); color: var(--text-primary); }
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                .bayes-explanation { margin: 8px 0 0; font-size: 11px; font-style: italic; color: var(--accent-primary); line-height: 1.4; }
            `}</style>
        </div>
    );
}
