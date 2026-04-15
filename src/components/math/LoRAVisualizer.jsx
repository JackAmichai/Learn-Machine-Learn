import React from 'react';

export default function LoRAVisualizer({ values }) {
 const d = values.dim !== undefined ? values.dim : 1024;
 const r = values.rank !== undefined ? values.rank : 8;

 // Total trainable parameters in standard vs LoRA
 const fullParams = d * d;
 const loraParams = 2 * d * r;
 const savings = ((1 - loraParams / fullParams) * 100).toFixed(2);

 // Scaled dimensions for the SVG rendering
 // We want W0 to look large, and A/B to look narrow/short based on rank.
 const wSize = 120; // fixed visual size for the d x d matrix
 const rankVisualSize = Math.max(8, (r / 64) * 40); // scale rank thickness

 return (
 <div className="lora-visualizer">
 <div className="schema-container">
 <svg viewBox="0 0 400 220" width="100%" height="220">
 {/* Details / Legend */}
 <text x="200" y="20" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">
 h = W₀x + ΔWx = W₀x + BAx
 </text>

 {/* Input X */}
 <rect x="30" y="160" width="40" height="20" fill="rgba(255, 255, 255, 0.1)" rx="4"/>
 <text x="50" y="174" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">x</text>

 {/* Arrow splits to both paths */}
 <path d="M50,160 L50,140 L130,140 L130,120" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
 <path d="M50,140 L270,140 L270,120" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />

 {/* W0 Matrix (Frozen) */}
 <g transform="translate(70, 0)">
 <rect x="0" y="40" width={wSize} height={wSize} fill="rgba(255, 255, 255, 0.05)" stroke="var(--glass-border)" strokeWidth="2" rx="4"/>
 <text x="60" y="90" fill="var(--text-secondary)" fontSize="16" fontWeight="bold" textAnchor="middle">W₀</text>
 <text x="60" y="110" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">({d} × {d})</text>
 <text x="60" y="140" fill="#ff5555" fontSize="10" fontWeight="bold" textAnchor="middle">FROZEN</text>
 </g>

 {/* A Matrix (Low Rank Down-projection) */}
 <g transform="translate(270, 80)">
 <rect x={-wSize/2} y="0" width={wSize} height={rankVisualSize} fill="rgba(0, 242, 255, 0.2)" stroke="var(--accent-primary)" strokeWidth="1" rx="2" style={{ transition: 'all 0.3s' }}/>
 <text x="0" y={rankVisualSize/2 + 4} fill="var(--accent-primary)" fontSize="12" fontWeight="bold" textAnchor="middle">A ({d} × {r})</text>
 </g>

 {/* B Matrix (Low Rank Up-projection) */}
 <g transform="translate(270, 40)">
 <rect x={-wSize/2} y={120 - wSize - rankVisualSize} width={wSize} height={rankVisualSize} fill="rgba(112, 0, 255, 0.2)" stroke="var(--accent-secondary)" strokeWidth="1" rx="2" style={{ transition: 'all 0.3s' }}/>
 <text x="0" y={120 - wSize - rankVisualSize/2 + 4} fill="var(--accent-secondary)" fontSize="12" fontWeight="bold" textAnchor="middle">B ({r} × {d})</text>
 </g>

 {/* Arrow from A to B */}
 <line x1="270" y1="80" x2="270" y2={40 + 120 - wSize} stroke="var(--text-secondary)" strokeWidth="2" />

 {/* Arrows connecting to Addition Output */}
 <path d="M130,40 L130,20 L190,20" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
 <path d="M270,40 L270,20 L210,20" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />

 {/* Output Addition node */}
 <circle cx="200" cy="20" r="10" fill="var(--bg-panel)" stroke="var(--accent-primary)" strokeWidth="2" />
 <text x="200" y="24" fill="var(--accent-primary)" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>

 </svg>
 </div>

 <div className="stats-panel">
 <div className="stat">
 <span className="label">Full Fine-Tune Params</span>
 <span className="value">{fullParams.toLocaleString()}</span>
 </div>
 <div className="vs">VS</div>
 <div className="stat lora">
 <span className="label">LoRA Trainable Params</span>
 <span className="value">{loraParams.toLocaleString()}</span>
 </div>
 </div>
 
 <div className="savings-badge">
 <span className="icon"></span>
 <strong>{savings}% parameter reduction</strong>! Adapting {loraParams.toLocaleString()} weights instead of {fullParams.toLocaleString()}.
 </div>

 <style>{`
 .lora-visualizer {
 background: rgba(0, 0, 0, 0.4);
 border: 1px solid var(--glass-border);
 border-radius: 12px;
 padding: 24px;
 margin: 16px 0;
 }
 .schema-container {
 display: flex;
 justify-content: center;
 margin-bottom: 20px;
 }
 .stats-panel {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 20px;
 background: rgba(0, 0, 0, 0.5);
 padding: 16px;
 border-radius: 8px;
 border: 1px solid var(--glass-border);
 }
 .stat {
 display: flex;
 flex-direction: column;
 align-items: center;
 }
 .stat .label {
 font-size: 11px;
 color: var(--text-secondary);
 text-transform: uppercase;
 margin-bottom: 4px;
 }
 .stat .value {
 font-family: monospace;
 font-size: 20px;
 color: var(--text-primary);
 }
 .stat.lora .value {
 color: var(--accent-primary);
 font-weight: bold;
 }
 .vs {
 font-weight: 900;
 color: var(--text-secondary);
 opacity: 0.5;
 }
 .savings-badge {
 margin-top: 20px;
 text-align: center;
 background: rgba(0, 242, 255, 0.1);
 border: 1px dashed var(--accent-primary);
 color: var(--accent-primary);
 padding: 12px;
 border-radius: 8px;
 font-size: 14px;
 }
 .savings-badge strong { font-size: 16px; }
 `}</style>
 </div>
 );
}
