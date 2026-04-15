import { useState, useCallback } from 'react';

const STAGES = [
  {
    id: 'age',
    title: 'How old are you?',
    subtitle: "We'll tailor the language and complexity to fit you perfectly.",
    options: [
      { value: 'under16', icon: '🧒', label: 'Under 16', desc: "I'm just getting started with tech" },
      { value: 'student', icon: '🎓', label: '16 – 25', desc: 'Student or early career' },
      { value: 'professional', icon: '💼', label: '25 – 45', desc: 'Professional or career changer' },
      { value: 'lifelong', icon: '🧠', label: '45+', desc: 'Lifelong learner' },
    ],
  },
  {
    id: 'field',
    title: "What's your field of interest?",
    subtitle: "We'll use analogies and examples from your world.",
    options: [
      { value: 'cs', icon: '💻', label: 'Computer Science / Engineering', desc: 'Code, circuits, and systems' },
      { value: 'science', icon: '🔬', label: 'Science / Research', desc: 'Physics, biology, chemistry' },
      { value: 'creative', icon: '🎨', label: 'Design / Creative', desc: 'Art, media, and visual storytelling' },
      { value: 'business', icon: '📊', label: 'Business / Analytics', desc: 'Data-driven decision making' },
      { value: 'explorer', icon: '🌍', label: 'Curious Explorer', desc: 'No specific field — just curious!' },
    ],
  },
  {
    id: 'emphasis',
    title: 'How do you prefer to learn?',
    subtitle: 'Choose what feels right — you can always change later.',
    options: [
      { value: 'math', icon: '📐', label: 'Math First', desc: 'Show me the equations and proofs' },
      { value: 'visual', icon: '👁️', label: 'Visual First', desc: 'Show me how it looks and moves' },
      { value: 'both', icon: '⚖️', label: 'Both', desc: 'Give me the complete picture' },
    ],
  },
];

export function Questionnaire({ onComplete, onSkip }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const stage = STAGES[currentStage];

  const handleSelect = useCallback((value) => {
    if (animating) return;
    setSelected(value);

    // Brief delay for visual feedback before transition
    setTimeout(() => {
      const newAnswers = { ...answers, [stage.id]: value };
      setAnswers(newAnswers);

      if (currentStage < STAGES.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentStage(prev => prev + 1);
          setSelected(null);
          setAnimating(false);
        }, 400);
      } else {
        // All stages complete
        onComplete({
          ageGroup: newAnswers.age,
          field: newAnswers.field,
          emphasis: newAnswers.emphasis,
        });
      }
    }, 300);
  }, [animating, answers, currentStage, onComplete, stage.id]);

  const handleBack = useCallback(() => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
      setSelected(null);
    }
  }, [currentStage]);

  return (
    <div className="questionnaire-overlay">
      <div className={`questionnaire-container ${animating ? 'slide-out' : 'slide-in'}`}>
        {/* Progress */}
        <div className="q-progress">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`q-dot ${i === currentStage ? 'active' : ''} ${i < currentStage ? 'completed' : ''}`}
            />
          ))}
        </div>

        {/* Stage label */}
        <div className="q-stage-label">Step {currentStage + 1} of {STAGES.length}</div>

        {/* Question */}
        <h2 className="q-title">{stage.title}</h2>
        <p className="q-subtitle">{stage.subtitle}</p>

        {/* Options */}
        <div className="q-options">
          {stage.options.map((option) => (
            <button
              key={option.value}
              className={`q-option ${selected === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              disabled={animating}
              id={`q-option-${option.value}`}
            >
              <span className="q-option-icon">{option.icon}</span>
              <div className="q-option-text">
                <span className="q-option-label">{option.label}</span>
                <span className="q-option-desc">{option.desc}</span>
              </div>
              <span className="q-option-check">{selected === option.value ? '✓' : ''}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="q-actions">
          {currentStage > 0 && (
            <button className="q-back" onClick={handleBack} disabled={animating}>
              ← Back
            </button>
          )}
          <button className="q-skip" onClick={onSkip}>
            Skip for now
          </button>
        </div>
      </div>

      <style>{`
        .questionnaire-overlay {
          position: fixed;
          inset: 0;
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(20px);
          animation: qFadeIn 0.4s ease-out;
        }
        @keyframes qFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .questionnaire-container {
          max-width: 560px;
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
        }

        .questionnaire-container.slide-in {
          animation: qSlideIn 0.4s ease-out;
        }
        .questionnaire-container.slide-out {
          animation: qSlideOut 0.3s ease-in forwards;
        }
        @keyframes qSlideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes qSlideOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-30px); }
        }

        .q-progress {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }
        .q-dot {
          width: 40px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.12);
          transition: all 0.4s;
        }
        .q-dot.active {
          background: var(--accent-primary);
          box-shadow: 0 0 12px rgba(0, 242, 255, 0.5);
        }
        .q-dot.completed {
          background: var(--accent-secondary);
        }

        .q-stage-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .q-title {
          font-family: 'Outfit', var(--font-main);
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px 0;
          line-height: 1.2;
        }
        .q-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          margin: 0 0 32px 0;
          line-height: 1.5;
        }

        .q-options {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .q-option {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          color: var(--text-primary);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          min-height: 64px;
        }
        .q-option:hover {
          background: rgba(0, 242, 255, 0.05);
          border-color: rgba(0, 242, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .q-option.selected {
          background: rgba(0, 242, 255, 0.1);
          border-color: var(--accent-primary);
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.15);
        }
        .q-option:disabled {
          cursor: default;
          opacity: 0.7;
        }

        .q-option-icon {
          font-size: 28px;
          flex-shrink: 0;
          width: 44px;
          text-align: center;
        }
        .q-option-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .q-option-label {
          font-weight: 600;
          font-size: 15px;
        }
        .q-option-desc {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .q-option-check {
          font-size: 18px;
          color: var(--accent-primary);
          width: 24px;
          text-align: center;
        }

        .q-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .q-back {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
        }
        .q-back:hover {
          border-color: var(--text-secondary);
          color: var(--text-primary);
        }
        .q-skip {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 13px;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
          padding: 10px 16px;
        }
        .q-skip:hover {
          color: var(--text-primary);
        }

        @media (max-width: 600px) {
          .q-title {
            font-size: 24px;
          }
          .q-option {
            padding: 12px 14px;
            gap: 12px;
          }
          .q-option-icon {
            font-size: 22px;
            width: 36px;
          }
        }
      `}</style>
    </div>
  );
}
