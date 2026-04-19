import React, { useState } from 'react';

export default function TSNEVisualizer() {
  const [perplexity, setPerplexity] = useState(30);
  const [iterations, setIterations] = useState(1000);

  const clusterColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#a29bfe', '#fd79a8'];

  const generateClusters = () => {
    const clusters = [];
    const numClusters = 5;
    let seed = 42;
    const pseudoRandom = () => {
      let x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < numClusters; i++) {
      const points = [];
      const centerX = pseudoRandom() * 60 + 20;
      const centerY = pseudoRandom() * 60 + 20;
      for (let j = 0; j < 15; j++) {
        points.push({
          x: centerX + (pseudoRandom() - 0.5) * 15,
          y: centerY + (pseudoRandom() - 0.5) * 15,
          cluster: i
        });
      }
      clusters.push(...points);
    }
    return clusters;
  };

  const clusters = generateClusters();

  const getPerplexityDescription = () => {
    if (perplexity < 10) return 'Very local focus - fine clusters';
    if (perplexity < 30) return 'Balanced local/global';
    if (perplexity < 50) return 'More global structure';
    return 'Very global focus';
  };

  return (
    <div className="tsne-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 280 200" width="100%" height="220">
          <text x="140" y="15" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="bold">
            t-SNE Visualization
          </text>
          
          <text x="10" y="35" fill="var(--text-secondary)" fontSize="9">High-Dim</text>
          <rect x="10" y="40" width="120" height="100" fill="rgba(0,0,0,0.3)" stroke="var(--glass-border)" rx="4" />
          {clusters.map((p, i) => (
            <circle 
              key={`h-${i}`}
              cx={p.x * 1.2 + 10}
              cy={p.y * 1.2 + 40}
              r="4"
              fill={clusterColors[p.cluster % clusterColors.length]}
              opacity="0.7"
            />
          ))}

          <text x="250" y="35" fill="var(--text-secondary)" fontSize="9">2D Embedding</text>
          <rect x="150" y="40" width="120" height="100" fill="rgba(0,0,0,0.3)" stroke="var(--glass-border)" rx="4" />
          {clusters.map((p, i) => (
            <circle 
              key={`l-${i}`}
              cx={150 + (p.x / 100) * 100 + 10}
              cy={40 + (p.y / 100) * 80 + 10}
              r="5"
              fill={clusterColors[p.cluster % clusterColors.length]}
            />
          ))}

          <line x1="135" y1="90" x2="145" y2="90" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <rect x="10" y="150" width="260" height="45" fill="rgba(0,242,255,0.1)" rx="4" />
          <text x="140" y="168" fill="var(--accent-primary)" fontSize="10" textAnchor="middle">
            Perplexity: {perplexity}
          </text>
          <text x="140" y="183" fill="var(--text-secondary)" fontSize="9" textAnchor="middle">
            {getPerplexityDescription()}
          </text>
          <text x="140" y="193" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">
            Iterations: {iterations}
          </text>

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-primary)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="controls">
        <div className="slider-group">
          <label>Perplexity: {perplexity}</label>
          <input 
            type="range" 
            min="2" 
            max="100" 
            step="1" 
            value={perplexity} 
            onChange={(e) => setPerplexity(parseInt(e.target.value))}
          />
        </div>
        <div className="slider-group">
          <label>Iterations: {iterations}</label>
          <input 
            type="range" 
            min="100" 
            max="5000" 
            step="100" 
            value={iterations} 
            onChange={(e) => setIterations(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="info-box">
        <h4>Perplexity Guidelines</h4>
        <ul>
          <li><strong>5-30:</strong> Good for small datasets</li>
          <li><strong>30-50:</strong> Works well for most cases</li>
          <li><strong>50-100:</strong> For larger datasets</li>
        </ul>
      </div>

      <div className="legend">
        <div className="legend-item">
          <span className="dot" style={{ background: '#ff6b6b' }} />
          <span>Cluster 1</span>
        </div>
        <div className="legend-item">
          <span className="dot" style={{ background: '#4ecdc4' }} />
          <span>Cluster 2</span>
        </div>
        <div className="legend-item">
          <span className="dot" style={{ background: '#45b7d1' }} />
          <span>Cluster 3</span>
        </div>
      </div>

      <style>{`
        .tsne-visualizer {
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
        .info-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 12px;
        }
        .info-box h4 {
          margin: 0 0 6px 0;
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
          margin-bottom: 3px;
        }
        .legend {
          display: flex;
          justify-content: center;
          gap: 16px;
          font-size: 10px;
          color: var(--text-secondary);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
