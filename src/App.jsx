import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { QuizPage } from './pages/QuizPage';

import { ThemeProvider } from './contexts/ThemeContext';
import { MathProvider } from './contexts/MathContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastStack } from './components/ToastStack';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <MathProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quizzes" element={<QuizPage />} />
              </Routes>
            </Router>
            <ToastStack />
          </MathProvider>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
