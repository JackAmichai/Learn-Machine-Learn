import React, { useState } from 'react';

export default function OptimizerVisualizer() {
  const [optimizer, setOptimizer] = useState('sgd');
  const [learningRate, setLearningRate] = useState((0.1));
  
  const optimizers = {
    sgd: { name: 'SGD', desc: 'Basic gradient descent. Simple but can get stuck in local minima.', color: '#ff5555' },
    momentum: { name: 'Momentum', desc: 'Accumulates velocity. Helps escape local minima and reduces oscillations.', color: '#ffaa00' },
    adam: { name: 'Adam', desc: 'Adaptive learning rates. Combines momentum with RMSProp. Best default choice.', color: '#55ff55' },
    rmsprop: { name: 'RMSProp', desc: 'Divides learning rate by running average of gradients. Good for recurrent nets.', color: '#55aaff' }
  };
  
  const paths = {
    sgd: [[0, 80], [30, 60], [60, 45], [90, 35], [120, 28], [150, 22]],
    momentum: [[0, 80], [30, 55], [60, 35], [90, 20], [120, 12], [150, 5]],
    adam: [[0, 80], [30, 45], [60, 22], [90, 10], [120, 4], [150, 2]],
    rmsprop: [[0, 80], [30, 50], [60, 30], [90, 18], [120, 10], [150, 6]]
  };
  
  return (
    <div className="optimizer-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 120" width="100%" height="140">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Loss over Training Steps
          </text>
          
          {/* Loss curve */}
          <path 
            d={`M ${paths[optimizer].map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')}`}
            fill="none"
            stroke={optimizers[optimizer].color}
            strokeWidth="3"
            style={{ transition: 'all 0.3s' }}
          />
          
          {/* Points */}
          {paths[optimizer].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={optimizers[optimizer].color} />
          ))}
          
          {/* Axes */}
          <line x1="20" y1="10" x2="20" y2="110" stroke="var(--glass-border)" strokeWidth="1" />
          <line x1="20" y1="110" x2="190" y2="110" stroke="var(--glass-border)" strokeWidth="1" />
          
          <text x="20" y="8" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Loss</text>
          <text x="195" y="115" fill="var(--text-secondary)" fontSize="8" textAnchor="end">Steps</text>
        </svg>
      </div>
      
      <div className="selector">
        {Object.keys(optimizers).map(k => (
          <button 
            key={k} 
            className={optimizer === k ? 'active' : ''}
            onClick={() => setOptimizer(k)}
            style={{ borderColor: optimizer === k ? optimizers[k].color : 'var(--glass-border)' }}
          >
            {optimizers[k].name}
          </button>
        ))}
      </div>
      
      <p className="desc">{optimizers[optimizer].desc}</p>
      
      <div className="controls">
        <div className="slider-group">
          <label>LR: {learningRate.toFixed(2)}</label>
          <input type="range" min="0.01" max="0.5" step="0.01" value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} />
        </div>
      </div>
      
      <style>{`
        .optimizer-visualizer {
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
          padding: 6px 12px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .selector button.active {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .desc {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 12px;
        }
        .controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .slider-group label {
          font-size: 11px;
          color: var(--text-secondary);
          min-width: 50px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
}
