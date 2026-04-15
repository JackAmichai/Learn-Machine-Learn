/**
 * NotebookLM summary links per math topic.
 * Keys match MATH_TOPICS keys in src/engine/mathContent.js.
 * 
 * To add a link, create a notebook in NotebookLM, make it public/shared,
 * and add the ID or full URL here.
 */

const NOTEBOOK_LINKS = {
  // Classical ML
  SVM: 'https://notebooklm.google.com/',
  DecisionTree: 'https://notebooklm.google.com/',
  RandomForest: 'https://notebooklm.google.com/',
  KNN: 'https://notebooklm.google.com/',
  PCA: 'https://notebooklm.google.com/',
  
  // Core DL
  Loss: 'https://notebooklm.google.com/',
  Epoch: 'https://notebooklm.google.com/',
  Activation: 'https://notebooklm.google.com/',
  Optimizer: 'https://notebooklm.google.com/',
  Nodes: 'https://notebooklm.google.com/',
  Layer: 'https://notebooklm.google.com/',
  Gradient: 'https://notebooklm.google.com/',
  Backpropagation: 'https://notebooklm.google.com/',
  Softmax: 'https://notebooklm.google.com/',
  Regularization: 'https://notebooklm.google.com/',
  BatchNorm: 'https://notebooklm.google.com/',
  Dropout: 'https://notebooklm.google.com/',
  
  // Math
  Tensors: 'https://notebooklm.google.com/',
  Jacobian: 'https://notebooklm.google.com/',
  Hessian: 'https://notebooklm.google.com/',

  // CV
  Convolution: 'https://notebooklm.google.com/',
  Pooling: 'https://notebooklm.google.com/',
  Padding: 'https://notebooklm.google.com/',
  SkipConnection: 'https://notebooklm.google.com/',
  VisionArchitecture: 'https://notebooklm.google.com/',
  GAN: 'https://notebooklm.google.com/',
  
  // Modern
  Transformer: 'https://notebooklm.google.com/',
  Diffusion: 'https://notebooklm.google.com/',
  
  // Common alt names
  'Hidden Layer': 'https://notebooklm.google.com/',
  'Learning Rate': 'https://notebooklm.google.com/',
  'Vectors & Matrices': 'https://notebooklm.google.com/',
  'Dot Product': 'https://notebooklm.google.com/',
  'Matrix Multiplication': 'https://notebooklm.google.com/',
  'Signal Processing': 'https://notebooklm.google.com/',
  'Classification Metrics': 'https://notebooklm.google.com/',
};

export function getNotebookLMLink(topicKey) {
  if (!topicKey) return null;
  return NOTEBOOK_LINKS[topicKey] || 'https://notebooklm.google.com/';
}

export default NOTEBOOK_LINKS;
