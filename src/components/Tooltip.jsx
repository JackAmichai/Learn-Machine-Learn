import { useState } from 'react';
import { useMath } from '../contexts/MathContext';
import { MATH_TOPICS } from '../engine/mathContent';

const DICTIONARY = {
    // Core Training Concepts
    "Loss": "The 'error score' that tells the network how wrong it is. Lower = better! The network's goal is to minimize this number through learning.",
    "Epoch": "One complete pass through ALL training data. Like reading a textbook once. Usually needs many epochs (re-reads) to learn well.",
    
    // Architecture Terms
    "Hidden Layer": "The 'thinking' layers between input and output. They learn to detect patterns and features that help make predictions.",
    "Nodes": "Individual neurons - the basic computing units. Each node takes inputs, multiplies by weights, sums them up, and outputs a number.",
    "Neurons": "The brain cells of a neural network! Each neuron receives inputs, processes them (multiply, sum, activate), and passes output forward.",
    "Layer": "A group of neurons working in parallel. Data flows through layers: Input → Hidden(s) → Output. More layers = deeper network.",
    
    // Network Types
    "Dense": "Also called 'Fully Connected'. Every neuron connects to EVERY neuron in the next layer. Simple but powerful for tabular data.",
    "CNN": "Convolutional Neural Network - the king of image recognition! Uses sliding filters to detect edges, textures, then complex shapes.",
    "RNN": "Recurrent Neural Network - has memory! Processes sequences (text, audio, time series) by remembering what came before.",
    "MLP": "Multi-Layer Perceptron - the classic neural network with fully connected layers. Great starting point for learning!",
    
    // Hyperparameters
    "Learning Rate": "Step size when updating weights. Too high = overshoots optimal values. Too low = learns too slowly. Sweet spot: 0.001-0.1",
    "Activation": "The 'decision function' after each neuron. Adds non-linearity so networks can learn curves, not just straight lines.",
    "Optimizer": "The learning strategy. SGD = simple steps downhill. Adam = smart adaptive steps that speed up learning.",
    
    // Training Stats
    "Accuracy": "Percentage of correct predictions. 90% accuracy = got 9 out of 10 right.",
    "Batch Size": "How many samples to process before updating weights. Larger = stable but slow. Smaller = noisy but fast.",
    "Weights": "The learnable parameters - numbers that multiply inputs. Training = finding the best weight values.",
    "Bias": "A learnable offset added to each neuron. Lets the neuron activate even when inputs are zero.",
    
    // Activation Functions
    "ReLU": "Rectified Linear Unit: outputs input if positive, else 0. Simple, fast, and works great! Most popular activation.",
    "Sigmoid": "Squashes any number to 0-1 range. Good for probabilities. Can cause 'vanishing gradients' in deep networks.",
    "Tanh": "Like sigmoid but outputs -1 to 1. Zero-centered which helps learning. Used in RNNs.",
    
    // Data
    "Dataset": "The collection of examples used to train the network. More diverse data = better generalization.",
    "Features": "The input variables/columns. In images: pixels. In tabular data: columns like age, price, etc.",
    "Labels": "The 'answers' we want the network to predict. Used during training to calculate loss."
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

    return (
        <span
            className="tooltip-container"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => { setIsVisible(false); setShowMathPrompt(false); }}
        >
            <span className={`tooltip-word ${hasMath ? 'has-math' : ''}`}>{word}</span>

            {isVisible && !showMathPrompt && (
                <div className="tooltip-popup">
                    <p>{text}</p>
                    {hasMath && (
                        <button
                            className="btn-math"
                            onClick={handleMathClick}
                        >
                            📐 See Math Behind It
                        </button>
                    )}
                </div>
            )}

            {showMathPrompt && (
                <div className="tooltip-popup math-prompt">
                    <p className="prompt-title">🧮 Want to dive deeper?</p>
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
        .tooltip-container:hover .tooltip-word {
            color: var(--accent-primary);
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
