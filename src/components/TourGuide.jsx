import { useState, useEffect, useRef } from 'react';

const STEPS = [
    {
        target: null, // Center
        title: "🎓 Welcome to Learn MACHINE Learn",
        content: "This interactive playground helps you understand how Neural Networks actually work - by building and training them yourself! Let's take a quick tour."
    },
    {
        target: '.controls-panel',
        title: "🎛️ Control Panel",
        content: "This is your command center! Design your network by adding layers and neurons, pick different datasets to classify, and fine-tune hyperparameters like Learning Rate. Hover over any underlined term to learn what it means.",
        position: 'right'
    },
    {
        target: '.viz-net',
        title: "🧠 Neural Network Visualization",
        content: "Watch your network come alive! Each circle is a neuron, and the lines are weighted connections. Blue lines = positive weights, Red lines = negative weights. As training progresses, watch how these connections strengthen or weaken!",
        position: 'bottom'
    },
    {
        target: '.viz-out',
        title: "📊 Decision Boundary",
        content: "This is the 'output landscape' - it shows what your network would predict for ANY point in the 2D space. The colored regions show class predictions. Watch it evolve from random noise to clear boundaries as training progresses!",
        condition: (mode) => mode === 'simple',
        position: 'bottom'
    },
    {
        target: '.viz-input',
        title: "✏️ Drawing Canvas",
        content: "In Vision Mode, YOU create the training data! Draw shapes (like X's or squares), label them as Class A or B, then train the network to recognize them. The 10×10 grid becomes 100 input neurons.",
        condition: (mode) => mode === 'vision',
        position: 'bottom'
    },
    {
        target: '.btn-primary',
        title: "🚀 Ready to Train!",
        content: "Hit 'Train' and watch the magic unfold! The Loss will decrease as the network learns. Try changing the architecture mid-training and see what happens. Experiment freely - you can't break anything!",
        position: 'top'
    }
];

export function TourGuide({ mode, onSkip }) {
    const [step, setStep] = useState(0);
    const [style, setStyle] = useState({});
    const highlightedRef = useRef(null);

    // Filter steps based on mode
    const activeSteps = STEPS.filter(s => !s.condition || s.condition(mode));

    useEffect(() => {
        // Cleanup previous highlight
        if (highlightedRef.current) {
            highlightedRef.current.classList.remove('tour-highlight');
            highlightedRef.current = null;
        }

        const current = activeSteps[step];
        if (!current) return;

        if (current.target) {
            const el = document.querySelector(current.target);
            if (el) {
                const rect = el.getBoundingClientRect();
                const cardWidth = 320;
                const cardHeight = 200; // approximate
                const padding = 15;
                
                let newStyle = { position: 'fixed' };
                
                // Position based on preference or auto-detect best position
                const pos = current.position || 'bottom';
                
                switch(pos) {
                    case 'right':
                        newStyle.top = Math.max(padding, rect.top);
                        newStyle.left = rect.right + padding;
                        break;
                    case 'left':
                        newStyle.top = Math.max(padding, rect.top);
                        newStyle.left = rect.left - cardWidth - padding;
                        break;
                    case 'top':
                        newStyle.top = rect.top - cardHeight - padding;
                        newStyle.left = Math.max(padding, rect.left + (rect.width / 2) - (cardWidth / 2));
                        break;
                    case 'bottom':
                    default:
                        newStyle.top = rect.bottom + padding;
                        newStyle.left = Math.max(padding, Math.min(
                            window.innerWidth - cardWidth - padding,
                            rect.left + (rect.width / 2) - (cardWidth / 2)
                        ));
                        break;
                }
                
                setStyle(newStyle);

                // Add highlight
                el.classList.add('tour-highlight');
                highlightedRef.current = el;
            }
        } else {
            // Center for welcome screen
            setStyle({
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed'
            });
        }
        
        return () => {
            if (highlightedRef.current) {
                highlightedRef.current.classList.remove('tour-highlight');
            }
        };
    }, [step, mode, activeSteps]);

    const handleNext = () => {
        if (step >= activeSteps.length - 1) {
            onSkip();
        } else {
            setStep(s => s + 1);
        }
    };

    const currentStep = activeSteps[step];
    if (!currentStep) return null;

    return (
        <>
            <div className="tour-overlay" onClick={onSkip} />
            <div className="tour-card" style={style}>
                <h3>{currentStep.title}</h3>
                <p>{currentStep.content}</p>
                <div className="tour-actions">
                    <button className="btn-skip" onClick={onSkip}>Skip</button>
                    <div className="dots">
                        {activeSteps.map((_, i) => (
                            <span key={i} className={i === step ? 'active' : ''} />
                        ))}
                    </div>
                    <button className="btn-next" onClick={handleNext}>
                        {step === activeSteps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>

            <style>{`
            .tour-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
                cursor: pointer;
            }
            .tour-card {
                background: var(--bg-panel);
                border: 2px solid var(--accent-primary);
                padding: 24px;
                border-radius: 16px;
                width: 320px;
                z-index: 10000;
                box-shadow: 0 0 30px rgba(0, 242, 255, 0.2), 0 0 60px rgba(0,0,0,0.5);
                backdrop-filter: blur(15px);
                transition: all 0.3s ease;
                animation: tourSlideIn 0.3s ease-out;
            }
            @keyframes tourSlideIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .tour-card h3 {
                margin: 0 0 10px 0;
                color: var(--accent-primary);
            }
            .tour-card p {
                line-height: 1.4;
                margin-bottom: 20px;
                color: var(--text-primary);
            }
            .tour-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .btn-next {
                background: var(--accent-primary);
                color: black;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                font-weight: bold;
                cursor: pointer;
            }
            .btn-skip {
                background: transparent;
                color: var(--text-secondary);
                border: none;
                cursor: pointer;
            }
            .dots {
                display: flex;
                gap: 4px;
            }
            .dots span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--glass-border);
            }
            .dots span.active {
                background: var(--accent-primary);
            }
            .tour-highlight {
                position: relative;
                z-index: 10000;
                box-shadow: 0 0 0 4px var(--accent-primary);
                border-radius: 8px;
            }
        `}</style>
        </>
    );
}
