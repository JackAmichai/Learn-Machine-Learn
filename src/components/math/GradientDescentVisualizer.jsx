import React, { useState } from 'react';

export default function GradientDescentVisualizer() {
  const [learningRate, setLearningRate] = useState(0.1);
  const [currentX, setCurrentX] = useState(-4);
  
  const func = (x) => x * x - 4;
  const derivative = (x) => 2 * x;
  const nextX = currentX - learningRate * derivative(currentX);
  
  return (
    <div className="gd-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 140" width="100%" height="160">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            f(x) = x² - 4
          </text>
          
          {/* Parabola */}
          <path 
            d={`M 0,${140 - func(-5) * 10} ${[...Array(21)].map((_, i) => {
              const x = -5 + i * 0.5;
              return `L ${(x + 5) * 20},${140 - func(x) * 10}`;
            }).join(' ')}`}
            fill="none"
            stroke="var(--accent-secondary)"
            strokeWidth="2"
            opacity="0.6"
          />
          
          {/* Current point */}
          <circle cx={(currentX + 5) * 20} cy={140 - func(currentX) * 10} r="8" fill="var(--accent-primary)" stroke="#fff" strokeWidth="2" />
          
          {/* Tangent line */}
          <line 
            x1={(currentX + 5) * 20 - 20} y1={140 - func(currentX) * 10 + derivative(currentX) * 20}
            x2={(currentX + 5) * 20 + 20} y2={140 - func(currentX) * 10 - derivative(currentX) * 20}
            stroke="var(--accent-primary)"
            strokeWidth="2"
            strokeDasharray="4"
          />
          
          {/* Arrow showing descent direction */}
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="var(--accent-primary)" />
            </marker>
          </defs>
          
          <line 
            x1={(currentX + 5) * 20} y1={140 - func(currentX) * 10}
            x2={(nextX + 5) * 20} y2={140 - func(nextX) * 10}
            stroke="var(--accent-primary)"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          
          <text x="100" y="132" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">x</text>
          <text x="8" y="70" fill="var(--text-secondary)" fontSize="8" textAnchor="middle" transform="rotate(-90, 8, 70)">f(x)</text>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Learning Rate: {learningRate.toFixed(2)}</label>
          <input type="range" min="0.01" max="0.5" step="0.01" value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Current x: {currentX.toFixed(2)}</label>
          <input type="range" min="-4.5" max="4.5" step="0.1" value={currentX} onChange={(e) => setCurrentX(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        <strong>Gradient descent</strong> moves in the direction of steepest descent (negative gradient). Learning rate controls step size — too small = slow, too large = overshoot.
      </p>
      
      <style>{`
        .gd-visualizer {
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
