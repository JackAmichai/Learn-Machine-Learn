/* eslint-disable no-unused-vars */
import React from 'react';

/**
 * LandingHeroVisuals
 *
 * Pure-SVG decorative panels for the landing page. We do not pull in a 3D library
 * — every visual is hand-built so it stays lightweight and theme-able.
 *
 * Renders four "story" tiles a learner can recognise at a glance:
 *   1. Encoder → Latent → Decoder  (the autoencoder shape)
 *   2. Self-attention as a token-to-token weighted mesh
 *   3. CNN feature maps stacking up
 *   4. Diffusion: noise → image
 *
 * They are deliberately stylised — accurate enough to look right to a practitioner,
 * abstract enough that a beginner just sees "ooh, AI shapes".
 */

/* ---------- 1. ENCODER → LATENT → DECODER ---------- */
function EncoderDecoderTile() {
    const layers = [12, 8, 4, 2, 4, 8, 12];
    const W = 360, H = 180;
    const padX = 18, padY = 14;
    const cellW = (W - padX * 2) / (layers.length - 1);

    const nodes = layers.map((count, l) => {
        const x = padX + l * cellW;
        const span = H - padY * 2;
        const step = count > 1 ? span / (count - 1) : 0;
        const y0 = count > 1 ? padY : H / 2;
        return Array.from({ length: count }, (_, i) => ({ x, y: y0 + i * step, layer: l }));
    });

    const flat = nodes.flat();
    const edges = [];
    for (let l = 0; l < layers.length - 1; l++) {
        nodes[l].forEach(a => nodes[l + 1].forEach(b => edges.push({ a, b })));
    }

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
                <linearGradient id="ed-edge" x1="0" x2="1">
                    <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#ff5577" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7000ff" stopOpacity="0.6" />
                </linearGradient>
                <radialGradient id="ed-node" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.4" />
                </radialGradient>
                <radialGradient id="ed-bottleneck" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffe18b" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#ff5577" stopOpacity="0.7" />
                </radialGradient>
            </defs>

            {edges.map((e, i) => (
                <line
                    key={i}
                    x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y}
                    stroke="url(#ed-edge)"
                    strokeOpacity="0.18"
                    strokeWidth="0.5"
                />
            ))}

            {flat.map((n, i) => {
                const isBottleneck = n.layer === 3;
                const r = isBottleneck ? 4.2 : 2.6;
                return (
                    <g key={i}>
                        {isBottleneck && (
                            <circle cx={n.x} cy={n.y} r={r * 2.4} fill="#ff5577" opacity="0.18">
                                <animate attributeName="opacity" values="0.05;0.35;0.05" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
                            </circle>
                        )}
                        <circle
                            cx={n.x} cy={n.y} r={r}
                            fill={isBottleneck ? 'url(#ed-bottleneck)' : 'url(#ed-node)'}
                        />
                    </g>
                );
            })}

            <text x={padX} y={H - 4} fill="rgba(0,242,255,0.7)" fontSize="9" fontFamily="ui-monospace,monospace">encoder</text>
            <text x={W / 2 - 18} y={H - 4} fill="rgba(255,85,119,0.85)" fontSize="9" fontFamily="ui-monospace,monospace">latent z</text>
            <text x={W - padX - 38} y={H - 4} fill="rgba(112,0,255,0.75)" fontSize="9" fontFamily="ui-monospace,monospace">decoder</text>
        </svg>
    );
}

/* ---------- 2. SELF-ATTENTION (TOKEN MESH) ---------- */
function AttentionTile() {
    const W = 360, H = 180;
    const tokens = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
    const padX = 22, padY = 30;
    const yTop = padY;
    const yBot = H - padY;
    const xs = tokens.map((_, i) => padX + (i * (W - padX * 2)) / (tokens.length - 1));

    // Pretend attention weights — strongest connection from "cat" to "sat"/"mat"
    const weights = [
        [0.2, 0.1, 0.05, 0.05, 0.1, 0.05],
        [0.1, 0.2, 0.7, 0.1, 0.05, 0.55],
        [0.05, 0.6, 0.2, 0.1, 0.05, 0.4],
        [0.05, 0.1, 0.1, 0.2, 0.4, 0.3],
        [0.1, 0.05, 0.05, 0.4, 0.2, 0.5],
        [0.05, 0.55, 0.45, 0.3, 0.5, 0.2],
    ];

    const lines = [];
    for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens.length; j++) {
            const w = weights[i][j];
            if (w < 0.15) continue;
            lines.push({
                x1: xs[i], y1: yTop, x2: xs[j], y2: yBot,
                opacity: w, key: `${i}-${j}`,
            });
        }
    }

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
                <linearGradient id="att-line" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f2ff" />
                    <stop offset="100%" stopColor="#ff5577" />
                </linearGradient>
            </defs>

            {lines.map(l => (
                <line
                    key={l.key}
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke="url(#att-line)"
                    strokeOpacity={l.opacity * 0.85}
                    strokeWidth={0.5 + l.opacity * 1.3}
                    strokeLinecap="round"
                />
            ))}

            {tokens.map((t, i) => (
                <g key={`q-${i}`}>
                    <rect
                        x={xs[i] - 18} y={yTop - 18} width="36" height="20" rx="6"
                        fill="rgba(0,242,255,0.12)" stroke="rgba(0,242,255,0.55)" strokeWidth="0.7"
                    />
                    <text x={xs[i]} y={yTop - 4} fill="#fff" fontSize="10" textAnchor="middle" fontFamily="ui-monospace,monospace">{t}</text>
                </g>
            ))}

            {tokens.map((t, i) => (
                <g key={`k-${i}`}>
                    <rect
                        x={xs[i] - 18} y={yBot - 2} width="36" height="20" rx="6"
                        fill="rgba(255,85,119,0.12)" stroke="rgba(255,85,119,0.55)" strokeWidth="0.7"
                    />
                    <text x={xs[i]} y={yBot + 12} fill="#fff" fontSize="10" textAnchor="middle" fontFamily="ui-monospace,monospace">{t}</text>
                </g>
            ))}
            <text x={W - 6} y={12} fill="rgba(0,242,255,0.7)" fontSize="9" textAnchor="end" fontFamily="ui-monospace,monospace">queries</text>
            <text x={W - 6} y={H - 4} fill="rgba(255,85,119,0.8)" fontSize="9" textAnchor="end" fontFamily="ui-monospace,monospace">keys</text>
        </svg>
    );
}

/* ---------- 3. CNN FEATURE MAP STACK ---------- */
function CNNTile() {
    const W = 360, H = 180;
    // Three stacks of feature maps, shrinking spatially, growing in depth
    const stacks = [
        { x: 30, w: 70, h: 90, depth: 3, color: '#00f2ff' },
        { x: 145, w: 50, h: 64, depth: 6, color: '#7c3aed' },
        { x: 240, w: 32, h: 40, depth: 10, color: '#ff5577' },
    ];

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
                <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
                </pattern>
            </defs>

            {stacks.map((s, idx) => {
                const cy = H / 2;
                const tiles = [];
                for (let d = s.depth - 1; d >= 0; d--) {
                    const offset = d * 4;
                    tiles.push(
                        <g key={`s${idx}-${d}`} transform={`translate(${s.x + offset}, ${cy - s.h / 2 - offset})`}>
                            <rect
                                width={s.w} height={s.h} rx="4"
                                fill={`${s.color}${Math.floor(8 + d * 6).toString(16).padStart(2, '0')}`}
                                stroke={s.color}
                                strokeOpacity={0.5 + (d / s.depth) * 0.4}
                                strokeWidth="0.7"
                            />
                            {d === 0 && <rect width={s.w} height={s.h} fill="url(#grid)" rx="4" />}
                        </g>
                    );
                }
                return <g key={`stack-${idx}`}>{tiles}</g>;
            })}

            {/* Connector arrows */}
            {[
                { x1: 110, x2: 142, label: 'conv' },
                { x1: 200, x2: 238, label: 'pool' },
            ].map((a, i) => (
                <g key={i}>
                    <line x1={a.x1} y1={H / 2} x2={a.x2} y2={H / 2} stroke="rgba(255,255,255,0.4)" strokeWidth="1" markerEnd="url(#arrow)" />
                    <text x={(a.x1 + a.x2) / 2} y={H / 2 - 6} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">{a.label}</text>
                </g>
            ))}

            <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.4)" />
                </marker>
            </defs>

            <text x={30} y={H - 6} fontSize="9" fill="rgba(0,242,255,0.7)" fontFamily="ui-monospace,monospace">image</text>
            <text x={140} y={H - 6} fontSize="9" fill="rgba(124,58,237,0.85)" fontFamily="ui-monospace,monospace">edges</text>
            <text x={240} y={H - 6} fontSize="9" fill="rgba(255,85,119,0.85)" fontFamily="ui-monospace,monospace">objects</text>
            <text x={W - 6} y={12} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="end" fontFamily="ui-monospace,monospace">CNN</text>
        </svg>
    );
}

/* ---------- 4. DIFFUSION: NOISE → IMAGE ---------- */
function DiffusionTile() {
    const W = 360, H = 180;
    const stages = 5;
    const tileW = 50, tileH = 50;
    const gap = (W - stages * tileW) / (stages + 1);

    // Generate per-pixel "noise → smooth" reveal using deterministic rng
    const seeds = [0.91, 0.63, 0.41, 0.18, 0.04];
    const targetGrad = (i, j) => {
        // gradient that looks like a stylised face/landscape — circle near centre
        const dx = (i - 5) / 5;
        const dy = (j - 5) / 5;
        const d = Math.sqrt(dx * dx + dy * dy);
        return Math.max(0, 1 - d);
    };

    const cells = (stage) => {
        const noise = seeds[stage];
        const grid = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const sig = targetGrad(i, j);
                // hash-style pseudo-noise
                const r = Math.sin(i * 41.3 + j * 17.7 + stage * 9.13) * 43758.5453;
                const n = (r - Math.floor(r));
                const v = sig * (1 - noise) + n * noise;
                grid.push({ i, j, v });
            }
        }
        return grid;
    };

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
                <linearGradient id="diff-glow" x1="0" x2="1">
                    <stop offset="0%" stopColor="#7000ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.4" />
                </linearGradient>
            </defs>

            {seeds.map((noiseLevel, stage) => {
                const x0 = gap + stage * (tileW + gap);
                const y0 = (H - tileH) / 2 - 6;
                const cs = tileW / 10;
                return (
                    <g key={stage}>
                        <rect x={x0 - 2} y={y0 - 2} width={tileW + 4} height={tileH + 4} rx="6" fill="url(#diff-glow)" opacity="0.35" />
                        <g transform={`translate(${x0}, ${y0})`}>
                            {cells(stage).map((c, k) => {
                                const intensity = Math.max(0, Math.min(1, c.v));
                                const hue = 200 + (1 - noiseLevel) * 40;
                                return (
                                    <rect
                                        key={k}
                                        x={c.i * cs} y={c.j * cs}
                                        width={cs} height={cs}
                                        fill={`hsl(${hue}, 90%, ${30 + intensity * 50}%)`}
                                        opacity={0.6 + intensity * 0.4}
                                    />
                                );
                            })}
                        </g>
                        <text x={x0 + tileW / 2} y={y0 + tileH + 14} fontSize="9" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                            t={stages - stage}
                        </text>
                    </g>
                );
            })}

            <text x={6} y={12} fontSize="9" fill="rgba(112,0,255,0.85)" fontFamily="ui-monospace,monospace">noise</text>
            <text x={W - 6} y={12} fontSize="9" fill="rgba(0,242,255,0.85)" textAnchor="end" fontFamily="ui-monospace,monospace">image</text>
        </svg>
    );
}

/* ---------- COMPOSITE GALLERY ---------- */
export function LandingHeroVisuals() {
    const items = [
        { id: 'autoencoder', title: 'Encoder → Decoder', subtitle: 'Compress information into a tiny latent — then reconstruct it.', Tile: EncoderDecoderTile },
        { id: 'attention', title: 'Self-Attention', subtitle: 'Each token decides which other tokens matter to it.', Tile: AttentionTile },
        { id: 'cnn', title: 'Convolutional Stacks', subtitle: 'Layer by layer, edges become shapes — shapes become objects.', Tile: CNNTile },
        { id: 'diffusion', title: 'Diffusion', subtitle: 'Start from noise, denoise step by step until an image appears.', Tile: DiffusionTile },
    ];

    return (
        <section className="hero-visuals">
            <div className="hv-inner">
                <div className="hv-eyebrow">What you will actually see and build</div>
                <h2 className="hv-title">
                    The architectures behind <span className="hv-accent">modern AI</span> — visualised
                </h2>
                <p className="hv-sub">
                    No more squinting at slides full of abstract math. Every model in this course
                    has a live, interactive picture of what it does.
                </p>

                <div className="hv-grid">
                    {items.map(({ id, title, subtitle, Tile: TileComponent }) => (
                        <article key={id} className="hv-card">
                            <div className="hv-tile"><TileComponent /></div>
                            <div className="hv-meta">
                                <h3>{title}</h3>
                                <p>{subtitle}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style>{`
                .hero-visuals {
                    position: relative;
                    z-index: 2;
                    padding: 0 24px;
                }
                .hv-inner {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 80px 0 40px;
                }
                .hv-eyebrow {
                    text-transform: uppercase;
                    font-size: 11px;
                    letter-spacing: 2.4px;
                    color: var(--accent-primary, #00f2ff);
                    text-align: center;
                    margin-bottom: 14px;
                    font-weight: 600;
                }
                .hv-title {
                    font-family: 'Outfit', var(--font-main, inherit);
                    font-size: clamp(26px, 4vw, 40px);
                    text-align: center;
                    margin: 0 auto 12px;
                    max-width: 760px;
                    letter-spacing: -1px;
                    font-weight: 700;
                }
                .hv-accent {
                    background: linear-gradient(90deg, #00f2ff, #ff5577 60%, #7000ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .hv-sub {
                    text-align: center;
                    color: var(--text-secondary, #8a8aa0);
                    max-width: 580px;
                    margin: 0 auto 40px;
                    font-size: 15px;
                    line-height: 1.6;
                }
                .hv-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 22px;
                }
                .hv-card {
                    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform .35s cubic-bezier(.4,0,.2,1), border-color .3s, box-shadow .3s;
                    backdrop-filter: blur(6px);
                }
                .hv-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(0,242,255,0.3);
                    box-shadow: 0 18px 48px rgba(0,0,0,.45), 0 0 0 1px rgba(0,242,255,.18);
                }
                .hv-tile {
                    height: 200px;
                    background: radial-gradient(circle at 50% 50%, rgba(10,10,30,.6), rgba(0,0,0,.5));
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding: 8px;
                }
                .hv-meta {
                    padding: 16px 20px 22px;
                }
                .hv-meta h3 {
                    font-family: 'Outfit', var(--font-main, inherit);
                    font-size: 17px;
                    margin: 0 0 6px;
                    font-weight: 600;
                }
                .hv-meta p {
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.55;
                    color: var(--text-secondary, #8a8aa0);
                }

                @media (max-width: 720px) {
                    .hv-grid { grid-template-columns: 1fr; }
                    .hv-tile { height: 180px; }
                }
            `}</style>
        </section>
    );
}
