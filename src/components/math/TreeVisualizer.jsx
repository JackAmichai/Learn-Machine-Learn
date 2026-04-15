import React from 'react';

export default function TreeVisualizer({ values }) {
  // Use p1 from the interactive formula slider, default to 0.5
  const p1 = values.p1 !== undefined ? values.p1 : 0.5;
  const p2 = 1 - p1;
  const gini = 1 - (p1 * p1 + p2 * p2);

  const numItems = 20;
  const class1Count = Math.round(p1 * numItems);
  const class2Count = numItems - class1Count;

  // Generate an array representing the sample mix
  const mix = [
    ...Array(class1Count).fill(1),
    ...Array(class2Count).fill(2)
  ].sort((a, b) => Math.random() - 0.5); // shuffle for display

  // Calculate box sizes based on impurity
  // If pure, color is solid. If impure, color is mixed.
  const isPure = gini === 0;

  return (
    <div className="tree-visualizer">
      <div className="node root-node">
        <div className="node-stats">
          <span>Gini: {gini.toFixed(3)}</span>
          <span>Items: {numItems}</span>
        </div>
        
        <div className={`bucket ${isPure ? 'pure-glow' : ''}`}>
           {mix.map((item, idx) => (
              <span key={idx} className={`particle c${item}`}>●</span>
           ))}
        </div>
      </div>

      <div className="split-arms">
        <svg width="120" height="40" viewBox="0 0 120 40">
           <path d="M60,0 L20,40" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
           <path d="M60,0 L100,40" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="child-nodes">
         <div className="node leaf">
            <div className={`bucket pure-glow ${class1Count === 0 ? 'empty' : ''}`}>
               {Array(class1Count).fill(1).map((item, idx) => (
                  <span key={idx} className={`particle c${item}`}>●</span>
               ))}
            </div>
            <div className="node-stats">Class 1 ({class1Count})</div>
         </div>

         <div className="node leaf">
            <div className={`bucket pure-glow ${class2Count === 0 ? 'empty' : ''}`}>
               {Array(class2Count).fill(2).map((item, idx) => (
                  <span key={idx} className={`particle c${item}`}>●</span>
               ))}
            </div>
            <div className="node-stats">Class 2 ({class2Count})</div>
         </div>
      </div>

      <style>{`
        .tree-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .node {
          background: var(--bg-panel);
          border: 1px solid var(--glass-border);
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          width: 140px;
        }
        .node-stats {
          font-size: 11px;
          color: var(--text-secondary);
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .leaf .node-stats {
          justify-content: center;
          margin-bottom: 0;
          margin-top: 8px;
        }
        .bucket {
          background: rgba(0, 0, 0, 0.5);
          height: 60px;
          border-radius: 6px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: center;
          gap: 2px;
          padding: 8px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .bucket.pure-glow {
          border-color: rgba(0, 255, 157, 0.5);
          box-shadow: inset 0 0 10px rgba(0, 255, 157, 0.2);
        }
        .bucket.empty {
          opacity: 0.3;
          border-color: transparent;
          box-shadow: none;
        }
        .particle {
          font-size: 14px;
          line-height: 1;
        }
        .particle.c1 { color: var(--accent-primary); }
        .particle.c2 { color: #ff5555; }
        
        .split-arms {
          margin: 0;
          height: 40px;
        }
        .child-nodes {
          display: flex;
          gap: 40px;
        }
      `}</style>
    </div>
  );
}
