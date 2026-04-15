import { useState } from 'react';
import { useMath } from '../hooks/useMath';
import { MATH_TOPICS } from '../engine/mathContent';

const DICTIONARY = {
 // Core Optimization Concepts
 "Loss": "Scalar objective measuring prediction error. Classification often uses cross-entropy; regression prefers squared error.",
 "Epoch": "One full sweep through the dataset. Each epoch triggers many gradient steps equal to data size divided by batch size.",
 "Batch Size": "Mini-batch cardinality. Large batches give smooth gradients; tiny batches add noise that can help escape local minima.",
 "Learning Rate": "Step size applied to gradients. Treat it like a control gain: high values oscillate, low values take forever.",

 // Architecture Elements
 "Hidden Layer": "Feature extraction stage that applies an affine transform followed by an activation. Stack them to capture hierarchies.",
 "Layer": "Group of neurons sharing the same input-output interface. Parameter count grows with fan-in * fan-out.",
 "Nodes": "Individual computational units performing weighted sums plus bias followed by activation—analogous to summing amplifiers.",
 "Neurons": "Same as nodes, emphasizing their biological inspiration. Their activations fire when learned detectors recognize patterns.",

 // Network Families
 "Dense": "Fully connected layer where every input reaches every neuron. Great for tabular data and smaller embedded workloads.",
 "MLP": "Multi-layer perceptron: stack of dense layers with non-linearities. Universal approximator for continuous functions.",
 "CNN": "Convolutional neural network using shared kernels and local receptive fields. Excels at spatial signals and image pipelines.",
 "RNN": "Recurrent neural network that reuses hidden state across time. Useful for sequences, control loops, and language models.",

 // Classical ML
 "LinearRegression": "Predicting a continuous value by fitting a straight line to the data points. The simplest regression model.",
 "LogisticRegression": "Predicting the probability of a binary outcome (0 or 1) using the sigmoid function on a linear combination of features.",
 "SVM": "Support Vector Machine - finds the hyperplane that separates classes with the maximum margin for robustness.",
 "DecisionTree": "Model that splits data into subsets based on feature values, forming a tree structure for intuitive decision making.",
 "RandomForest": "Ensemble of decision trees trained on different data subsets and features to improve accuracy and prevent overfitting.",
 "KNN": "K-Nearest Neighbors - classifies a point based on the majority class of its 'k' closest neighbors in the feature space.",
 "NaiveBayes": "Simple probabilistic classifier based on Bayes' Theorem, assuming features are independent of each other.",
 "KMeans": "Unsupervised clustering algorithm that partitions data into 'k' clusters by minimizing distance to centroids.",
 "DBSCAN": "Density-based clustering that finds core points and their neighbors, effective for clusters of arbitrary shapes.",
 "PCA": "Principal Component Analysis - reduces dimensionality by projecting data onto axes that capture the most variance.",
 "TSNE": "Nonlinear dimensionality reduction for visualizing high-dimensional data in 2D or 3D clusters.",
 "UMAP": "Modern alternative to t-SNE that is faster and often preserves more global data structure.",

 // Optimizers and Gradients
 "Optimizer": "Algorithm that turns gradients into parameter updates. SGD, Momentum, and Adam trade off speed, stability, and memory.",
 "AdamW": "Modern variant of Adam that decouples weight decay from the gradient update, improving generalization.",
 "L-BFGS": "Second-order optimization algorithm that uses an approximation of the Hessian to take smarter steps.",
 "Gradient": "Vector of partial derivatives indicating how sensitive loss is to each weight. Negative gradient points toward improvement.",
 "Backpropagation": "Reverse-mode automatic differentiation applying the chain rule layer by layer to compute gradients efficiently.",

 // Reinforcement Learning
 "MDP": "Markov Decision Process - mathematical framework for modeling decision making where outcomes are partly random.",
 "QLearning": "Off-policy RL algorithm that learns the quality of actions (Q-values) through trial and error.",
 "DeepQN": "DQN - uses deep neural networks to approximate Q-values, allowing RL to handle high-dimensional states like images.",
 "PolicyGradient": "Class of RL algorithms that directly optimize the agent's policy (action probabilities) via gradient ascent.",
 "PPO": "Proximal Policy Optimization - state-of-the-art RL algorithm that stabilizes training via clipped updates.",

 // Math & Advanced Foundations
 "Jacobian": "Matrix of all first-order partial derivatives. Describes how a vector-valued function changes with its inputs.",
 "Hessian": "Matrix of second-order partial derivatives. Describes the local curvature of a function's landscape.",
 "BayesTheorem": "Mathematical formula for updating the probability of a hypothesis as more evidence becomes available.",
 "LoRA": "Low-Rank Adaptation - fine-tuning method that trains small, low-rank matrices instead of the entire model.",

 // Activations
 "Activation": "Non-linear transfer function (ReLU, sigmoid, tanh, etc.) that lets networks model complex decision boundaries.",
 "ReLU": "Rectified Linear Unit with output max(0, x). Keeps gradients alive for positive inputs and is cheap to compute.",
 "Sigmoid": "Smooth squashing function mapping R→(0,1). Ideal for probabilities but saturates for large magnitudes.",
 "Tanh": "Hyperbolic tangent mapping R→(-1,1). Zero-centered which eases optimization in recurrent architectures.",

 // Outputs and Probabilities
 "Softmax": "Exponentiate-and-normalize operation that converts logits into a probability simplex. Sensitive to relative logit gaps.",
 "Accuracy": "Share of correct predictions. Combine with confusion matrices to understand class-wise behavior.",

 // Regularization and Generalization
 "Regularization": "Penalty term added to loss (L1, L2, dropout) to constrain weights and prevent overfitting on limited data.",

 // Signal and Spatial Reasoning
 "Convolution": "Sliding dot product between a kernel and local input window. Mirrors FIR filters implemented as MAC pipelines.",
 "Signal Processing": "Applying energy, SNR, and frequency-domain reasoning to features. Bridges classical EE with modern ML.",

 // Linear Algebra & Vision Foundations
 "Vectors & Matrices": "Vectors store strokes from the vision canvas; matrices arrange them into 2D grids so filters and dense layers can work on them.",
 "Dot Product": "Sum of element-wise products measuring how aligned two patterns are. Positive = similar strokes, negative = opposing.",
 "Matrix Multiplication": "Core operation behind dense layers. Each output neuron is a row·column dot product between weights and inputs.",
 "Tensors": "Multi-dimensional arrays (Batch×Channel×Height×Width) that hold the entire mini-batch. Keep shapes consistent when reshaping.",

 // Learned Parameters
 "Weights": "Trainable coefficients multiplying inputs. Training tunes them to align internal features with the target task.",
 "Bias": "Offset term added before activation. Shifts decision thresholds and prevents all-zero outputs.",

 // Data Fundamentals
 "Dataset": "Collection of labeled examples. Quality, balance, and coverage dominate achievable performance.",
 "Features": "Input descriptors fed into the network—pixels, sensor voltages, embeddings—often normalized before training.",
 "Labels": "Ground-truth targets used to compute loss during supervised learning.",

 // Metrics & Evaluation
 "Precision": "Ratio of true positives to total predicted positives. High precision means few false alarms.",
 "Recall": "Ratio of true positives to total actual positives. High recall means few missed cases.",
 "F1 Score": "Harmonic mean of Precision and Recall. Use this when you need a balance between finding all cases and being correct.",
 "Confusion Matrix": "A table layout that visualizes the performance of an algorithm, showing TP, TN, FP, and FN counts.",

 // Data & Preprocessing
 "Data Split": "Dividing the dataset into Training, Validation, and Test sets to ensure the model generalizes well.",
 "Normalization": "Scaling input data to a standard range (e.g., 0-1 or z-score) to help the optimizer converge faster.",

 // Advanced Concepts
 "Dropout": "Regularization technique where randomly selected neurons are ignored during training to prevent overfitting.",
 "Bias-Variance Tradeoff": "The balance between a model that is too simple (high bias, underfits) and too complex (high variance, overfits).",

 // Vision Basics
 "Pooling": "Downsampling operation that reduces spatial dimensions while retaining important features. Max pooling takes maximum, average pooling takes mean.",
 "Padding": "Border of pixels added around input to control output size. 'Same' padding keeps dimensions equal, 'Valid' allows shrinking.",
 "BatchNorm": "Normalizes layer inputs using batch statistics. Stabilizes training, allows higher learning rates, acts as regularizer.",
 "Skip Connection": "Identity mapping that bypasses layers, enabling gradient flow in very deep networks (ResNet innovation).",
 "Vision Architecture": "CNN designs like LeNet, AlexNet, VGG, ResNet that revolutionized image recognition.",
 "Autoencoder": "Network that compresses data to latent space and reconstructs it. Useful for compression, denoising, anomaly detection.",
 "GAN": "Generative Adversarial Network with Generator (creates fakes) and Discriminator (distinguishes real from fake) in a minimax game.",
 "L1L2": "L1 (MAE) is robust to outliers; L2 (MSE) penalizes large errors heavily. Choose based on your data distribution.",

 // Learning Paradigms
 "Supervised Learning": "Learning from labeled data (input-output pairs). The model learns to map inputs to correct outputs.",
 "Unsupervised Learning": "Finding patterns in data without labels. Clustering, PCA, autoencoders are unsupervised methods.",
 "Semi-Supervised": "Using both labeled and unlabeled data. Powerful when labels are expensive to obtain.",
 "Self-Supervised": "Creating labels from the data itself (e.g., predicting masked pixels). Contrastive learning is a key technique.",

 // Transformers & Modern
 "Transformer": "Architecture using self-attention to process sequences in parallel. Powers GPT, BERT, and modern LLMs.",
 "Vision Transformer": "Applying transformer architecture to images by treating patches as tokens. ViT rivals CNNs at scale.",
 "Diffusion Model": "Generative model that iteratively denoises random noise to create images. Powers Stable Diffusion, DALL-E.",
 "CLIP": "Model that learns to match images with text, enabling zero-shot classification from natural language.",
 "Stable Diffusion": "Latent diffusion model that generates images from text. Efficient enough to run on consumer GPUs.",
 "SAM": "Segment Anything Model - promptable segmentation that works on any object type without training.",
 "LLM": "Large Language Model - transformer trained on massive text. GPT, Claude, Llama are examples.",

 // Object Detection & Segmentation
 "Object Detection": "Finding and localizing all objects in an image with bounding boxes. YOLO, R-CNN are popular methods.",
 "Segmentation": "Pixel-level classification. Semantic (class per pixel), Instance (distinguish objects), Panoptic (both).",
 "IoU": "Intersection over Union - measures overlap between predicted and ground truth boxes. 0.5+ is typical detection threshold.",

 // RAG & Agents
 "RAG": "Retrieval-Augmented Generation - combines LLM with external knowledge base for up-to-date, grounded answers.",
 "AI Agent": "LLM that can plan, use tools, and take actions. Not just text generation but real task completion.",

 // MLOps
 "Quantization": "Reducing model precision (e.g., 32-bit to 8-bit) to make models smaller and faster.",
 "Distillation": "Training a small model to mimic a large model's behavior, preserving performance in a smaller package.",
 "MoE": "Mixture of Experts - activates only a subset of parameters per input, enabling massive models efficiently."
};

export function Tooltip({ word, overrideText }) {
 const [isVisible, setIsVisible] = useState(false);
 const [showMathPrompt, setShowMathPrompt] = useState(false);
 const { openMath } = useMath();

 const text = DICTIONARY[word] || overrideText || "Learn more about this concept.";
 const hasMath = !!MATH_TOPICS[word];

 const handleMathClick = (e) => {
 e.stopPropagation();
 setShowMathPrompt(true);
 };

 const handleMathConfirm = (e) => {
 e.stopPropagation();
 setShowMathPrompt(false);
 setIsVisible(false);
 openMath(word);
 };

 const handleMathCancel = (e) => {
 e.stopPropagation();
 setShowMathPrompt(false);
 };

 const handleKeyDown = (e) => {
 if (e.key === 'Escape') {
 setIsVisible(false);
 setShowMathPrompt(false);
 }
 };

 const handleBlur = (e) => {
 if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
 return;
 }
 setIsVisible(false);
 setShowMathPrompt(false);
 };

 return (
 <span
 className="tooltip-container"
 tabIndex={0}
 role="button"
 aria-describedby={isVisible ? `tooltip-${word}` : undefined}
 onMouseEnter={() => setIsVisible(true)}
 onMouseLeave={() => { setIsVisible(false); setShowMathPrompt(false); }}
 onFocus={() => setIsVisible(true)}
 onBlur={handleBlur}
 onKeyDown={handleKeyDown}
 >
 <span className={`tooltip-word ${hasMath ? 'has-math' : ''}`}>{word}</span>

 {isVisible && !showMathPrompt && (
 <div 
 id={`tooltip-${word}`}
 className="tooltip-popup"
 role="tooltip"
 >
 <p>{text}</p>
 {hasMath && (
 <button
 className="btn-math"
 onClick={handleMathClick}
 aria-label={`See math behind ${word}`}
 >
 See Math Behind It
 </button>
 )}
 </div>
 )}

 {showMathPrompt && (
 <div className="tooltip-popup math-prompt">
 <p className="prompt-title"> Want to dive deeper?</p>
 <p className="prompt-desc">Explore the mathematical formulas and see how each part affects the output.</p>
 <div className="prompt-buttons">
 <button className="btn-yes" onClick={handleMathConfirm}>
 Yes, show me!
 </button>
 <button className="btn-no" onClick={handleMathCancel}>
 Not now
 </button>
 </div>
 </div>
 )}

 <style>{`
 .tooltip-container {
 position: relative;
 cursor: help;
 display: inline;
 }
 .tooltip-word {
 text-decoration: underline dotted var(--text-secondary);
 color: var(--text-primary);
 transition: color 0.2s;
 }
 .tooltip-word.has-math {
 text-decoration: underline dotted var(--accent-primary);
 }
 .tooltip-popup {
 position: absolute;
 bottom: 100%;
 left: 50%;
 transform: translateX(-50%);
 background: var(--bg-panel);
 border: 1px solid var(--accent-primary);
 padding: 12px;
 border-radius: 8px;
 width: 220px;
 font-size: 12px;
 color: var(--text-primary);
 z-index: 1000;
 backdrop-filter: blur(10px);
 box-shadow: 0 4px 12px rgba(0,0,0,0.5);
 pointer-events: auto;
 animation: fadeInUp 0.15s ease-out;
 }
 @keyframes fadeInUp {
 from { opacity: 0; transform: translateX(-50%) translateY(5px); }
 to { opacity: 1; transform: translateX(-50%) translateY(0); }
 }
 .tooltip-popup p {
 margin: 0 0 8px 0;
 line-height: 1.4;
 }
 .math-prompt {
 width: 250px;
 border-color: var(--accent-secondary);
 }
 .prompt-title {
 font-weight: bold;
 color: var(--accent-primary);
 font-size: 14px;
 }
 .prompt-desc {
 font-size: 11px;
 color: var(--text-secondary);
 }
 .prompt-buttons {
 display: flex;
 gap: 8px;
 margin-top: 10px;
 }
 .btn-yes {
 flex: 1;
 background: var(--accent-primary);
 color: black;
 border: none;
 padding: 8px 12px;
 border-radius: 6px;
 font-size: 12px;
 cursor: pointer;
 font-weight: bold;
 transition: transform 0.1s;
 }
 .btn-yes:hover {
 transform: scale(1.05);
 }
 .btn-no {
 flex: 1;
 background: var(--bg-secondary);
 color: var(--text-secondary);
 border: 1px solid var(--glass-border);
 padding: 8px 12px;
 border-radius: 6px;
 font-size: 12px;
 cursor: pointer;
 }
 .btn-no:hover {
 background: var(--bg-panel);
 }
 .btn-math {
 background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
 color: white;
 border: none;
 padding: 8px 12px;
 border-radius: 6px;
 font-size: 11px;
 cursor: pointer;
 width: 100%;
 font-weight: bold;
 transition: transform 0.1s, box-shadow 0.2s;
 }
 .btn-math:hover {
 transform: scale(1.02);
 box-shadow: 0 0 10px var(--accent-primary);
 }
 .tooltip-container:hover .tooltip-word,
 .tooltip-container:focus .tooltip-word {
 color: var(--accent-primary);
 }
 .tooltip-container:focus {
 outline: none;
 }
 .tooltip-container:focus-visible .tooltip-word {
 outline: 2px solid var(--accent-primary);
 outline-offset: 2px;
 border-radius: 2px;
 }
 /* Triangle indicator */
 .tooltip-popup::after {
 content: "";
 position: absolute;
 top: 100%;
 left: 50%;
 margin-left: -5px;
 border-width: 5px;
 border-style: solid;
 border-color: var(--accent-primary) transparent transparent transparent;
 }
 .math-prompt::after {
 border-color: var(--accent-secondary) transparent transparent transparent;
 }
 `}</style>
 </span>
 );
}
