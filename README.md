# Learn Machine Learn 🧠

An interactive neural network visualization and training tool built with React and TensorFlow.js. Perfect for CS/EE students learning machine learning fundamentals - from basics to cutting-edge computer vision!

## Features

- **Interactive Neural Network Visualization**: Watch neurons activate in real-time as data flows through the network
- **Vision Mode**: Draw patterns on a 10×10 canvas to train image classification
- **Comprehensive Math Explorer**: Deep-dive into the mathematics behind neural networks including:
  - Gradient Descent & Backpropagation
  - Activation Functions (Sigmoid, ReLU, Softmax)
  - Loss Functions & Optimizers (SGD, Adam, RMSprop)
  - Regularization (L1, L2, Dropout)
  - Signal Processing & Convolution
  - **NEW: Vision Topics**: Pooling, Padding, BatchNorm, Skip Connections
  - **NEW: Learning Paradigms**: Supervised, Unsupervised, Semi-Supervised, Self-Supervised
  - **NEW: Modern Architectures**: Transformers, Vision Transformer (ViT), Diffusion Models
  - **NEW: Advanced Topics**: CLIP, Stable Diffusion, SAM, LLMs, RAG, Agents
  - **NEW: MLOps**: Quantization, Distillation, MoE
- **Guided Tour**: Step-by-step onboarding for new users
- **Interactive Tooltips**: Hover or focus on terms to learn definitions
- **16-Week Learning Path**: Structured curriculum from basics to advanced computer vision

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Learn-Machine-Learn.git
cd Learn-Machine-Learn

# Install dependencies
npm ci

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

### Linting

```bash
npm run lint
```

## Accessibility

This project follows WCAG AA guidelines:

- **Keyboard Navigation**: All interactive elements are reachable via Tab/Shift+Tab
- **Focus Indicators**: Visible focus rings on all focusable elements
- **Escape Key Support**: Close modals and tooltips with Escape
- **Arrow Key Navigation**: Navigate tour steps with Arrow keys
- **ARIA Labels**: Semantic markup for screen readers
- **Touch Targets**: Minimum 44×44px for mobile accessibility
- **Reduced Motion**: Respects `prefers-reduced-motion` system setting
- **High Contrast**: Supports forced-colors mode

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Navigate between elements |
| `Enter` / `Space` | Activate buttons / Toggle training |
| `Escape` | Close modals, tooltips, tour / Pause training |
| `←` / `→` | Navigate tour steps |
| `T` | Toggle dark/light theme |
| `F` | Toggle fullscreen |
| `?` | Show keyboard shortcuts help |

## Tech Stack

- **React 19** - UI framework
- **Vite 5** - Build tool with HMR
- **TensorFlow.js** - In-browser machine learning
- **Vitest** - Unit testing framework
- **ESLint 9** - Code linting

## Learning Path

A 16-week structured curriculum for mastering computer vision and modern ML:

### Phase 1: Foundations (Weeks 1-4)
- Neural Networks, Linear Algebra, Python basics
- Build your first neural network from scratch

### Phase 2: Core ML (Weeks 5-8)
- Supervised vs Unsupervised learning
- CNNs: Convolution, pooling, architectures
- Train on MNIST, CIFAR-10

### Phase 3: Deep Vision (Weeks 9-12)
- ResNet, EfficientNet
- Object Detection: YOLO, R-CNN
- Semantic Segmentation: U-Net, DeepLab

### Phase 4: Advanced Topics (Weeks 13-16)
- Vision Transformers (ViT)
- Self-supervised: CLIP, contrastive learning
- Diffusion models, Model optimization

## Recent Additions (v2.0)

| Category | Topics Added |
|----------|-------------|
| **Vision Basics** | Pooling, Padding, BatchNorm, Dropout, Skip Connections |
| **Learning Paradigms** | Supervised, Unsupervised, Semi-Supervised, Self-Supervised |
| **Transformers** | Attention, Multi-head, Vision Transformer (ViT) |
| **Generative** | Diffusion Models, Stable Diffusion, GAN |
| **Multimodal** | CLIP, BLIP-2, GPT-4V, Multimodal Learning |
| **Modern CV** | Object Detection (YOLO, R-CNN), Segmentation (U-Net, SAM) |
| **LLM & Agents** | LLMs, RAG, AI Agents, Tool Use |
| **MLOps** | Quantization, Knowledge Distillation, Mixture of Experts |
| **Cutting Edge** | NeRF, Sora, Reasoning Models, Open Weights |

## Project Structure

```
src/
├── components/
│   ├── Controls.jsx      # Training controls & hyperparameters
│   ├── MathModal.jsx     # Interactive math formula explorer
│   ├── NetworkGraph.jsx  # Neural network visualization
│   ├── OutputPlot.jsx    # Decision boundary visualization
│   ├── StatsPanel.jsx    # Metrics: confusion matrix, F1, accuracy
│   ├── Tooltip.jsx       # Accessible hover/focus tooltips
│   ├── TourGuide.jsx     # Onboarding walkthrough
│   ├── VisionCanvas.jsx  # Drawing canvas for vision mode
│   └── WeightHeatmap.jsx # Weight visualization heatmap
├── contexts/
│   ├── ThemeContext.jsx  # Dark/light theme provider
│   ├── ToastContext.jsx  # Toast notifications provider
│   └── MathContext.jsx   # Math modal provider
├── engine/
│   ├── NeuralNetwork.js  # TensorFlow.js wrapper class
│   ├── data.js           # Dataset generation (XOR, Spiral, etc.)
│   └── mathContent.js    # Math formulas & explanations
├── hooks/
│   ├── useNeuralNetwork.js # Main training state management
│   ├── useTheme.js       # Theme context hook
│   └── useToast.js       # Toast notifications hook
├── test/
│   └── setup.js          # Vitest setup
├── App.jsx               # Main application
└── index.css             # Global styles
```

## Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests and linting: `npm run lint && npm run test:run`
4. Commit changes (`git commit -m 'feat: add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Notes

- Dev dependencies have known moderate vulnerabilities (esbuild/vite) that only affect the dev server, not production builds
- TensorFlow.js warnings about WebGL are expected in Node.js test environment

## License

Open Source - Enjoy! 🎉
