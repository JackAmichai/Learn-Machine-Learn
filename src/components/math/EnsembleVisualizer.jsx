import React, { useState } from 'react';

export default function EnsembleVisualizer() {
  const [method, setMethod] = useState('bagging');
  
  const methods = {
    bagging: { name: 'Bagging', desc: 'Bootstrap Aggregating. Train independent models on different data subsets, vote.', example: 'Random Forest' },
    boosting: { name: 'Boosting', desc: 'Sequential models where each corrects previous errors. More weight on hard examples.', example: 'AdaBoost, XGBoost' },
    stacking: { name: 'Stacking', desc: 'Stack multiple models, use another model (meta-learner) to combine predictions.', example: 'Model averaging' }
  };
  
  return (
    <div className="ensemble-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 100" width="100%" height="120">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Ensemble Methods
          </text>
          
          {/* Model boxes */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={20 + i * 55} y="35" width="45" height="30" rx="4" 
                    fill={method === 'stacking' && i === 2 ? 'var(--accent-primary)' : 'var(--bg-secondary)'} 
                    stroke="var(--glass-border)" />
              <text x={42.5 + i * 55} y="50" fill="var(--text-primary)" fontSize="8" textAnchor="middle" fontWeight="bold">Model {i + 1}</text>
              <text x={42.5 + i * 55} y="60" fill="var(--text-secondary)" fontSize="6" textAnchor="middle">
                {method === 'boosting' ? `Learner ${i + 1}` : `Tree ${i + 1}`}
              </text>
              
              {i < 2 && method !== 'stacking' && (
                <line x1={65 + i * 55} y1="50" x2={78 + i * 55} y2="50" 
                      stroke="var(--accent-secondary)" strokeWidth="1.5" markerEnd="url(#arrowENS)" />
              )}
            </g>
          ))}
          
          {/* Combining arrow for stacking */}
          {method === 'stacking' && (
            <>
              <line x1="80" y1="50" x2="110" y2="50" stroke="var(--glass-border)" strokeWidth="1.5" />
              <line x1="145" y1="50" x2="175" y2="50" stroke="var(--glass-border)" strokeWidth="1.5" />
              <polygon points="110,45 115,50 110,55" fill="var(--glass-border)" />
              <polygon points="175,45 180,50 175,55" fill="var(--glass-border)" />
            </>
          )}
          
          {/* Output */}
          <circle cx="100" cy="80" r="12" fill="var(--accent-primary)" />
          <text x="100" y="84" fill="var(--bg-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">Vote</text>
        </svg>
      </div>
      
      <div className="selector">
        {Object.keys(methods).map(k => (
          <button key={k} className={method === k ? 'active' : ''} onClick={() => setMethod(k)}>
            {methods[k].name}
          </button>
        ))}
      </div>
      
      <p className="desc">{methods[method].desc}</p>
      <p className="example"><strong>Example:</strong> {methods[method].example}</p>
      
      <style>{`
        .ensemble-visualizer {
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
        .selector {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .selector button {
          padding: 6px 10px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          font-size: 10px;
          cursor: pointer;
        }
        .selector button.active {
          background: var(--accent-primary);
          color: var(--bg-primary);
        }
        .desc {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 6px;
        }
        .example {
          font-size: 10px;
          color: var(--accent-primary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
