import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PersonalizationContext } from '../contexts/PersonalizationContext';
import {
  getRecommendedTopics,
  getGreeting,
  getFieldDescription,
  getLearningPathConfig,
} from '../engine/personalizationEngine';
import { MATH_TOPICS } from '../engine/mathContent';
import { ThemeToggle } from '../components/ThemeToggle';
import { useMath } from '../hooks/useMath';

const PATHS = [
  { key: 'fast', icon: '🚀', name: 'Fast Track', duration: '8 weeks', desc: 'Core concepts to get productive quickly' },
  { key: 'standard', icon: '📚', name: 'Standard Path', duration: '16 weeks', desc: 'Comprehensive curriculum covering everything' },
  { key: 'builder', icon: '🏗️', name: "Builder's Path", duration: '12 weeks', desc: 'Hands-on projects with each concept' },
];

export function PersonalizedDashboard() {
  const { profile, setProfile, resetProfile } = useContext(PersonalizationContext);
  const { openMath } = useMath();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(profile?.learningPath || null);

  if (!profile) {
    return (
      <div className="dashboard-empty">
        <h2>Welcome!</h2>
        <p>Take our quick questionnaire to personalize your experience.</p>
        <Link to="/" className="dash-cta-btn">Get Started</Link>
      </div>
    );
  }

  const greeting = getGreeting(profile);
  const fieldDesc = getFieldDescription(profile);
  const categories = getRecommendedTopics(profile);
  const pathConfig = selectedPath ? getLearningPathConfig({ ...profile, learningPath: selectedPath }) : null;

  const handleSelectPath = (pathKey) => {
    setSelectedPath(pathKey);
    setProfile({ ...profile, learningPath: pathKey });
  };

  const handleTopicClick = (topicKey) => {
    if (MATH_TOPICS[topicKey]) {
      openMath(topicKey);
    }
  };

  const completedTopics = profile.completedTopics || [];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dash-header">
        <div>
          <h1 className="dash-title">
            Welcome, <span className="dash-accent">{greeting}</span>! 👋
          </h1>
          <p className="dash-field-desc">{fieldDesc}</p>
        </div>
        <div className="dash-header-actions">
          <Link to="/playground" className="dash-nav-btn primary" id="dash-go-playground">
            🧠 Open Playground
          </Link>
          <Link to="/quizzes" className="dash-nav-btn" id="dash-go-quizzes">
            📝 Quizzes
          </Link>
          <Link to="/resources" className="dash-nav-btn" id="dash-go-resources">
            📚 Resources
          </Link>
          <ThemeToggle />
          <button className="dash-reset-btn" onClick={() => { resetProfile(); navigate('/'); }} title="Reset profile">
            🔄
          </button>
        </div>
      </header>

      {/* Learning Path Selector */}
      <section className="dash-section">
        <h2 className="dash-section-title">Choose Your Path</h2>
        <div className="path-grid">
          {PATHS.map((path) => (
            <button
              key={path.key}
              className={`path-card ${selectedPath === path.key ? 'active' : ''}`}
              onClick={() => handleSelectPath(path.key)}
              id={`path-${path.key}`}
            >
              <div className="path-icon">{path.icon}</div>
              <h3>{path.name}</h3>
              <span className="path-duration">{path.duration}</span>
              <p>{path.desc}</p>
              {selectedPath === path.key && <div className="path-check">✓ Selected</div>}
            </button>
          ))}
        </div>
      </section>

      {/* Selected Path Timeline */}
      {pathConfig && (
        <section className="dash-section">
          <h2 className="dash-section-title">
            {pathConfig.icon} {pathConfig.name}
            <span className="path-meta"> — {pathConfig.duration}</span>
          </h2>
          <div className="timeline">
            {pathConfig.phases.map((phase, i) => (
              <div key={i} className="timeline-phase">
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                  {i < pathConfig.phases.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-week">Week {phase.week}</div>
                  <h3 className="timeline-phase-name">{phase.name}</h3>
                  <div className="timeline-categories">
                    {phase.categories.map((catKey) => {
                      const cat = categories.find(c => c.category === catKey);
                      if (!cat) return null;
                      return (
                        <span key={catKey} className="timeline-cat-tag">
                          {cat.icon} {cat.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Topic Categories */}
      <section className="dash-section">
        <h2 className="dash-section-title">Your Learning Topics</h2>
        <p className="dash-section-desc">
          Ordered based on your {profile.emphasis === 'math' ? 'math-first' : profile.emphasis === 'visual' ? 'visual-first' : 'balanced'} preference.
          Click any topic to explore.
        </p>
        <div className="categories-list">
          {categories.map((cat) => (
            <div key={cat.category} className="category-block">
              <div className="category-header">
                <span className="category-icon">{cat.icon}</span>
                <div>
                  <h3>{cat.label}</h3>
                  <p>{cat.description}</p>
                </div>
              </div>
              <div className="topic-cards">
                {cat.topics.map((topicKey) => {
                  const topicData = MATH_TOPICS[topicKey];
                  const isCompleted = completedTopics.includes(topicKey);
                  if (!topicData) return null;
                  return (
                    <button
                      key={topicKey}
                      className={`topic-card ${isCompleted ? 'completed' : ''}`}
                      onClick={() => handleTopicClick(topicKey)}
                      id={`topic-${topicKey.replace(/\s+/g, '-')}`}
                    >
                      <span className="topic-title">{topicData.title.split(':')[0]}</span>
                      {isCompleted && <span className="topic-done">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="dash-section dash-stats-bar">
        <div className="dash-stat">
          <strong>{completedTopics.length}</strong>
          <span>Topics Completed</span>
        </div>
        <div className="dash-stat">
          <strong>{Object.keys(MATH_TOPICS).length}</strong>
          <span>Total Topics</span>
        </div>
        <div className="dash-stat">
          <strong>{selectedPath ? pathConfig?.duration : '—'}</strong>
          <span>Path Duration</span>
        </div>
      </section>

      <style>{`
        .dashboard-page {
          width: 100%;
          min-height: 100vh;
          overflow-y: auto;
          background: linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%);
          color: var(--text-primary);
          padding: 32px 40px 60px;
        }

        .dashboard-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          gap: 16px;
        }
        .dash-cta-btn {
          padding: 14px 32px;
          background: var(--accent-primary);
          color: #000;
          font-weight: 700;
          border-radius: 12px;
          text-decoration: none;
          font-size: 16px;
        }

        /* Header */
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .dash-title {
          font-family: 'Outfit', var(--font-main);
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          margin: 0 0 6px 0;
        }
        .dash-accent {
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dash-field-desc {
          color: var(--text-secondary);
          font-size: 15px;
          margin: 0;
          max-width: 500px;
        }
        .dash-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .dash-nav-btn {
          text-decoration: none;
          color: var(--text-secondary);
          padding: 10px 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.25s;
          background: rgba(255, 255, 255, 0.03);
        }
        .dash-nav-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(0, 242, 255, 0.05);
        }
        .dash-nav-btn.primary {
          background: linear-gradient(135deg, var(--accent-primary), #00c8d4);
          color: #000;
          font-weight: 700;
          border: none;
          box-shadow: 0 2px 16px rgba(0, 242, 255, 0.2);
        }
        .dash-nav-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 24px rgba(0, 242, 255, 0.35);
        }
        .dash-reset-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
          padding: 8px 12px;
          transition: all 0.2s;
          min-height: auto;
          min-width: auto;
        }
        .dash-reset-btn:hover {
          border-color: var(--accent-danger);
        }

        /* Sections */
        .dash-section {
          margin-bottom: 48px;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .dash-section-title {
          font-family: 'Outfit', var(--font-main);
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        .dash-section-desc {
          color: var(--text-secondary);
          font-size: 14px;
          margin: 0 0 24px 0;
        }
        .path-meta {
          font-weight: 400;
          color: var(--text-secondary);
          font-size: 16px;
        }

        /* Path cards */
        .path-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .path-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          padding: 28px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--text-primary);
          position: relative;
        }
        .path-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 242, 255, 0.2);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        }
        .path-card.active {
          border-color: var(--accent-primary);
          background: rgba(0, 242, 255, 0.05);
          box-shadow: 0 0 24px rgba(0, 242, 255, 0.12);
        }
        .path-icon {
          font-size: 36px;
          margin-bottom: 12px;
        }
        .path-card h3 {
          font-family: 'Outfit', var(--font-main);
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .path-duration {
          font-size: 13px;
          color: var(--accent-primary);
          font-weight: 600;
        }
        .path-card p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 10px 0 0;
          line-height: 1.5;
        }
        .path-check {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-primary);
          margin-top: 12px;
          letter-spacing: 1px;
        }

        /* Timeline */
        .timeline {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
        }
        .timeline-phase {
          display: flex;
          gap: 20px;
          min-height: 80px;
        }
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 24px;
          flex-shrink: 0;
        }
        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px rgba(0, 242, 255, 0.4);
          flex-shrink: 0;
        }
        .timeline-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(180deg, var(--accent-primary), rgba(112, 0, 255, 0.3));
          margin: 4px 0;
        }
        .timeline-content {
          padding-bottom: 24px;
        }
        .timeline-week {
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 4px;
        }
        .timeline-phase-name {
          font-family: 'Outfit', var(--font-main);
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        .timeline-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .timeline-cat-tag {
          font-size: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 4px 10px;
          color: var(--text-secondary);
        }

        /* Topic categories */
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .category-block {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 18px;
          padding: 24px;
        }
        .category-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .category-icon {
          font-size: 28px;
        }
        .category-header h3 {
          font-family: 'Outfit', var(--font-main);
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        .category-header p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 2px 0 0;
        }
        .topic-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .topic-card {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          min-height: auto;
          min-width: auto;
        }
        .topic-card:hover {
          border-color: var(--accent-primary);
          background: rgba(0, 242, 255, 0.06);
          transform: translateY(-1px);
        }
        .topic-card.completed {
          border-color: var(--accent-success);
          background: rgba(0, 255, 157, 0.05);
        }
        .topic-done {
          color: var(--accent-success);
          font-weight: 700;
        }

        /* Stats bar */
        .dash-stats-bar {
          display: flex;
          justify-content: center;
          gap: 48px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .dash-stat {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .dash-stat strong {
          font-family: 'Outfit', var(--font-main);
          font-size: 28px;
          font-weight: 700;
          color: var(--accent-primary);
        }
        .dash-stat span {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .dashboard-page {
            padding: 20px 16px 40px;
          }
          .dash-header {
            flex-direction: column;
          }
          .path-grid {
            grid-template-columns: 1fr;
          }
          .dash-stats-bar {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
