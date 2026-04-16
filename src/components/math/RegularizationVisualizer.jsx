import React, { useState } from 'react';

export default function RegularizationVisualizer() {
  const [regType, setRegType] = useState('l2');
  const [lambda, setLambda] = useState(0.1);
  const [weights, setWeights] = useState([1.5, -0.8, 2.1, -1.3, 0.6]);

  const calculateL1Penalty = () => {
    return weights.reduce((sum, w) => sum + Math.abs(w), 0) * lambda;
  };

  const calculateL2Penalty = () => {
    return weights.reduce((sum, w) => sum + w * w, 0) * lambda * 0.5;
  };

  const penalties = {
    l1: calculateL1Penalty(),
    l2: calculateL2Penalty()
  };

  const updateWeight = (idx, value) => {
    const newWeights = [...weights];
    newWeights[idx] = parseFloat(value);
    setWeights(newWeights);
  };

  return (
    <div className="regularization-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 160" width="100%" height="180">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Regularization Effect on Weights
          </text>
          
          <text x="10" y="40" fill="var(--text-secondary)" fontSize="9">Weight</text>
          {weights.map((w, i) => (
            <g key={i}>
              <text x="10" y={60 + i * 20} fill="var(--text-secondary)" fontSize="8">w{i+1}</text>
              <rect x="30" y={50 + i * 20} width={Math.min(Math.abs(w) * 20, 120)} height="12" 
                fill={w >= 0 ? '#55ff55' : '#ff5555'} rx="2" />
              <text x={40 + Math.min(Math.abs(w) * 20, 120)} y={60 + i * 20} fill="var(--text-primary)" fontSize="8">
                {w.toFixed(2)}
              </text>
            </g>
          ))}

          <rect x="170" y="40" width="100" height="100" fill="rgba(0,242,255,0.1)" rx="4" />
          <text x="220" y="55" fill="var(--accent-primary)" fontSize="9" textAnchor="middle">Penalty</text>
          <text x="220" y="80" fill="var(--text-primary)" fontSize="14" textAnchor="middle" fontWeight="bold">
            {penalties[regType].toFixed(3)}
          </text>
          <text x="220" y="100" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">
            {regType === 'l1' ? 'L1 (sparse)' : 'L2 (small)'}
          </text>
          <text x="220" y="130" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">
            λ={lambda.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="selector">
        <button 
          className={regType === 'l1' ? 'active' : ''}
          onClick={() => setRegType('l1')}
        >
          L1 (Lasso)
        </button>
        <button 
          className={regType === 'l2' ? 'active' : ''}
          onClick={() => setRegType('l2')}
        >
          L2 (Ridge)
        </button>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>λ (lambda): {lambda.toFixed(2)}</label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={lambda} 
            onChange={(e) => setLambda(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="weights-grid">
        {weights.map((w, i) => (
          <div key={i} className="weight-item">
            <label>w{i+1}: {w.toFixed(2)}</label>
            <input 
              type="range" 
              min="-3" 
              max="3" 
              step="0.1" 
              value={w} 
              onChange={(e) => updateWeight(i, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="insights">
        {regType === 'l1' ? (
          <p><strong>L1 (Lasso):</strong> Drives weights to exactly zero → sparse solutions. Good for feature selection.</p>
        ) : (
          <p><strong>L2 (Ridge):</strong> Shrinks weights toward zero but rarely to zero. Better for correlated features.</p>
        )}
      </div>

      <style>{`
        .regularization-visualizer {
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
        .selector {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .selector button {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .selector button.active {
          background: var(--accent-primary);
          color: #000;
          border-color: var(--accent-primary);
        }
        .controls {
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
        .weights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 8px;
          margin-bottom: 12px;
        }
        .weight-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .weight-item label {
          font-size: 10px;
          color: var(--text-secondary);
        }
        .weight-item input[type="range"] {
          width: 100%;
          accent-color: var(--accent-secondary);
        }
        .insights {
          font-size: 11px;
          color: var(--text-secondary);
          padding: 10px;
          background: rgba(0,0,0,0.2);
          border-radius: 6px;
        }
        .insights p {
          margin: 0;
        }
        .insights strong {
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
}
