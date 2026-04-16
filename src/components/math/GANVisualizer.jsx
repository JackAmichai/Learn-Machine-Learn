import React from 'react';

/**
 * GANVisualizer — visualises the adversarial tug-of-war between Generator
 * and Discriminator using the live formula sliders.
 *
 * Sliders:
 *   d_real : D(x)    — discriminator's prob that real input is real
 *   d_fake : D(G(z)) — discriminator's prob that fake input is real
 *
 * We show:
 *   - the two networks (G, D)
 *   - two output dials (D(x) and D(G(z))) with target arrows
 *   - the Nash-equilibrium line at 0.5
 *   - generator and discriminator losses, computed live
 */
export default function GANVisualizer({ values = {} }) {
    const dReal = Math.max(0.001, Math.min(0.999, values.d_real ?? 0.9));
    const dFake = Math.max(0.001, Math.min(0.999, values.d_fake ?? 0.4));

    const lossG = -Math.log(dFake);
    const lossD = -Math.log(dReal) - Math.log(1 - dFake);

    const W = 360, H = 240;

    const dial = (cx, cy, val, color, label, target, sub) => {
        const r = 32;
        const ang = -Math.PI / 2 + val * Math.PI * 2;
        const tx = cx + Math.cos(ang) * r;
        const ty = cy + Math.sin(ang) * r;
        const tang = -Math.PI / 2 + target * Math.PI * 2;
        const ttx = cx + Math.cos(tang) * (r + 6);
        const tty = cy + Math.sin(tang) * (r + 6);

        return (
            <g>
                <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.45)" stroke={color} strokeWidth="1.5" />
                {/* Equilibrium 0.5 marker */}
                <line x1={cx} y1={cy + r} x2={cx} y2={cy + r + 8} stroke="rgba(255,255,255,0.5)" />
                {/* Target tick */}
                <circle cx={ttx} cy={tty} r="3" fill="#fff" />
                {/* Pointer */}
                <line x1={cx} y1={cy} x2={tx} y2={ty} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={cx} cy={cy} r="3" fill={color} />
                <text x={cx} y={cy + r + 22} fontSize="10" fill={color} textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">{label}</text>
                <text x={cx} y={cy + r + 36} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle" fontFamily="ui-monospace,monospace">{sub}</text>
                <text x={cx} y={cy + 4} fontSize="11" fill="#fff" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">{val.toFixed(2)}</text>
            </g>
        );
    };

    const equilibriumDistance = Math.abs(dReal - 0.5) + Math.abs(dFake - 0.5);
    const verdict =
        equilibriumDistance < 0.15
            ? 'Nash equilibrium — D can\'t tell real from fake.'
            : dReal > 0.85 && dFake < 0.2
                ? 'Discriminator dominates — G is not fooling it.'
                : dReal < 0.6 && dFake > 0.6
                    ? 'Generator dominates — D is being fooled.'
                    : 'Both are learning. Adversarial dance continues.';

    return (
        <div className="gan-visualizer">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="240" role="img" aria-label="GAN adversarial training visualizer">
                {/* G & D blocks */}
                <g transform="translate(20, 30)">
                    <rect width="80" height="40" rx="8" fill="rgba(124,58,237,0.85)" />
                    <text x="40" y="20" fill="#fff" fontSize="11" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">Generator</text>
                    <text x="40" y="32" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">G(z)</text>
                </g>
                <g transform="translate(260, 30)">
                    <rect width="80" height="40" rx="8" fill="rgba(0,242,255,0.85)" />
                    <text x="40" y="20" fill="#000" fontSize="11" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="700">Discriminator</text>
                    <text x="40" y="32" fill="#000" fontSize="9" textAnchor="middle" fontFamily="ui-monospace,monospace">D(·)</text>
                </g>

                {/* Connecting flow arrows */}
                <defs>
                    <marker id="gan-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="rgba(255,255,255,0.55)" />
                    </marker>
                </defs>
                <line x1="100" y1="50" x2="260" y2="50" stroke="rgba(124,58,237,0.7)" strokeWidth="1.4" strokeDasharray="3,3" markerEnd="url(#gan-arr)" />
                <text x="180" y="44" fontSize="9" fill="rgba(124,58,237,0.95)" textAnchor="middle" fontFamily="ui-monospace,monospace">fake sample</text>

                {/* Dials */}
                {dial(110, 140, dReal, '#34d399', 'D(x)', 1.0, 'goal: 1 (real)')}
                {dial(250, 140, dFake, '#fb923c', 'D(G(z))', 0.0, 'goal: 0 (fake)')}

                {/* Loss readouts */}
                <g transform="translate(20, 200)">
                    <rect width="150" height="28" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(124,58,237,0.4)" />
                    <text x="8" y="12" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="ui-monospace,monospace">L_G = -log D(G(z))</text>
                    <text x="8" y="24" fill="#c084fc" fontSize="12" fontFamily="ui-monospace,monospace" fontWeight="700">{lossG.toFixed(3)}</text>
                </g>
                <g transform="translate(190, 200)">
                    <rect width="150" height="28" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(0,242,255,0.4)" />
                    <text x="8" y="12" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="ui-monospace,monospace">L_D = -log(D(x)) - log(1-D(G(z)))</text>
                    <text x="8" y="24" fill="#00f2ff" fontSize="12" fontFamily="ui-monospace,monospace" fontWeight="700">{lossD.toFixed(3)}</text>
                </g>
            </svg>

            <div className="gan-verdict">{verdict}</div>

            <p className="gan-caption">
                G and D play a <strong>two-player minimax game</strong>. The white tick on
                each dial is the target, the colored needle is the current value.
                When both dials sit near the equilibrium mark (0.5), the game is balanced.
            </p>

            <style>{`
                .gan-visualizer {
                    background: rgba(0,0,0,0.35);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px;
                }
                .gan-verdict {
                    text-align: center;
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: var(--accent-primary);
                    margin: 6px 0 4px;
                }
                .gan-caption {
                    margin: 6px 0 0;
                    font-size: 11px;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.55;
                }
            `}</style>
        </div>
    );
}
