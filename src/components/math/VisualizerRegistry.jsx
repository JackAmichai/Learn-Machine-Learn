import React from 'react';
import SVMVisualizer from './SVMVisualizer';
import TreeVisualizer from './TreeVisualizer';
import GridWorldVisualizer from './GridWorldVisualizer';
import KNNVisualizer from './KNNVisualizer';
import RandomForestVisualizer from './RandomForestVisualizer';
import LoRAVisualizer from './LoRAVisualizer';
import TransformerVisualizer from './TransformerVisualizer';
import CNNVisualizer from './CNNVisualizer';

export const VisualizerRegistry = {
  SVM: SVMVisualizer,
  Tree: TreeVisualizer,
  GridWorld: GridWorldVisualizer,
  KNN: KNNVisualizer,
  RandomForest: RandomForestVisualizer,
  LoRA: LoRAVisualizer,
  Transformer: TransformerVisualizer,
  CNN: CNNVisualizer,
  // Add more mappings here as they are implemented
};
