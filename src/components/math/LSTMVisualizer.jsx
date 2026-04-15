import React, { useState } from 'react';

export default function LSTMVisualizer() {
  const [gate, setGate] = useState('forget');
  
  const gates = {
    forget: { name: 'Forget Gate', color: '#ff5555', desc: 'Decides what to forget from cell state. Uses sigmoid on previous hidden + current input.', equation: 'fₜ = σ(W_f · [hₜ₋₁, xₜ] + b_f)' },
    input: { name: 'Input Gate', color: '#55ff55', desc: 'Decides what new information to store in cell state.', equation: 'iₜ = σ(W_i · [hₜ₋₁, xₜ] + b_i)' },
    cell: { name: 'Cell Update', color: '#ffaa00', desc: 'Creates candidate values to add to cell state.', equation: 'C̃ₜ = tanh(W_C · [hₜ₋₁, xₜ] + b_C)' },
    output: { name: 'Output Gate', color: '#55aaff', desc: 'Decides what the next hidden state should be.', equation: 'oₜ = σ(W_o · [hₜ₋₁, xₜ] + b_o)' }
  };
  
  return (
    <div className="lstm-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 110" width="100%" height="130">
          <text x="100" y="10" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            LSTM Cell
          </text>
          
          {/* LSTM cell diagram */}
          <rect x="30" y="25" width="140" height="70" rx="10" fill="var(--bg-secondary)" stroke="var(--glass-border)" strokeWidth="2" />
          
          {/* Forget gate */}
          <rect x="40" y="35" width="30" height="20" rx="3" fill={gate === 'forget' ? gates.forget.color : 'var(--glass-border)'} 
                stroke={gate === 'forget' ? '#fff' : 'transparent'} strokeWidth="2"
                style={{ transition: 'all 0.3s' }} />
          <text x="55" y="48" fill={gate === 'forget' ? '#fff' : 'var(--text-secondary)'} fontSize="7" textAnchor="middle">forget</text>
          
          {/* Input gate */}
          <rect x="80" y="35" width="30" height="20" rx="3" fill={gate === 'input' ? gates.input.color : 'var(--glass-border)'} 
                stroke={gate === 'input' ? '#fff' : 'transparent'} strokeWidth="2"
                style={{ transition: 'all 0.3s' }} />
          <text x="95" y="48" fill={gate === 'input' ? '#000' : 'var(--text-secondary)'} fontSize="7" textAnchor="middle">input</text>
          
          {/* Cell state */}
          <rect x="40" y="65" width="120" height="15" rx="3" fill={gate === 'cell' ? gates.cell.color : 'var(--glass-border)'} 
                stroke={gate === 'cell' ? '#fff' : 'transparent'} strokeWidth="2"
                style={{ transition: 'all 0.3s' }} />
          <text x="100" y="75" fill={gate === 'cell' ? '#000' : 'var(--text-secondary)'} fontSize="7" textAnchor="middle">Cell State (Cₜ)</text>
          
          {/* Output gate */}
          <rect x="120" y="35" width="30" height="20" rx="3" fill={gate === 'output' ? gates.output.color : 'var(--glass-border)'} 
                stroke={gate === 'output' ? '#fff' : 'transparent'} strokeWidth="2"
                style={{ transition: 'all 0.3s' }} />
          <text x="135" y="48" fill={gate === 'output' ? '#000' : 'var(--text-secondary)'} fontSize="7" textAnchor="middle">output</text>
          
          {/* Arrows */}
          <line x1="20" y1="55" x2="40" y2="55" stroke="var(--accent-secondary)" strokeWidth="1.5" markerEnd="url(#arrowLSTM)" />
          <line x1="170" y1="55" x2="190" y2="55" stroke="var(--accent-secondary)" strokeWidth="1.5" markerEnd="url(#arrowLSTM)" />
          
          <defs>
            <marker id="arrowLSTM" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--accent-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="selector">
        {Object.keys(gates).map(k => (
          <button key={k} className={gate === k ? 'active' : ''} onClick={() => setGate(k)}>
            {gates[k].name}
          </button>
        ))}
      </div>
      
      <p className="desc">{gates[gate].desc}</p>
      <p className="equation">{gates[gate].equation}</p>
      
      <style>{`
        .lstm-visualizer {
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
        }
        .selector button.active {
          background: var(--accent-primary);
          color: var(--bg-primary);
        }
        .desc {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 8px;
        }
        .equation {
          font-size: 10px;
          color: var(--accent-primary);
          text-align: center;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
