import React from 'react';

export function QuizCard({ questionData, onAnswer, userAnswer, showFeedback }) {
  const { question, options, correctAnswer, explanation } = questionData;

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

  return (
    <div className="quiz-card">
      <h3 className="quiz-question">{question}</h3>
      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`quiz-feedback ${userAnswer === correctAnswer ? 'success' : 'error'}`}>
          <p>
            <strong>{userAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}</strong>
          </p>
          <p>{explanation}</p>
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
        }
        .quiz-option:hover:not(:disabled) {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          transform: translateY(-2px);
        }
        .quiz-option.selected {
          border-color: var(--accent-primary);
          background: rgba(0, 242, 255, 0.1);
        }
        .quiz-option.correct {
          border-color: var(--accent-success);
          background: rgba(0, 255, 157, 0.1);
          color: var(--accent-success);
        }
        .quiz-option.incorrect {
          border-color: var(--accent-danger);
          background: rgba(255, 0, 85, 0.1);
          color: var(--accent-danger);
        }
        .quiz-option.disabled {
          opacity: 0.6;
          cursor: default;
        }
        .quiz-feedback {
          margin-top: 24px;
          padding: 16px;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border-left: 4px solid transparent;
          animation: slideUp 0.3s ease-out;
        }
        .quiz-feedback.success {
          border-left-color: var(--accent-success);
        }
        .quiz-feedback.error {
          border-left-color: var(--accent-danger);
        }
        .quiz-feedback p {
          margin: 4px 0;
          color: var(--text-secondary);
        }
        .quiz-feedback strong {
          color: var(--text-primary);
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
