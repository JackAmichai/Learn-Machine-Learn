import React from 'react';
import SVMVisualizer from './SVMVisualizer';
import TreeVisualizer from './TreeVisualizer';
import GridWorldVisualizer from './GridWorldVisualizer';
import KNNVisualizer from './KNNVisualizer';
import RandomForestVisualizer from './RandomForestVisualizer';
import LoRAVisualizer from './LoRAVisualizer';
import TransformerVisualizer from './TransformerVisualizer';
import CNNVisualizer from './CNNVisualizer';
import PCAVisualizer from './PCAVisualizer';
import LossVisualizer from './LossVisualizer';
import LogisticRegressionVisualizer from './LogisticRegressionVisualizer';
import LinearRegressionVisualizer from './LinearRegressionVisualizer';
import GradientDescentVisualizer from './GradientDescentVisualizer';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';
import ActivationVisualizer from './ActivationVisualizer';
import OptimizerVisualizer from './OptimizerVisualizer';
import RNNVisualizer from './RNNVisualizer';
import LSTMVisualizer from './LSTMVisualizer';
import AttentionVisualizer from './AttentionVisualizer';
import GANVisualizer from './GANVisualizer';
import VAEVisualizer from './VAEVisualizer';
import DiffusionVisualizer from './DiffusionVisualizer';
import MDPVisualizer from './MDPVisualizer';
import DeepQNVisualizer from './DeepQNVisualizer';
import PPOVisualizer from './PPOVisualizer';
import EnsembleVisualizer from './EnsembleVisualizer';
import PoolingVisualizer from './PoolingVisualizer';
import LinearAlgebraVisualizer from './LinearAlgebraVisualizer';
import DotProductVisualizer from './DotProductVisualizer';
import MatMulVisualizer from './MatMulVisualizer';
import TensorVisualizer from './TensorVisualizer';
import JacobianVisualizer from './JacobianVisualizer';
import HessianVisualizer from './HessianVisualizer';
import BayesTheoremVisualizer from './BayesTheoremVisualizer';
import KLDivergenceVisualizer from './KLDivergenceVisualizer';

export const VisualizerRegistry = {
  SVM: SVMVisualizer,
  Tree: TreeVisualizer,
  GridWorld: GridWorldVisualizer,
  KNN: KNNVisualizer,
  RandomForest: RandomForestVisualizer,
  LoRA: LoRAVisualizer,
  Transformer: TransformerVisualizer,
  CNN: CNNVisualizer,
  PCA: PCAVisualizer,
  Loss: LossVisualizer,
  LogisticRegression: LogisticRegressionVisualizer,
  LinearRegression: LinearRegressionVisualizer,
  GradientDescent: GradientDescentVisualizer,
  NeuralNetwork: NeuralNetworkVisualizer,
  Activation: ActivationVisualizer,
  Optimizer: OptimizerVisualizer,
  RNN: RNNVisualizer,
  LSTM: LSTMVisualizer,
  Attention: AttentionVisualizer,
  GAN: GANVisualizer,
  VAE: VAEVisualizer,
  Diffusion: DiffusionVisualizer,
  MDP: MDPVisualizer,
  DeepQN: DeepQNVisualizer,
  PPO: PPOVisualizer,
  Ensemble: EnsembleVisualizer,
  Pooling: PoolingVisualizer,
  LinearAlgebra: LinearAlgebraVisualizer,
  DotProduct: DotProductVisualizer,
  MatMul: MatMulVisualizer,
  Tensor: TensorVisualizer,
  Jacobian: JacobianVisualizer,
  Hessian: HessianVisualizer,
  BayesTheorem: BayesTheoremVisualizer,
  KLDivergence: KLDivergenceVisualizer,
};
