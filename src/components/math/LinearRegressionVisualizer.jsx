import React, { useState } from 'react';

export default function LinearRegressionVisualizer() {
  const [slope, setSlope] = useState(1.5);
  const [intercept, setIntercept] = useState(1);
  
  const points = [
    { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4.5 }, 
    { x: 4, y: 6 }, { x: 5, y: 8 }, { x: 6, y: 10 }
  ];
  
  return (
    <div className="linreg-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 140" width="100%" height="160">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            ŷ = {slope.toFixed(1)}x + {intercept.toFixed(1)}
          </text>
          
          {/* Grid */}
          <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
            {[...Array(9)].map((_, i) => <line key={`v${i}`} x1={i * 25} y1="20" x2={i * 25} y2="140" />)}
            {[...Array(5)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 30 + 20} x2="200" y2={i * 30 + 20} />)}
          </g>
          
          {/* Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x * 30} cy={140 - p.y * 10} r="4" fill="var(--accent-secondary)" />
          ))}
          
          {/* Regression Line */}
          <line 
            x1="0" y1={140 - intercept * 10} 
            x2="200" y2={140 - (slope * 6.67 + intercept) * 10}
            stroke="var(--accent-primary)" strokeWidth="2"
            style={{ transition: 'all 0.3s' }}
          />
          
          <text x="100" y="132" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">
            x (feature)
          </text>
          <text x="10" y="80" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" transform="rotate(-90, 10, 80)">
            ŷ (prediction)
          </text>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Slope (w): {slope.toFixed(1)}</label>
          <input type="range" min="0" max="3" step="0.1" value={slope} onChange={(e) => setSlope(Number(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Intercept (b): {intercept.toFixed(1)}</label>
          <input type="range" min="0" max="5" step="0.1" value={intercept} onChange={(e) => setIntercept(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        Linear regression finds the best line (w·x + b) that minimizes MSE. Slope controls steepness, intercept shifts the line up/down.
      </p>
      
      <style>{`
        .linreg-visualizer {
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
          min-width: 130px;
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
