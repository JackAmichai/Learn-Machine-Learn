export const quizzes = [
  {
    id: 1,
    question: "Which of these activation functions is known for its 'S'-shaped curve?",
    options: ["ReLU", "Sigmoid", "Tanh", "Linear"],
    correctAnswer: "Sigmoid",
    explanation: "The Sigmoid function maps any input value to a value between 0 and 1, creating an S-shaped curve.",
    category: "basics"
  },
  {
    id: 2,
    question: "In a neural network, what does the 'learning rate' control?",
    options: ["The number of neurons", "The size of the step taken during optimization", "The amount of training data", "The initialization of weights"],
    correctAnswer: "The size of the step taken during optimization",
    explanation: "The learning rate determines how much the model's weights are adjusted with respect to the loss gradient.",
    category: "training"
  },
  {
    id: 3,
    question: "What is the result of multiplying a 3x2 matrix by a 2x4 matrix?",
    options: ["3x2 Matrix", "2x4 Matrix", "3x4 Matrix", "Undefined"],
    correctAnswer: "3x4 Matrix",
    explanation: "Matrix multiplication (M x N) * (N x P) results in a matrix of dimensions (M x P).",
    category: "basics"
  },
  {
    id: 4,
    question: "Which term describes the phenomenon where a model performs well on training data but poorly on unseen data?",
    options: ["Underfitting", "Overfitting", "Convergence", "Regularization"],
    correctAnswer: "Overfitting",
    explanation: "Overfitting occurs when a model learns the training data too well, including its noise, failing to generalize to new data.",
    category: "training"
  },
  {
    id: 5,
    question: "What is the 'derivative' of a function essentially representing?",
    options: ["The area under the curve", "The rate of change at a specific point", "The maximum value", "The average value"],
    correctAnswer: "The rate of change at a specific point",
    explanation: "In calculus, the derivative represents the instantaneous rate of change (slope) of a function at a given point.",
    category: "basics"
  },
  {
    id: 6,
    question: "Who is often considered the 'father' of the concept of the Turing Machine?",
    options: ["John von Neumann", "Alan Turing", "Claude Shannon", "Ada Lovelace"],
    correctAnswer: "Alan Turing",
    explanation: "Alan Turing proposed the Turing Machine in 1936 as a mathematical model of computation.",
    category: "basics"
  },
  {
    id: 7,
    question: "What does 'ReLU' stand for?",
    options: ["Regularized Linear Unit", "Rectified Linear Unit", "Recursive Linear Unit", "Rational Linear Unit"],
    correctAnswer: "Rectified Linear Unit",
    explanation: "ReLU stands for Rectified Linear Unit, defined as f(x) = max(0, x).",
    category: "basics"
  },
  {
    id: 8,
    question: "In the context of AI, what is a 'tensor'?",
    options: ["A type of neuron", "A multidimensional array", "A loss function", "A learning algorithm"],
    correctAnswer: "A multidimensional array",
    explanation: "Tensors are generalizations of matrices to higher dimensions, used as the primary data structure in deep learning frameworks.",
    category: "basics"
  },
  {
    id: 9,
    question: "What is the primary purpose of 'Backpropagation'?",
    options: ["To initialize weights", "To calculate the gradient of the loss function", "To make predictions", "To visualize the network"],
    correctAnswer: "To calculate the gradient of the loss function",
    explanation: "Backpropagation efficiently computes the gradient of the loss function with respect to the weights, allowing for optimization.",
    category: "training"
  },
  {
    id: 10,
    question: "Which logic gate can a single perceptron NOT solve?",
    options: ["AND", "OR", "XOR", "NOT"],
    correctAnswer: "XOR",
    explanation: "The XOR problem is not linearly separable, so a single layer perceptron cannot solve it (as shown by Minsky and Papert).",
    category: "basics"
  },
  {
    id: 11,
    question: "What does 'GPT' stand for in models like GPT-4?",
    options: ["General Purpose Transformer", "Generative Pre-trained Transformer", "Graph Processing Tensor", "Global Pattern Training"],
    correctAnswer: "Generative Pre-trained Transformer",
    explanation: "GPT stands for Generative Pre-trained Transformer, indicating it's a transformer-based model pre-trained to generate text.",
    category: "nlp"
  },
  {
    id: 12,
    question: "Which mechanism allows Transformers to process input sequences in parallel?",
    options: ["Recurrence", "Convolution", "Self-Attention", "Backpropagation"],
    correctAnswer: "Self-Attention",
    explanation: "Self-Attention allows the model to weigh the importance of different words in a sentence relative to each other, regardless of their distance."
  },
  {
    id: 13,
    question: "What is the process of breaking text into smaller units for an LLM called?",
    options: ["Normalization", "Vectorization", "Tokenization", "Embedding"],
    correctAnswer: "Tokenization",
    explanation: "Tokenization converts raw text into smaller units (tokens) that can be processed by the model."
  },
  {
    id: 14,
    question: "What parameter controls the randomness of an LLM's output?",
    options: ["Learning Rate", "Temperature", "Epochs", "Batch Size"],
    correctAnswer: "Temperature",
    explanation: "Temperature scales the logits before softmax; higher values increase randomness, while lower values make the output more deterministic."
  },
  {
    id: 15,
    question: "What technique is often used to align LLMs with human values?",
    options: ["RLHF", "Gradient Descent", "Dropout", "MaxPooling"],
    correctAnswer: "RLHF",
    explanation: "RLHF (Reinforcement Learning from Human Feedback) uses human feedback to train a reward model and fine-tune the LLM."
  },
  {
    id: 16,
    question: "In a CNN, what does 'pooling' typically do?",
    options: ["Increases image resolution", "Reduces spatial dimensions", "Adds more convolutional layers", "Normalizes activations"],
    correctAnswer: "Reduces spatial dimensions",
    explanation: "Pooling (max or average) downsamples the feature maps, reducing spatial dimensions while retaining important information."
  },
  {
    id: 17,
    question: "What is the main purpose of an autoencoder?",
    options: ["Classification", "Compression and reconstruction", "Object detection", "Translation"],
    correctAnswer: "Compression and reconstruction",
    explanation: "Autoencoders learn to compress data into a latent space and reconstruct it, useful for dimensionality reduction and denoising."
  },
  {
    id: 18,
    question: "In GANs, what does the Generator network do?",
    options: ["Classifies images", "Creates fake images", "Enhances real images", "Segments objects"],
    correctAnswer: "Creates fake images",
    explanation: "The Generator in a GAN creates synthetic images to fool the Discriminator, learning to produce realistic samples."
  },
  {
    id: 19,
    question: "What is 'skip connection' in neural networks?",
    options: ["A way to skip training epochs", "An identity mapping that bypasses layers", "A type of dropout", "A regularization technique"],
    correctAnswer: "An identity mapping that bypasses layers",
    explanation: "Skip (residual) connections add the input of a layer to its output, enabling gradient flow in very deep networks."
  },
  {
    id: 20,
    question: "Which type of learning uses data without labels?",
    options: ["Supervised", "Unsupervised", "Reinforcement", "Active"],
    correctAnswer: "Unsupervised",
    explanation: "Unsupervised learning finds patterns in unlabeled data, like clustering or dimensionality reduction."
  },
  {
    id: 21,
    question: "What is 'Vision Transformer' (ViT)?",
    options: ["A transformer for text only", "A CNN with attention", "Applying transformer architecture to images", "A type of pooling"],
    correctAnswer: "Applying transformer architecture to images",
    explanation: "ViT treats images as sequences of patches and processes them with transformer self-attention mechanisms."
  },
  {
    id: 22,
    question: "What does 'diffusion model' do to generate images?",
    options: ["Adds noise then denoises iteratively", "Uses adversarial training", "Applies convolution", "Uses attention only"],
    correctAnswer: "Adds noise then denoises iteratively",
    explanation: "Diffusion models start with noise and progressively denoise it through a learned reverse process to generate images."
  },
  {
    id: 23,
    question: "What is CLIP primarily used for?",
    options: ["Image generation", "Zero-shot image classification", "Speech recognition", "Video compression"],
    correctAnswer: "Zero-shot image classification",
    explanation: "CLIP learns to match images with text, enabling zero-shot classification using natural language prompts."
  },
  {
    id: 24,
    question: "What is 'Instance Segmentation' different from Semantic Segmentation?",
    options: ["Uses CNNs", "Distinguishes individual objects of same class", "Only works on videos", "Requires more memory"],
    correctAnswer: "Distinguishes individual objects of same class",
    explanation: "Instance segmentation distinguishes separate instances of objects, while semantic segmentation labels pixel classes without distinguishing instances."
  },
  {
    id: 25,
    question: "What is RAG (Retrieval-Augmented Generation)?",
    options: ["A type of CNN", "Combining LLM with external knowledge", "A regularization method", "A loss function"],
    correctAnswer: "Combining LLM with external knowledge",
    explanation: "RAG combines a language model with a retrieval system to provide up-to-date information and reduce hallucinations."
  },
  {
    id: 26,
    question: "What does 'quantization' do to neural networks?",
    options: ["Adds more parameters", "Reduces precision of weights (e.g., 32-bit to 8-bit)", "Increases training speed", "Adds noise to data"],
    correctAnswer: "Reduces precision of weights (e.g., 32-bit to 8-bit)",
    explanation: "Quantization reduces model size and computational requirements by using lower precision representations of weights."
  },
  {
    id: 27,
    question: "What is the main innovation of ResNet?",
    options: ["Using larger kernels", "Skip connections enabling very deep networks", "Using only 1 layer", "Removing activation functions"],
    correctAnswer: "Skip connections enabling very deep networks",
    explanation: "ResNet introduced residual connections that allow training networks with 100+ layers by enabling gradient flow."
  },
  {
    id: 28,
    question: "What does Batch Normalization normalize?",
    options: ["Input images", "Layer activations within a batch", "Network weights", "Dataset labels"],
    correctAnswer: "Layer activations within a batch",
    explanation: "BatchNorm normalizes the activations of each layer to have zero mean and unit variance within each mini-batch."
  },
  {
    id: 29,
    question: "What is 'self-supervised learning'?",
    options: ["Learning with no data at all", "Creating labels from the data itself", "Using pre-trained models only", "Unsupervised with clustering"],
    correctAnswer: "Creating labels from the data itself",
    explanation: "Self-supervised learning creates proxy tasks where the labels are derived from the input data itself (e.g., predicting masked pixels)."
  },
  {
    id: 30,
    question: "What does IoU measure in object detection?",
    options: ["Speed of detection", "Overlap between predicted and ground truth box", "Number of objects", "Image quality"],
    correctAnswer: "Overlap between predicted and ground truth box",
    explanation: "IoU (Intersection over Union) measures the overlap between predicted bounding box and ground truth, used to determine correct detections."
  },
  {
    id: 31,
    question: "What is the primary goal of a Support Vector Machine (SVM)?",
    options: ["To minimize the margin", "To maximize the margin between classes", "To cluster data into groups", "To predict continuous values"],
    correctAnswer: "To maximize the margin between classes",
    explanation: "SVM aims to find the hyperplane that separates two classes with the largest possible distance (margin) to the nearest points (support vectors)."
  },
  {
    id: 32,
    question: "In Reinforcement Learning, what does the 'Discount Factor' (gamma) control?",
    options: ["The learning rate", "The importance of future rewards vs immediate rewards", "The number of training episodes", "The size of the action space"],
    correctAnswer: "The importance of future rewards vs immediate rewards",
    explanation: "The discount factor determines how much the agent values future rewards. A value near 0 makes it 'shortsighted', while near 1 makes it 'farsighted'."
  },
  {
    id: 33,
    question: "What is the 'Jacobian' matrix essentially representing?",
    options: ["Second-order derivatives", "All first-order partial derivatives of a vector function", "The inverse of a matrix", "The variance of a distribution"],
    correctAnswer: "All first-order partial derivatives of a vector function",
    explanation: "The Jacobian matrix is the multi-variable generalization of the derivative, representing how each output component changes with respect to each input component."
  },
  {
    id: 34,
    question: "Which optimizer decouples weight decay from the gradient update?",
    options: ["SGD", "Adam", "AdamW", "RMSprop"],
    correctAnswer: "AdamW",
    explanation: "AdamW improves upon Adam by decoupling the weight decay from the adaptive learning rate update, leading to better generalization."
  },
  {
    id: 35,
    question: "What does 'LoRA' stand for in the context of fine-tuning?",
    options: ["Local Random Adaptation", "Low-Rank Adaptation", "Logistic Regression Analysis", "Layered Output Regularization"],
    correctAnswer: "Low-Rank Adaptation",
    explanation: "LoRA (Low-Rank Adaptation) fine-tunes large models by training small, low-rank matrices that are added to the frozen original weights."
  },
  {
    id: 36,
    question: "Which algorithm uses the 'Earth Mover's Distance' for better stability?",
    options: ["DCGAN", "WGAN", "CycleGAN", "VAEs"],
    correctAnswer: "WGAN",
    explanation: "WGAN (Wasserstein GAN) uses the Wasserstein distance (Earth Mover's distance) to provide a more stable training objective than standard GANs."
  },
  {
    id: 37,
    question: "In a Decision Tree, what does a 'Gini Impurity' of 0 represent?",
    options: ["Maximum randomness", "A perfectly pure node (all one class)", "A balanced split", "An empty node"],
    correctAnswer: "A perfectly pure node (all one class)",
    explanation: "Gini Impurity measures how mixed a node is. 0 means all items in the node belong to a single class (perfect purity)."
  },
  {
    id: 38,
    question: "What is the 'Hessian' matrix used to describe?",
    options: ["First-order derivatives", "Local curvature (second-order derivatives)", "Matrix rank", "Feature importance"],
    correctAnswer: "Local curvature (second-order derivatives)",
    explanation: "The Hessian matrix contains the second-order partial derivatives and describes the local curvature of the loss landscape."
  },
  {
    id: 39,
    question: "Which RL algorithm is known for using a 'clipping' mechanism to stabilize updates?",
    options: ["QLearning", "DQN", "PPO", "REINFORCE"],
    correctAnswer: "PPO",
    explanation: "PPO (Proximal Policy Optimization) clips the policy update to prevent the model from changing too drastically in a single step."
  },
  {
    id: 40,
    question: "What is the primary difference between t-SNE and PCA?",
    options: ["PCA is faster", "t-SNE is nonlinear while PCA is linear", "t-SNE is used for classification", "There is no difference"],
    correctAnswer: "t-SNE is nonlinear while PCA is linear",
    explanation: "PCA is a linear dimensionality reduction method, whereas t-SNE is a nonlinear method better at preserving local clusters for visualization."
  },
  {
    id: 41,
    question: "Which loss function is less sensitive to outliers than MSE?",
    options: ["Huber Loss", "Binary Cross-Entropy", "L2 Loss", "Categorical Cross-Entropy"],
    correctAnswer: "Huber Loss",
    explanation: "Huber Loss is quadratic for small errors and linear for large errors, making it more robust to outliers than Mean Squared Error."
  },
  {
    id: 42,
    question: "What does 'Anchor Boxes' help with in object detection?",
    options: ["Color correction", "Handling objects of varying sizes and aspect ratios", "Reducing training time", "Increasing image resolution"],
    correctAnswer: "Handling objects of varying sizes and aspect ratios",
    explanation: "Anchor boxes provide predefined shapes that the model uses as references to predict bounding boxes for objects."
  },
  {
    id: 43,
    question: "In Bayesian terms, what is the 'Posterior'?",
    options: ["The initial belief", "The likelihood of evidence", "The updated belief after seeing new data", "The total evidence"],
    correctAnswer: "The updated belief after seeing new data",
    explanation: "In Bayes' Theorem, the posterior probability is the updated probability of a hypothesis after taking new evidence into account."
  },
  {
    id: 44,
    question: "Which architecture introduced 'Inception Modules'?",
    options: ["ResNet", "VGG", "GoogLeNet", "AlexNet"],
    correctAnswer: "GoogLeNet",
    explanation: "GoogLeNet (Inception v1) introduced Inception modules that use parallel filters of different sizes (1x1, 3x3, 5x5)."
  },
  {
    id: 45,
    question: "What is the 'Kernel Trick' in SVMs used for?",
    options: ["To reduce data size", "To project data into higher dimensions for linear separation", "To speed up training", "To regularize weights"],
    correctAnswer: "To project data into higher dimensions for linear separation",
    explanation: "The kernel trick allows SVMs to operate in a high-dimensional feature space without explicitly calculating the coordinates of the data in that space."
  },
  {
    id: 46,
    scenario: "You're training an image generator. You used the closest match loss function, but your generated images look blurry and lack detail. What algorithm would you switch to that punishes blurriness by forcing the discriminator to distinguish real from fake?",
    imageLeft: "blurry_output",
    imageRight: "sharp_reference",
    options: ["RNN", "GAN", "VAE", "Diffusion"],
    correctAnswer: "GAN",
    explanation: "GANs (Generative Adversarial Networks) use a Generator to create images and a Discriminator to distinguish real from fake. This adversarial process forces the generator to produce sharper, more detailed images - the discriminator essentially 'punishes' blurry outputs by rejecting them!"
  },
  {
    id: 47,
    scenario: "You're building a chatbot that needs to remember what the user said earlier in the conversation. Your model keeps 'forgetting' early messages as it processes new ones. What architecture should you use that has a 'highway' for information to flow through time?",
    options: ["CNN", "RNN", "LSTM", "Transformer"],
    correctAnswer: "LSTM",
    explanation: "LSTM (Long Short-Term Memory) has a cell state that acts like a 'highway' allowing information to flow through many time steps without vanishing. It uses gates (forget, input, output) to control what information is stored and passed along."
  },
  {
    id: 48,
    scenario: "You want to generate new images by starting with pure noise and gradually cleaning it up into a recognizable image - like an artist painting from a blank canvas. Which approach works like this?",
    options: ["GAN", "VAE", "Diffusion", "CNN"],
    correctAnswer: "Diffusion",
    explanation: "Diffusion models work by iteratively denoising - they start with random Gaussian noise and progressively remove noise through a learned reverse process. This is how Stable Diffusion and DALL-E generate images!"
  },
  {
    id: 49,
    scenario: "Your model is memorizing the training data instead of learning general patterns. When you test it on new data, it fails. What's happening and what's a quick fix?",
    imageLeft: "training_100%",
    imageRight: "test_60%",
    options: ["Underfitting - add more layers", "Overfitting - use dropout or get more data", "Vanishing gradient - use ReLU", "Exploding gradient - reduce learning rate"],
    correctAnswer: "Overfitting - use dropout or get more data",
    explanation: "This is classic overfitting! Your model has memorized the training data rather than learning generalizable patterns. Use dropout to randomly disable neurons during training, or get more data, or simplify the model."
  },
  {
    id: 50,
    scenario: "You're training a network but the gradients are getting smaller and smaller until almost nothing changes. Your weights are barely updating! What optimization technique helps gradients flow through many layers?",
    options: ["Sigmoid activation", "Residual connections", "Max pooling", "Batch normalization"],
    correctAnswer: "Residual connections",
    explanation: "This is the vanishing gradient problem! Skip/residual connections (from ResNet) add the input directly to the output, creating a 'gradient superhighway' that lets gradients flow unchanged through deep networks."
  },
  {
    id: 51,
    scenario: "You need to compress your 7GB language model to fit on a phone. It should still understand language but use way less memory. What technique reduces precision (e.g., 32-bit to 8-bit) with minimal quality loss?",
    options: ["Distillation", "Quantization", "Pruning", "LoRA"],
    correctAnswer: "Quantization",
    explanation: "Quantization reduces the precision of weights from 32-bit floats to 8-bit integers (or even lower). This shrinks model size by 4x and speeds up inference dramatically with minimal accuracy loss!"
  },
  {
    id: 52,
    scenario: "Your customer service bot needs to cite sources for its answers - it keeps making up facts. What technique combines your LLM with a database of documents so it retrieves relevant info before answering?",
    options: ["Fine-tuning", "RAG", "RLHF", "Chain-of-thought"],
    correctAnswer: "RAG",
    explanation: "RAG (Retrieval-Augmented Generation) adds a retrieval step - before the LLM answers, it searches a knowledge base for relevant documents, then includes that context in the prompt. This reduces hallucinations!"
  },
  {
    id: 53,
    scenario: "You're analyzing medical images and need to both classify whether there's a tumor AND find exactly where it is (pixel-level). What task does both simultaneously?",
    options: ["Object Detection", "Semantic Segmentation", "Instance Segmentation", "Classification"],
    correctAnswer: "Instance Segmentation",
    explanation: "Instance Segmentation does both - it classifies what's in each pixel AND distinguishes separate instances of the same class (like two different tumors in one image). Mask R-CNN does this!"
  },
  {
    id: 54,
    scenario: "You have 1000 CPU hours of training but your model isn't learning. The loss is stuck. You suspect the learning rate is wrong. What should you try first?",
    options: ["Increase batch size", "Use learning rate scheduling/warmup", "Add more layers", "Use softmax"],
    correctAnswer: "Use learning rate scheduling/warmup",
    explanation: "A bad learning rate can cause training to stall. Learning rate warmup starts small (letting weights stabilize) then increases - this helps large models train stably. Cyclical schedules also help!"
  },
  {
    id: 55,
    scenario: "Your model passes training with flying colors but some neurons have died (always output 0). What activation function caused this 'Dying ReLU' problem and what's a simple fix?",
    options: ["Sigmoid - use tanh", "ReLU - use Leaky ReLU", "Tanh - use sigmoid", "Linear - use ReLU"],
    correctAnswer: "ReLU - use Leaky ReLU",
    explanation: "ReLU neurons can 'die' when they always output 0 for inputs in the training data. Leaky ReLU fixes this by allowing a small positive slope (e.g., 0.01x) even for negative inputs!"
  },
  {
    id: 56,
    scenario: "You're building a recommendation system where user preferences should influence each other. Like, if users who liked X also liked Y, recommend Y to someone who liked X. What algorithm captures these relationships?",
    options: ["Collaborative Filtering", "Content-Based Filtering", "Reinforcement Learning", "K-Means Clustering"],
    correctAnswer: "Collaborative Filtering",
    explanation: "Collaborative filtering makes recommendations based on user behavior similarity - 'users who agreed before will agree again'. This is how Netflix and Amazon recommend things!"
  },
  {
    id: 57,
    scenario: "Your robot needs to learn by trial and error - receiving rewards or penalties for actions in an environment. No labeled data! What type of learning is this?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Transfer Learning"],
    correctAnswer: "Reinforcement Learning",
    explanation: "Reinforcement Learning (RL) uses rewards and penalties! The agent learns a policy by exploring actions and maximizing cumulative reward. This is how AlphaGo learned to play Go!",
    category: "paradigms"
  },
  {
    id: 58,
    question: "Which mechanism lets every position attend to every other in Transformers?",
    options: ["Convolution", "Recurrence", "Self-Attention", "Pooling"],
    correctAnswer: "Self-Attention",
    explanation: "Self-Attention lets each word 'look at' all other words to determine relevant context, regardless of distance!",
    category: "nlp",
    visualType: "attention-diagram"
  },
  {
    id: 59,
    question: "Your dataset has 99% negative examples. What helps?",
    options: ["More layers", "Class weighting", "Tanh activation", "Increase LR"],
    correctAnswer: "Class weighting",
    explanation: "Class weighting makes misclassifying rare cases more expensive!",
    category: "training"
  },
  {
    id: 60,
    scenario: "Your VAE generates blurry images. You want to walk between concepts in latent space. Which model adds probabilistic distributions?",
    options: ["GAN", "Standard Autoencoder", "VAE", "CNN"],
    correctAnswer: "VAE",
    explanation: "VAE forces latent space to be Gaussian - allowing interpolation!",
    category: "generative"
  }
];
