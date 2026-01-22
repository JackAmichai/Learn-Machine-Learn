export const quizzes = [
  {
    id: 1,
    question: "Which of these activation functions is known for its 'S'-shaped curve?",
    options: ["ReLU", "Sigmoid", "Tanh", "Linear"],
    correctAnswer: "Sigmoid",
    explanation: "The Sigmoid function maps any input value to a value between 0 and 1, creating an S-shaped curve."
  },
  {
    id: 2,
    question: "In a neural network, what does the 'learning rate' control?",
    options: ["The number of neurons", "The size of the step taken during optimization", "The amount of training data", "The initialization of weights"],
    correctAnswer: "The size of the step taken during optimization",
    explanation: "The learning rate determines how much the model's weights are adjusted with respect to the loss gradient."
  },
  {
    id: 3,
    question: "What is the result of multiplying a 3x2 matrix by a 2x4 matrix?",
    options: ["3x2 Matrix", "2x4 Matrix", "3x4 Matrix", "Undefined"],
    correctAnswer: "3x4 Matrix",
    explanation: "Matrix multiplication (M x N) * (N x P) results in a matrix of dimensions (M x P)."
  },
  {
    id: 4,
    question: "Which term describes the phenomenon where a model performs well on training data but poorly on unseen data?",
    options: ["Underfitting", "Overfitting", "Convergence", "Regularization"],
    correctAnswer: "Overfitting",
    explanation: "Overfitting occurs when a model learns the training data too well, including its noise, failing to generalize to new data."
  },
  {
    id: 5,
    question: "What is the 'derivative' of a function essentially representing?",
    options: ["The area under the curve", "The rate of change at a specific point", "The maximum value", "The average value"],
    correctAnswer: "The rate of change at a specific point",
    explanation: "In calculus, the derivative represents the instantaneous rate of change (slope) of a function at a given point."
  },
  {
    id: 6,
    question: "Who is often considered the 'father' of the concept of the Turing Machine?",
    options: ["John von Neumann", "Alan Turing", "Claude Shannon", "Ada Lovelace"],
    correctAnswer: "Alan Turing",
    explanation: "Alan Turing proposed the Turing Machine in 1936 as a mathematical model of computation."
  },
  {
    id: 7,
    question: "What does 'ReLU' stand for?",
    options: ["Regularized Linear Unit", "Rectified Linear Unit", "Recursive Linear Unit", "Rational Linear Unit"],
    correctAnswer: "Rectified Linear Unit",
    explanation: "ReLU stands for Rectified Linear Unit, defined as f(x) = max(0, x)."
  },
  {
    id: 8,
    question: "In the context of AI, what is a 'tensor'?",
    options: ["A type of neuron", "A multidimensional array", "A loss function", "A learning algorithm"],
    correctAnswer: "A multidimensional array",
    explanation: "Tensors are generalizations of matrices to higher dimensions, used as the primary data structure in deep learning frameworks."
  },
  {
    id: 9,
    question: "What is the primary purpose of 'Backpropagation'?",
    options: ["To initialize weights", "To calculate the gradient of the loss function", "To make predictions", "To visualize the network"],
    correctAnswer: "To calculate the gradient of the loss function",
    explanation: "Backpropagation efficiently computes the gradient of the loss function with respect to the weights, allowing for optimization."
  },
  {
    id: 10,
    question: "Which logic gate can a single perceptron NOT solve?",
    options: ["AND", "OR", "XOR", "NOT"],
    correctAnswer: "XOR",
    explanation: "The XOR problem is not linearly separable, so a single layer perceptron cannot solve it (as shown by Minsky and Papert)."
  },
  {
    id: 11,
    question: "What does 'GPT' stand for in models like GPT-4?",
    options: ["General Purpose Transformer", "Generative Pre-trained Transformer", "Graph Processing Tensor", "Global Pattern Training"],
    correctAnswer: "Generative Pre-trained Transformer",
    explanation: "GPT stands for Generative Pre-trained Transformer, indicating it's a transformer-based model pre-trained to generate text."
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
  }
];
