import React, { useState } from 'react';

export default function RLVisualizer() {
  const [episode, setEpisode] = useState(0);
  const [epsilon, setEpsilon] = useState(1.0);
  const [steps, setSteps] = useState(0);
  
  const explorationRate = Math.max(0.01, epsilon * Math.exp(-episode / 100));
  
  const generatePath = () => {
    const points = [];
    let pos = { x: 0, y: 0 };
    let seed = episode * 1000;
    const pseudoRandom = () => {
      let x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i <= steps; i++) {
      points.push({ ...pos });
      const action = pseudoRandom() < explorationRate ? 'explore' : 'exploit';
      if (action === 'explore') {
        pos = {
          x: pos.x + (pseudoRandom() - 0.5) * 20,
          y: pos.y + (pseudoRandom() - 0.5) * 20
        };
      } else {
        pos = {
          x: pos.x + (pseudoRandom() - 0.3) * 10,
          y: pos.y - 5
        };
      }
    }
    return points;
  };

  const path = generatePath();

  return (
    <div className="rl-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 180" width="100%" height="200">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            Reinforcement Learning: Exploration vs Exploitation
          </text>
          
          <rect x="20" y="30" width="180" height="120" fill="rgba(0,0,0,0.3)" rx="4" />
          
          <circle cx="100" cy="140" r="8" fill="#00ff9d" />
          <text x="100" y="158" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Goal</text>
          
          <path 
            d={`M ${path.map((p, i) => `${i === 0 ? '' : 'L'}${p.x + 110},${p.y + 50}`).join(' ')}`}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            strokeDasharray={explorationRate > 0.3 ? '4,2' : 'none'}
          />
          
          {path.map((p, i) => (
            <circle key={i} cx={p.x + 110} cy={p.y + 50} r="3" fill={i === 0 ? '#ff6b6b' : 'var(--accent-primary)'} />
          ))}

          <rect x="210" y="30" width="55" height="120" fill="rgba(0,242,255,0.1)" rx="4" />
          <text x="237" y="50" fill="var(--accent-primary)" fontSize="9" textAnchor="middle">ε-Greedy</text>
          <text x="237" y="70" fill="var(--text-primary)" fontSize="16" textAnchor="middle" fontWeight="bold">{(explorationRate * 100).toFixed(0)}%</text>
          <text x="237" y="85" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">Explore</text>
          <text x="237" y="100" fill="var(--text-primary)" fontSize="16" textAnchor="middle" fontWeight="bold">{(100 - explorationRate * 100).toFixed(0)}%</text>
          <text x="237" y="115" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">Exploit</text>
          
          <rect x="20" y="155" width="245" height="20" fill="rgba(0,0,0,0.2)" rx="4" />
          <text x="140" y="168" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">
            Episode: {episode} | Steps: {steps} | ε = {epsilon.toFixed(2)}
          </text>
        </svg>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>Episode: {episode}</label>
          <input type="range" min="0" max="500" value={episode} onChange={(e) => setEpisode(parseInt(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Epsilon (ε): {epsilon.toFixed(2)}</label>
          <input type="range" min="0.1" max="1" step="0.1" value={epsilon} onChange={(e) => setEpsilon(parseFloat(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Steps: {steps}</label>
          <input type="range" min="1" max="50" value={steps} onChange={(e) => setSteps(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span>Exploration</span>
          <strong style={{ color: explorationRate > 0.5 ? '#ffd93d' : '#4ecdc4' }}>
            {(explorationRate * 100).toFixed(0)}%
          </strong>
        </div>
        <div className="stat">
          <span>Exploitation</span>
          <strong style={{ color: explorationRate < 0.5 ? '#00ff9d' : '#ff6b6b' }}>
            {((1 - explorationRate) * 100).toFixed(0)}%
          </strong>
        </div>
        <div className="stat">
          <span>Balance</span>
          <strong style={{ color: Math.abs(explorationRate - 0.3) < 0.2 ? '#00ff9d' : '#ffd93d' }}>
            {explorationRate > 0.3 ? 'Learning' : 'Optimizing'}
          </strong>
        </div>
      </div>

      <div className="info-box">
        <h4>The Exploration-Exploitation Dilemma</h4>
        <ul>
          <li><strong>Exploration:</strong> Try new actions to discover better strategies</li>
          <li><strong>Exploitation:</strong> Use known best actions to maximize reward</li>
          <li><strong>ε-Greedy:</strong> With probability ε, explore; otherwise exploit</li>
          <li><strong>Decay:</strong> Reduce ε over time to shift from explore to exploit</li>
        </ul>
      </div>

      <style>{`
        .rl-visualizer {
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
        .stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 12px;
        }
        .stat {
          text-align: center;
          padding: 8px 16px;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
        }
        .stat span {
          display: block;
          font-size: 9px;
          color: var(--text-secondary);
        }
        .stat strong {
          font-size: 14px;
        }
        .info-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 10px;
        }
        .info-box h4 {
          margin: 0 0 8px 0;
          font-size: 11px;
          color: var(--accent-primary);
        }
        .info-box ul {
          margin: 0;
          padding-left: 14px;
          font-size: 10px;
          color: var(--text-secondary);
        }
        .info-box li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
}
