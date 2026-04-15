import React from 'react';

// Placeholder components - these will be replaced with real implementations
const SVMVisualizer = ({ values }) => (
  <div className="math-viz-placeholder">
    <h4>SVM Hyperplane View</h4>
    <p>Visualizing margin: {values.margin || 0.5}</p>
    <div style={{ height: '150px', border: '1px dashed var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        [ Interactive 2D Hyperplane Visualization ]
    </div>
  </div>
);

const TreeVisualizer = ({ values }) => (
  <div className="math-viz-placeholder">
    <h4>Decision Tree Node</h4>
    <p>Splitting on feature with Gini: {values.gini || 0.3}</p>
    <div style={{ height: '150px', border: '1px dashed var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        [ Interactive Tree Node Visualization ]
    </div>
  </div>
);

const GridWorldVisualizer = ({ values }) => (
  <div className="math-viz-placeholder">
    <h4>RL Grid World</h4>
    <p>Current Q-Value learning rate: {values.lr || 0.1}</p>
    <div style={{ height: '150px', border: '1px dashed #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        [ Interactive 5x5 Grid World Environment ]
    </div>
  </div>
);

export const VisualizerRegistry = {
  SVM: SVMVisualizer,
  Tree: TreeVisualizer,
  GridWorld: GridWorldVisualizer,
  // Add more mappings here as they are implemented
};
