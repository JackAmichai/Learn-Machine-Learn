import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { NOTES, getNote } from '../data/notes';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import DotProductVisualizer from '../components/math/DotProductVisualizer';
import GradientDescentVisualizer from '../components/math/GradientDescentVisualizer';
import AttentionVisualizer from '../components/math/AttentionVisualizer';
import TransformerVisualizer from '../components/math/TransformerVisualizer';

/**
 * /notes — a small, quality-first writing section.
 *
 * Notes are embedded-in-code rather than markdown-sourced because they mix
 * prose with live React visualizers. See src/data/notes.js for content.
 */

// Registry of inline visualizers we allow inside note bodies. Add entries as needed.
const VIZ = {
    DotProductVisualizer,
    GradientDescentVisualizer,
    AttentionVisualizer,
    TransformerVisualizer,
};

const formatDate = (iso) => {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    } catch {
        return iso;
    }
};

export function NotesIndex() {
    useEffect(() => {
        document.title = 'Notes — Learn Machine Learn';
    }, []);

    return (
        <div className="notes-page">
            <header className="notes-header">
                <Link to="/" className="notes-back">← Home</Link>
                <div className="notes-header-actions">
                    <Link to="/lessons" className="notes-nav">Lessons</Link>
                    <Link to="/lab" className="notes-nav">Lab</Link>
                    <Link to="/resources" className="notes-nav">Library</Link>
                    <ThemeToggle />
                </div>
            </header>

            <main className="notes-main">
                <section className="notes-hero">
                    <span className="notes-eyebrow">Notes</span>
                    <h1>Long-form on the ideas that changed how I think about ML.</h1>
                    <p>Short, opinionated, interactive where it helps. New entries when I have something worth saying.</p>
                </section>

                <section className="notes-list">
                    {NOTES.map(n => (
                        <Link key={n.slug} to={`/notes/${n.slug}`} className="notes-card">
                            <div className="notes-card-gradient" style={{ background: n.heroGradient }} />
                            <div className="notes-card-body">
                                <div className="notes-card-meta">
                                    <span>{formatDate(n.date)}</span>
                                    <span>· {n.readingMinutes} min read</span>
                                </div>
                                <h2>{n.title}</h2>
                                <p className="notes-card-sub">{n.subtitle}</p>
                                <p className="notes-card-excerpt">{n.excerpt}</p>
                                <div className="notes-card-tags">
                                    {n.tags.map(t => <span key={t}>#{t}</span>)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>

            <Footer />

            {sharedStyles}
        </div>
    );
}

export function NotePage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const note = getNote(slug);

    useEffect(() => {
        if (note) document.title = `${note.title} — Notes`;
    }, [note]);

    if (!note) {
        return (
            <div className="notes-page">
                <header className="notes-header">
                    <Link to="/notes" className="notes-back">← All notes</Link>
                </header>
                <main className="notes-main notes-404">
                    <h1>Note not found</h1>
                    <p>That slug doesn&apos;t match any published note.</p>
                    <button onClick={() => navigate('/notes')}>See all notes</button>
                </main>
                <Footer />
                {sharedStyles}
            </div>
        );
    }

    return (
        <div className="notes-page">
            <header className="notes-header">
                <Link to="/notes" className="notes-back">← All notes</Link>
                <div className="notes-header-actions">
                    <Link to="/lessons" className="notes-nav">Lessons</Link>
                    <Link to="/lab" className="notes-nav">Lab</Link>
                    <ThemeToggle />
                </div>
            </header>

            <article className="note-article">
                <div className="note-hero" style={{ background: note.heroGradient }} aria-hidden="true" />
                <div className="note-article-inner">
                    <div className="note-article-meta">
                        <span>{formatDate(note.date)}</span>
                        <span>· {note.readingMinutes} min read</span>
                        <span>· by {note.author}</span>
                    </div>
                    <h1>{note.title}</h1>
                    <p className="note-article-sub">{note.subtitle}</p>
                    <div className="note-article-tags">
                        {note.tags.map(t => <span key={t}>#{t}</span>)}
                    </div>

                    <div className="note-article-body">
                        {note.body.map((block, i) => <NoteBlock key={i} block={block} />)}
                    </div>

                    <nav className="note-footer-nav">
                        <Link to="/notes" className="note-back-link">← All notes</Link>
                        <a
                            href={`mailto:jackamichai@gmail.com?subject=${encodeURIComponent('Re: ' + note.title)}`}
                            className="note-reply"
                        >
                            Disagree? Email me →
                        </a>
                    </nav>
                </div>
            </article>

            <Footer />
            {sharedStyles}
        </div>
    );
}

function NoteBlock({ block }) {
    switch (block.type) {
        case 'h': return <h2 className="note-h">{block.text}</h2>;
        case 'p': return <p className="note-p">{block.text}</p>;
        case 'list':
            return <ul className="note-list">{block.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
        case 'ol':
            return <ol className="note-list note-ol">{block.items.map((it, i) => <li key={i}>{it}</li>)}</ol>;
        case 'quote':
            return (
                <blockquote className="note-quote">
                    <p>"{block.text}"</p>
                    {block.cite && <cite>— {block.cite}</cite>}
                </blockquote>
            );
        case 'code': return <pre className="note-code"><code>{block.code}</code></pre>;
        case 'callout':
            return (
                <aside className={`note-callout note-callout-${block.kind || 'aside'}`}>
                    <strong>
                        {block.kind === 'insight' ? '💡 Insight' :
                         block.kind === 'warn' ? '⚠️ Heads up' : 'Side note'}
                    </strong>
                    <p>{block.text}</p>
                </aside>
            );
        case 'viz': {
            const Comp = VIZ[block.name];
            if (!Comp) {
                return <div className="note-viz-missing">Visualizer "{block.name}" not found.</div>;
            }
            return (
                <div className="note-viz">
                    <Comp values={block.props || {}} />
                </div>
            );
        }
        default: return null;
    }
}

// Styles are shared between index + detail pages, so we inline them once.
const sharedStyles = (
    <style>{`
        .notes-page {
            min-height: 100vh;
            color: var(--text-primary);
            background:
                radial-gradient(1100px 500px at 0% -10%, rgba(0,242,255,0.08), transparent 60%),
                radial-gradient(900px 400px at 110% 10%, rgba(112,0,255,0.08), transparent 60%),
                var(--bg-primary);
            font-family: var(--font-main, 'Inter', system-ui, sans-serif);
        }
        .notes-header {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notes-back, .note-back-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 14px;
        }
        .notes-back:hover, .note-back-link:hover { color: var(--accent-primary); }
        .notes-header-actions {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .notes-nav {
            text-decoration: none;
            color: var(--text-secondary);
            padding: 6px 14px;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 999px;
            font-size: 13px;
            transition: all 0.2s;
        }
        .notes-nav:hover { color: var(--accent-primary); border-color: var(--accent-primary); }

        .notes-main {
            max-width: 900px;
            margin: 0 auto;
            padding: 16px 24px 60px;
        }
        .notes-hero {
            padding: 60px 0 40px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            margin-bottom: 40px;
        }
        .notes-eyebrow {
            display: inline-block;
            background: linear-gradient(135deg, rgba(0,242,255,0.15), rgba(112,0,255,0.15));
            color: var(--accent-primary);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.6px;
            padding: 6px 14px;
            border-radius: 999px;
            text-transform: uppercase;
            margin-bottom: 18px;
            border: 1px solid rgba(0,242,255,0.2);
        }
        .notes-hero h1 {
            font-family: 'Outfit', var(--font-main);
            font-size: clamp(32px, 5vw, 48px);
            margin: 0 0 16px;
            letter-spacing: -1px;
            line-height: 1.15;
        }
        .notes-hero p {
            font-size: 17px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin: 0;
            max-width: 620px;
        }
        .notes-list {
            display: flex;
            flex-direction: column;
            gap: 18px;
        }
        .notes-card {
            display: grid;
            grid-template-columns: 160px 1fr;
            gap: 20px;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            transition: border-color 0.2s, transform 0.2s;
        }
        .notes-card:hover {
            border-color: rgba(0,242,255,0.3);
            transform: translateY(-2px);
        }
        @media (max-width: 640px) {
            .notes-card { grid-template-columns: 1fr; }
            .notes-card-gradient { height: 80px; }
        }
        .notes-card-gradient {
            min-height: 100%;
            opacity: 0.85;
        }
        .notes-card-body { padding: 20px 22px; }
        .notes-card-meta {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-secondary);
            display: flex;
            gap: 6px;
            margin-bottom: 8px;
        }
        .notes-card h2 {
            font-family: 'Outfit', var(--font-main);
            font-size: 22px;
            margin: 0 0 4px;
            letter-spacing: -0.5px;
        }
        .notes-card-sub {
            font-size: 14px;
            color: var(--text-secondary);
            font-style: italic;
            margin: 0 0 10px;
        }
        .notes-card-excerpt {
            font-size: 14px;
            line-height: 1.65;
            color: var(--text-secondary);
            margin: 0 0 12px;
        }
        .notes-card-tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .notes-card-tags span {
            font-size: 11px;
            color: var(--accent-primary);
            background: rgba(0,242,255,0.08);
            border: 1px solid rgba(0,242,255,0.15);
            padding: 2px 8px;
            border-radius: 999px;
            font-family: ui-monospace, monospace;
        }

        /* ─────────── Article page ─────────── */
        .note-article {
            max-width: 720px;
            margin: 0 auto;
            padding: 0 24px 60px;
        }
        .note-hero {
            height: 180px;
            border-radius: 0 0 24px 24px;
            margin-bottom: 40px;
            opacity: 0.85;
        }
        .note-article-inner { padding: 0 4px; }
        .note-article-meta {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-secondary);
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            margin-bottom: 14px;
        }
        .note-article h1 {
            font-family: 'Outfit', var(--font-main);
            font-size: clamp(32px, 5vw, 48px);
            margin: 0 0 12px;
            letter-spacing: -1px;
            line-height: 1.12;
        }
        .note-article-sub {
            font-size: 20px;
            color: var(--text-secondary);
            font-style: italic;
            line-height: 1.5;
            margin: 0 0 16px;
        }
        .note-article-tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 32px;
        }
        .note-article-tags span {
            font-size: 11px;
            color: var(--accent-primary);
            background: rgba(0,242,255,0.08);
            padding: 3px 10px;
            border-radius: 999px;
            font-family: ui-monospace, monospace;
        }
        .note-article-body {
            font-size: 17px;
            line-height: 1.8;
            color: var(--text-primary);
        }
        .note-h {
            font-family: 'Outfit', var(--font-main);
            font-size: 26px;
            margin: 48px 0 18px;
            letter-spacing: -0.3px;
            border-top: 1px solid rgba(255,255,255,0.06);
            padding-top: 28px;
        }
        .note-h:first-child { border-top: none; padding-top: 0; margin-top: 0; }
        .note-p {
            margin: 0 0 22px;
            color: var(--text-secondary);
        }
        .note-p strong, .note-list strong { color: var(--text-primary); }
        .note-list {
            margin: 0 0 22px;
            padding-left: 22px;
            color: var(--text-secondary);
        }
        .note-list li { margin-bottom: 10px; line-height: 1.7; }
        .note-ol { counter-reset: item; list-style: none; padding-left: 0; }
        .note-ol li {
            counter-increment: item;
            padding-left: 40px;
            position: relative;
        }
        .note-ol li::before {
            content: counter(item);
            position: absolute;
            left: 0;
            top: 0;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(0,242,255,0.1);
            color: var(--accent-primary);
            font-family: 'Outfit', var(--font-main);
            font-weight: 700;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(0,242,255,0.25);
        }
        .note-quote {
            margin: 28px 0;
            padding: 20px 24px;
            border-left: 3px solid var(--accent-primary);
            background: rgba(0,242,255,0.04);
            border-radius: 0 10px 10px 0;
        }
        .note-quote p {
            margin: 0 0 8px;
            font-size: 18px;
            line-height: 1.6;
            color: var(--text-primary);
            font-style: italic;
        }
        .note-quote cite {
            font-size: 13px;
            color: var(--text-secondary);
            font-style: normal;
        }
        .note-code {
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px;
            padding: 16px;
            margin: 24px 0;
            overflow-x: auto;
            font-family: ui-monospace, 'SF Mono', Menlo, monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #c084fc;
        }
        .note-callout {
            margin: 28px 0;
            padding: 18px 22px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.08);
        }
        .note-callout strong {
            display: block;
            font-size: 13px;
            letter-spacing: 0.8px;
            margin-bottom: 6px;
        }
        .note-callout p {
            margin: 0;
            font-size: 15px;
            line-height: 1.65;
            color: var(--text-secondary);
        }
        .note-callout-insight { background: rgba(0,242,255,0.06); border-color: rgba(0,242,255,0.2); }
        .note-callout-insight strong { color: var(--accent-primary); }
        .note-callout-warn { background: rgba(251,146,60,0.08); border-color: rgba(251,146,60,0.25); }
        .note-callout-warn strong { color: #fb923c; }
        .note-callout-aside { background: rgba(255,255,255,0.03); }
        .note-callout-aside strong { color: var(--text-primary); }
        .note-viz {
            margin: 32px 0;
            border-radius: 12px;
            overflow: hidden;
        }
        .note-viz-missing {
            margin: 24px 0;
            padding: 18px;
            background: rgba(255,0,85,0.06);
            border: 1px dashed rgba(255,0,85,0.25);
            border-radius: 10px;
            color: #ff6b8a;
            font-size: 13px;
            font-family: ui-monospace, monospace;
        }

        .note-footer-nav {
            margin-top: 60px;
            padding-top: 28px;
            border-top: 1px solid rgba(255,255,255,0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }
        .note-reply {
            color: var(--accent-primary);
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
        }
        .note-reply:hover { text-decoration: underline; }

        .notes-404 {
            text-align: center;
            padding: 80px 24px;
        }
        .notes-404 h1 { font-family: 'Outfit', var(--font-main); font-size: 32px; margin-bottom: 12px; }
        .notes-404 p { color: var(--text-secondary); margin-bottom: 24px; }
        .notes-404 button {
            background: linear-gradient(135deg, #00f2ff, #7000ff);
            color: #fff;
            border: none;
            padding: 10px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-family: inherit;
            font-weight: 600;
        }
    `}</style>
);

export default NotesIndex;
