import React, { useState, useEffect } from 'react';

export default function ActivationVisualizer({ values = {} }) {
  const [func, setFunc] = useState('sigmoid');
  const [x, setX] = useState(0);
  
  // Sync with external values if they change
  useEffect(() => {
    setTimeout(() => {
      if (values.x !== undefined) setX(values.x);
      if (values.input !== undefined) setX(values.input);

      // Auto-switch function based on common keywords
      if (values.alpha !== undefined) setFunc('leakyrelu');
    }, 0);
  }, [values.x, values.input, values.alpha]);

  const functions = {
    sigmoid: { 
      f: (x) => 1 / (1 + Math.exp(-x)),
      range: '0 to 1',
      desc: 'Squashes to (0,1). Used in output layer for probability.'
    },
    relu: { 
      f: (x) => Math.max(0, x),
      range: '0 to ∞',
      desc: 'Returns 0 for negative, identity for positive. Default for hidden layers.'
    },
    tanh: { 
      f: (x) => Math.tanh(x),
      range: '-1 to 1',
      desc: 'Zero-centered. Often better than sigmoid for hidden layers.'
    },
    leakyrelu: { 
      f: (x) => x > 0 ? x : 0.1 * x,
      range: '-∞ to ∞',
      desc: 'Small slope for negative inputs. Prevents "dying ReLU" problem.'
    }
  };
  
  const y = functions[func].f(x);
  
  return (
    <div className="activation-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 130" width="100%" height="150">
          <defs>
            <linearGradient id="actGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5555" />
              <stop offset="100%" stopColor="#55ff55" />
            </linearGradient>
          </defs>
          
          <text x="100" y="12" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            {func.toUpperCase()} Activation
          </text>
          
          {/* Axes */}
          <line x1="20" y1="65" x2="190" y2="65" stroke="var(--glass-border)" strokeWidth="1" />
          <line x1="100" y1="10" x2="100" y2="120" stroke="var(--glass-border)" strokeWidth="1" />
          
          {/* Function curves */}
          <path d="M 20,65 Q 100,65 190,10" fill="none" stroke="var(--glass-border)" strokeWidth="1" strokeDasharray="3" opacity="0.5" />
          <path d="M 20,115 L 100,65 L 190,15" fill="none" stroke="var(--glass-border)" strokeWidth="1" strokeDasharray="3" opacity="0.5" />
          <path d="M 20,115 L 100,65 L 190,65" fill="none" stroke="var(--glass-border)" strokeWidth="1" strokeDasharray="3" opacity="0.5" />
          
          {/* Current point */}
          <circle cx={100 + x * 10} cy={65 - y * 50} r={values.x !== undefined ? 10 : 8} fill="var(--accent-primary)" stroke="#fff" strokeWidth="2" />
          
          {/* Value */}
          <text x="100" y="25" fill="var(--accent-primary)" fontSize="12" textAnchor="middle" fontWeight="bold">
            f({x.toFixed(1)}) = {y.toFixed(3)}
          </text>
          
          <text x="195" y="68" fill="var(--text-secondary)" fontSize="8" textAnchor="end">x</text>
          <text x="95" y="15" fill="var(--text-secondary)" fontSize="8" textAnchor="end">f(x)</text>
        </svg>
      </div>
      
      <div className="selector">
        {Object.keys(functions).map(f => (
          <button 
            key={f} 
            className={func === f ? 'active' : ''}
            onClick={() => setFunc(f)}
          >
            {f}
          </button>
        ))}
      </div>
      
      {values.x === undefined && values.input === undefined && (
        <div className="controls">
          <div className="slider-group">
            <label>x: {x}</label>
            <input type="range" min="-5" max="5" step="0.1" value={x} onChange={(e) => setX(Number(e.target.value))} />
          </div>
        </div>
      )}
      
      <p className="caption">
        {functions[func].desc} <strong>Range:</strong> {functions[func].range}
      </p>
      
      <style>{`
        .activation-visualizer {
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
          transition: all 0.2s;
        }
        .selector button.active {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-color: var(--accent-primary);
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
          min-width: 40px;
        }
        .slider-group input[type="range"] {
          flex: 1;
          accent-color: var(--accent-primary);
        }
        .caption {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
