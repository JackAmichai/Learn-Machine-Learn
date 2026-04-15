import React, { useState } from 'react';

export default function PoolingVisualizer() {
  const [type, setType] = useState('max');
  const [size, setSize] = useState(2);
  
  const data = [
    [1, 5, 3, 2],
    [4, 2, 6, 1],
    [3, 8, 1, 4],
    [2, 1, 7, 5]
  ];
  
  const pooled = type === 'max' 
    ? [[Math.max(1,5,4,2), Math.max(3,2,1,7)], [Math.max(3,8,2,1), Math.max(4,1,7,5)]]
    : [[(1+5+4+2)/4, (3+2+1+7)/4], [(3+8+2+1)/4, (4+1+7+5)/4]];
  
  return (
    <div className="pooling-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 100" width="100%" height="120">
          <text x="70" y="12" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Input 4×4</text>
          <text x="145" y="12" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">Output 2×2</text>
          
          {/* Input grid */}
          {data.map((row, i) => row.map((val, j) => (
            <rect key={`in-${i}-${j}`} x={10 + j * 18} y={20 + i * 18} width="16" height="16" 
                  fill="var(--bg-secondary)" stroke="var(--glass-border)" />
          )))}
          {data.map((row, i) => row.map((val, j) => (
            <text key={`inv-${i}-${j}`} x={18 + j * 18} y={32 + i * 18} fill="var(--text-primary)" fontSize="7" textAnchor="middle">{val}</text>
          )))}
          
          {/* Arrow */}
          <line x1="82" y1="55" x2="110" y2="55" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowPOOL)" />
          
          {/* Output grid */}
          {pooled.map((row, i) => row.map((val, j) => (
            <rect key={`out-${i}-${j}`} x={120 + j * 35} y={20 + i * 35} width="30" height="30" 
                  fill="var(--accent-primary)" rx="3" />
          )))}
          {pooled.map((row, i) => row.map((val, j) => (
            <text key={`outv-${i}-${j}`} x={135 + j * 35} y={40 + i * 35} fill="var(--bg-primary)" fontSize="9" textAnchor="middle" fontWeight="bold">
              {type === 'max' ? val : val.toFixed(1)}
            </text>
          )))}
          
          <defs>
            <marker id="arrowPOOL" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5" fill="var(--accent-primary)" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="selector">
        <button className={type === 'max' ? 'active' : ''} onClick={() => setType('max')}>Max Pooling</button>
        <button className={type === 'avg' ? 'active' : ''} onClick={() => setType('avg')}>Avg Pooling</button>
      </div>
      
      <p className="caption">
        <strong>{type === 'max' ? 'Max' : 'Average'} pooling</strong> {type === 'max' ? 'takes the maximum' : 'averages'} in each {size}×{size} window. Reduces spatial size and provides translation invariance.
      </p>
      
      <style>{`
        .pooling-visualizer {
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
        }
        .selector button {
          flex: 1;
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
        .caption {
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
