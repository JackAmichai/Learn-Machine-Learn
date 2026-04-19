import React, { useState } from 'react';

export default function EmbeddingVisualizer() {
  const [show3D, setShow3D] = useState(false);
  const [vectors] = useState([
    { name: 'King', vec: [0.8, 0.2, 0.1, 0.3] },
    { name: 'Queen', vec: [0.7, 0.9, 0.2, 0.1] },
    { name: 'Man', vec: [0.9, 0.1, 0.4, 0.2] },
    { name: 'Woman', vec: [0.8, 0.8, 0.5, 0.3] },
  ]);

  const calculateCosine = (v1, v2) => {
    const dot = v1.reduce((sum, a, i) => sum + a * v2[i], 0);
    const mag1 = Math.sqrt(v1.reduce((sum, a) => sum + a * a, 0));
    const mag2 = Math.sqrt(v2.reduce((sum, a) => sum + a * a, 0));
    return mag1 && mag2 ? dot / (mag1 * mag2) : 0;
  };

  // eslint-disable-next-line no-unused-vars
  const analogies = [
    { a: 'King', b: 'Queen', c: 'Man', expected: 'Woman' },
  ];

  return (
    <div className="embedding-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 180" width="100%" height="200">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Word Embeddings: Semantic Relationships
          </text>
          
          <rect x="20" y="30" width="240" height="100" fill="rgba(0,0,0,0.3)" rx="4" />
          
          {vectors.map((v, i) => {
            const x = 40 + (i % 4) * 60;
            const y = 60 + Math.floor(i / 4) * 50;
            return (
              <g key={i}>
                <rect x={x} y={y} width="50" height="35" fill={`hsla(${i * 60}, 70%, 50%, 0.2)`} stroke={`hsl(${i * 60}, 70%, 60%)`} rx="4" />
                <text x={x + 25} y={y + 15} fill="var(--text-primary)" fontSize="10" textAnchor="middle">{v.name}</text>
                <text x={x + 25} y={y + 28} fill="var(--text-secondary)" fontSize="7" textAnchor="middle">
                  [{v.vec.slice(0, 2).join(', ')}...]
                </text>
              </g>
            );
          })}

          <line x1="140" y1="140" x2="180" y2="120" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow)" />
          <text x="160" y="135" fill="var(--accent-primary)" fontSize="8">King - Man + Woman ≈ Queen</text>
          
          <rect x="20" y="140" width="240" height="35" fill="rgba(0,242,255,0.1)" rx="4" />
          <text x="140" y="155" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">
            King↔Queen: {calculateCosine(vectors[0].vec, vectors[1].vec).toFixed(2)}
          </text>
          <text x="140" y="168" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">
            Man↔Woman: {calculateCosine(vectors[2].vec, vectors[3].vec).toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="controls">
        <button 
          className={`toggle-btn ${show3D ? 'active' : ''}`}
          onClick={() => setShow3D(!show3D)}
        >
          {show3D ? 'Show 2D' : 'Show 3D Projection'}
        </button>
      </div>

      <div className="analogy-box">
        <h4>Word Analogy: King - Man + Woman ≈ ?</h4>
        <div className="analogy-visual">
          <span className="word king">King</span>
          <span className="op">-</span>
          <span className="word man">Man</span>
          <span className="op">+</span>
          <span className="word woman">Woman</span>
          <span className="op">=</span>
          <span className="word queen">Queen</span>
        </div>
        <p className="analogy-explain">
          Embeddings capture semantic relationships as vector arithmetic!
        </p>
      </div>

      <div className="similarity-matrix">
        <h4>Cosine Similarity Matrix</h4>
        <div className="matrix">
          {vectors.map((v1, i) => (
            <div key={i} className="matrix-row">
              {vectors.map((v2, j) => {
                const sim = calculateCosine(v1.vec, v2.vec);
                return (
                  <div 
                    key={j} 
                    className="matrix-cell"
                    style={{ 
                      background: `rgba(${i === j ? 0 : 100}, 255, ${i === j ? 157 : 100}, ${sim})`,
                      color: sim > 0.5 ? '#000' : '#fff'
                    }}
                  >
                    {sim.toFixed(2)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="matrix-labels">
          {vectors.map((v, i) => (
            <span key={i}>{v.name}</span>
          ))}
        </div>
      </div>

      <div className="info-box">
        <h4>Embedding Applications</h4>
        <ul>
          <li><strong>Semantic Search:</strong> Find similar documents by embedding distance</li>
          <li><strong>Recommendations:</strong> Match user/item embeddings</li>
          <li><strong>RAG:</strong> Retrieve relevant context using embedding similarity</li>
        </ul>
      </div>

      <style>{`
        .embedding-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
        }
        .viz-container {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 12px;
        }
        .controls {
          margin-bottom: 12px;
        }
        .toggle-btn {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
        }
        .toggle-btn.active {
          background: var(--accent-primary);
          color: #000;
          border-color: var(--accent-primary);
        }
        .analogy-box {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .analogy-box h4 {
          margin: 0 0 10px 0;
          font-size: 11px;
          color: var(--accent-primary);
        }
        .analogy-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .word {
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 12px;
        }
        .king { background: rgba(255,107,107,0.3); border: 1px solid #ff6b6b; }
        .queen { background: rgba(255,107,107,0.3); border: 1px solid #ff6b6b; }
        .man { background: rgba(107,196,196,0.3); border: 1px solid #4ecdc4; }
        .woman { background: rgba(107,196,196,0.3); border: 1px solid #4ecdc4; }
        .op { color: var(--text-secondary); font-size: 14px; }
        .analogy-explain {
          margin: 0;
          font-size: 10px;
          color: var(--text-secondary);
          text-align: center;
        }
        .similarity-matrix {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .similarity-matrix h4 {
          margin: 0 0 8px 0;
          font-size: 11px;
          color: var(--accent-primary);
        }
        .matrix {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .matrix-row {
          display: flex;
          gap: 2px;
        }
        .matrix-cell {
          width: 40px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          border-radius: 2px;
        }
        .matrix-labels {
          display: flex;
          gap: 2px;
          margin-top: 4px;
          padding-left: 0;
        }
        .matrix-labels span {
          width: 40px;
          font-size: 8px;
          color: var(--text-secondary);
          text-align: center;
        }
        .info-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 10px;
        }
        .info-box h4 {
          margin: 0 0 6px 0;
          font-size: 11px;
          color: var(--accent-primary);
        }
        .info-box ul {
          margin: 0;
          padding-left: 14px;
          font-size: 10px;
          color: var(--text-secondary);
        }
        .info-box li {
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
}
