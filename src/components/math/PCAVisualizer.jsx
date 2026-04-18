import React, { useState, useEffect } from 'react';

export default function PCAVisualizer({ values = {} }) {
  const [component1, setComponent1] = useState(values.lambda1 !== undefined ? values.lambda1 : 3.5);
  const [component2, setComponent2] = useState(values.lambda2 !== undefined ? values.lambda2 : 1.2);
  const [component3, setComponent3] = useState(values.lambda3 !== undefined ? values.lambda3 : 0.4);
  
  // Sync with external values if they change
  useEffect(() => {
    if (values.lambda1 !== undefined) setTimeout(() => setComponent1(values.lambda1), 0);
    if (values.lambda2 !== undefined) setTimeout(() => setComponent2(values.lambda2), 0);
    if (values.lambda3 !== undefined) setTimeout(() => setComponent3(values.lambda3), 0);
  }, [values.lambda1, values.lambda2, values.lambda3]);

  const total = component1 + component2 + component3;
  const p1 = (component1 / total * 100).toFixed(1);
  const p2 = (component2 / total * 100).toFixed(1);
  const p3 = (component3 / total * 100).toFixed(1);
  
  const maxVar = Math.max(component1, component2, component3);
  const scale = (v) => (v / maxVar) * 120;
  
  return (
    <div className="pca-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 160" width="100%" height="180">
          <defs>
            <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
          
          <text x="100" y="15" fill="var(--text-primary)" fontSize="12" textAnchor="middle" fontWeight="bold">
            Principal Components
          </text>
          
          {/* PC1 */}
          <rect x="25" y={140 - scale(component1)} width="35" height={scale(component1)} 
                fill="url(#barGrad)" rx="3" style={{ transition: 'all 0.3s' }} />
          <text x="42.5" y="155" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">PC1</text>
          <text x="42.5" y={130 - scale(component1)} fill="var(--accent-primary)" fontSize="10" textAnchor="middle">{p1}%</text>
          
          {/* PC2 */}
          <rect x="82" y={140 - scale(component2)} width="35" height={scale(component2)} 
                fill="url(#barGrad)" rx="3" style={{ transition: 'all 0.3s' }} />
          <text x="99.5" y="155" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">PC2</text>
          <text x="99.5" y={130 - scale(component2)} fill="var(--accent-primary)" fontSize="10" textAnchor="middle">{p2}%</text>
          
          {/* PC3 */}
          <rect x="139" y={140 - scale(component3)} width="35" height={scale(component3)} 
                fill="url(#barGrad)" rx="3" style={{ transition: 'all 0.3s' }} />
          <text x="156.5" y="155" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">PC3</text>
          <text x="156.5" y={130 - scale(component3)} fill="var(--accent-primary)" fontSize="10" textAnchor="middle">{p3}%</text>
          
          {/* Cumulative line */}
          <line x1="20" y1="145" x2="185" y2="145" stroke="var(--glass-border)" strokeWidth="1" />
          <text x="100" y="148" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Variance Explained</text>
        </svg>
      </div>
      
      {values.lambda1 === undefined && (
        <div className="controls">
          <div className="slider-group">
            <label>PC1 Variance: {component1}</label>
            <input type="range" min="1" max="100" value={component1} onChange={(e) => setComponent1(Number(e.target.value))} />
          </div>
          <div className="slider-group">
            <label>PC2 Variance: {component2}</label>
            <input type="range" min="1" max="100" value={component2} onChange={(e) => setComponent2(Number(e.target.value))} />
          </div>
          <div className="slider-group">
            <label>PC3 Variance: {component3}</label>
            <input type="range" min="1" max="100" value={component3} onChange={(e) => setComponent3(Number(e.target.value))} />
          </div>
        </div>
      )}
      
      <p className="caption">
        PCA finds orthogonal axes (principal components) that capture the most variance. The first few components usually capture 90%+ of information.
      </p>
      
      <style>{`
        .pca-visualizer {
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
          min-width: 100px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .caption {
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
