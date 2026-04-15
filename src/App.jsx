import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Home } from './pages/Home';
import { PersonalizedDashboard } from './pages/PersonalizedDashboard';
import { QuizPage } from './pages/QuizPage';
import { GoogleResources } from './pages/GoogleResources';

import { ThemeProvider } from './contexts/ThemeContext';
import { MathProvider } from './contexts/MathContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastStack } from './components/ToastStack';
import { PersonalizationProvider } from './contexts/PersonalizationContext';
import { HomeNav } from './components/HomeNav';
import { Chatbot } from './components/Chatbot';
import { BuyMeCoffee } from './components/BuyMeCoffee';
import { AccessibilityPanel } from './components/AccessibilityPanel';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <PersonalizationProvider>
            <MathProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/playground" element={<Home />} />
                  <Route path="/dashboard" element={<PersonalizedDashboard />} />
                  <Route path="/quizzes" element={<QuizPage />} />
                  <Route path="/resources" element={<GoogleResources />} />
                </Routes>
                <HomeNav />
                <Chatbot />
                <BuyMeCoffee />
                <AccessibilityPanel />
              </Router>
              <ToastStack />
            </MathProvider>
          </PersonalizationProvider>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
