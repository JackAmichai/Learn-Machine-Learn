import React from 'react';

export default function CNNVisualizer({ values }) {
  const archIndex = values.arch !== undefined ? values.arch : 0;
  
  // Architectures:
  // 0: LeNet (Conv, Pool, Conv, Pool, FC, FC, FC)
  // 1: AlexNet (Conv, Pool, Conv, Pool, Conv, Conv, Conv, Pool, FC, FC, FC)
  // 2: VGG-16 (Convx2, Pool, Convx2, Pool, Convx3, Pool, Convx3, Pool, Convx3, Pool, FC, FC, FC)
  // 3: ResNet-50 (Conv, Pool, [Blockx3], [Blockx4], [Blockx6], [Blockx3], AvgPool, FC)

  const architectures = [
    {
      name: "LeNet-5 (60K params)",
      blocks: [
        { type: "Conv", h: 40, color: "var(--accent-primary)" },
        { type: "Pool", h: 20, color: "#ff5555" },
        { type: "Conv", h: 35, color: "var(--accent-primary)" },
        { type: "Pool", h: 18, color: "#ff5555" },
        { type: "FC", h: 10, color: "#ffc832" },
        { type: "FC", h: 8, color: "#ffc832" },
        { type: "Out", h: 6, color: "var(--text-primary)" }
      ],
      features: "Simple alternating Conv and AvgPool layers leading to Dense layers."
    },
    {
      name: "AlexNet (60M params)",
      blocks: [
        { type: "Conv", h: 60, color: "var(--accent-primary)" },
        { type: "MaxP", h: 30, color: "#ff5555" },
        { type: "Conv", h: 50, color: "var(--accent-primary)" },
        { type: "MaxP", h: 25, color: "#ff5555" },
        { type: "Convx3", h: 45, color: "var(--accent-primary)" },
        { type: "MaxP", h: 20, color: "#ff5555" },
        { type: "FC", h: 80, color: "#ffc832" },
        { type: "FC", h: 80, color: "#ffc832" },
        { type: "Out", h: 10, color: "var(--text-primary)" }
      ],
      features: "Introduced ReLU, Dropout, and stacked Convs without intermediate pooling."
    },
    {
      name: "VGG-16 (138M params)",
      blocks: [
        { type: "Convx2", h: 60, color: "var(--accent-primary)" },
        { type: "Pool", h: 30, color: "#ff5555" },
        { type: "Convx2", h: 50, color: "var(--accent-primary)" },
        { type: "Pool", h: 25, color: "#ff5555" },
        { type: "Convx3", h: 40, color: "var(--accent-primary)" },
        { type: "Pool", h: 20, color: "#ff5555" },
        { type: "Convx3", h: 30, color: "var(--accent-primary)" },
        { type: "Pool", h: 15, color: "#ff5555" },
        { type: "FC", h: 80, color: "#ffc832" },
        { type: "FC", h: 80, color: "#ffc832" }
      ],
      features: "Massive uniform network using only 3x3 convolutions stacked deeply."
    },
    {
      name: "ResNet-50 (25M params)",
      blocks: [
        { type: "Conv", h: 60, color: "var(--accent-primary)" },
        { type: "Pool", h: 30, color: "#ff5555" },
        { type: "ResNx3", h: 45, color: "#b645ff", skip: true },
        { type: "ResNx4", h: 40, color: "#b645ff", skip: true },
        { type: "ResNx6", h: 35, color: "#b645ff", skip: true },
        { type: "ResNx3", h: 30, color: "#b645ff", skip: true },
        { type: "Avg", h: 15, color: "#ff5555" },
        { type: "FC", h: 10, color: "#ffc832" }
      ],
      features: "Skip connections (residual links) allow bypassing layers, solving vanishing gradients."
    }
  ];

  const arch = architectures[archIndex] || architectures[0];

  return (
    <div className="cnn-visualizer">
      <h4>{arch.name}</h4>
      
      <div className="svg-container">
        <svg viewBox="0 0 500 120" width="100%" height="120">
          <g transform="translate(10, 60)">
             {arch.blocks.reduce((acc, block, i) => {
                const prevX = acc.x;
                const width = block.type.includes("x") ? 35 : 20;
                const spacing = 15;
                const nextX = prevX + width + spacing;
                
                acc.elements.push(
                  <g key={i}>
                    {/* Layer Block */}
                    <rect 
                       x={prevX} 
                       y={-(block.h/2)} 
                       width={width} 
                       height={block.h} 
                       rx="3" 
                       fill={block.color} 
                       opacity="0.8" 
                       stroke="var(--bg-body)" 
                       strokeWidth="1" 
                    />
                    {block.type.includes("x") && (
                       <text x={prevX + width/2} y="4" fill="var(--bg-body)" fontSize="10" fontWeight="bold" textAnchor="middle">{block.type.substring(block.type.indexOf('x'))}</text>
                    )}
                    
                    <text x={prevX + width/2} y={(block.h/2) + 12} fill="var(--text-secondary)" fontSize="9" textAnchor="middle">{block.type.replace(/x[0-9]/, '')}</text>

                    {/* Connection Line */}
                    {i < arch.blocks.length - 1 && (
                      <line x1={prevX + width} y1="0" x2={nextX} y2="0" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="2" />
                    )}

                    {/* Skip Connection Line for ResNet */}
                    {block.skip && (
                       <path 
                          d={`M${prevX - 5},0 C${prevX},${-(block.h/2)-20} ${prevX+width},${-(block.h/2)-20} ${prevX+width+5},0`} 
                          stroke="var(--accent-primary)" 
                          strokeWidth="2" 
                          fill="none" 
                       />
                    )}
                  </g>
                );
                acc.x = nextX;
                return acc;
             }, { x: 0, elements: [] }).elements}
          </g>
        </svg>
      </div>

      <div className="legend">
         <span style={{color: 'var(--accent-primary)'}}>■ Conv</span>
         <span style={{color: '#ff5555'}}>■ Pool</span>
         <span style={{color: '#b645ff'}}>■ ResBlock</span>
         <span style={{color: '#ffc832'}}>■ Dense/FC</span>
      </div>

      <p className="caption">
         {arch.features}
      </p>

      <style>{`
        .cnn-visualizer {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 20px;
          margin: 16px 0;
        }
        .cnn-visualizer h4 {
          margin-top: 0;
          color: var(--accent-secondary);
          text-align: center;
        }
        .svg-container {
          overflow-x: auto;
          overflow-y: hidden;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
          margin-bottom: 12px;
        }
        .legend {
          display: flex;
          justify-content: center;
          gap: 16px;
          font-size: 11px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .caption {
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
