import React, { useMemo } from 'react';

export default function RandomForestVisualizer({ values }) {
  // Extract interactive variables with defaults
  const numTrees = values.numTrees !== undefined ? values.numTrees : 10;
  const featureSubset = values.featureSubset !== undefined ? values.featureSubset : 50;

  // Generate deterministic "random" trees for display
  const trees = useMemo(() => {
    // We cap visualization at ~50 trees so DOM doesn't get overloaded, but display the actual number
    const renderCount = Math.min(numTrees, 50);
    const seed = 12345;
    const pseudoRandom = (i) => {
      const x = Math.sin(seed + i * 9999) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: renderCount }).map((_, i) => {
      const prediction = pseudoRandom(i) > 0.4 ? 1 : 0; 
      return { id: i, prediction };
    });
  }, [numTrees]);

  const class1Votes = trees.filter(t => t.prediction === 1).length;
  
  // Scale the stats to the real numTrees vs rendered trees
  const ratio = numTrees / trees.length;
  const scaledClass1 = Math.round(class1Votes * ratio);
  const scaledClass0 = numTrees - scaledClass1;
  const winner = scaledClass1 > scaledClass0 ? "Class 1" : "Class 0";
  const confidence = Math.max(scaledClass1, scaledClass0) / numTrees * 100;

  return (
    <div className="rf-visualizer">
      <div className="forest-stats">
        <div className="stat-box">
          <span className="label">Total Trees (N)</span>
          <span className="value">{numTrees}</span>
        </div>
        <div className="stat-box">
          <span className="label">Features per Tree</span>
          <span className="value">{featureSubset}%</span>
        </div>
      </div>

      <div className="forest-container">
        {trees.map((tree) => (
           <div key={tree.id} className={`mini-tree pred-${tree.prediction}`}>
             <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
               <path d="M12 2L2 22H22L12 2Z" opacity="0.8" />
               <rect x="10" y="18" width="4" height="6" fill="#8B4513" />
             </svg>
           </div>
        ))}
        {numTrees > 50 && (
           <div className="mini-tree overflow">+{numTrees - 50}</div>
        )}
      </div>

      <div className="ensemble-vote">
        <div className="vote-panel">
           <div className="vote-bar-container">
              <div className="vote-bar class1" style={{ width: `${(scaledClass1/numTrees)*100}%` }}></div>
              <div className="vote-bar class0" style={{ width: `${(scaledClass0/numTrees)*100}%` }}></div>
           </div>
           <div className="vote-labels">
              <span>{scaledClass1} Votes (Class 1)</span>
              <span>{scaledClass0} Votes (Class 0)</span>
           </div>
        </div>
        
        <div className="final-prediction">
           <h4>Majority Vote Result</h4>
           <div className={`winner-badge win-${winner === "Class 1" ? "1" : "0"}`}>
             {winner}
           </div>
           <span className="confidence">{confidence.toFixed(1)}% Agreement</span>
        </div>
      </div>

      <p className="caption">
         By aggregating the votes of {numTrees} diverse trees (each trained on a {featureSubset}% feature subset), Random Forests produce a highly robust prediction resistant to individual tree errors.
      </p>

      <style>{`
        .rf-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 20px;
          margin: 16px 0;
        }
        .forest-stats {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 20px;
        }
        .stat-box {
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-box .label { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; }
        .stat-box .value { font-size: 18px; font-weight: bold; color: var(--accent-primary); }
        
        .forest-container {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          min-height: 80px;
          align-content: flex-start;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }
        .mini-tree {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          transition: transform 0.2s;
        }
        .mini-tree:hover { transform: scale(1.2); }
        .mini-tree.pred-1 { color: var(--accent-primary); }
        .mini-tree.pred-0 { color: #ff5555; }
        .mini-tree.overflow { font-size: 10px; color: var(--text-secondary); font-weight: bold; width: auto; padding: 0 4px; }
        
        .ensemble-vote {
          margin-top: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .vote-panel {
          flex: 1;
        }
        .vote-bar-container {
          height: 12px;
          background: rgba(255,255,255,0.1);
          border-radius: 6px;
          display: flex;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .vote-bar { height: 100%; transition: width 0.5s ease; }
        .vote-bar.class1 { background: var(--accent-primary); }
        .vote-bar.class0 { background: #ff5555; }
        
        .vote-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        .final-prediction {
          background: rgba(0, 0, 0, 0.5);
          padding: 12px 20px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          text-align: center;
          min-width: 140px;
        }
        .final-prediction h4 { margin: 0 0 8px 0; font-size: 12px; color: var(--text-secondary); }
        .winner-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .winner-badge.win-1 { background: rgba(0, 242, 255, 0.2); color: var(--accent-primary); border: 1px solid var(--accent-primary); }
        .winner-badge.win-0 { background: rgba(255, 85, 85, 0.2); color: #ff5555; border: 1px solid #ff5555; }
        .confidence { display: block; font-size: 11px; opacity: 0.7; }
        
        .caption {
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
