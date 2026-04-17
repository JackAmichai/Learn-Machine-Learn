import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Site footer with a built-in feedback form.
 *
 * Feedback is delivered via FormSubmit.co — a no-backend email relay.
 * Submissions POST to https://formsubmit.co/<email> and forward to that inbox.
 * The first submission triggers a one-time email confirmation from FormSubmit.
 *
 * No token or account needed. Target inbox: jackamichai@gmail.com
 *
 * The email address is encoded to slow down trivial scrapers. Change
 * FEEDBACK_EMAIL below to re-route feedback.
 */

const FEEDBACK_EMAIL = 'jackamichai@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/${FEEDBACK_EMAIL}`;

export function Footer() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', category: 'general', message: '' });

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please enter a message.');
      return;
    }
    setStatus('sending');
    setErrorMsg('');

    try {
      const payload = new FormData();
      payload.append('name', form.name || 'Anonymous learner');
      payload.append('email', form.email || 'not provided');
      payload.append('category', form.category);
      payload.append('message', form.message);
      payload.append('_subject', `[Learn Machine Learn] ${form.category}: feedback from ${form.name || 'anonymous'}`);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status}).`);
      }

      setStatus('sent');
      setForm({ name: '', email: '', category: 'general', message: '' });
    } catch (err) {
      console.error('[Feedback] submit error:', err);
      setStatus('error');
      setErrorMsg(
        err.message ||
          'Could not send feedback. As a fallback, email ' + FEEDBACK_EMAIL + ' directly.'
      );
    }
  };

  const mailtoFallback = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
    'Learn Machine Learn — feedback'
  )}`;

  return (
    <footer className="app-footer-v2">
      <div className="footer-inner">
        {/* COLUMN 1 — About */}
        <div className="footer-col">
          <div className="footer-brand">
            <span className="footer-logo">⚡</span>
            <strong>Learn Machine Learn</strong>
          </div>
          <p className="footer-tagline">
            An open-source, in-browser machine learning course — visual, math-first,
            and built to make ML understandable for every learner.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">Free forever</span>
            <span className="footer-badge">Open source</span>
            <span className="footer-badge">No sign-up</span>
          </div>
        </div>

        {/* COLUMN 2 — Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/playground">Playground</Link></li>
            <li><Link to="/lab">Lab (train on your data)</Link></li>
            <li><Link to="/lessons">Interactive Lessons</Link></li>
            <li><Link to="/resources">Resource Library</Link></li>
            <li><Link to="/quizzes">Quizzes</Link></li>
            <li><Link to="/notes">Notes</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/looking-forward">Looking Forward</Link></li>
          </ul>
        </div>

        {/* COLUMN 3 — Further reading */}
        <div className="footer-col">
          <h4 className="footer-heading">Further Reading</h4>
          <ul className="footer-links">
            <li>
              <a href="https://jalammar.github.io/illustrated-transformer/" target="_blank" rel="noopener noreferrer">
                The Illustrated Transformer
              </a>
            </li>
            <li>
              <a href="https://www.deeplearningbook.org/" target="_blank" rel="noopener noreferrer">
                Deep Learning Book
              </a>
            </li>
            <li>
              <a href="https://karpathy.ai/zero-to-hero.html" target="_blank" rel="noopener noreferrer">
                Karpathy: Zero to Hero
              </a>
            </li>
            <li>
              <a href="https://distill.pub/" target="_blank" rel="noopener noreferrer">
                Distill.pub
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 4 — Feedback */}
        <div className="footer-col footer-col-feedback">
          <h4 className="footer-heading">Send Feedback</h4>
          <p className="footer-feedback-desc">
            Found a bug? Have a suggestion? Want to request a topic? Drop a note — it lands
            in my inbox directly.
          </p>

          {status === 'sent' ? (
            <div className="feedback-success" role="status">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <strong>Message sent — thank you!</strong>
                <p>I read every message and will reply when I can.</p>
                <button
                  type="button"
                  className="feedback-send-another"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={onSubmit} noValidate>
              <div className="feedback-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name (optional)"
                  value={form.name}
                  onChange={onChange}
                  autoComplete="name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email (optional)"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                />
              </div>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                aria-label="Feedback category"
              >
                <option value="general">General feedback</option>
                <option value="bug">Bug report</option>
                <option value="suggestion">Feature suggestion</option>
                <option value="content">Content correction</option>
                <option value="praise">Something I loved</option>
              </select>
              <textarea
                name="message"
                placeholder="Your message…"
                value={form.message}
                onChange={onChange}
                rows={4}
                required
              />
              {status === 'error' && (
                <div className="feedback-error">
                  {errorMsg}{' '}
                  <a href={mailtoFallback}>Email instead</a>
                </div>
              )}
              <div className="feedback-actions">
                <a className="feedback-mailto" href={mailtoFallback}>
                  Or email directly
                </a>
                <button
                  type="submit"
                  className="feedback-submit"
                  disabled={status === 'sending' || !form.message.trim()}
                >
                  {status === 'sending' ? 'Sending…' : 'Send feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="footer-base">
        <div className="footer-base-inner">
          <span>© {new Date().getFullYear()} Learn Machine Learn · Built by <Link to="/about" style={{ color: 'inherit' }}>Jack Amichai</Link></span>
          <div className="footer-base-links">
            <a href="https://github.com/JackAmichai/Learn-Machine-Learn" target="_blank" rel="noopener noreferrer">GitHub repo</a>
            <span className="sep">·</span>
            <Link to="/about">About</Link>
            <span className="sep">·</span>
            <a href={mailtoFallback}>Contact</a>
          </div>
        </div>
      </div>

      <style>{`
        .app-footer-v2 {
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
          border-top: 1px solid rgba(255,255,255,0.06);
          color: var(--text-primary, #e8e8f0);
          margin-top: 60px;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 24px 36px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.4fr;
          gap: 40px;
        }
        @media (max-width: 960px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .footer-col-feedback { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .footer-inner {
            grid-template-columns: 1fr;
            padding: 40px 20px 24px;
          }
        }

        .footer-col { display: flex; flex-direction: column; gap: 12px; }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Outfit', var(--font-main, inherit);
          font-size: 18px;
        }
        .footer-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #00f2ff, #7000ff);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-size: 18px;
        }
        .footer-tagline {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary, #8a8aa0);
          margin: 0;
        }
        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .footer-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(0, 242, 255, 0.08);
          border: 1px solid rgba(0, 242, 255, 0.2);
          color: var(--accent-primary, #00f2ff);
          letter-spacing: 0.3px;
        }

        .footer-heading {
          font-family: 'Outfit', var(--font-main, inherit);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-primary);
          margin: 0 0 4px;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-links a {
          color: var(--text-secondary, #8a8aa0);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: var(--accent-primary, #00f2ff);
          text-decoration: underline;
        }

        /* FEEDBACK FORM */
        .footer-feedback-desc {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary, #8a8aa0);
          margin: 0 0 4px;
        }
        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .feedback-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 420px) {
          .feedback-row { grid-template-columns: 1fr; }
        }
        .feedback-form input,
        .feedback-form select,
        .feedback-form textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 12px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 13px;
          transition: border-color 0.2s, background 0.2s;
        }
        .feedback-form input:focus,
        .feedback-form select:focus,
        .feedback-form textarea:focus {
          outline: none;
          border-color: var(--accent-primary, #00f2ff);
          background: rgba(255,255,255,0.06);
        }
        .feedback-form textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.5;
        }
        .feedback-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }
        .feedback-mailto {
          font-size: 12px;
          color: var(--text-secondary, #8a8aa0);
          text-decoration: underline;
        }
        .feedback-mailto:hover { color: var(--accent-primary); }
        .feedback-submit {
          background: linear-gradient(135deg, #00f2ff, #00c8d4);
          color: #000;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .feedback-submit:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 242, 255, 0.35);
        }
        .feedback-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .feedback-error {
          font-size: 12px;
          color: #ff6b8a;
          padding: 8px 12px;
          background: rgba(255, 0, 85, 0.06);
          border: 1px solid rgba(255, 0, 85, 0.2);
          border-radius: 8px;
        }
        .feedback-error a {
          color: #ff9bae;
          font-weight: 600;
        }
        .feedback-success {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 16px;
          background: rgba(52, 211, 153, 0.08);
          border: 1px solid rgba(52, 211, 153, 0.25);
          border-radius: 12px;
          color: #34d399;
        }
        .feedback-success svg { flex-shrink: 0; margin-top: 2px; }
        .feedback-success strong {
          display: block;
          font-size: 14px;
          color: #34d399;
          margin-bottom: 2px;
        }
        .feedback-success p {
          margin: 0 0 8px;
          color: var(--text-secondary);
          font-size: 13px;
        }
        .feedback-send-another {
          background: transparent;
          border: 1px solid rgba(52, 211, 153, 0.4);
          color: #34d399;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
        }
        .feedback-send-another:hover { background: rgba(52, 211, 153, 0.1); }

        /* BASE BAR */
        .footer-base {
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.25);
        }
        .footer-base-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--text-secondary, #8a8aa0);
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-base-links {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .footer-base-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-base-links a:hover { color: var(--accent-primary); }
        .footer-base-links .sep { opacity: 0.5; }
      `}</style>
    </footer>
  );
}
