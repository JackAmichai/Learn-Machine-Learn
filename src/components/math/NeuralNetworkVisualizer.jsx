import React, { useState, useEffect } from 'react';

export default function NeuralNetworkVisualizer({ values = {} }) {
  const [layers, setLayers] = useState([3, 4, 2]);
  const [activeLayer, setActiveLayer] = useState(1);
  
  // Sync with external values if they change
  useEffect(() => {
    if (values.nodes !== undefined) {
      setTimeout(() => setLayers(prev => [prev[0], values.nodes, prev[2]]), 0);
    }
    if (values.hiddenNodes !== undefined) {
      setTimeout(() => setLayers(prev => [prev[0], values.hiddenNodes, prev[2]]), 0);
    }
  }, [values.nodes, values.hiddenNodes]);

  const activations = ['Input', 'ReLU', 'Softmax'];
  const colors = ['#ff5555', '#ffaa00', '#55ff55', '#55aaff'];
  
  return (
    <div className="nn-visualizer">
      <div className="viz-container">
        <svg viewBox="0 0 200 120" width="100%" height="140">
          <text x="100" y="10" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold">
            Neural Network Architecture
          </text>
          
          {layers.map((numNodes, layerIdx) => {
            const x = 30 + layerIdx * 50;
            const spacing = 100 / (numNodes + 1);
            
            return (
              <g key={layerIdx}>
                {/* Connections to next layer */}
                {layerIdx < layers.length - 1 && [...Array(numNodes)].map((_, i) => {
                  const y1 = spacing * (i + 1);
                  const nextSpacing = 100 / (layers[layerIdx + 1] + 1);
                  return [...Array(layers[layerIdx + 1])].map((_, j) => (
                    <line 
                      key={`${i}-${j}`}
                      x1={x + 15} y1={y1}
                      x2={x + 50 - 15} y2={nextSpacing * (j + 1)}
                      stroke={layerIdx === activeLayer ? 'var(--accent-primary)' : 'var(--glass-border)'}
                      strokeWidth={layerIdx === activeLayer ? 1.5 : 0.5}
                      opacity={layerIdx === activeLayer ? 1 : 0.3}
                    />
                  ));
                })}
                
                {/* Nodes */}
                {[...Array(numNodes)].map((_, i) => {
                  const y = spacing * (i + 1);
                  return (
                    <circle 
                      key={i} 
                      cx={x + 15} 
                      cy={y} 
                      r="8" 
                      fill={colors[layerIdx % colors.length]}
                      stroke={activeLayer === layerIdx ? '#fff' : 'transparent'}
                      strokeWidth="2"
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onClick={() => setActiveLayer(layerIdx)}
                    />
                  );
                })}
                
                {/* Layer label */}
                <text x={x + 15} y="115" fill="var(--text-secondary)" fontSize="8" textAnchor="middle">
                  {activations[layerIdx] || `Layer ${layerIdx}`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="info">
        <strong>Active: </strong> 
        {activeLayer === 0 ? 'Input Layer (features)' : 
         activeLayer === layers.length - 1 ? 'Output Layer (predictions)' : 
         `Hidden Layer ${activeLayer}`}
      </div>
      
      {values.nodes === undefined && values.hiddenNodes === undefined && (
        <div className="controls">
          <div className="slider-group">
            <label>Hidden nodes: {layers[1]}</label>
            <input 
              type="range" 
              min="2" 
              max="8" 
              step="1" 
              value={layers[1]} 
              onChange={(e) => {
                const n = Number(e.target.value);
                setLayers([layers[0], n, layers[2]]);
              }} 
            />
          </div>
        </div>
      )}
      
      <p className="caption">
        Neural networks have <strong>layers</strong> of <strong>nodes</strong> connected by <strong>weights</strong>. Click nodes to see connections. More layers = more capacity.
      </p>
      
      <style>{`
        .nn-visualizer {
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
        .info {
          font-size: 12px;
          color: var(--accent-primary);
          text-align: center;
          margin-bottom: 8px;
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
          min-width: 90px;
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
