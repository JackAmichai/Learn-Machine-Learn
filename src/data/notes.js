/**
 * Long-form notes — the "writing" side of Learn Machine Learn.
 *
 * Each note is a plain object rather than a markdown file: it lets us
 * interleave prose with inline <Viz> blocks that reuse the same visualizers
 * the rest of the site already ships.
 *
 * Keep the list short and quality-first. This is the section that signals
 * "this author can actually think" to anyone reading — one great article
 * beats ten forgettable ones.
 */

export const NOTES = [
    {
        slug: 'why-attention-won',
        title: 'Why attention won',
        subtitle: 'The paper is 8 pages. The intuition is 3 sentences. Everything else is engineering.',
        author: 'Jack Amichai',
        date: '2026-04-10',
        readingMinutes: 7,
        tags: ['transformers', 'attention', 'history'],
        excerpt:
            'Before "Attention Is All You Need", we had two ways to model a sequence: convolutions, which forget about everything outside a window, and RNNs, which forget about everything outside their head. Attention did something cheaper, more general, and — critically — more parallel.',
        heroGradient: 'linear-gradient(135deg, #00f2ff 0%, #7000ff 100%)',
    },
    {
        slug: 'gradient-descent-is-feedback',
        title: 'Gradient descent is just feedback',
        subtitle: 'Stop thinking "optimize the loss." Start thinking "listen to the gradient."',
        author: 'Jack Amichai',
        date: '2026-03-22',
        readingMinutes: 5,
        tags: ['training', 'optimization', 'intuition'],
        excerpt:
            'Every learning rate story I ever heard was about "step size." None of them told me the real thing: gradient descent is a control loop, and every hyperparameter is a knob on that loop. Once that frame clicked, half of training mysteries collapsed.',
        heroGradient: 'linear-gradient(135deg, #ff0055 0%, #7000ff 100%)',
    },
    {
        slug: 'reading-papers-without-drowning',
        title: 'How to read an ML paper without drowning',
        subtitle: 'A three-pass method that actually finishes.',
        author: 'Jack Amichai',
        date: '2026-02-18',
        readingMinutes: 4,
        tags: ['study', 'research', 'meta'],
        excerpt:
            'I stopped trying to read papers "end to end" about two years ago and my completion rate went from ~20% to ~90%. Here\'s the exact three-pass rubric I use — and the two traps that used to eat my afternoons.',
        heroGradient: 'linear-gradient(135deg, #00ff9d 0%, #00f2ff 100%)',
    },
];

/**
 * Article body blocks. We keep this separate so the index page stays cheap.
 *
 * Block types:
 *   { type: 'p', text: '...' }             plain paragraph
 *   { type: 'h', text: '...' }             section heading
 *   { type: 'quote', text: '...', cite }   pullquote
 *   { type: 'list', items: [...] }         bullet list
 *   { type: 'ol', items: [...] }           numbered list
 *   { type: 'code', code: '...' }          code block
 *   { type: 'callout', kind, text }        coloured callout ('insight'|'warn'|'aside')
 *   { type: 'viz', name, props }           interactive visualizer (name matches src/components/math)
 */
export const NOTE_BODIES = {
    'why-attention-won': [
        { type: 'p', text: 'Before 2017, sequence modelling had two serious options. RNNs read your sentence one token at a time, squeezing every previous token into a single hidden state and hoping nothing important got lost in compression. CNNs looked at fixed-size windows and stacked layers to widen their receptive field. Both worked. Neither scaled well.' },
        { type: 'p', text: 'Then a small team at Google published an 8-page paper with the most annoying title in the field: "Attention Is All You Need." The line between the "before" and "after" in modern ML runs through that paper.' },
        { type: 'p', text: 'But the paper itself is not where attention was invented. It was already in the air — Bahdanau had bolted it onto a translation RNN in 2014, and every serious seq2seq model by 2016 used some form of it. The 2017 paper\'s real contribution was more stubborn than inventive: it threw out the RNN completely and asked, what if attention was the entire architecture?' },

        { type: 'h', text: 'The three-sentence intuition' },
        { type: 'p', text: 'A Transformer layer works like this: every token in a sequence sends a Query to every other token, each token has a Key that says "here\'s what I\'m about," and the dot-product of Query with Key decides how much that token contributes. The token then gets back a weighted sum of everyone\'s Values.' },
        { type: 'p', text: 'That\'s it. Everything else — multi-head, positional encodings, layer norm placement, the feedforward block — is engineering on top of this one primitive.' },
        { type: 'callout', kind: 'insight', text: 'You can read the attention formula as "tokens routing information to each other by similarity." Every Query hits a content-addressable memory built out of the other tokens. That frame is more useful than the math half the time.' },

        { type: 'h', text: 'Why it beat RNNs' },
        { type: 'p', text: 'Three reasons, in order of importance.' },
        { type: 'ol', items: [
            'Parallelism. An RNN has to process token t before token t+1 because its hidden state carries the dependency. Attention can compute all Q·K pairs in one matmul — so the entire layer\'s forward pass becomes one big parallel operation. On modern GPUs this isn\'t a 2× speedup; it\'s closer to 50×. You could finally train on datasets that had previously taken weeks.',
            'Direct long-range connections. In an RNN, information from token 1 to token 100 has to survive 99 hops of a saturating gate. In attention, the two tokens have a single dot-product between them — distance is irrelevant. Long-range dependencies stopped being an architecture problem.',
            'Inductive bias by addition, not by construction. CNNs bake "local patterns matter" into their kernels. RNNs bake "order matters" into their recurrence. Attention bakes in nothing — positional encodings are added as a separate signal. That sounds worse, but it\'s actually the trick: the network can learn whatever structure the data actually has, rather than what the architect guessed.',
        ]},

        { type: 'h', text: 'The cost nobody talks about' },
        { type: 'p', text: 'Attention is O(n²) in sequence length. A sentence of 512 tokens produces a 512×512 attention matrix for every head in every layer. Double the sequence, quadruple the compute. Every "long-context" LLM you see today is an answer to this single line in the complexity analysis — sparse attention, linear attention, flash attention, sliding-window attention, mamba. The Transformer won because it scaled on GPUs; the next architecture will probably win because it stops scaling quadratically.' },
        { type: 'quote', text: 'The right way to think about attention is that you traded memory for simplicity — and then spent a decade figuring out how to pay the bill.', cite: 'paraphrasing every ML infra engineer I\'ve ever worked with' },

        { type: 'h', text: 'The philosophical thing' },
        { type: 'p', text: 'The deeper reason attention won, I think, is that it\'s the first sequence architecture that doesn\'t assume locality. CNNs assumed you care more about your neighbours than about distant elements. RNNs assumed time order was fundamental. Attention assumed nothing, and let the data pick. That\'s a very specific bet — that learned structure beats engineered structure when you have enough data — and it\'s the same bet that powered the Bitter Lesson, ImageNet, and AlphaGo. Attention was just the first time the bet paid off for sequences.' },
        { type: 'p', text: 'So the answer to "why attention won" is: it scaled, it didn\'t forget, and it refused to make assumptions. Everything that came after — GPT, BERT, CLIP, diffusion\'s U-Net-with-attention, vision Transformers — is a consequence of those three choices.' },

        { type: 'h', text: 'See it for yourself' },
        { type: 'p', text: 'Drag the sliders below. The dot-product "attention" between Q and K determines how much each token\'s Value gets mixed into the output. When Q and K align, the softmax peaks; when they don\'t, it spreads. That\'s the whole mechanism.' },
        { type: 'viz', name: 'DotProductVisualizer' },

        { type: 'h', text: 'Further reading' },
        { type: 'list', items: [
            'Jay Alammar — The Illustrated Transformer (still the best free explainer)',
            'Vaswani et al., 2017 — Attention Is All You Need (read §3 twice)',
            'Tay et al., 2022 — Efficient Transformers: A Survey (if you want to know the O(n²) story)',
        ]},
    ],

    'gradient-descent-is-feedback': [
        { type: 'p', text: 'There\'s a standard metaphor for gradient descent: a ball rolling down a hilly landscape toward the lowest point. It\'s a good metaphor for five minutes. Then it starts hiding things.' },
        { type: 'p', text: 'The ball metaphor doesn\'t explain why Adam works better than SGD. It doesn\'t explain why learning rate warmup matters. It doesn\'t explain why too-small a learning rate can make things worse, not just slower. If you\'ve ever stared at a training curve that refused to go down and wondered what the hell was wrong, the ball metaphor was part of your problem.' },
        { type: 'p', text: 'Here\'s a better frame: gradient descent is a control loop.' },

        { type: 'h', text: 'The loop' },
        { type: 'p', text: 'At every step, three things happen:' },
        { type: 'ol', items: [
            'Measure the error — the loss tells you how far off you are.',
            'Ask what would reduce it — the gradient tells you which direction the error falls fastest.',
            'Take an action proportional to how urgent the signal is — the learning rate decides how hard to push.',
        ]},
        { type: 'p', text: 'That\'s a PID controller missing only the I and D terms. And sure enough — momentum is the D term. Adam\'s second-moment scaling is a per-parameter I term. Every optimizer you\'ve ever used is someone\'s answer to "how should this control loop respond to noisy gradient signals?"' },

        { type: 'callout', kind: 'insight', text: 'Once you see the optimizer as a controller, hyperparameter intuition stops being memorized folklore and starts being basic control theory. Too-high learning rate: the loop overshoots and oscillates. Too-low: it lags. No momentum: every bit of gradient noise kicks the loop around. Too much momentum: it keeps pushing after the signal has changed.' },

        { type: 'h', text: 'What this explains' },
        { type: 'p', text: 'Three things immediately make more sense.' },
        { type: 'p', text: 'Warmup. Early in training, gradients are enormous and inconsistent because weights are random. Pushing hard on a noisy signal is a bad idea in any control system. Starting with a low learning rate and ramping up is the same reason a cruise control system eases into its setpoint instead of flooring the accelerator.' },
        { type: 'p', text: 'Learning-rate decay. Late in training, you\'re near a minimum and want to settle. A high step size would bounce you out. A controller near its setpoint reduces gain — same thing, different field.' },
        { type: 'p', text: 'Why Adam is so widely tolerated even when it shouldn\'t be. Adam is roughly: "per-parameter, scale my step by how noisy that parameter\'s gradient has been." That\'s automatic gain control. It covers for a surprising amount of hyperparameter laziness.' },

        { type: 'h', text: 'Try it' },
        { type: 'p', text: 'Crank the learning rate. Watch the loop overshoot. Pull it back. Watch the loop lag. Add momentum. Feel the difference.' },
        { type: 'viz', name: 'GradientDescentVisualizer' },

        { type: 'h', text: 'The takeaway' },
        { type: 'p', text: 'If your model won\'t train, the control-loop frame tells you what to check: is the signal too noisy (lower lr, bigger batch), too weak (warmup, scale up), or saturating (change activation, clip)? The ball-on-a-hill metaphor gives you no handles. The control-loop metaphor gives you all of them.' },
    ],

    'reading-papers-without-drowning': [
        { type: 'p', text: 'I used to start ML papers at the abstract and finish maybe one in five. Everything in between was a slow drowning in notation I half-understood. The fix wasn\'t "try harder." It was a different reading order.' },
        { type: 'h', text: 'Pass 1: Skeleton (5 minutes)' },
        { type: 'p', text: 'Read in this exact order: title, abstract, figure 1, figure in the results section, conclusion. Don\'t look at anything else yet.' },
        { type: 'p', text: 'What you\'re after: can I restate this paper in one sentence? If yes, move on. If no, the paper may just be poorly written — that\'s useful information too.' },

        { type: 'h', text: 'Pass 2: Skim (15 minutes)' },
        { type: 'p', text: 'Read the introduction. Read section headings. Read the first sentence of every paragraph in the methods section. Skip equations on first encounter.' },
        { type: 'p', text: 'What you\'re after: the shape of the idea and how it connects to what you already know. If you hit a new term with no definition, write it down and keep moving.' },

        { type: 'h', text: 'Pass 3: Chew (60+ minutes, optional)' },
        { type: 'p', text: 'Now read the methods carefully. Re-derive at least one equation from the surrounding context. Check what their experiments actually measure vs. what they claim.' },
        { type: 'p', text: 'You will never get past Pass 2 for most papers, and that\'s correct. Saving your chewing budget for the 5% that change your thinking is the whole point of the rubric.' },

        { type: 'callout', kind: 'warn', text: 'The two traps I used to fall into: (1) reading every equation the first time I saw it, which burned all my attention before I understood the point; (2) refusing to move past a confusing sentence, which turned a 60-minute read into a 3-hour one. Neither is humility — both are failures to respect your limited attention budget.' },

        { type: 'h', text: 'One non-obvious trick' },
        { type: 'p', text: 'After Pass 2, write three sentences to a hypothetical friend about what the paper claims. If you can\'t, you don\'t understand it yet — and more reading won\'t fix that. Go get a secondary source (blog post, YouTube lecture, Twitter thread by someone smart) and come back.' },
    ],
};

export function getNote(slug) {
    const meta = NOTES.find(n => n.slug === slug);
    if (!meta) return null;
    return { ...meta, body: NOTE_BODIES[slug] || [] };
}
