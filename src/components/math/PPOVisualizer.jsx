import React, { useState } from 'react';

export default function PPOVisualizer() {
  const [clip, setClip] = useState(0.2);
  const [epoch, setEpoch] = useState(3);
  
  return (
    <div className="ppo-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 100" width="100%" height="120">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            PPO: Proximal Policy Optimization
          </text>
          
          {/* Policy network */}
          <rect x="30" y="35" width="50" height="30" rx="5" fill="var(--accent-primary)" />
          <text x="55" y="52" fill="var(--bg-primary)" fontSize="8" textAnchor="middle" fontWeight="bold">Policy</text>
          <text x="55" y="62" fill="var(--text-secondary)" fontSize="6" textAnchor="middle">π(a|s)</text>
          
          {/* Value network */}
          <rect x="120" y="35" width="50" height="30" rx="5" fill="var(--accent-secondary)" />
          <text x="145" y="52" fill="var(--bg-primary)" fontSize="8" textAnchor="middle" fontWeight="bold">Value</text>
          <text x="145" y="62" fill="var(--text-secondary)" fontSize="6" textAnchor="middle">V(s)</text>
          
          {/* Clip mechanism */}
          <rect x="70" y="30" width="60" height="40" rx="8" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4" />
          <text x="100" y="42" fill="var(--accent-primary)" fontSize="7" textAnchor="middle">Clipped Objective</text>
          <text x="100" y="55" fill="var(--text-secondary)" fontSize="6" textAnchor="middle">ε = {clip.toFixed(2)}</text>
          
          {/* Arrows */}
          <line x1="80" y1="50" x2="118" y2="50" stroke="var(--glass-border)" strokeWidth="1.5" markerEnd="url(#arrowPPO)" />
          
          {/* Update indicator */}
          <rect x="40" y="75" width="120" height="6" rx="3" fill="var(--bg-secondary)" />
          <rect x="40" y="75" width={120 * (epoch / 10)} height="6" rx="3" fill="var(--accent-primary)" />
          <text x="100" y="90" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">PPO Epochs: {epoch}</text>
          
          <defs>
            <marker id="arrowPPO" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--glass-border)" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Clip ε: {clip.toFixed(2)}</label>
          <input type="range" min="0.05" max="0.5" step="0.05" value={clip} onChange={(e) => setClip(Number(e.target.value))} />
        </div>
        <div className="slider-group">
          <label>Epochs: {epoch}</label>
          <input type="range" min="1" max="10" step="1" value={epoch} onChange={(e) => setEpoch(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        <strong>PPO</strong> clips the policy update to prevent destructive large changes. The clipped objective prevents policy from changing too much per update.
      </p>
      
      <style>{`
        .ppo-visualizer {
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
          min-width: 80px;
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
