import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EncoderDecoderBackground } from '../components/EncoderDecoderBackground';
import { Questionnaire } from '../components/Questionnaire';
import { PersonalizationContext } from '../contexts/PersonalizationContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { BuyMeCoffee } from '../components/BuyMeCoffee';
import { LandingHeroVisuals } from '../components/LandingHeroVisuals';
import MLPeople from '../../Pics/ML people animation.png';
import MathPeople from '../../Pics/Math people animation.png';

const FEATURES = [
 {
 icon: '️',
 title: 'See It Visually',
 desc: 'Watch neurons fire, weights change, and decision boundaries form in real-time.',
 gradient: 'linear-gradient(135deg, rgba(0,242,255,0.15), rgba(0,242,255,0.02))',
 },
 {
 icon: '',
 title: 'Understand the Math',
 desc: 'Interactive formula explorers let you tweak every variable and see the impact instantly.',
 gradient: 'linear-gradient(135deg, rgba(112,0,255,0.15), rgba(112,0,255,0.02))',
 },
 {
 icon: '️',
 title: 'Build & Train',
 desc: 'Design neural networks, choose datasets, tune hyperparameters — all in your browser.',
 gradient: 'linear-gradient(135deg, rgba(0,255,157,0.15), rgba(0,255,157,0.02))',
 },
];

const STATS = [
 { value: '50+', label: 'Interactive Topics' },
 { value: '3', label: 'Learning Paths' },
 { value: '15', label: 'Quizzes' },
 { value: '100%', label: 'In-Browser' },
];

const TOPIC_PREVIEWS = [
 { icon: '', name: 'Neural Networks', color: '#00f2ff' },
 { icon: '', name: 'Backpropagation', color: '#7000ff' },
 { icon: '', name: 'Loss Functions', color: '#ff0055' },
 { icon: '', name: 'Transformers', color: '#00ff9d' },
 { icon: '️', name: 'Computer Vision', color: '#00f2ff' },
 { icon: '', name: 'Diffusion Models', color: '#7000ff' },
 { icon: '', name: 'LLMs & Agents', color: '#ff0055' },
 { icon: '', name: 'Optimizers', color: '#00ff9d' },
 { icon: '', name: 'GANs', color: '#00f2ff' },
 { icon: '', name: 'CLIP & BLIP', color: '#7000ff' },
];

export function LandingPage() {
 const [showQuestionnaire, setShowQuestionnaire] = useState(false);
 const { setProfile, hasCompletedOnboarding } = useContext(PersonalizationContext);
 const navigate = useNavigate();
 const sectionsRef = useRef([]);

 // If user already onboarded, redirect to dashboard
 useEffect(() => {
 if (hasCompletedOnboarding) {
 navigate('/dashboard', { replace: true });
 }
 }, [hasCompletedOnboarding, navigate]);

 // Intersection Observer for scroll animations
 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 }
 });
 },
 { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
 );

 sectionsRef.current.forEach((el) => {
 if (el) observer.observe(el);
 });

 return () => observer.disconnect();
 }, []);

 const handleQuestionnaireComplete = (answers) => {
 setProfile(answers);
 setShowQuestionnaire(false);
 navigate('/dashboard');
 };

 const handleSkip = () => {
 setShowQuestionnaire(false);
 navigate('/playground');
 };

 const addSectionRef = (el) => {
 if (el && !sectionsRef.current.includes(el)) {
 sectionsRef.current.push(el);
 }
 };

 return (
 <div className="landing-page">
 {showQuestionnaire && (
 <Questionnaire
 onComplete={handleQuestionnaireComplete}
 onSkip={handleSkip}
 />
 )}

 {/* Theme toggle */}
 <div className="landing-theme-toggle">
 <ThemeToggle />
 </div>
 <EncoderDecoderBackground />

 {/* HERO SECTION */}
 <section className="hero-section">
 <div className="hero-content">
 <div className="hero-badge">Open Source • Free Forever</div>
 <h1 className="hero-title">
 Learn Machine Learning
 <span className="hero-accent"> — Your Way</span>
 </h1>
 <p className="hero-subtitle">
 Visualize neural networks, explore the math interactively, and train models
 right in your browser. Personalized for every learner.
 </p>
 <div className="hero-cta-group">
 <button
 className="hero-cta-primary"
 onClick={() => setShowQuestionnaire(true)}
 id="landing-start-journey"
 >
 <span>Start Your Journey</span>
 <span className="cta-arrow">→</span>
 </button>
 <button
 className="hero-cta-secondary"
 onClick={() => navigate('/playground')}
 id="landing-try-playground"
 >
 Try the Playground
 </button>
 </div>
 </div>
 <div className="hero-scroll-hint" aria-hidden="true">
 <span>Scroll to explore</span>
 <div className="scroll-arrow">↓</div>
 </div>
 </section>

 {/* HERO VISUALS — actual ML architectures */}
 <LandingHeroVisuals />

 {/* FEATURES SECTION */}
 <section className="features-section" ref={addSectionRef}>
 <div className="section-inner">
 <h2 className="section-title">Three Ways to Learn</h2>
 <p className="section-desc">
 Whether you think in equations, pictures, or code — we have you covered.
 </p>
 <div className="features-grid">
 {FEATURES.map((feat, i) => (
 <div
 key={i}
 className="feature-card"
 style={{ '--card-gradient': feat.gradient, '--delay': `${i * 100}ms` }}
 >
 <div className="feature-icon">{feat.icon}</div>
 <h3>{feat.title}</h3>
 <p>{feat.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* HOW IT WORKS */}
 <section className="how-section" ref={addSectionRef}>
 <div className="section-inner">
 <h2 className="section-title">How It Works</h2>
 <div className="how-steps">
 {[
 { num: '01', title: 'Personalize', desc: 'Answer 3 quick questions about your background and learning style.', icon: '' },
 { num: '02', title: 'Learn', desc: 'Follow a curated path through interactive topics, visual demos, and math explorations.', icon: '' },
 { num: '03', title: 'Master', desc: 'Build and train neural networks, take quizzes, and track your progress.', icon: '' },
 ].map((step, i) => (
 <div key={i} className="how-step" style={{ '--delay': `${i * 150}ms` }}>
 <div className="how-step-num">{step.num}</div>
 <div className="how-step-icon">{step.icon}</div>
 <h3>{step.title}</h3>
 <p>{step.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* TOPIC PREVIEW */}
 <section className="topics-section" ref={addSectionRef}>
 <div className="section-inner">
 <h2 className="section-title">50+ Interactive Topics</h2>
 <p className="section-desc">
 From basic neurons to transformers, diffusion models, and AI agents.
 </p>
 <div className="topics-scroll">
 <div className="topics-track">
 {[...TOPIC_PREVIEWS, ...TOPIC_PREVIEWS].map((topic, i) => (
 <div
 key={i}
 className="topic-pill"
 style={{ '--pill-color': topic.color }}
 >
 <span className="topic-pill-icon">{topic.icon}</span>
 <span>{topic.name}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* RESOURCE / EXPLORE PROMO */}
 <section className="explore-section" ref={addSectionRef}>
 <div className="section-inner">
 <div className="explore-grid">
 <div className="explore-card explore-card-resources">
 <div className="explore-tag">200+ Resources</div>
 <h3>The ML Resource Library</h3>
 <p>
 A handpicked index of seminal papers, the best books, free courses, and the
 tools real practitioners reach for. Filter by level, topic, and free-only.
 </p>
 <button className="explore-cta" onClick={() => navigate('/resources')}>
 Open the Library <span className="cta-arrow">→</span>
 </button>
 </div>
 <div className="explore-card explore-card-lessons">
 <div className="explore-tag">Step-by-step</div>
 <h3>Interactive Lessons</h3>
 <p>
 Guided modules that walk you from "what is a neuron?" to building a transformer,
 with live visualisations after every concept.
 </p>
 <button className="explore-cta" onClick={() => navigate('/lessons')}>
 Start a Lesson <span className="cta-arrow">→</span>
 </button>
 </div>
 <div className="explore-card explore-card-forward">
 <div className="explore-tag">What is next</div>
 <h3>Looking Forward</h3>
 <p>
 The frontier — agents, multimodal models, world models, AGI debates — and the
 papers driving the next wave.
 </p>
 <button className="explore-cta" onClick={() => navigate('/looking-forward')}>
 Explore the Frontier <span className="cta-arrow">→</span>
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* STATS */}
 <section className="stats-section" ref={addSectionRef}>
 <div className="section-inner">
 <div className="stats-grid">
 {STATS.map((stat, i) => (
 <div key={i} className="stat-item" style={{ '--delay': `${i * 80}ms` }}>
 <div className="stat-value">{stat.value}</div>
 <div className="stat-label">{stat.label}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* FINAL CTA */}
 <section className="cta-section" ref={addSectionRef}>
 <div className="section-inner">
 <h2 className="cta-title">Ready to begin?</h2>
 <p className="cta-desc">
 Take 30 seconds to tell us about yourself, and we'll build a personalized learning path just for you.
 </p>
 <button
 className="hero-cta-primary"
 onClick={() => setShowQuestionnaire(true)}
 id="landing-bottom-cta"
 >
 <span>Begin Your Personalized Journey</span>
 <span className="cta-arrow">→</span>
 </button>
 </div>
 </section>

 {/* PIONEERS SECTION */}
 <section className="pioneers-section" ref={addSectionRef}>
 <div className="section-inner">
 <h2 className="section-title" style={{ marginBottom: "40px" }}>The Pioneers of AI</h2>
 <div className="pioneers-container">
 <div className="pioneer-card">
 <img src={MLPeople} alt="Machine Learning Pioneers" />
 <p>The visionaries of Computer Science and Machine Learning</p>
 </div>
 <div className="pioneer-card">
 <img src={MathPeople} alt="Mathematics Pioneers" />
 <p>The foundational Mathematicians who built the theory</p>
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER with feedback form */}
 <Footer />

 {/* Buy me a coffee — only shown on landing page */}
 <BuyMeCoffee />

 <style>{`
 .landing-page {
 width: 100%;
 min-height: 100vh;
 overflow-y: auto;
 overflow-x: hidden;
 background: var(--bg-primary);
 color: var(--text-primary);
 scroll-behavior: smooth;
 }

 .landing-theme-toggle {
 position: fixed;
 top: 20px;
 right: 20px;
 z-index: 100;
 }

 /* HERO */
 .hero-section {
 position: relative;
 min-height: 100vh;
 display: flex;
 align-items: center;
 justify-content: center;
 overflow: hidden;
 background: radial-gradient(circle at center, rgba(10, 10, 21, 0.4) 0%, rgba(5, 5, 8, 0.8) 100%);
 }

 .hero-content {
 position: relative;
 z-index: 2;
 text-align: center;
 max-width: 720px;
 padding: 40px 24px;
 backdrop-filter: blur(4px);
 border-radius: 30px;
 }

 .hero-badge {
 display: inline-block;
 font-size: 12px;
 font-weight: 600;
 letter-spacing: 2px;
 text-transform: uppercase;
 color: var(--accent-primary);
 border: 1px solid rgba(0, 242, 255, 0.25);
 padding: 6px 18px;
 border-radius: 999px;
 margin-bottom: 28px;
 background: rgba(0, 242, 255, 0.06);
 animation: heroFadeUp 0.8s ease-out 0.2s both;
 }

 .hero-title {
 font-family: 'Outfit', var(--font-main);
 font-size: clamp(36px, 6vw, 64px);
 font-weight: 800;
 line-height: 1.1;
 margin: 0 0 20px 0;
 letter-spacing: -2px;
 animation: heroFadeUp 0.8s ease-out 0.4s both;
 }
 .hero-accent {
 background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 background-clip: text;
 }

 .hero-subtitle {
 font-size: clamp(16px, 2.2vw, 20px);
 color: var(--text-secondary);
 line-height: 1.6;
 margin: 0 0 40px 0;
 max-width: 560px;
 margin-left: auto;
 margin-right: auto;
 animation: heroFadeUp 0.8s ease-out 0.6s both;
 }

 .hero-cta-group {
 display: flex;
 gap: 16px;
 justify-content: center;
 flex-wrap: wrap;
 animation: heroFadeUp 0.8s ease-out 0.8s both;
 }

 @keyframes heroFadeUp {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
 }

 .hero-cta-primary {
 display: inline-flex;
 align-items: center;
 gap: 10px;
 padding: 16px 36px;
 background: linear-gradient(135deg, var(--accent-primary), #00c8d4);
 color: #000;
 font-weight: 700;
 font-size: 16px;
 border: none;
 border-radius: 14px;
 cursor: pointer;
 transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
 box-shadow: 0 4px 24px rgba(0, 242, 255, 0.25);
 font-family: 'Outfit', var(--font-main);
 }
 .hero-cta-primary:hover {
 transform: translateY(-3px) scale(1.03);
 box-shadow: 0 8px 32px rgba(0, 242, 255, 0.4);
 }
 .cta-arrow {
 font-size: 20px;
 transition: transform 0.3s;
 }
 .hero-cta-primary:hover .cta-arrow {
 transform: translateX(4px);
 }

 .hero-cta-secondary {
 padding: 16px 32px;
 background: rgba(255, 255, 255, 0.05);
 color: var(--text-primary);
 font-weight: 600;
 font-size: 16px;
 border: 1px solid rgba(255, 255, 255, 0.12);
 border-radius: 14px;
 cursor: pointer;
 transition: all 0.3s;
 font-family: 'Outfit', var(--font-main);
 }
 .hero-cta-secondary:hover {
 background: rgba(255, 255, 255, 0.1);
 border-color: rgba(255, 255, 255, 0.25);
 transform: translateY(-2px);
 }

 .hero-scroll-hint {
 position: absolute;
 bottom: 30px;
 left: 50%;
 transform: translateX(-50%);
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 6px;
 font-size: 12px;
 color: var(--text-secondary);
 opacity: 0.5;
 animation: scrollBounce 2s ease-in-out infinite;
 }
 .scroll-arrow {
 font-size: 16px;
 }
 @keyframes scrollBounce {
 0%, 100% { transform: translateX(-50%) translateY(0); }
 50% { transform: translateX(-50%) translateY(6px); }
 }

 /* SECTIONS */
 .section-inner {
 max-width: 1100px;
 margin: 0 auto;
 padding: 100px 24px;
 }

 .section-title {
 font-family: 'Outfit', var(--font-main);
 font-size: clamp(28px, 4vw, 42px);
 font-weight: 700;
 text-align: center;
 margin: 0 0 12px 0;
 letter-spacing: -1px;
 }
 .section-desc {
 text-align: center;
 color: var(--text-secondary);
 font-size: 17px;
 margin: 0 auto 48px;
 max-width: 500px;
 line-height: 1.6;
 }

 /* Scroll reveal */
 .features-section,
 .how-section,
 .topics-section,
 .stats-section,
 .cta-section {
 opacity: 0;
 transform: translateY(40px);
 transition: opacity 0.7s ease-out, transform 0.7s ease-out;
 }
 .features-section.visible,
 .how-section.visible,
 .topics-section.visible,
 .stats-section.visible,
 .cta-section.visible {
 opacity: 1;
 transform: translateY(0);
 }

 /* FEATURES */
 .features-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
 gap: 24px;
 }
 .feature-card {
 background: var(--card-gradient);
 border: 1px solid rgba(255, 255, 255, 0.06);
 border-radius: 20px;
 padding: 36px 28px;
 transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
 backdrop-filter: blur(8px);
 animation-delay: var(--delay);
 }
 .feature-card:hover {
 transform: translateY(-6px);
 border-color: rgba(255, 255, 255, 0.15);
 box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
 }
 .feature-icon {
 font-size: 40px;
 margin-bottom: 16px;
 }
 .feature-card h3 {
 font-family: 'Outfit', var(--font-main);
 font-size: 22px;
 font-weight: 600;
 margin: 0 0 10px 0;
 }
 .feature-card p {
 color: var(--text-secondary);
 font-size: 15px;
 line-height: 1.6;
 margin: 0;
 }

 /* HOW IT WORKS */
 .how-section {
 background: rgba(255, 255, 255, 0.01);
 }
 .how-steps {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
 gap: 32px;
 }
 .how-step {
 text-align: center;
 padding: 32px 20px;
 border-radius: 20px;
 border: 1px solid rgba(255, 255, 255, 0.04);
 background: rgba(255, 255, 255, 0.02);
 transition: all 0.3s;
 }
 .how-step:hover {
 border-color: rgba(0, 242, 255, 0.15);
 background: rgba(0, 242, 255, 0.03);
 }
 .how-step-num {
 font-family: 'Outfit', var(--font-main);
 font-size: 13px;
 font-weight: 700;
 color: var(--accent-primary);
 letter-spacing: 2px;
 margin-bottom: 12px;
 }
 .how-step-icon {
 font-size: 36px;
 margin-bottom: 16px;
 }
 .how-step h3 {
 font-family: 'Outfit', var(--font-main);
 font-size: 20px;
 font-weight: 600;
 margin: 0 0 8px 0;
 }
 .how-step p {
 color: var(--text-secondary);
 font-size: 14px;
 line-height: 1.6;
 margin: 0;
 }

 /* TOPICS CAROUSEL */
 .topics-scroll {
 overflow: hidden;
 mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
 -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
 }
 .topics-track {
 display: flex;
 gap: 14px;
 animation: topicsScroll 30s linear infinite;
 width: max-content;
 }
 @keyframes topicsScroll {
 0% { transform: translateX(0); }
 100% { transform: translateX(-50%); }
 }
 .topic-pill {
 display: flex;
 align-items: center;
 gap: 8px;
 padding: 10px 20px;
 background: rgba(255, 255, 255, 0.04);
 border: 1px solid rgba(255, 255, 255, 0.06);
 border-radius: 999px;
 font-size: 14px;
 font-weight: 500;
 white-space: nowrap;
 transition: all 0.3s;
 color: var(--text-primary);
 }
 .topic-pill:hover {
 border-color: var(--pill-color);
 box-shadow: 0 0 16px color-mix(in srgb, var(--pill-color) 20%, transparent);
 background: color-mix(in srgb, var(--pill-color) 8%, transparent);
 }
 .topic-pill-icon {
 font-size: 18px;
 }

 /* EXPLORE PROMO */
 .explore-section {
 opacity: 0;
 transform: translateY(40px);
 transition: opacity 0.7s ease-out, transform 0.7s ease-out;
 }
 .explore-section.visible {
 opacity: 1;
 transform: translateY(0);
 }
 .explore-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
 gap: 22px;
 }
 .explore-card {
 background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
 border: 1px solid rgba(255,255,255,0.07);
 border-radius: 20px;
 padding: 28px 26px;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 gap: 12px;
 transition: transform .3s, border-color .3s, box-shadow .3s;
 backdrop-filter: blur(6px);
 position: relative;
 overflow: hidden;
 }
 .explore-card::before {
 content: '';
 position: absolute;
 inset: 0;
 background: var(--accent-glow, transparent);
 opacity: 0;
 transition: opacity .4s;
 pointer-events: none;
 }
 .explore-card:hover {
 transform: translateY(-4px);
 border-color: rgba(255,255,255,0.18);
 box-shadow: 0 16px 40px rgba(0,0,0,0.45);
 }
 .explore-card:hover::before { opacity: 1; }
 .explore-card-resources { --accent-glow: radial-gradient(ellipse at top right, rgba(0,242,255,.10), transparent 60%); }
 .explore-card-lessons { --accent-glow: radial-gradient(ellipse at top right, rgba(0,255,157,.10), transparent 60%); }
 .explore-card-forward { --accent-glow: radial-gradient(ellipse at top right, rgba(112,0,255,.10), transparent 60%); }
 .explore-tag {
 font-size: 10px;
 letter-spacing: 1.5px;
 text-transform: uppercase;
 padding: 4px 10px;
 border-radius: 999px;
 background: rgba(255,255,255,0.06);
 color: var(--text-secondary);
 font-weight: 600;
 }
 .explore-card h3 {
 font-family: 'Outfit', var(--font-main, inherit);
 font-size: 22px;
 font-weight: 700;
 margin: 0;
 letter-spacing: -.4px;
 }
 .explore-card p {
 color: var(--text-secondary, #8a8aa0);
 line-height: 1.55;
 font-size: 14px;
 margin: 0;
 flex: 1;
 }
 .explore-cta {
 display: inline-flex;
 align-items: center;
 gap: 8px;
 padding: 10px 18px;
 background: rgba(0, 242, 255, 0.08);
 border: 1px solid rgba(0, 242, 255, 0.35);
 color: var(--accent-primary, #00f2ff);
 border-radius: 12px;
 font-weight: 600;
 cursor: pointer;
 font-family: inherit;
 font-size: 14px;
 transition: all .25s;
 margin-top: 6px;
 }
 .explore-cta:hover {
 background: rgba(0, 242, 255, 0.14);
 transform: translateX(3px);
 }

 /* STATS */
 .stats-section {
 background: linear-gradient(180deg, transparent 0%, rgba(0, 242, 255, 0.02) 50%, transparent 100%);
 }
 .stats-grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
 gap: 32px;
 text-align: center;
 }
 .stat-value {
 font-family: 'Outfit', var(--font-main);
 font-size: 48px;
 font-weight: 800;
 background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 background-clip: text;
 line-height: 1;
 margin-bottom: 8px;
 }
 .stat-label {
 font-size: 14px;
 color: var(--text-secondary);
 text-transform: uppercase;
 letter-spacing: 1.5px;
 }

 /* CTA */
 .cta-section .section-inner {
 text-align: center;
 }
 .cta-title {
 font-family: 'Outfit', var(--font-main);
 font-size: clamp(28px, 4vw, 44px);
 font-weight: 700;
 margin: 0 0 16px 0;
 letter-spacing: -1px;
 }
 .cta-desc {
 color: var(--text-secondary);
 font-size: 17px;
 max-width: 480px;
 margin: 0 auto 36px;
 line-height: 1.6;
 }

 /* FOOTER */
 .landing-footer {
 text-align: center;
 padding: 32px 24px;
 color: var(--text-secondary);
 font-size: 14px;
 border-top: 1px solid rgba(255, 255, 255, 0.05);
 }

 /* PIONEERS SECTION */
 .pioneers-container {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
 gap: 28px;
 align-items: stretch;
 max-width: 1100px;
 margin: 0 auto;
 }
 .pioneer-card {
 background: rgba(0, 0, 0, 0.4);
 border: 1px solid var(--glass-border);
 border-radius: 20px;
 padding: 24px;
 box-shadow: 0 10px 30px rgba(0,0,0,0.3);
 transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
 display: flex;
 flex-direction: column;
 }
 .pioneer-card:hover {
 transform: translateY(-6px);
 border-color: rgba(0, 242, 255, 0.25);
 box-shadow: 0 16px 48px rgba(0, 242, 255, 0.15), 0 10px 30px rgba(0,0,0,0.4);
 }
 .pioneer-card img {
 width: 100%;
 height: auto;
 border-radius: 8px;
 margin-bottom: 20px;
 }
 .pioneer-card p {
 text-align: center;
 font-size: 16px;
 color: var(--text-secondary);
 margin: 0;
 font-style: italic;
 }

 /* Reduce motion */
 @media (prefers-reduced-motion: reduce) {
 .hero-badge, .hero-title, .hero-subtitle, .hero-cta-group {
 animation: none !important;
 opacity: 1 !important;
 }
 .topics-track {
 animation: none !important;
 }
 .features-section, .how-section, .topics-section,
 .stats-section, .cta-section {
 opacity: 1 !important;
 transform: none !important;
 transition: none !important;
 }
 }

 @media (max-width: 768px) {
 .section-inner {
 padding: 60px 20px;
 }
 .features-grid, .how-steps {
 grid-template-columns: 1fr;
 }
 .stats-grid {
 grid-template-columns: repeat(2, 1fr);
 }
 }
 `}</style>
 </div>
 );
}
