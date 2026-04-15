import React, { useState } from 'react';

export default function LogisticRegressionVisualizer() {
  const [z, setZ] = useState(0);
  
  const sigmoid = 1 / (1 + Math.exp(-z));
  const prob = (sigmoid * 100).toFixed(1);
  
  return (
    <div className="logreg-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 150" width="100%" height="170">
          <defs>
            <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5555" />
              <stop offset="50%" stopColor="#ffaa00" />
              <stop offset="100%" stopColor="#55ff55" />
            </linearGradient>
          </defs>
          
          <text x="100" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Sigmoid Function
          </text>
          
          {/* Sigmoid curve */}
          <path 
            d="M 10,120 Q 100,120 190,30" 
            fill="none" 
            stroke="url(#sigGrad)" 
            strokeWidth="3"
          />
          
          {/* Current point */}
          <circle cx={100 + z * 8} cy={130 - sigmoid * 100} r="8" fill="var(--accent-primary)" stroke="#fff" strokeWidth="2" />
          
          {/* Axes */}
          <line x1="20" y1="130" x2="190" y2="130" stroke="var(--glass-border)" strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="140" stroke="var(--glass-border)" strokeWidth="1" />
          
          {/* Labels */}
          <text x="105" y="145" fill="var(--text-secondary)" fontSize="9" textAnchor="start">z (logit)</text>
          <text x="15" y="75" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" transform="rotate(-90, 15, 75)">σ(z)</text>
          
          {/* Values */}
          <text x="100" y="12" fill="var(--accent-primary)" fontSize="14" textAnchor="middle" fontWeight="bold">
            P(class=1) = {prob}%
          </text>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>z = w·x + b: {z}</label>
          <input type="range" min="-6" max="6" step="0.1" value={z} onChange={(e) => setZ(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        The <strong>sigmoid</strong> squashes any real number to (0, 1). At z=0, P=50%. Large positive z → P≈100%, large negative z → P≈0%.
      </p>
      
      <style>{`
        .logreg-visualizer {
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
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
