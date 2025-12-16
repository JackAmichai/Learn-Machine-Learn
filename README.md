# Learn Machine Learn 🧠

An interactive neural network visualization and training tool built with React and TensorFlow.js. Perfect for CS/EE students learning machine learning fundamentals.

## Features

- **Interactive Neural Network Visualization**: Watch neurons activate in real-time as data flows through the network
- **Vision Mode**: Draw patterns on a 10×10 canvas to train image classification
- **Comprehensive Math Explorer**: Deep-dive into the mathematics behind neural networks including:
  - Gradient Descent & Backpropagation
  - Activation Functions (Sigmoid, ReLU, Softmax)
  - Loss Functions & Optimizers (SGD, Adam, RMSprop)
  - Regularization (L1, L2, Dropout)
  - Signal Processing & Convolution
- **Guided Tour**: Step-by-step onboarding for new users
- **Interactive Tooltips**: Hover or focus on terms to learn definitions

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

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Navigate between elements |
| `Enter` / `Space` | Activate buttons |
| `Escape` | Close modals, tooltips, tour |
| `←` / `→` | Navigate tour steps |

## Tech Stack

- **React 19** - UI framework
- **Vite 5** - Build tool with HMR
- **TensorFlow.js** - In-browser machine learning
- **ESLint 9** - Code linting

## Project Structure

```
src/
├── components/
│   ├── Controls.jsx      # Training controls & hyperparameters
│   ├── MathModal.jsx     # Interactive math formula explorer
│   ├── NetworkCanvas.jsx # Neural network visualization
│   ├── Tooltip.jsx       # Accessible hover/focus tooltips
│   ├── TourGuide.jsx     # Onboarding walkthrough
│   └── VisionCanvas.jsx  # Drawing canvas for vision mode
├── data/
│   ├── mathContent.js    # Math formulas & explanations
│   └── tooltipDict.js    # Term definitions
├── App.jsx               # Main application
└── index.css             # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Open Source - Enjoy! 🎉
