import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { quizzes } from '../data/quizData';
import { QuizCard } from '../components/QuizCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { Footer } from '../components/Footer';

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🎯' },
    { id: 'basics', label: 'Basics', icon: '📚' },
    { id: 'vision', label: 'Vision', icon: '👁️' },
    { id: 'nlp', label: 'NLP', icon: '💬' },
    { id: 'generative', label: 'Generative', icon: '🎨' },
    { id: 'rl', label: 'RL', icon: '🎮' },
    { id: 'paradigms', label: 'Paradigms', icon: '🔄' },
    { id: 'training', label: 'Training', icon: '⚙️' }
];

export function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredQuizzes = activeCategory === 'all' 
        ? quizzes 
        : quizzes.filter(q => q.category === activeCategory);

    const currentQuestion = filteredQuizzes[currentQuestionIndex];

    const handleAnswer = (answer) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
        setShowFeedback(true);

        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < filteredQuizzes.length - 1) {
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
                    <p>Test your knowledge with scenario-based questions</p>
                </div>
                <div className="header-actions">
                    <Link to="/playground" className="btn-nav">Playground</Link>
                    <Link to="/looking-forward" className="btn-nav">Future</Link>
                    <ThemeToggle />
                </div>
            </header>

            <div className="category-filter">
                {CATEGORIES.map(cat => (
                    <button key={cat.id} className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => { setActiveCategory(cat.id); restartQuiz(); }}>
                        <span>{cat.icon}</span> {cat.label}
                    </button>
                ))}
            </div>

            <main className="main-content quiz-content">
                {!isFinished ? (
                    <div className="quiz-container">
                        {filteredQuizzes.length === 0 ? (
                            <div className="no-questions">
                                <span>❓</span>
                                <p>No questions in this category yet</p>
                                <button onClick={() => setActiveCategory('all')}>View All Questions</button>
                            </div>
                        ) : (
                            <>
                                <div className="quiz-progress">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / filteredQuizzes.length) * 100}%` }} />
                                    </div>
                                    <span>Question {currentQuestionIndex + 1} of {filteredQuizzes.length}</span>
                                </div>

                                <QuizCard
                                    questionData={currentQuestion}
                                    onAnswer={handleAnswer}
                                    userAnswer={userAnswers[currentQuestion.id]}
                                    showFeedback={showFeedback}
                                />

                                {showFeedback && (
                                    <button className="btn-next" onClick={handleNext}>
                                        {currentQuestionIndex < filteredQuizzes.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    <div className="quiz-results">
                        <div className="card result-card">
                            <div className="result-icon">{score >= filteredQuizzes.length / 2 ? '🌟' : '💪'}</div>
                            <h2>Quiz Completed!</h2>
                            <div className="score-display">
                                <span className="score-value">{score}</span>
                                <span className="score-total">/ {filteredQuizzes.length}</span>
                            </div>
                            <p className="score-message">
                                {score === filteredQuizzes.length ? 'Perfect Score! You\'re a machine learning expert! 🎉' :
                                score >= filteredQuizzes.length * 0.8 ? 'Excellent work! Keep it up! 🚀' :
                                score >= filteredQuizzes.length / 2 ? 'Great job! Keep learning! 📚' : 'Nice try! Practice makes perfect! 💪'}
                            </p>

                            <div className="result-actions">
                                <button className="btn-restart" onClick={restartQuiz}>Try Again</button>
                                <Link to="/playground" className="btn-home">Back to Playground</Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />

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
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .quiz-header h1 {
                    font-size: 20px;
                    margin: 0;
                }
                .quiz-header h1 span {
                    color: var(--accent-primary);
                }
                .quiz-header p {
                    margin: 4px 0 0;
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                .header-actions {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
                .btn-nav {
                    text-decoration: none;
                    color: var(--text-secondary);
                    padding: 6px 12px;
                    border: 1px solid var(--glass-border);
                    border-radius: 20px;
                    font-size: 12px;
                }
                .category-filter {
                    display: flex;
                    gap: 8px;
                    padding: 10px 20px;
                    background: rgba(0,0,0,0.2);
                    overflow-x: auto;
                }
                .cat-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    background: var(--bg-secondary);
                    border: 1px solid transparent;
                    border-radius: 20px;
                    color: var(--text-secondary);
                    font-size: 12px;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s;
                }
                .cat-btn:hover {
                    border-color: var(--glass-border);
                }
                .cat-btn.active {
                    background: var(--accent-primary);
                    color: #000;
                    font-weight: bold;
                }
                .quiz-content {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
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
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .progress-bar {
                    height: 6px;
                    background: var(--bg-secondary);
                    border-radius: 3px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
                    transition: width 0.3s ease;
                }
                .quiz-progress span {
                    color: var(--text-secondary);
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .btn-next {
                    background: var(--accent-primary);
                    color: #000;
                    font-weight: bold;
                    padding: 14px 40px;
                    border-radius: var(--radius-lg);
                    font-size: 16px;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.2s;
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
                    background: var(--bg-panel);
                    border: var(--glass-border);
                    border-radius: var(--radius-lg);
                }
                .result-icon {
                    font-size: 48px;
                    margin-bottom: 10px;
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
                    font-size: 16px;
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
                    padding: 12px 24px;
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    font-size: 14px;
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
                    border: 1px solid transparent;
                    font-size: 14px;
                }
                .btn-home:hover {
                    border-color: var(--text-secondary);
                    color: var(--text-primary);
                }
                .no-questions {
                    text-align: center;
                    padding: 40px;
                }
                .no-questions span {
                    font-size: 48px;
                    display: block;
                    margin-bottom: 16px;
                }
                .no-questions p {
                    color: var(--text-secondary);
                    margin-bottom: 20px;
                }
                .no-questions button {
                    background: var(--accent-primary);
                    color: #000;
                    padding: 10px 20px;
                    border-radius: var(--radius-md);
                    border: none;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
