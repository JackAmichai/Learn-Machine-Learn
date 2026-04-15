import React, { useState } from 'react';

export default function RNNVisualizer() {
  const [timestep, setTimestep] = useState(2);
  const [sequence] = useState(['The', 'cat', 'sat']);
  
  return (
    <div className="rnn-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 100" width="100%" height="120">
          <text x="100" y="12" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Recurrent Neural Network
          </text>
          
          {/* Unrolled RNN representation */}
          {sequence.map((word, i) => {
            const x = 25 + i * 55;
            return (
              <g key={i}>
                {/* Cell */}
                <rect x={x} y="35" width="40" height="40" rx="8" 
                      fill={i === timestep ? 'var(--accent-primary)' : 'var(--bg-secondary)'} 
                      stroke={i === timestep ? '#fff' : 'var(--glass-border)'} strokeWidth="2"
                      style={{ transition: 'all 0.3s' }} />
                
                {/* Word */}
                <text x={x + 20} y="55" fill={i === timestep ? 'var(--bg-primary)' : 'var(--text-primary)'} 
                      fontSize="9" textAnchor="middle" fontWeight="bold">
                  {word}
                </text>
                
                {/* Hidden state output */}
                <text x={x + 20} y="32" fill={i === timestep ? 'var(--bg-primary)' : 'var(--text-secondary)'} 
                      fontSize="7" textAnchor="middle">
                  h{i}
                </text>
                
                {/* Arrow to next */}
                {i < sequence.length - 1 && (
                  <line x1={x + 40} y1="55" x2={x + 55} y2="55" 
                        stroke="var(--accent-secondary)" strokeWidth="2" markerEnd="url(#arrowRNN)" />
                )}
              </g>
            );
          })}
          
          <defs>
            <marker id="arrowRNN" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="var(--accent-secondary)" />
            </marker>
          </defs>
          
          {/* Hidden state feedback arrow */}
          <path d="M 145,55 Q 160,55 160,75 Q 160,95 175,95" fill="none" 
                stroke="var(--accent-secondary)" strokeWidth="1.5" strokeDasharray="4" />
          <text x="165" y="85" fill="var(--accent-secondary)" fontSize="7">h→h</text>
        </svg>
      </div>
      
      <div className="controls">
        <div className="slider-group">
          <label>Timestep: {timestep}</label>
          <input type="range" min="0" max={sequence.length - 1} step="1" value={timestep} onChange={(e) => setTimestep(Number(e.target.value))} />
        </div>
      </div>
      
      <p className="caption">
        RNNs process sequences by passing hidden state (h) from one timestep to the next. Each step sees the current input AND previous hidden state.
      </p>
      
      <style>{`
        .rnn-visualizer {
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
