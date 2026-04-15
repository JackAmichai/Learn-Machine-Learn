import React from 'react';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span className="footer-label">Learning Resources:</span>
        <a
          href="https://jalammar.github.io/illustrated-transformer/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Transformer
        </a>
        <a
          href="https://learnmachinelearn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          ViT & Vision
        </a>
        <span className="footer-desc">| Interactive ML Playground</span>
      </div>
      <style>{`
        .app-footer {
          margin-top: auto;
          padding: 15px;
          border-top: var(--glass-border);
          background: rgba(0, 0, 0, 0.2);
          text-align: center;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .footer-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .footer-label {
          font-weight: 500;
          color: var(--text-primary);
        }
        .footer-link {
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: bold;
          transition: color 0.2s;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(0, 242, 255, 0.1);
        }
        .footer-link:hover {
          color: var(--accent-secondary);
          text-decoration: underline;
          background: rgba(0, 242, 255, 0.2);
        }
        .footer-desc {
          opacity: 0.8;
        }
      `}</style>
    </footer>
  );
}
