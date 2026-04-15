import React, { useState } from 'react';

export default function MDPVisualizer() {
  const [state, setState] = useState('s0');
  
  const states = {
    s0: { name: 'Start', actions: ['→'], next: 's1', reward: 0 },
    s1: { name: 'State 1', actions: ['↑', '→'], next: ['s2', 's1'], reward: 0 },
    s2: { name: 'Goal', actions: [], next: null, reward: 100 }
  };
  
  return (
    <div className="mdp-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 90" width="100%" height="110">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Markov Decision Process (MDP)
          </text>
          
          {/* States */}
          {Object.entries(states).map(([key, s], i) => (
            <g key={key}>
              <circle cx={40 + i * 60} cy="50" r="20" 
                      fill={state === key ? 'var(--accent-primary)' : 'var(--bg-secondary)'} 
                      stroke={state === key ? '#fff' : 'var(--glass-border)'} strokeWidth="2" />
              <text x={40 + i * 60} y="45" fill={state === key ? 'var(--bg-primary)' : 'var(--text-primary)'} 
                    fontSize="8" textAnchor="middle" fontWeight="bold">{key}</text>
              <text x={40 + i * 60} y="57" fill={state === key ? 'var(--bg-primary)' : 'var(--text-secondary)'} 
                    fontSize="7" textAnchor="middle">{s.name}</text>
              
              {s.next && (
                <line x1={60 + i * 60} y1="50" x2={80 + i * 60} y2="50" 
                      stroke="var(--accent-secondary)" strokeWidth="2" markerEnd="url(#arrowMDP)" />
              )}
            </g>
          ))}
          
          {/* State info */}
          {state !== 's2' && (
            <text x="100" y="85" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">
              Actions: {states[state].actions.join(', ')} | Reward: {states[state].reward}
            </text>
          )}
          
          <defs>
            <marker id="arrowMDP" markerWidth="5" height="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--accent-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Current State: {state}</label>
          <input type="range" min="0" max="2" step="1" value={parseInt(state.slice(1))} 
                 onChange={(e) => setState('s' + e.target.value)} />
        </div>
      </div>
      
      <p className="caption">
        <strong>MDP</strong> has states, actions, transition probabilities, and rewards. The agent learns a policy π(s) → a to maximize expected cumulative reward.
      </p>
      
      <style>{`
        .mdp-visualizer {
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
