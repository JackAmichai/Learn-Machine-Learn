import { useState } from 'react';
import { useMath } from '../contexts/MathContext';
import { MATH_TOPICS } from '../engine/mathContent';

const DICTIONARY = {
    // Core Concepts
    "Loss": "A score measuring how 'wrong' the model is. We want this to be as close to 0 as possible.",
    "Epoch": "One complete pass through the entire dataset during training.",
    "Hidden Layer": "A layer of neurons between inputs and outputs where the magic happens. It learns abstract features.",
    "Nodes": "Artificial neurons that hold a number. They connect to other nodes to transmit information.",

    // Interaction terms
    "Dense": "A Fully Connected network where every node connects to every node in the next layer.",

    // Future concepts (as requested)
    "CNN": "Convolutional Neural Network. Specialized for Image Recognition by scanning locally like a human eye.",
    "RNN": "Recurrent Neural Network. Specialized for Sequences (Text, Audio) by remembering past inputs.",
    "Learning Rate": "How big of a step the model takes when updating its knowledge. Too big = unstable, too small = slow."
};

export function Tooltip({ word, overrideText }) {
    const [isVisible, setIsVisible] = useState(false);
    const { openMath } = useMath();

    const text = overrideText || DICTIONARY[word] || "Learn more about this concept.";
    const hasMath = !!MATH_TOPICS[word];

    return (
        <span
            className="tooltip-container"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <span className="tooltip-word">{word}</span>

            {isVisible && (
                <div className="tooltip-popup">
                    <p>{text}</p>
                    {hasMath && (
                        <button
                            className="btn-math"
                            onClick={(e) => {
                                e.stopPropagation();
                                openMath(word);
                            }}
                        >
                            See Math
                        </button>
                    )}
                </div>
            )}

            <style>{`
        .tooltip-container {
            position: relative;
            cursor: help;
        }
        .tooltip-word {
            text-decoration: underline dotted var(--accent-primary);
            color: var(--text-primary);
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
            width: 200px;
            font-size: 12px;
            color: var(--text-primary);
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            pointer-events: auto; /* Allow clicking button */
        }
        .tooltip-popup p {
            margin: 0 0 8px 0;
            line-height: 1.4;
        }
        .btn-math {
            background: var(--accent-secondary);
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            cursor: pointer;
            width: 100%;
            text-transform: uppercase;
            font-weight: bold;
        }
        .btn-math:hover {
            background: var(--accent-primary);
            color: black;
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
      `}</style>
        </span>
    );
}
