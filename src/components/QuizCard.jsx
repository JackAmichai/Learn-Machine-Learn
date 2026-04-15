import React from 'react';

export function QuizCard({ questionData, onAnswer, userAnswer, showFeedback }) {
  const { question, scenario, options, correctAnswer, explanation, imageLeft, imageRight } = questionData;

  const handleOptionClick = (option) => {
    if (!showFeedback) {
      onAnswer(option);
    }
  };

  const getOptionClass = (option) => {
    let className = 'quiz-option';
    if (showFeedback) {
      if (option === correctAnswer) {
        className += ' correct';
      } else if (option === userAnswer) {
        className += ' incorrect';
      } else {
        className += ' disabled';
      }
    } else if (userAnswer === option) {
      className += ' selected';
    }
    return className;
  };

  const getScenarioImage = (type) => {
    const scenarios = {
      'blurry_output': { emoji: '🌫️', label: 'Your Output' },
      'sharp_reference': { emoji: '🖼️', label: 'Target' },
      'training_100%': { emoji: '📈', label: 'Training' },
      'test_60%': { emoji: '📉', label: 'Test' }
    };
    return scenarios[type] || { emoji: '❓', label: type };
  };

  return (
    <div className="quiz-card">
      {scenario && (
        <div className="scenario-badge">
          <span>🎯 Real World Scenario</span>
        </div>
      )}
      
      {scenario && (
        <div className="scenario-box">
          <p className="scenario-text">{scenario}</p>
          
          {(imageLeft || imageRight) && (
            <div className="comparison-images">
              {imageLeft && (
                <div className="compare-item">
                  <div className="compare-placeholder" style={{ background: 'linear-gradient(135deg, #333 0%, #555 100%)' }}>
                    <span className="compare-emoji">{getScenarioImage(imageLeft).emoji}</span>
                  </div>
                  <span className="compare-label">{getScenarioImage(imageLeft).label}</span>
                </div>
              )}
              <span className="vs-text">VS</span>
              {imageRight && (
                <div className="compare-item">
                  <div className="compare-placeholder" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                    <span className="compare-emoji">{getScenarioImage(imageRight).emoji}</span>
                  </div>
                  <span className="compare-label">{getScenarioImage(imageRight).label}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <h3 className="quiz-question">{question || scenario}</h3>
      
      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`quiz-feedback ${userAnswer === correctAnswer ? 'success' : 'error'}`}>
          <p>
            <strong>{userAnswer === correctAnswer ? '🎉 Correct!' : '🤔 Not quite.'}</strong>
          </p>
          <p className="explanation">{explanation}</p>
          {scenario && userAnswer === correctAnswer && (
            <p className="bonus-points">+ You nailed this real-world scenario!</p>
          )}
        </div>
      )}

      <style>{`
        .quiz-card {
          background: var(--bg-panel);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 30px;
          box-shadow: var(--glass-shadow);
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          animation: fadeIn 0.5s ease-out;
        }
        
        .scenario-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: var(--bg-primary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .scenario-box {
          background: linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(255, 0, 242, 0.1));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .scenario-text {
          font-size: 17px;
          color: var(--text-primary);
          line-height: 1.5;
          font-style: italic;
        }
        
        .comparison-images {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
        }
        
        .compare-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .compare-placeholder {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--glass-border);
        }
        
        .compare-emoji {
          font-size: 32px;
        }
        
        .compare-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .vs-text {
          font-size: 14px;
          font-weight: bold;
          color: var(--accent-primary);
          background: var(--bg-secondary);
          padding: 8px 12px;
          border-radius: 50%;
        }
        
        .quiz-question {
          font-size: 20px;
          margin-bottom: 24px;
          color: var(--text-primary);
          line-height: 1.4;
        }
        
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .quiz-option {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 16px;
          text-align: left;
          color: var(--text-secondary);
          transition: all 0.2s;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .option-letter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--bg-primary);
          border-radius: 50%;
          font-weight: bold;
          font-size: 14px;
          color: var(--accent-primary);
        }
        
        .quiz-option:hover:not(:disabled) {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 242, 255, 0.2);
        }
        
        .quiz-option.selected {
          border-color: var(--accent-primary);
          background: rgba(0, 242, 255, 0.1);
        }
        
        .quiz-option.selected .option-letter {
          background: var(--accent-primary);
          color: var(--bg-primary);
        }
        
        .quiz-option.correct {
          border-color: var(--accent-success);
          background: rgba(0, 255, 157, 0.15);
          color: var(--accent-success);
        }
        
        .quiz-option.correct .option-letter {
          background: var(--accent-success);
          color: var(--bg-primary);
        }
        
        .quiz-option.incorrect {
          border-color: var(--accent-danger);
          background: rgba(255, 0, 85, 0.15);
          color: var(--accent-danger);
        }
        
        .quiz-option.incorrect .option-letter {
          background: var(--accent-danger);
          color: var(--bg-primary);
        }
        
        .quiz-option.disabled {
          opacity: 0.5;
          cursor: default;
        }
        
        .quiz-feedback {
          margin-top: 24px;
          padding: 20px;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border-left: 4px solid transparent;
          animation: slideUp 0.3s ease-out;
        }
        
        .quiz-feedback.success {
          border-left-color: var(--accent-success);
          background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 255, 157, 0.05));
        }
        
        .quiz-feedback.error {
          border-left-color: var(--accent-danger);
          background: linear-gradient(135deg, rgba(255, 0, 85, 0.1), rgba(255, 0, 85, 0.05));
        }
        
        .quiz-feedback p {
          margin: 4px 0;
          color: var(--text-secondary);
        }
        
        .quiz-feedback strong {
          color: var(--text-primary);
          font-size: 18px;
        }
        
        .explanation {
          margin-top: 12px !important;
          padding-top: 12px;
          border-top: 1px solid var(--glass-border);
        }
        
        .bonus-points {
          margin-top: 12px !important;
          color: var(--accent-primary) !important;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
