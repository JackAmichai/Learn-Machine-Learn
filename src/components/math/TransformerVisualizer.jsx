import React from 'react';

export default function TransformerVisualizer({ values }) {
  // Extract inputs from sliders
  const qk1 = values.q_k !== undefined ? values.q_k : 3.2;
  const other1 = values.other1 !== undefined ? values.other1 : 0.5;
  const other2 = values.other2 !== undefined ? values.other2 : 0.3;
  const d = values.d !== undefined ? values.d : 64;

  const scale = Math.sqrt(d);
  
  // Exponentiated scaled dot products
  const e1 = Math.exp(qk1 / scale);
  const e2 = Math.exp(other1 / scale);
  const e3 = Math.exp(other2 / scale);

  const sum = e1 + e2 + e3;

  // Softmax final attention distribution
  const a1 = e1 / sum;
  const a2 = e2 / sum;
  const a3 = e3 / sum;

  return (
    <div className="transformer-visualizer">
      <div className="svg-container">
        <svg viewBox="0 0 400 250" width="100%" height="250">
          
          {/* Base Query */}
          <rect x="20" y="105" width="80" height="40" rx="4" fill="var(--bg-panel)" stroke="var(--accent-primary)" strokeWidth="2" />
          <text x="60" y="125" fill="var(--accent-primary)" fontSize="12" fontWeight="bold" textAnchor="middle">Query (Q)</text>
          <text x="60" y="140" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">"bank"</text>

          {/* Keys */}
          {/* Key 1 (Target Match) */}
          <g transform="translate(240, 20)">
             <rect x="0" y="0" width="100" height="30" rx="4" fill="rgba(255,255,255,0.05)" stroke="var(--glass-border)" />
             <text x="50" y="20" fill="var(--text-primary)" fontSize="12" textAnchor="middle">Key 1: "river"</text>
             {/* Attention Bar */}
             <rect x="110" y="5" width={a1 * 40} height="20" fill="var(--accent-primary)" />
             <text x="115" y="20" fill="var(--bg-body)" fontSize="10" fontWeight="bold">{(a1 * 100).toFixed(1)}%</text>
          </g>

          {/* Key 2 */}
          <g transform="translate(240, 110)">
             <rect x="0" y="0" width="100" height="30" rx="4" fill="rgba(255,255,255,0.05)" stroke="var(--glass-border)" />
             <text x="50" y="20" fill="var(--text-primary)" fontSize="12" textAnchor="middle">Key 2: "money"</text>
             <rect x="110" y="5" width={a2 * 40} height="20" fill="#ffc832" />
             <text x="115" y="20" fill="var(--bg-body)" fontSize="10" fontWeight="bold">{(a2 * 100).toFixed(1)}%</text>
          </g>

          {/* Key 3 */}
          <g transform="translate(240, 200)">
             <rect x="0" y="0" width="100" height="30" rx="4" fill="rgba(255,255,255,0.05)" stroke="var(--glass-border)" />
             <text x="50" y="20" fill="var(--text-primary)" fontSize="12" textAnchor="middle">Key 3: "the"</text>
             <rect x="110" y="5" width={a3 * 40} height="20" fill="#ff5555" />
             <text x="115" y="20" fill="var(--bg-body)" fontSize="10" fontWeight="bold">{(a3 * 100).toFixed(1)}%</text>
          </g>

          {/* Connection Lines & Q.K Math labels */}
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none">
             {/* To K1 */}
             <path d="M100,125 C140,125 150,35 240,35" strokeWidth={0.5 + a1 * 4} stroke={`rgba(0, 242, 255, ${Math.max(0.2, a1)})`} />
             <rect x="150" y="25" width="40" height="20" rx="4" fill="rgba(0,0,0,0.8)" stroke="none" />
             <text x="170" y="38" fill="var(--accent-primary)" fontSize="9" textAnchor="middle" stroke="none">Q·K={qk1.toFixed(1)}</text>

             {/* To K2 */}
             <path d="M100,125 L240,125" strokeWidth={0.5 + a2 * 4} stroke={`rgba(255, 200, 50, ${Math.max(0.2, a2)})`} />
             <rect x="150" y="115" width="40" height="20" rx="4" fill="rgba(0,0,0,0.8)" stroke="none" />
             <text x="170" y="128" fill="#ffc832" fontSize="9" textAnchor="middle" stroke="none">Q·K={other1.toFixed(1)}</text>

             {/* To K3 */}
             <path d="M100,125 C140,125 150,215 240,215" strokeWidth={0.5 + a3 * 4} stroke={`rgba(255, 85, 85, ${Math.max(0.2, a3)})`} />
             <rect x="150" y="205" width="40" height="20" rx="4" fill="rgba(0,0,0,0.8)" stroke="none" />
             <text x="170" y="218" fill="#ff5555" fontSize="9" textAnchor="middle" stroke="none">Q·K={other2.toFixed(1)}</text>
          </g>
          
          <text x="365" y="10" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Softmax Weights</text>
        </svg>
      </div>
      
      <p className="caption">
         The <strong>Self-Attention Mechanism</strong> determines how strongly the word "bank" attends to contextual neighbors in the sequence. 
         Notice that smaller values of exactly matching <strong>dimension $d$ ({d})</strong> sharpen the softmax scale ({scale.toFixed(1)}), polarizing the attention.
      </p>

      <style>{`
        .transformer-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
        }
        .svg-container {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.3);
        }
        .caption {
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
