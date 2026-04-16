import React from 'react';

/**
 * VAEVisualizer — visualises the ELBO trade-off:
 *
 *   ELBO = recon_loss + β · KL
 *
 * We render the encoder, latent, decoder pipeline AND a stacked bar
 * showing recon vs (β · KL) contributions to the total loss. The relative
 * height of the two segments tells the learner whether the run is
 * recon-dominated (low β) or KL-dominated (high β / "β-VAE").
 *
 * We also render a small "latent ball" whose radius reflects the KL
 * tightness — a tighter sphere means the posterior matches the prior more
 * closely.
 */
export default function VAEVisualizer({ values = {} }) {
    const recon = values.recon ?? 2.5;
    const kl = values.kl ?? 1.2;
    const beta = values.beta ?? 1.0;

    const klContrib = beta * kl;
    const total = recon + klContrib;
    const reconShare = total > 0 ? recon / total : 0.5;

    const W = 360, H = 240;

    // Latent ball — radius reflects (1 / (1 + KL)), so tight when KL small.
    const latentR = Math.max(8, 28 - kl * 4);

    return (
        <div className="vae-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="200" role="img" aria-label="VAE ELBO breakdown">
                <defs>
                    <linearGradient id="vae-enc" x1="0" x2="1">
                        <stop offset="0%" stopColor="#00f2ff" />
                        <stop offset="100%" stopColor="#0f7c5a" />
                    </linearGradient>
                    <linearGradient id="vae-dec" x1="0" x2="1">
                        <stop offset="0%" stopColor="#7000ff" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <radialGradient id="vae-latent" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffe18b" />
                        <stop offset="100%" stopColor="#fb923c" />
                    </radialGradient>
                    <marker id="vae-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="#fff" opacity="0.6" />
                    </marker>
                </defs>

                {/* Encoder */}
                <g transform="translate(20, 60)">
                    <polygon points="0,0 80,18 80,52 0,70" fill="url(#vae-enc)" opacity="0.85" />
                    <text x="40" y="42" fill="#fff" fontSize="11" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">encoder</text>
                    <text x="40" y="80" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">x → μ, σ</text>
                </g>

                {/* Latent ball */}
                <g transform="translate(180, 95)">
                    <circle r={latentR + 6} fill="rgba(251,146,60,0.15)" />
                    <circle r={latentR} fill="url(#vae-latent)" />
                    <text x="0" y={-latentR - 6} fill="#fb923c" fontSize="10" textAnchor="middle" fontFamily="ui-monospace,monospace">z ~ N(μ, σ)</text>
                    <text x="0" y={latentR + 16} fill="rgba(255,255,255,0.55)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">
                        KL = {kl.toFixed(1)}
                    </text>
                </g>

                {/* Decoder */}
                <g transform="translate(260, 60)">
                    <polygon points="0,18 80,0 80,70 0,52" fill="url(#vae-dec)" opacity="0.85" />
                    <text x="40" y="42" fill="#fff" fontSize="11" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">decoder</text>
                    <text x="40" y="80" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">z → x̂</text>
                </g>

                {/* Arrows */}
                <line x1="100" y1="95" x2={180 - latentR - 4} y2="95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" markerEnd="url(#vae-arr)" />
                <line x1={180 + latentR + 4} y1="95" x2="260" y2="95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" markerEnd="url(#vae-arr)" />

                {/* Loss bar */}
                <text x={W / 2} y="170" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle" fontFamily="ui-monospace,monospace">
                    ELBO total = {total.toFixed(2)}
                </text>
                <g transform="translate(40, 184)">
                    <rect width={Math.max(0.001, reconShare) * 280} height="18" rx="4" fill="#34d399" />
                    <rect x={Math.max(0.001, reconShare) * 280} width={Math.max(0.001, 1 - reconShare) * 280} height="18" rx="4" fill="#7c3aed" />
                    <text x={Math.max(0.001, reconShare) * 280 / 2} y="13" fontSize="10" fill="#04221a" textAnchor="middle" fontWeight="700">recon {recon.toFixed(1)}</text>
                    <text x={(reconShare + (1 - reconShare) / 2) * 280} y="13" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">β·KL {klContrib.toFixed(1)}</text>
                </g>
            </svg>

            <div className="vae-verdict">
                {beta < 0.5
                    ? 'β small → "vanilla autoencoder" mode. Sharp reconstructions, messy latent.'
                    : beta > 2
                        ? 'β large → β-VAE mode. Disentangled latent, blurrier reconstructions.'
                        : 'Balanced VAE — readable latent space and decent reconstructions.'}
            </div>

            <p className="vae-caption">
                Drag <code>β</code> in the formula to see the ELBO swing between
                <strong> reconstruction quality</strong> and <strong>latent regularity</strong>.
                That trade-off is the whole story of VAE-style generative models.
            </p>

            <style>{`
                .vae-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .vae-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 6px 0 4px;
                }
                .vae-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.5;
                }
                .vae-caption code {
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
