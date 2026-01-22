import React from 'react';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span className="footer-label">Latest Popular Article:</span>
        <a
          href="http://jalammar.github.io/illustrated-transformer/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          The Illustrated Transformer
        </a>
        <span className="footer-desc">- A visual guide to neural network machine translation.</span>
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
        }
        .footer-link:hover {
          color: var(--accent-secondary);
          text-decoration: underline;
        }
        .footer-desc {
          opacity: 0.8;
        }
      `}</style>
    </footer>
  );
}
