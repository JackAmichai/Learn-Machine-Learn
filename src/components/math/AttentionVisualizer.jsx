import React, { useState } from 'react';

export default function AttentionVisualizer() {
  const [queryIdx, setQueryIdx] = useState(1);
  const tokens = ['The', 'cat', 'sat', 'on', 'mat'];
  
  const attentionWeights = [
    [0.9, 0.05, 0.03, 0.01, 0.01],
    [0.1, 0.7, 0.15, 0.03, 0.02],
    [0.05, 0.15, 0.6, 0.15, 0.05],
    [0.02, 0.03, 0.15, 0.7, 0.1],
    [0.02, 0.02, 0.05, 0.2, 0.71]
  ];
  
  const weights = attentionWeights[queryIdx];
  const maxWeight = Math.max(...weights);
  
  return (
    <div className="attention-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 120" width="100%" height="140">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Self-Attention: "The cat sat on mat"
          </text>
          
          {/* Tokens */}
          {tokens.map((token, i) => (
            <g key={i}>
              <rect x={10 + i * 38} y="30" width="32" height="20" rx="4" 
                    fill={i === queryIdx ? 'var(--accent-primary)' : 'var(--bg-secondary)'} 
                    stroke={i === queryIdx ? '#fff' : 'var(--glass-border)'} strokeWidth="1.5" />
              <text x={26 + i * 38} y="43" fill={i === queryIdx ? 'var(--bg-primary)' : 'var(--text-primary)'} 
                    fontSize="9" textAnchor="middle">{token}</text>
            </g>
          ))}
          
          {/* Attention connections */}
          {tokens.map((_, i) => {
            if (i === queryIdx) return null;
            const weight = weights[i];
            const opacity = 0.2 + (weight / maxWeight) * 0.8;
            return (
              <line key={`line-${i}`}
                x1={26 + queryIdx * 38} y1="50"
                x2={26 + i * 38} y2="50"
                stroke="var(--accent-secondary)"
                strokeWidth={1 + weight * 3}
                opacity={opacity}
                style={{ transition: 'all 0.3s' }}
              />
            );
          })}
          
          {/* Attention weights bar */}
          <text x="100" y="75" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Attention Weights</text>
          <g transform="translate(20, 80)">
            {weights.map((w, i) => (
              <g key={i} transform={`translate(${i * 35}, 0)`}>
                <rect width="30" height={w * 35} y={35 - w * 35} 
                      fill="var(--accent-primary)" rx="2" style={{ transition: 'all 0.3s' }} />
                <text x="15" y="42" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">
                  {tokens[i]}
                </text>
                <text x="15" y={30 - w * 35} fill="var(--accent-primary)" fontSize="7" textAnchor="middle">
                  {w.toFixed(2)}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Query Token: {tokens[queryIdx]}</label>
          <input type="range" min="0" max={tokens.length - 1} step="1" value={queryIdx} onChange={(e) => setQueryIdx(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        <strong>Self-attention</strong> computes how much each token attends to all others. "sat" attends strongly to "cat" (subject) and "mat" (location).
      </p>
      
      <style>{`
        .attention-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
        }
        .viz-container {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 12px;
        }
        .controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .slider-group label {
          font-size: 11px;
          color: var(--text-secondary);
          min-width: 120px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .caption {
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
