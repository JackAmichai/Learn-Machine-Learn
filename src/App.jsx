import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Home } from './pages/Home';
import { PersonalizedDashboard } from './pages/PersonalizedDashboard';
import { QuizPage } from './pages/QuizPage';
import { InteractiveLessons } from './pages/InteractiveLessons';
import { ResourceLibrary } from './pages/ResourceLibrary';
import { LookingForward } from './pages/LookingForward';
import { AboutPage } from './pages/About';
import { LabPage } from './pages/Lab';
import { NotesIndex, NotePage } from './pages/Notes';
import { NotFound } from './pages/NotFound';

import { ThemeProvider } from './contexts/ThemeContext';
import { MathProvider } from './contexts/MathContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastStack } from './components/ToastStack';
import { PersonalizationProvider } from './contexts/PersonalizationContext';
import { HomeNav } from './components/HomeNav';
import { Chatbot } from './components/Chatbot';
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
                  <Route path="/resources" element={<ResourceLibrary />} />
                  <Route path="/lessons" element={<InteractiveLessons />} />
                  <Route path="/lab" element={<LabPage />} />
                  <Route path="/notes" element={<NotesIndex />} />
                  <Route path="/notes/:slug" element={<NotePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/looking-forward" element={<LookingForward />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <HomeNav />
                <Chatbot />
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
