import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { quizzes } from '../data/quizData';
import { QuizCard } from '../components/QuizCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { BuyMeCoffee } from '../components/BuyMeCoffee';

export function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizzes[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="app-container quiz-page">
      <header className="main-header quiz-header">
        <div>
          <h1>AI & Math <span>Quizzes</span></h1>
          <p>Test your knowledge of Machine Learning concepts</p>
        </div>
        <div className="header-actions">
           <Link to="/" className="btn-nav">
             Back to Visualizer
           </Link>
           <ThemeToggle />
        </div>
      </header>

      <main className="main-content quiz-content">
        {!isFinished ? (
          <div className="quiz-container">
            <div className="quiz-progress">
              Question {currentQuestionIndex + 1} of {quizzes.length}
            </div>

            <QuizCard
              questionData={currentQuestion}
              onAnswer={handleAnswer}
              userAnswer={userAnswers[currentQuestion.id]}
              showFeedback={showFeedback}
            />

            {showFeedback && (
              <button className="btn-next" onClick={handleNext}>
                {currentQuestionIndex < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-results">
            <div className="card result-card">
              <h2>Quiz Completed!</h2>
              <div className="score-display">
                <span className="score-value">{score}</span>
                <span className="score-total">/ {quizzes.length}</span>
              </div>
              <p className="score-message">
                {score === quizzes.length ? 'Perfect Score! 🏆' :
                 score >= quizzes.length / 2 ? 'Great job! 👏' : 'Keep learning! 📚'}
              </p>

              <div className="result-actions">
                <button className="btn-restart" onClick={restartQuiz}>Try Again</button>
                <Link to="/" className="btn-home">Return to Visualizer</Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <BuyMeCoffee />

      <style>{`
        .quiz-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          background: radial-gradient(circle at top left, #1a1a2e, var(--bg-primary));
          overflow: hidden;
        }
        .quiz-header {
          padding: 20px;
        }
        .quiz-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-y: auto;
          padding: 20px;
        }
        .quiz-container {
          width: 100%;
          max-width: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .quiz-progress {
          color: var(--text-secondary);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .btn-nav {
          text-decoration: none;
          color: var(--text-secondary);
          padding: 8px 16px;
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          transition: all 0.2s;
          font-size: 14px;
        }
        .btn-nav:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .btn-next {
          background: var(--accent-primary);
          color: #000;
          font-weight: bold;
          padding: 12px 32px;
          border-radius: var(--radius-lg);
          font-size: 16px;
          transition: transform 0.2s;
          margin-top: 10px;
        }
        .btn-next:hover {
          transform: scale(1.05);
        }

        .quiz-results {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .result-card {
          text-align: center;
          align-items: center;
          padding: 40px;
          min-width: 300px;
        }
        .score-display {
          font-size: 48px;
          font-weight: bold;
          margin: 20px 0;
          color: var(--accent-primary);
        }
        .score-total {
          font-size: 24px;
          color: var(--text-secondary);
        }
        .score-message {
          font-size: 18px;
          margin-bottom: 30px;
        }
        .result-actions {
          display: flex;
          gap: 16px;
        }
        .btn-restart {
          background: var(--bg-secondary);
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
          border-radius: var(--radius-lg);
        }
        .btn-restart:hover {
          background: var(--accent-primary);
          color: #000;
        }
        .btn-home {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 12px 24px;
          border-radius: var(--radius-lg);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .btn-home:hover {
          border-color: var(--text-secondary);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
