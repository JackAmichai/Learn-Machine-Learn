import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  searchResources,
  getAllTags,
} from '../data/resourcesLibrary';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';

const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     color: '#34d399' },
  { id: 'intermediate', label: 'Intermediate', color: '#60a5fa' },
  { id: 'advanced',     label: 'Advanced',     color: '#c084fc' },
];

export function ResourceLibrary() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [freeOnly, setFreeOnly] = useState(false);

  const allTags = useMemo(() => getAllTags(), []);

  const filtered = useMemo(() => {
    return searchResources(query, {
      category: activeCategory === 'all' ? null : activeCategory,
      level: activeLevel === 'all' ? null : activeLevel,
      tag: activeTag === 'all' ? null : activeTag,
      freeOnly,
    });
  }, [query, activeCategory, activeLevel, activeTag, freeOnly]);

  // Group filtered results by category
  const grouped = useMemo(() => {
    const g = {};
    RESOURCE_CATEGORIES.forEach((c) => { g[c.id] = []; });
    filtered.forEach((r) => {
      if (g[r.category]) g[r.category].push(r);
    });
    return g;
  }, [filtered]);

  const visibleCategories = RESOURCE_CATEGORIES.filter(
    (c) => (activeCategory === 'all' || c.id === activeCategory) && grouped[c.id]?.length > 0
  );

  const totalResults = filtered.length;

  const clearAll = () => {
    setQuery('');
    setActiveCategory('all');
    setActiveLevel('all');
    setActiveTag('all');
    setFreeOnly(false);
  };

  const hasActiveFilters = query || activeCategory !== 'all' || activeLevel !== 'all' || activeTag !== 'all' || freeOnly;

  return (
    <div className="library-page">
      {/* HEADER */}
      <header className="lib-hero">
        <div className="lib-hero-inner">
          <div className="lib-hero-top">
            <div className="lib-breadcrumbs">
              <Link to="/dashboard">Dashboard</Link>
              <span>/</span>
              <span>Resource Library</span>
            </div>
            <div className="lib-hero-actions">
              <Link to="/lessons" className="lib-nav-link">Interactive Lessons</Link>
              <Link to="/looking-forward" className="lib-nav-link">Looking Forward</Link>
              <ThemeToggle />
            </div>
          </div>

          <h1 className="lib-title">
            The <span className="lib-accent">ML Resource Library</span>
          </h1>
          <p className="lib-subtitle">
            A curated index of {RESOURCES.length}+ papers, books, courses, and tools — handpicked for clarity,
            rigor, and relevance. Every resource links to its canonical source.
          </p>

          {/* SEARCH */}
          <div className="lib-search-wrap">
            <svg className="lib-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              className="lib-search"
              placeholder="Search by title, author, topic, or tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search resources"
            />
            {query && (
              <button className="lib-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="lib-filters">
        <div className="lib-filters-inner">
          {/* Categories */}
          <div className="filter-row">
            <span className="filter-label">Category</span>
            <div className="filter-chips">
              <button
                className={`chip ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All ({RESOURCES.length})
              </button>
              {RESOURCE_CATEGORIES.map((c) => {
                const count = RESOURCES.filter((r) => r.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    className={`chip ${activeCategory === c.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(c.id)}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                    <span className="chip-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level */}
          <div className="filter-row">
            <span className="filter-label">Level</span>
            <div className="filter-chips">
              <button
                className={`chip ${activeLevel === 'all' ? 'active' : ''}`}
                onClick={() => setActiveLevel('all')}
              >
                All levels
              </button>
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  className={`chip ${activeLevel === l.id ? 'active' : ''}`}
                  onClick={() => setActiveLevel(l.id)}
                  style={activeLevel === l.id ? { borderColor: l.color, background: `${l.color}22` } : undefined}
                >
                  <span className="level-dot" style={{ background: l.color }} />
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags + Free toggle */}
          <div className="filter-row">
            <span className="filter-label">Topic</span>
            <div className="filter-chips">
              <select
                className="tag-select"
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                aria-label="Filter by topic tag"
              >
                <option value="all">All topics</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <label className="free-toggle">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                />
                <span>Free only</span>
              </label>
              {hasActiveFilters && (
                <button className="clear-all" onClick={clearAll}>
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="lib-results-count">
            <strong>{totalResults}</strong> {totalResults === 1 ? 'resource' : 'resources'}
            {hasActiveFilters ? ' match your filters' : ''}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <main className="lib-results">
        {totalResults === 0 ? (
          <div className="lib-empty">
            <div className="lib-empty-icon">🔍</div>
            <h3>No resources match your filters.</h3>
            <p>Try broadening your search or clearing some filters.</p>
            <button className="btn-primary" onClick={clearAll}>Reset filters</button>
          </div>
        ) : (
          visibleCategories.map((cat) => (
            <section key={cat.id} className="lib-category-section">
              <div className="lib-category-header">
                <h2>
                  <span className="cat-icon" aria-hidden="true">{cat.icon}</span>
                  {cat.label}
                  <span className="cat-count">{grouped[cat.id].length}</span>
                </h2>
                <p className="cat-desc">{cat.desc}</p>
              </div>

              <div className="lib-card-grid">
                {grouped[cat.id].map((r, i) => (
                  <a
                    key={`${r.url}-${i}`}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lib-card"
                  >
                    <div className="lib-card-top">
                      <span
                        className="lib-card-level"
                        style={{
                          background: `${LEVELS.find((l) => l.id === r.level)?.color}22`,
                          color: LEVELS.find((l) => l.id === r.level)?.color,
                        }}
                      >
                        {r.level}
                      </span>
                      {r.free && <span className="lib-card-badge free">Free</span>}
                      {!r.free && <span className="lib-card-badge paid">Paid</span>}
                      <span className="lib-card-year">{r.year}</span>
                    </div>
                    <h3 className="lib-card-title">{r.title}</h3>
                    <p className="lib-card-author">{r.author}</p>
                    <p className="lib-card-summary">{r.summary}</p>
                    <div className="lib-card-tags">
                      {r.tags.slice(0, 4).map((t) => (
                        <span key={t} className="lib-card-tag">{t}</span>
                      ))}
                    </div>
                    <div className="lib-card-link">
                      Open
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <Footer />

      <style>{`
        .library-page {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at top, rgba(0, 242, 255, 0.06), transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(112, 0, 255, 0.05), transparent 60%),
            var(--bg-primary, #0a0a15);
          color: var(--text-primary, #e8e8f0);
        }

        /* HERO */
        .lib-hero {
          padding: 32px 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
        }
        .lib-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .lib-hero-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .lib-breadcrumbs {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 13px;
          color: var(--text-secondary, #8a8aa0);
        }
        .lib-breadcrumbs a {
          color: var(--accent-primary, #00f2ff);
          text-decoration: none;
        }
        .lib-breadcrumbs a:hover { text-decoration: underline; }

        .lib-hero-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .lib-nav-link {
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s;
        }
        .lib-nav-link:hover {
          background: rgba(0, 242, 255, 0.08);
          border-color: rgba(0, 242, 255, 0.3);
        }

        .lib-title {
          font-family: 'Outfit', var(--font-main, inherit);
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          letter-spacing: -1.5px;
          margin: 0 0 12px;
          line-height: 1.05;
        }
        .lib-accent {
          background: linear-gradient(90deg, #00f2ff, #7000ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lib-subtitle {
          font-size: clamp(15px, 1.8vw, 18px);
          color: var(--text-secondary, #8a8aa0);
          max-width: 720px;
          line-height: 1.6;
          margin: 0 0 28px;
        }

        /* SEARCH */
        .lib-search-wrap {
          position: relative;
          max-width: 640px;
        }
        .lib-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary, #8a8aa0);
          pointer-events: none;
        }
        .lib-search {
          width: 100%;
          padding: 16px 48px 16px 52px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: var(--text-primary);
          font-size: 16px;
          font-family: inherit;
          transition: all 0.2s;
        }
        .lib-search:focus {
          outline: none;
          border-color: var(--accent-primary, #00f2ff);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 4px rgba(0, 242, 255, 0.12);
        }
        .lib-search-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-primary);
        }
        .lib-search-clear:hover { background: rgba(255,255,255,0.2); }

        /* FILTERS */
        .lib-filters {
          padding: 20px 24px;
          background: rgba(0,0,0,0.2);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .lib-filters-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .filter-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-secondary, #8a8aa0);
          min-width: 70px;
        }
        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          flex: 1;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: var(--text-secondary, #8a8aa0);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .chip:hover {
          background: rgba(255,255,255,0.08);
          color: var(--text-primary);
        }
        .chip.active {
          background: rgba(0, 242, 255, 0.12);
          border-color: rgba(0, 242, 255, 0.5);
          color: var(--accent-primary, #00f2ff);
        }
        .chip-count {
          background: rgba(255,255,255,0.08);
          padding: 1px 7px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
        }
        .chip.active .chip-count {
          background: rgba(0, 242, 255, 0.2);
        }
        .level-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .tag-select {
          padding: 7px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: var(--text-primary);
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
        }
        .tag-select:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
        .free-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
        }
        .free-toggle input { cursor: pointer; accent-color: var(--accent-primary, #00f2ff); }
        .free-toggle:hover { color: var(--text-primary); }

        .clear-all {
          background: transparent;
          border: none;
          color: #ff6b8a;
          font-size: 13px;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          font-family: inherit;
        }
        .clear-all:hover {
          background: rgba(255, 107, 138, 0.1);
        }

        .lib-results-count {
          font-size: 13px;
          color: var(--text-secondary, #8a8aa0);
          padding-top: 4px;
        }
        .lib-results-count strong {
          color: var(--accent-primary, #00f2ff);
          font-weight: 700;
        }

        /* RESULTS */
        .lib-results {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 60px;
        }
        .lib-category-section {
          margin-bottom: 56px;
        }
        .lib-category-header {
          margin-bottom: 20px;
        }
        .lib-category-header h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Outfit', var(--font-main, inherit);
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          margin: 0 0 6px;
          letter-spacing: -0.5px;
        }
        .cat-icon { font-size: 1em; }
        .cat-count {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary, #8a8aa0);
          background: rgba(255,255,255,0.06);
          padding: 3px 10px;
          border-radius: 999px;
        }
        .cat-desc {
          color: var(--text-secondary, #8a8aa0);
          font-size: 15px;
          max-width: 720px;
          margin: 0;
          line-height: 1.5;
        }

        .lib-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 18px;
        }
        .lib-card {
          display: flex;
          flex-direction: column;
          padding: 22px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .lib-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .lib-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 242, 255, 0.3);
          background: linear-gradient(135deg, rgba(0, 242, 255, 0.06), rgba(112, 0, 255, 0.03));
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 242, 255, 0.2);
        }
        .lib-card:hover::before { opacity: 1; }

        .lib-card-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .lib-card-level {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .lib-card-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .lib-card-badge.free {
          background: rgba(52, 211, 153, 0.15);
          color: #34d399;
        }
        .lib-card-badge.paid {
          background: rgba(251, 146, 60, 0.15);
          color: #fb923c;
        }
        .lib-card-year {
          margin-left: auto;
          font-size: 11px;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
        }

        .lib-card-title {
          font-family: 'Outfit', var(--font-main, inherit);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          margin: 0 0 6px;
          color: var(--text-primary);
        }
        .lib-card-author {
          font-size: 13px;
          color: var(--text-secondary, #8a8aa0);
          margin: 0 0 12px;
          font-style: italic;
        }
        .lib-card-summary {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-primary);
          opacity: 0.85;
          margin: 0 0 16px;
          flex: 1;
        }
        .lib-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }
        .lib-card-tag {
          font-size: 10px;
          padding: 3px 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 6px;
          color: var(--text-secondary);
        }
        .lib-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-primary, #00f2ff);
          margin-top: auto;
        }
        .lib-card:hover .lib-card-link {
          gap: 8px;
        }

        /* EMPTY */
        .lib-empty {
          text-align: center;
          padding: 80px 20px;
        }
        .lib-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.6;
        }
        .lib-empty h3 {
          font-family: 'Outfit', var(--font-main, inherit);
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 6px;
        }
        .lib-empty p {
          color: var(--text-secondary);
          margin: 0 0 24px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #00f2ff, #00c8d4);
          color: #000;
          font-weight: 700;
          padding: 10px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        /* RESPONSIVE */
        @media (max-width: 600px) {
          .lib-hero { padding: 20px 16px; }
          .lib-filters { padding: 16px; }
          .lib-results { padding: 24px 16px 48px; }
          .filter-label { min-width: 60px; font-size: 10px; }
          .filter-row { gap: 8px; }
          .lib-card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
