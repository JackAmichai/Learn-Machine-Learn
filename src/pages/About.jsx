import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';

/**
 * /about — the personal narrative behind the project.
 *
 * This page is deliberately honest and specific. Portfolio sites drift into
 * marketing voice and say nothing. The pitch here is:
 *   (1) what the project is (and why it exists)
 *   (2) what it actually taught the author
 *   (3) technical decisions someone can probe at an interview
 *   (4) a clear "hire / collaborate / say hi" CTA
 */
export function AboutPage() {
    useEffect(() => {
        document.title = 'About — Learn Machine Learn';
    }, []);

    return (
        <div className="about-page">
            <header className="about-header">
                <Link to="/" className="about-back">← Back home</Link>
                <div className="about-header-actions">
                    <Link to="/playground" className="about-nav-link">Playground</Link>
                    <Link to="/lab" className="about-nav-link">Lab</Link>
                    <Link to="/notes" className="about-nav-link">Notes</Link>
                    <ThemeToggle />
                </div>
            </header>

            <main className="about-main">
                {/* ───── HERO ───── */}
                <section className="about-hero">
                    <div className="about-hero-text">
                        <span className="about-eyebrow">About the project</span>
                        <h1>Built so I could actually understand ML — and so you can too.</h1>
                        <p className="about-lede">
                            Most ML courses explain gradient descent with a picture of a ball
                            rolling down a hill and then hand you a <code>fit()</code> call.
                            The concepts stay fuzzy because you never <em>see</em> them move.
                            This site is my answer to that — a place where every equation has
                            a slider you can drag, every architecture has a running picture,
                            and every model trains in your browser on real data.
                        </p>
                        <div className="about-cta-row">
                            <a className="about-cta primary" href="https://github.com/JackAmichai/Learn-Machine-Learn" target="_blank" rel="noopener noreferrer">
                                ⭐ View the source on GitHub
                            </a>
                            <a className="about-cta secondary" href="mailto:jackamichai@gmail.com?subject=About%20Learn%20Machine%20Learn">
                                Say hi
                            </a>
                        </div>
                    </div>
                    <div className="about-hero-card">
                        <div className="about-stat-grid">
                            <div><strong>44</strong><span>interactive visualizers</span></div>
                            <div><strong>80+</strong><span>curated resources</span></div>
                            <div><strong>60+</strong><span>scenario quizzes</span></div>
                            <div><strong>100%</strong><span>in-browser, no backend</span></div>
                        </div>
                    </div>
                </section>

                {/* ───── AUTHOR ───── */}
                <section className="about-section about-author">
                    <h2>Hi, I'm Jack.</h2>
                    <div className="about-columns">
                        <div>
                            <p>
                                I'm a ML engineer and lifelong learner who kept hitting the same
                                wall: I could use ML libraries long before I could <em>explain</em> what
                                they were doing. So I started building the tool I wish had existed
                                when I was learning — and "Learn Machine Learn" grew out of it.
                            </p>
                            <p>
                                Every page here is something I had to re-derive, re-read, or
                                re-implement to actually internalize. Transformer attention has
                                a running dot-product view because that's the moment the paper
                                clicked for me. The diffusion visualizer walks through β_t
                                because staring at the schedule is what made DDPM stop feeling
                                like magic. If a concept is on this site, it's because I was
                                once stuck on it.
                            </p>
                        </div>
                        <div>
                            <div className="about-contact-card">
                                <h3>Get in touch</h3>
                                <ul>
                                    <li><span>Email</span><a href="mailto:jackamichai@gmail.com">jackamichai@gmail.com</a></li>
                                    <li><span>GitHub</span><a href="https://github.com/JackAmichai" target="_blank" rel="noopener noreferrer">@JackAmichai</a></li>
                                    <li><span>Project repo</span><a href="https://github.com/JackAmichai/Learn-Machine-Learn" target="_blank" rel="noopener noreferrer">Learn-Machine-Learn</a></li>
                                </ul>
                                <p className="about-contact-note">
                                    Hiring for an ML / ML-infra / applied-research role and curious
                                    whether I can ship? The source code is the clearest résumé I can give.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── WHY ───── */}
                <section className="about-section">
                    <h2>Why I built it</h2>
                    <div className="about-why-grid">
                        <div className="about-why-card">
                            <span className="about-why-num">01</span>
                            <h3>ML without the paywall</h3>
                            <p>
                                Good ML pedagogy exists — it's just locked behind $2k specializations
                                or written in dense-paper style. The web is a better teacher than
                                either if you treat it like one. Everything here is free, forever,
                                and runs in your browser with no account.
                            </p>
                        </div>
                        <div className="about-why-card">
                            <span className="about-why-num">02</span>
                            <h3>Visuals over video</h3>
                            <p>
                                Video lectures put you in spectator mode. Interactive visualizers
                                don't — you have to poke the slider, notice the curve change, and
                                form your own hypothesis. That single change is worth more than
                                hours of passive watching.
                            </p>
                        </div>
                        <div className="about-why-card">
                            <span className="about-why-num">03</span>
                            <h3>Show the math, not just the metaphor</h3>
                            <p>
                                Most tutorials either hide the math or drown you in it. The
                                middle path — show the equation <em>and</em> a live picture of what
                                each term does — is rare. That's what every visualizer here tries
                                to be.
                            </p>
                        </div>
                        <div className="about-why-card">
                            <span className="about-why-num">04</span>
                            <h3>An ML project I could actually ship</h3>
                            <p>
                                Most personal ML projects end at a Colab notebook nobody else
                                opens. I wanted something that anyone — including people with no
                                ML background — could land on, click, and <em>get something out of</em>.
                                Shipping was the whole exercise.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ───── TECH ───── */}
                <section className="about-section">
                    <h2>How it's built</h2>
                    <div className="about-tech-grid">
                        <div className="about-tech-card">
                            <h3>Stack</h3>
                            <ul>
                                <li><strong>React 19</strong> + Vite 5 + React Router 7</li>
                                <li><strong>TensorFlow.js</strong> — every model trains in the client</li>
                                <li><strong>Zero-backend</strong> — deployed to Vercel as pure static</li>
                                <li><strong>Vitest</strong> + React Testing Library for unit tests</li>
                                <li><strong>CSS-in-JSX</strong> (scoped <code>&lt;style&gt;</code> per component)</li>
                                <li><strong>FormSubmit.co</strong> for no-backend feedback email relay</li>
                            </ul>
                        </div>
                        <div className="about-tech-card">
                            <h3>Architecture decisions</h3>
                            <ul>
                                <li>
                                    <strong>Engine/UI split</strong> — <code>src/engine/NeuralNetwork.js</code>
                                    wraps TF.js with validated config. UI is dumb, engine is testable.
                                </li>
                                <li>
                                    <strong>Safe config by construction</strong> — activations, optimizers,
                                    neuron counts, and layer depth are all whitelisted and clamped. No
                                    user input hits raw TF.js APIs.
                                </li>
                                <li>
                                    <strong>In-browser training</strong> — a CSV never leaves your
                                    laptop. Private-by-default is free when everything is client-side.
                                </li>
                                <li>
                                    <strong>Progressive disclosure</strong> — Landing → Questionnaire →
                                    Dashboard → Playground/Lessons/Quizzes. Each page matches a different
                                    learner intent.
                                </li>
                            </ul>
                        </div>
                        <div className="about-tech-card">
                            <h3>Tradeoffs I'd flag in an interview</h3>
                            <ul>
                                <li>
                                    <strong>No code-splitting yet</strong> — the bundle is ~2.6MB. Fine for
                                    a learning site on desktop, bad for mobile-first. Fixable with route-level
                                    <code>lazy()</code> + <code>manualChunks</code>.
                                </li>
                                <li>
                                    <strong>No SSR</strong> — OG previews work, but search crawlers see an
                                    empty shell before hydration. Vercel's Next.js port would be the natural
                                    next step if discovery becomes a goal.
                                </li>
                                <li>
                                    <strong>CSS-in-JSX</strong> — great for co-location and onboarding, not
                                    great for cross-component theming. A real design system would beat it.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ───── WHAT I LEARNED ───── */}
                <section className="about-section">
                    <h2>What building this actually taught me</h2>
                    <ol className="about-learned-list">
                        <li>
                            <strong>Visualizing an equation is a 10× stronger test of understanding
                            than writing it down.</strong> I thought I understood softmax until I had
                            to animate its temperature slider. Turned out I didn't.
                        </li>
                        <li>
                            <strong>Running a real model in the browser forces you to confront
                            every assumption.</strong> Memory leaks, tensor disposal, optimizer
                            re-compilation on config change — none of it matters in a Colab, all
                            of it matters at 60fps.
                        </li>
                        <li>
                            <strong>Pedagogy is a UX problem.</strong> The hardest bug on this site
                            wasn't code — it was a quiz page with 100vh overflow:hidden layout that
                            silently hid cards when I added a Footer. Users don't file tickets for
                            "I was confused," they just leave.
                        </li>
                        <li>
                            <strong>Shipping is the only teacher that doesn't lie.</strong> My first
                            version had a landing page, no dashboard, no lab, and no notes. Every
                            piece here exists because a real user (often me, at 2am) hit a wall
                            without it.
                        </li>
                    </ol>
                </section>

                {/* ───── CTA ───── */}
                <section className="about-cta-band">
                    <div>
                        <h2>Start where you are.</h2>
                        <p>
                            If you're brand new, take the 30-second questionnaire and let the
                            dashboard route you. If you already know your way around, the Lab
                            is where you can train on your own CSV.
                        </p>
                    </div>
                    <div className="about-cta-band-actions">
                        <Link to="/" className="about-cta primary">Take the tour →</Link>
                        <Link to="/lab" className="about-cta secondary">Jump to the Lab</Link>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                .about-page {
                    min-height: 100vh;
                    color: var(--text-primary);
                    background:
                        radial-gradient(1100px 500px at 10% -10%, rgba(0,242,255,0.10), transparent 60%),
                        radial-gradient(900px 400px at 110% 10%, rgba(112,0,255,0.10), transparent 60%),
                        var(--bg-primary);
                    font-family: var(--font-main, 'Inter', system-ui, sans-serif);
                }
                .about-header {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 20px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                }
                .about-back {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.2s;
                }
                .about-back:hover { color: var(--accent-primary); }
                .about-header-actions {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
                .about-nav-link {
                    text-decoration: none;
                    color: var(--text-secondary);
                    padding: 6px 14px;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 999px;
                    font-size: 13px;
                    transition: all 0.2s;
                }
                .about-nav-link:hover {
                    color: var(--accent-primary);
                    border-color: var(--accent-primary);
                }
                .about-main {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 24px 24px 60px;
                }
                .about-hero {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 40px;
                    align-items: center;
                    padding: 40px 0 60px;
                }
                @media (max-width: 900px) {
                    .about-hero { grid-template-columns: 1fr; }
                }
                .about-eyebrow {
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
                .about-hero h1 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: clamp(32px, 5vw, 52px);
                    line-height: 1.12;
                    margin: 0 0 20px;
                    letter-spacing: -1px;
                    background: linear-gradient(135deg, #fff, #c084fc 60%, #00f2ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .about-lede {
                    font-size: 17px;
                    line-height: 1.7;
                    color: var(--text-secondary);
                    margin: 0 0 24px;
                }
                .about-lede code,
                .about-section code {
                    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
                    font-size: 0.9em;
                    background: rgba(0,242,255,0.08);
                    color: var(--accent-primary);
                    padding: 2px 6px;
                    border-radius: 4px;
                }
                .about-cta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .about-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 22px;
                    border-radius: 999px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .about-cta.primary {
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    color: #fff;
                    box-shadow: 0 6px 20px rgba(0,242,255,0.25);
                }
                .about-cta.primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 28px rgba(0,242,255,0.4);
                }
                .about-cta.secondary {
                    background: rgba(255,255,255,0.04);
                    color: var(--text-primary);
                    border-color: rgba(255,255,255,0.12);
                }
                .about-cta.secondary:hover {
                    border-color: var(--accent-primary);
                    color: var(--accent-primary);
                }
                .about-hero-card {
                    background: linear-gradient(135deg, rgba(0,242,255,0.06), rgba(112,0,255,0.06));
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 28px;
                    backdrop-filter: blur(10px);
                }
                .about-stat-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                }
                .about-stat-grid > div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .about-stat-grid strong {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 36px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    line-height: 1;
                }
                .about-stat-grid span {
                    font-size: 12px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                }

                .about-section {
                    padding: 40px 0;
                    border-top: 1px solid rgba(255,255,255,0.06);
                }
                .about-section h2 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 30px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    letter-spacing: -0.5px;
                }
                .about-section p {
                    line-height: 1.7;
                    color: var(--text-secondary);
                    font-size: 15px;
                }
                .about-section p strong { color: var(--text-primary); }

                .about-columns {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 40px;
                }
                @media (max-width: 900px) {
                    .about-columns { grid-template-columns: 1fr; }
                }
                .about-contact-card {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 22px;
                }
                .about-contact-card h3 {
                    margin: 0 0 14px;
                    font-size: 15px;
                    font-weight: 700;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    color: var(--text-primary);
                }
                .about-contact-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .about-contact-card li {
                    display: grid;
                    grid-template-columns: 90px 1fr;
                    gap: 12px;
                    align-items: baseline;
                    font-size: 13px;
                }
                .about-contact-card li span {
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    font-size: 10px;
                    letter-spacing: 1px;
                }
                .about-contact-card li a {
                    color: var(--accent-primary);
                    text-decoration: none;
                    font-weight: 500;
                    word-break: break-all;
                }
                .about-contact-card li a:hover { text-decoration: underline; }
                .about-contact-note {
                    font-size: 12px;
                    color: var(--text-secondary);
                    line-height: 1.55;
                    padding-top: 14px;
                    margin: 0;
                    border-top: 1px solid rgba(255,255,255,0.06);
                }

                .about-why-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }
                @media (max-width: 720px) {
                    .about-why-grid { grid-template-columns: 1fr; }
                }
                .about-why-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 14px;
                    padding: 22px;
                    position: relative;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .about-why-card:hover {
                    border-color: rgba(0,242,255,0.3);
                    transform: translateY(-2px);
                }
                .about-why-num {
                    position: absolute;
                    top: 16px;
                    right: 18px;
                    font-family: 'Outfit', var(--font-main);
                    font-size: 32px;
                    font-weight: 800;
                    background: linear-gradient(135deg, rgba(0,242,255,0.4), rgba(112,0,255,0.4));
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .about-why-card h3 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 18px;
                    margin: 0 0 10px;
                    padding-right: 44px;
                }
                .about-why-card p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.65;
                }

                .about-tech-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 18px;
                }
                @media (max-width: 900px) {
                    .about-tech-grid { grid-template-columns: 1fr; }
                }
                .about-tech-card {
                    background: rgba(0,0,0,0.25);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 14px;
                    padding: 22px;
                }
                .about-tech-card h3 {
                    font-family: 'Outfit', var(--font-main);
                    font-size: 15px;
                    margin: 0 0 14px;
                    color: var(--accent-primary);
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                }
                .about-tech-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .about-tech-card li {
                    font-size: 13px;
                    line-height: 1.55;
                    color: var(--text-secondary);
                    padding-left: 14px;
                    position: relative;
                }
                .about-tech-card li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 8px;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: var(--accent-primary);
                }
                .about-tech-card li strong { color: var(--text-primary); }

                .about-learned-list {
                    list-style: none;
                    counter-reset: learn;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .about-learned-list li {
                    counter-increment: learn;
                    padding: 20px 20px 20px 64px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 12px;
                    position: relative;
                    line-height: 1.7;
                    font-size: 15px;
                    color: var(--text-secondary);
                }
                .about-learned-list li::before {
                    content: counter(learn, decimal-leading-zero);
                    position: absolute;
                    left: 20px;
                    top: 18px;
                    font-family: 'Outfit', var(--font-main);
                    font-size: 16px;
                    font-weight: 800;
                    color: var(--accent-primary);
                    background: rgba(0,242,255,0.08);
                    border: 1px solid rgba(0,242,255,0.25);
                    padding: 3px 8px;
                    border-radius: 6px;
                }
                .about-learned-list strong { color: var(--text-primary); }

                .about-cta-band {
                    margin-top: 40px;
                    padding: 36px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, rgba(0,242,255,0.10), rgba(112,0,255,0.10));
                    border: 1px solid rgba(255,255,255,0.08);
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 24px;
                    align-items: center;
                }
                @media (max-width: 720px) {
                    .about-cta-band { grid-template-columns: 1fr; }
                }
                .about-cta-band h2 {
                    font-size: 26px;
                    margin: 0 0 6px;
                }
                .about-cta-band p {
                    color: var(--text-secondary);
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 0;
                }
                .about-cta-band-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
            `}</style>
        </div>
    );
}

export default AboutPage;
