import React from 'react';

/**
 * DiffusionVisualizer — visualises the linear noise schedule used in DDPM:
 *
 *   β_t = β_start + (β_end - β_start) · t / T
 *
 * Sliders: start, end, t, T
 *
 * We render two coupled views:
 *   1. The schedule curve β across all timesteps with a marker at the current t.
 *   2. A row of 8 image tiles, each a 6×6 pixel patch. Pixel intensity is
 *      x_τ = √(ᾱ_τ)·x_0 + √(1-ᾱ_τ)·ε, where ᾱ_τ ≈ ∏(1-β_τ). The leftmost
 *      tile is t=0 (clean signal), the rightmost is t=T (pure noise). The
 *      tile closest to the slider's current t is highlighted.
 *
 * This makes "high β_end" and "small T" feel viscerally different — high
 * β_end destroys the signal in just a couple of steps; large T spreads the
 * destruction smoothly.
 */
export default function DiffusionVisualizer({ values = {} }) {
    const start = values.start ?? 0.0001;
    const end = values.end ?? 0.02;
    const t = values.t ?? 500;
    const T = values.T ?? 1000;

    const W = 360, H = 260;

    // Schedule sample
    const N = 80;
    const schedule = Array.from({ length: N + 1 }, (_, i) => {
        const tt = (i / N) * T;
        return { tt, beta: start + (end - start) * tt / T };
    });

    // Cumulative ᾱ_t at fraction f of T: product of (1 - β_τ) for τ ∈ [0..f·T]
    // Approximate via discrete product over steps for visual feel.
    const alphaBarAt = (frac) => {
        const stepsHere = Math.max(1, Math.round(frac * T));
        let logA = 0;
        for (let i = 0; i < stepsHere; i++) {
            const beta_i = start + (end - start) * i / Math.max(1, T);
            logA += Math.log(Math.max(1e-9, 1 - beta_i));
        }
        return Math.exp(logA);
    };

    const tFrac = Math.max(0, Math.min(1, t / Math.max(1, T)));
    const currentBeta = start + (end - start) * t / Math.max(1, T);
    const currentAlphaBar = alphaBarAt(tFrac);

    // Schedule curve coordinates
    const sx0 = 30, sy0 = 30, sw = W - 60, sh = 60;
    const yMaxBeta = Math.max(end, 0.001);
    const xToPx = (tt) => sx0 + (tt / T) * sw;
    const yToPx = (b) => sy0 + sh - (b / yMaxBeta) * sh;
    const polyline = schedule.map(p => `${xToPx(p.tt)},${yToPx(p.beta)}`).join(' ');

    // Image tiles
    const tileCount = 8;
    const tileSize = 36;
    const grid = 6;
    const cellPx = tileSize / grid;

    // Deterministic "clean" image pattern (a soft diagonal) and a noise pattern.
    const cleanAt = (i, j) => {
        const v = (i + j) / (2 * (grid - 1)); // 0..1 diagonal
        return v;
    };
    // Pseudo-random noise but stable per coord+tile so the picture doesn't flicker
    const hash = (x, y, k) => {
        const s = Math.sin(x * 12.9898 + y * 78.233 + k * 37.719) * 43758.5453;
        return s - Math.floor(s);
    };

    // Highlight which tile is closest to current t
    const highlightIdx = Math.round(tFrac * (tileCount - 1));

    const tilesY = 130;
    const tilesY0 = tilesY;
    const tileGap = (W - 30 - tileCount * tileSize) / (tileCount - 1);

    const verdict = (() => {
        if (currentAlphaBar > 0.95) return 'Early step — image is nearly clean. The model has an easy denoising job here.';
        if (currentAlphaBar < 0.05) return 'Late step — almost pure noise. The model must hallucinate structure from scratch.';
        if (end > 0.1) return 'β_end is large — schedule destroys the signal quickly. Few useful intermediate steps.';
        if (T < 200) return 'Few total steps — large jumps between noise levels make denoising harder.';
        return 'Balanced regime — signal degrades smoothly across the schedule.';
    })();

    return (
        <div className="diffusion-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="260" role="img" aria-label="Diffusion noise schedule and forward process">
                {/* Schedule curve */}
                <text x={sx0} y={sy0 - 8} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">
                    β_t schedule (linear, β_start → β_end)
                </text>
                <rect x={sx0} y={sy0} width={sw} height={sh} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)" />
                {/* gridlines */}
                {[0.25, 0.5, 0.75].map(g => (
                    <line key={g} x1={sx0} y1={sy0 + sh - g * sh} x2={sx0 + sw} y2={sy0 + sh - g * sh}
                        stroke="rgba(255,255,255,0.07)" />
                ))}
                <polyline points={polyline} fill="none" stroke="#00f2ff" strokeWidth="2" />
                {/* Current t marker */}
                <line x1={xToPx(t)} y1={sy0} x2={xToPx(t)} y2={sy0 + sh} stroke="#fb923c" strokeDasharray="3,3" strokeWidth="1.4" />
                <circle cx={xToPx(t)} cy={yToPx(currentBeta)} r="4" fill="#fb923c" stroke="#fff" strokeWidth="1" />
                <text x={xToPx(t)} y={sy0 - 2} fontSize="9" fill="#fb923c" textAnchor="middle" fontFamily="ui-monospace,monospace">
                    t={t}
                </text>
                <text x={sx0 + sw - 4} y={sy0 + 12} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="end" fontFamily="ui-monospace,monospace">
                    β_end={end.toFixed(3)}
                </text>
                <text x={sx0 + 4} y={sy0 + sh - 4} fontSize="9" fill="rgba(255,255,255,0.55)" fontFamily="ui-monospace,monospace">
                    β_start={start.toFixed(4)}
                </text>

                {/* Forward process tile row */}
                <text x={sx0} y={tilesY0 - 8} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">
                    forward: x_τ = √ᾱ_τ · x_0 + √(1-ᾱ_τ) · ε
                </text>

                {Array.from({ length: tileCount }, (_, i) => {
                    const frac = i / (tileCount - 1);
                    const aBar = alphaBarAt(frac);
                    const sigSig = Math.sqrt(aBar);
                    const sigNoise = Math.sqrt(Math.max(0, 1 - aBar));
                    const tx = sx0 + i * (tileSize + tileGap);
                    const ty = tilesY0;
                    const isHi = i === highlightIdx;

                    return (
                        <g key={i}>
                            {/* Pixel grid */}
                            {Array.from({ length: grid }).flatMap((_, ii) =>
                                Array.from({ length: grid }).map((_, jj) => {
                                    const c = cleanAt(ii, jj);
                                    const n = hash(ii, jj, i + 1);
                                    // Mix in [0..1]
                                    const v = sigSig * c + sigNoise * n;
                                    const g8 = Math.round(Math.max(0, Math.min(1, v)) * 255);
                                    return (
                                        <rect
                                            key={`${ii}-${jj}`}
                                            x={tx + jj * cellPx} y={ty + ii * cellPx}
                                            width={cellPx} height={cellPx}
                                            fill={`rgb(${g8},${g8},${Math.min(255, g8 + 30)})`}
                                        />
                                    );
                                })
                            )}
                            {/* Frame */}
                            <rect x={tx - 0.5} y={ty - 0.5} width={tileSize + 1} height={tileSize + 1}
                                fill="none" stroke={isHi ? '#fb923c' : 'rgba(255,255,255,0.2)'} strokeWidth={isHi ? 2 : 1} />
                            <text x={tx + tileSize / 2} y={ty + tileSize + 12} fontSize="8" fill={isHi ? '#fb923c' : 'rgba(255,255,255,0.55)'} textAnchor="middle" fontFamily="ui-monospace,monospace">
                                {`τ=${Math.round(frac * T)}`}
                            </text>
                        </g>
                    );
                })}

                {/* Reverse arrow under tiles */}
                <line x1={sx0} y1={tilesY0 + tileSize + 30} x2={sx0 + sw} y2={tilesY0 + tileSize + 30}
                    stroke="rgba(124,58,237,0.6)" strokeWidth="1.5" />
                <text x={sx0 + sw / 2} y={tilesY0 + tileSize + 44} fontSize="9" fill="rgba(192,132,252,0.85)" textAnchor="middle" fontFamily="ui-monospace,monospace">
                    reverse process: model learns p_θ(x_{`{τ-1}`} | x_τ)
                </text>
            </svg>

            <div className="diff-readout">
                <div><span>β_t</span><strong style={{ color: '#00f2ff' }}>{currentBeta.toExponential(2)}</strong></div>
                <div><span>ᾱ_t</span><strong style={{ color: '#34d399' }}>{currentAlphaBar.toExponential(2)}</strong></div>
                <div><span>signal</span><strong>{(Math.sqrt(currentAlphaBar) * 100).toFixed(1)}%</strong></div>
                <div><span>noise</span><strong style={{ color: '#fb923c' }}>{(Math.sqrt(1 - currentAlphaBar) * 100).toFixed(1)}%</strong></div>
            </div>

            <div className="diff-verdict">{verdict}</div>

            <p className="diff-caption">
                Each tile is the same image at a different timestep. Drag <code>t</code> to walk
                across the schedule, or change <code>β_end</code> / <code>T</code> to reshape it.
                Diffusion training samples a random τ and learns to <em>predict the noise</em> at that level.
            </p>

            <style>{`
                .diffusion-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .diff-readout {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 14px;
                    justify-content: center;
                    margin-top: 6px;
                    padding: 8px 10px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 8px;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                }
                .diff-readout > div { display: flex; flex-direction: column; align-items: center; gap: 2px; }
                .diff-readout span {
                    font-size: 10px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .diff-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 8px 0 4px;
                }
                .diff-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
                .diff-caption code {
                    font-family: ui-monospace, monospace;
                    background: rgba(0,242,255,0.08);
                    padding: 1px 5px;
                    border-radius: 3px;
                    color: var(--accent-primary);
                }
            `}</style>
        </div>
    );
}
