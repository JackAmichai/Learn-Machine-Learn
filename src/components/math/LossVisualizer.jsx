import React, { useState } from 'react';

export default function LossVisualizer() {
  const [predicted, setPredicted] = useState(3);
  const [actual, setActual] = useState(5);
  
  const mse = Math.pow(predicted - actual, 2);
  
  return (
    <div className="loss-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 140" width="100%" height="160">
          <defs>
            <linearGradient id="lossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5555" />
              <stop offset="50%" stopColor="#ffaa00" />
              <stop offset="100%" stopColor="#55ff55" />
            </linearGradient>
          </defs>
          
          <text x="100" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Loss Function: MSE
          </text>
          
          {/* Actual point */}
          <circle cx={100 + actual * 10 - 50} cy="80" r="8" fill="#55ff55" stroke="#fff" strokeWidth="2" />
          <text x={100 + actual * 10 - 50} y="65" fill="#55ff55" fontSize="9" textAnchor="middle">Actual: {actual}</text>
          
          {/* Predicted point */}
          <circle cx={100 + predicted * 10 - 50} cy="80" r="8" fill="#ff5555" stroke="#fff" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
          <text x={100 + predicted * 10 - 50} y="100" fill="#ff5555" fontSize="9" textAnchor="middle">Pred: {predicted}</text>
          
          {/* Error line */}
          <line 
            x1={100 + predicted * 10 - 50} y1="80"
            x2={100 + actual * 10 - 50} y2="80"
            stroke="url(#lossGrad)" strokeWidth="3"
            style={{ transition: 'all 0.3s' }}
          />
          
          {/* Loss value */}
          <text x="100" y="125" fill="var(--accent-primary)" fontSize="16" textAnchor="middle" fontWeight="bold">
            Loss = {mse.toFixed(2)}
          </text>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Predicted: {predicted}</label>
          <input type="range" min="0" max="10" value={predicted} onChange={(e) => setPredicted(Number(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Actual: {actual}</label>
          <input type="range" min="0" max="10" value={actual} onChange={(e) => setActual(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        <strong>MSE</strong> = (Predicted - Actual)² penalizes large errors heavily. <strong>MAE</strong> = |Predicted - Actual| is more robust to outliers.
      </p>
      
      <style>{`
        .loss-visualizer {
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
          min-width: 70px;
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
