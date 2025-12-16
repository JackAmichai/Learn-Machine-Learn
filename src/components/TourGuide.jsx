import { useState, useEffect } from 'react';

const STEPS = [
    {
        target: null, // Center
        title: "Welcome to Learn MACHINE Learn",
        content: "This is a playground to understand how Neural Networks actually work. Let's take a quick tour!"
    },
    {
        target: '.controls-panel',
        title: "Control Panel",
        content: "Here you can design your network (add layers/nodes), choose Datasets, and tweak Hyperparameters like Learning Rate."
    },
    {
        target: '.viz-net',
        title: "The Brain",
        content: "This visualizes your Neural Network. You can see the nodes and connections (weights). The connections change color as the model learns!"
    },
    {
        target: '.viz-out',
        title: "The Output",
        content: "This shows the 'Decision Boundary'. The background color represents what the model predicts for that area. Watch it evolve as you train!",
        condition: (mode) => mode === 'simple'
    },
    {
        target: '.viz-input',
        title: "Vision Input",
        content: "In Vision Mode, you draw here. The model takes these 100 pixels as input.",
        condition: (mode) => mode === 'vision'
    },
    {
        target: '.btn-primary',
        title: "Start Learning",
        content: "Click 'Train' to watch the magic happen. Don't be afraid to break things!"
    }
];

export function TourGuide({ mode, onSkip }) {
    const [step, setStep] = useState(0);
    const [style, setStyle] = useState({});

    // Filter steps based on mode
    const activeSteps = STEPS.filter(s => !s.condition || s.condition(mode));

    useEffect(() => {
        const current = activeSteps[step];
        if (!current) return;

        if (current.target) {
            const el = document.querySelector(current.target);
            if (el) {
                const rect = el.getBoundingClientRect();
                setStyle({
                    top: rect.bottom + 10 + window.scrollY,
                    left: rect.left + (rect.width / 2) - 150, // center simplified
                    position: 'absolute'
                });

                // Highlight effect?
                el.classList.add('tour-highlight');
                return () => el.classList.remove('tour-highlight');
            }
        } else {
            // Center
            setStyle({
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed'
            });
        }
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
                padding: 20px;
                border-radius: 12px;
                width: 300px;
                z-index: 10000;
                box-shadow: 0 0 20px rgba(0,0,0,0.5);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
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
