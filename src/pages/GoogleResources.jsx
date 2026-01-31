import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function GoogleResources() {
  const resources = {
    foundational: [
      {
        title: "Introduction to Machine Learning",
        url: "https://developers.google.com/machine-learning/intro-to-ml",
        desc: "A brief introduction to machine learning concepts."
      },
      {
        title: "Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        desc: "A hands-on course to explore the critical basics of machine learning. Includes video lectures from Google researchers."
      },
      {
        title: "Problem Framing",
        url: "https://developers.google.com/machine-learning/problem-framing",
        desc: "A course to help you map real-world problems to machine learning solutions."
      }
    ],
    advanced: [
      {
        title: "Decision Forests",
        url: "https://developers.google.com/machine-learning/decision-forests",
        desc: "Learn about decision forests, an alternative to neural networks."
      },
      {
        title: "Recommendation Systems",
        url: "https://developers.google.com/machine-learning/recommendation",
        desc: "Understand how to build systems that generate personalized suggestions."
      },
      {
        title: "Clustering",
        url: "https://developers.google.com/machine-learning/clustering",
        desc: "A key unsupervised machine learning strategy to associate related items."
      },
      {
        title: "Generative Adversarial Networks (GANs)",
        url: "https://developers.google.com/machine-learning/gan",
        desc: "Learn how to create new data instances that resemble your training data."
      }
    ],
    guides: [
      {
        title: "Rules of ML",
        url: "https://developers.google.com/machine-learning/guides/rules-of-ml",
        desc: "Best practices for ML engineering from Google's own experience."
      },
      {
        title: "People + AI Guidebook",
        url: "https://pair.withgoogle.com/guidebook/",
        desc: "A guide for UXers, PMs, and developers to build human-centered AI products."
      },
      {
        title: "Deep Learning Tuning Playbook",
        url: "https://developers.google.com/machine-learning/guides/deep-learning-tuning-playbook",
        desc: "A scientific way to optimize the training of deep learning models."
      }
    ],
    glossaries: [
      {
        title: "Fundamentals Glossary",
        url: "https://developers.google.com/machine-learning/glossary/fundamentals",
        desc: "Definitions for core ML terms."
      },
      {
        title: "Full Glossary",
        url: "https://developers.google.com/machine-learning/glossary",
        desc: "A comprehensive list of machine learning terminology."
      }
    ]
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="main-header">
          <div>
            <h1>Google ML <span>RESOURCES</span></h1>
            <p>Curated learning materials from Google Developers</p>
          </div>
          <div className="header-actions">
            <Link to="/" className="btn-nav">
              Back to Home
            </Link>
          </div>
        </header>

        <div className="resources-grid">
          <section className="resource-section">
            <h2>Foundational Courses</h2>
            <div className="cards-row">
              {resources.foundational.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                  <span className="link-hint">Visit ↗</span>
                </a>
              ))}
            </div>
          </section>

          <section className="resource-section">
            <h2>Advanced Topics</h2>
            <div className="cards-row">
              {resources.advanced.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                  <span className="link-hint">Visit ↗</span>
                </a>
              ))}
            </div>
          </section>

          <section className="resource-section">
            <h2>Essential Guides</h2>
            <div className="cards-row">
              {resources.guides.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                  <span className="link-hint">Read Guide ↗</span>
                </a>
              ))}
            </div>
          </section>

          <section className="resource-section">
            <h2>Glossaries</h2>
            <div className="cards-row">
              {resources.glossaries.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                  <span className="link-hint">Lookup ↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>

      <style>{`
        .app-container {
            display: flex;
            min-height: 100vh;
            width: 100vw;
            background: radial-gradient(circle at top right, #1a1a2e, var(--bg-primary));
            overflow-y: auto;
        }
        .main-content {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 32px;
            margin: 0;
            letter-spacing: -1px;
        }
        h1 span {
            color: var(--accent-primary);
        }
        .header-actions {
            display: flex;
            gap: 15px;
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

        .resources-grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        .resource-section h2 {
            color: var(--text-primary);
            border-bottom: 1px solid var(--glass-border);
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 20px;
        }

        .cards-row {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .resource-card {
            background: var(--bg-panel);
            border: var(--glass-border);
            border-radius: var(--radius-md);
            padding: 20px;
            text-decoration: none;
            color: inherit;
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .resource-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--glass-shadow);
            border-color: var(--accent-primary);
        }

        .resource-card h3 {
            margin: 0 0 10px 0;
            color: var(--accent-primary);
            font-size: 16px;
        }

        .resource-card p {
            margin: 0 0 20px 0;
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.5;
            flex: 1;
        }

        .link-hint {
            font-size: 12px;
            color: var(--accent-secondary);
            font-weight: bold;
            align-self: flex-end;
        }
      `}</style>
    </div>
  );
}
