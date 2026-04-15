import React, { useState } from 'react';

export default function DeepQNVisualizer() {
  const [epsilon, setEpsilon] = useState(0.1);
  const [step, setStep] = useState(50);
  
  const qValue = step / 100 * 10;
  const explore = epsilon > Math.random() ? 'Explore' : 'Exploit';
  
  return (
    <div className="dqn-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 100" width="100%" height="120">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Deep Q-Network (DQN)
          </text>
          
          {/* Neural Network */}
          <rect x="60" y="30" width="80" height="40" rx="6" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="2" />
          <text x="100" y="50" fill="var(--accent-primary)" fontSize="8" textAnchor="middle" fontWeight="bold">Deep Q-Network</text>
          <text x="100" y="62" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">Q(s, a) ≈ Neural Net</text>
          
          {/* Input */}
          <rect x="20" y="40" width="30" height="20" rx="3" fill="var(--accent-secondary)" />
          <text x="35" y="53" fill="var(--bg-primary)" fontSize="7" textAnchor="middle">State s</text>
          <line x1="50" y1="50" x2="58" y2="50" stroke="var(--accent-secondary)" strokeWidth="1.5" markerEnd="url(#arrowDQN)" />
          
          {/* Output */}
          <line x1="142" y1="50" x2="150" y2="50" stroke="var(--accent-primary)" strokeWidth="1.5" markerEnd="url(#arrowDQN)" />
          <rect x="150" y="40" width="30" height="20" rx="3" fill="var(--accent-primary)" />
          <text x="165" y="53" fill="var(--bg-primary)" fontSize="7" textAnchor="middle">Q(s,a)</text>
          
          {/* Epsilon greedy */}
          <rect x="30" y="80" width="140" height="8" rx="4" fill="var(--bg-secondary)" />
          <rect x="30" y="80" width={140 * (1 - epsilon)} height="8" rx="4" fill="var(--accent-secondary)" />
          <text x="100" y="98" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">
            ε-greedy: {(epsilon * 100).toFixed(0)}% explore
          </text>
          
          <defs>
            <marker id="arrowDQN" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--accent-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Epsilon (ε): {epsilon.toFixed(2)}</label>
          <input type="range" min="0" max="1" step="0.05" value={epsilon} onChange={(e) => setEpsilon(Number(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Training Step: {step}</label>
          <input type="range" min="0" max="100" step="1" value={step} onChange={(e) => setStep(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        <strong>DQN</strong> uses a neural network to approximate Q(s, a). Uses ε-greedy for exploration: random actions with probability ε, greedy otherwise.
      </p>
      
      <style>{`
        .dqn-visualizer {
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
