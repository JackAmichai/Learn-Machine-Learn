/**
 * Wikipedia "Learn more" links per math topic.
 * Keys match MATH_TOPICS keys in src/engine/mathContent.js.
 * Values are the final URL segment (the article slug).
 *
 * getWikiUrl(topic) returns the full https://en.wikipedia.org URL,
 * or null if no mapping exists (so the UI can hide the button).
 */

const WIKI_SLUGS = {
  // Classical ML
  SVM: 'Support-vector_machine',
  DecisionTree: 'Decision_tree_learning',
  RandomForest: 'Random_forest',
  KNN: 'K-nearest_neighbors_algorithm',
  NaiveBayes: 'Naive_Bayes_classifier',
  KMeans: 'K-means_clustering',
  DBSCAN: 'DBSCAN',
  PCA: 'Principal_component_analysis',
  TSNE: 'T-distributed_stochastic_neighbor_embedding',
  UMAP: 'Nonlinear_dimensionality_reduction#Uniform_manifold_approximation_and_projection',
  LinearRegression: 'Linear_regression',
  LogisticRegression: 'Logistic_regression',
  BayesTheorem: 'Bayes%27_theorem',

  // Core DL
  Loss: 'Loss_function',
  Epoch: 'Epoch_(machine_learning)',
  Activation: 'Activation_function',
  ActivationAdvanced: 'Activation_function',
  Optimizer: 'Stochastic_gradient_descent',
  Nodes: 'Artificial_neuron',
  Layer: 'Layer_(deep_learning)',
  Gradient: 'Gradient_descent',
  Backpropagation: 'Backpropagation',
  Softmax: 'Softmax_function',
  Regularization: 'Regularization_(mathematics)',
  L1L2: 'Regularization_(mathematics)',
  BatchNorm: 'Batch_normalization',
  LayerNorm: 'Layer_normalization',
  Dropout: 'Dilution_(neural_networks)',
  EarlyStopping: 'Early_stopping',
  CrossValidation: 'Cross-validation_(statistics)',
  DataAugmentation: 'Data_augmentation',

  // Math
  Tensors: 'Tensor',
  Jacobian: 'Jacobian_matrix_and_determinant',
  Hessian: 'Hessian_matrix',
  KLDivergence: 'Kullback%E2%80%93Leibler_divergence',

  // CV
  Convolution: 'Convolutional_neural_network',
  Pooling: 'Convolutional_neural_network#Pooling_layers',
  Padding: 'Convolutional_neural_network#Padding',
  SkipConnection: 'Residual_neural_network',
  VisionArchitecture: 'Convolutional_neural_network',
  Inception: 'Inception_(deep_learning_architecture)',
  ObjectDetection: 'Object_detection',
  AnchorBoxes: 'Object_detection',
  IoU: 'Jaccard_index',
  Segmentation: 'Image_segmentation',

  // RL
  MDP: 'Markov_decision_process',
  QLearning: 'Q-learning',
  DeepQN: 'Deep_reinforcement_learning',
  PolicyGradient: 'Policy_gradient_method',
  PPO: 'Proximal_policy_optimization',

  // Paradigms
  Supervised: 'Supervised_learning',
  Unsupervised: 'Unsupervised_learning',
  SemiSupervised: 'Weak_supervision',
  SelfSupervised: 'Self-supervised_learning',

  // Modern
  Transformer: 'Transformer_(deep_learning_architecture)',
  VisionTransformer: 'Vision_transformer',
  LoRA: 'Fine-tuning_(deep_learning)#Low-rank_adaptation',
  Diffusion: 'Diffusion_model',
  StableDiffusion: 'Stable_Diffusion',
  CLIP: 'Contrastive_Language-Image_Pre-training',
  GAN: 'Generative_adversarial_network',
  WGAN: 'Wasserstein_GAN',
  DCGAN: 'Generative_adversarial_network',
  SAM: 'Segment_Anything_Model',
  LLM: 'Large_language_model',
  RAG: 'Retrieval-augmented_generation',
  Multimodal: 'Multimodal_learning',
  NeRF: 'Neural_radiance_field',
  Sora: 'Sora_(text-to-video_model)',
  Agent: 'Intelligent_agent',
  Quantization: 'Quantization_(machine_learning)',
  Distillation: 'Knowledge_distillation',
  MoE: 'Mixture_of_experts',
  RecentAdvances: 'Artificial_intelligence',
  RNN: 'Recurrent_neural_network',
  LSTM: 'Long_short-term_memory',
  Interpretability: 'Explainable_artificial_intelligence',
  LearningPath: 'Machine_learning',

  // Common alt names used elsewhere in the engine
  'Hidden Layer': 'Multilayer_perceptron',
  'Learning Rate': 'Learning_rate',
  'Vectors & Matrices': 'Matrix_(mathematics)',
  'Dot Product': 'Dot_product',
  'Matrix Multiplication': 'Matrix_multiplication',
  'Signal Processing': 'Signal_processing',
  'Classification Metrics': 'Confusion_matrix',
};

const BASE = 'https://en.wikipedia.org/wiki/';

export function getWikiUrl(topicKey) {
  if (!topicKey) return null;
  const slug = WIKI_SLUGS[topicKey];
  if (!slug) return null;
  return BASE + slug;
}

export default WIKI_SLUGS;
