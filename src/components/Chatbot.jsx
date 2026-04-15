import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * ML Mentor — a floating chatbot powered by Hugging Face Inference Providers.
 *
 * Token resolution order:
 *   1. import.meta.env.VITE_HF_TOKEN  (set via .env or build env)
 *   2. localStorage['lml_hf_token']   (user pastes via the in-UI settings)
 *
 * Uses the OpenAI-compatible router endpoint:
 *   https://router.huggingface.co/v1/chat/completions
 */

const HF_ENDPOINT = 'https://router.huggingface.co/v1/chat/completions';
const DEFAULT_MODEL = 'meta-llama/Llama-3.1-8B-Instruct';
const TOKEN_STORAGE_KEY = 'lml_hf_token';
const MODEL_STORAGE_KEY = 'lml_hf_model';

const SYSTEM_PROMPT = `You are ML Mentor, the official tutor bot for "Learn Machine Learn" — an open-source, in-browser ML learning platform built by Jack (Yaron-Jack on GitHub).

You help learners with:
- Machine learning concepts (from basics to cutting-edge: classical ML, deep learning, transformers, diffusion, RL, LLMs, agents)
- The platform's course structure (Fast Track 8wk, Standard 16wk, Builder's Path 12wk)
- Navigating topics (SVM, KNN, PCA, Backprop, Convolution, GAN, CLIP, RAG, LoRA, etc.)
- About Jack — the author — who built this as a visual, math-first, hands-on ML learning tool because he believes ML should be taught by *showing*, not just by equations.
- Questions about the project itself (it's free, open-source, runs entirely in-browser using React + TensorFlow.js)

Style rules:
- Be concise. Default to 2–5 sentences; use short code or formula snippets when they clarify.
- When asked about a topic that's in the course, mention that the learner can click it in the dashboard to see the interactive visualizer.
- If you don't know something, say so. Never invent citations or benchmark numbers.
- Encouraging but direct — treat the learner like a smart peer.`;

function getStoredToken() {
    try {
        return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
    } catch {
        return '';
    }
}

function getStoredModel() {
    try {
        return localStorage.getItem(MODEL_STORAGE_KEY) || DEFAULT_MODEL;
    } catch {
        return DEFAULT_MODEL;
    }
}

function resolveToken() {
    const envToken = import.meta.env?.VITE_HF_TOKEN;
    if (envToken) return envToken;
    return getStoredToken();
}

export function Chatbot() {
    const [open, setOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content:
                "Hi! I'm ML Mentor. Ask me anything about machine learning, this course, or the author Jack. I'm here to help you learn.",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tokenDraft, setTokenDraft] = useState(getStoredToken());
    const [modelDraft, setModelDraft] = useState(getStoredModel());
    const listRef = useRef(null);
    const inputRef = useRef(null);

    const hasEnvToken = Boolean(import.meta.env?.VITE_HF_TOKEN);
    const activeToken = resolveToken();
    const activeModel = getStoredModel();

    // Autoscroll to newest message
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, loading]);

    // Focus input when opened
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    const sendMessage = useCallback(async () => {
        const text = input.trim();
        if (!text || loading) return;

        const token = resolveToken();
        if (!token) {
            setError('Add your Hugging Face token in settings to start chatting.');
            setShowSettings(true);
            return;
        }

        const newMessages = [...messages, { role: 'user', content: text }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setError(null);

        // Build message list for API (include system prompt)
        const apiMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
        ];

        try {
            const res = await fetch(HF_ENDPOINT, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: getStoredModel(),
                    messages: apiMessages,
                    max_tokens: 512,
                    temperature: 0.6,
                    stream: false,
                }),
            });

            if (!res.ok) {
                const bodyText = await res.text().catch(() => '');
                throw new Error(
                    `Request failed (${res.status}). ${bodyText.slice(0, 200)}`
                );
            }

            const data = await res.json();
            const reply =
                data?.choices?.[0]?.message?.content?.trim() ||
                "I didn't get a response. Try again?";

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            console.error('[ML Mentor] chat error:', err);
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }, [input, loading, messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const saveSettings = () => {
        try {
            if (tokenDraft) {
                localStorage.setItem(TOKEN_STORAGE_KEY, tokenDraft);
            } else {
                localStorage.removeItem(TOKEN_STORAGE_KEY);
            }
            localStorage.setItem(MODEL_STORAGE_KEY, modelDraft || DEFAULT_MODEL);
            setShowSettings(false);
            setError(null);
        } catch {
            setError('Could not save settings (localStorage blocked?).');
        }
    };

    const clearConversation = () => {
        setMessages([
            {
                role: 'assistant',
                content: "Conversation cleared. What would you like to ask?",
            },
        ]);
        setError(null);
    };

    return (
        <>
            <button
                className={`chatbot-fab ${open ? 'hidden' : ''}`}
                onClick={() => setOpen(true)}
                aria-label="Open ML Mentor chat"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Ask ML Mentor</span>
            </button>

            {open && (
                <div className="chatbot-panel" role="dialog" aria-label="ML Mentor chat">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <div className="chatbot-avatar" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                                    <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
                                </svg>
                            </div>
                            <div>
                                <strong>ML Mentor</strong>
                                <span className="chatbot-status">
                                    {activeToken ? (
                                        <><span className="status-dot online" /> Ready · {activeModel.split('/').pop()}</>
                                    ) : (
                                        <><span className="status-dot offline" /> Token needed</>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="chatbot-header-actions">
                            <button
                                className="chatbot-icon-btn"
                                onClick={clearConversation}
                                aria-label="Clear conversation"
                                title="Clear conversation"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
                            </button>
                            <button
                                className="chatbot-icon-btn"
                                onClick={() => setShowSettings((s) => !s)}
                                aria-label="Settings"
                                title="Settings"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                            </button>
                            <button
                                className="chatbot-icon-btn"
                                onClick={() => setOpen(false)}
                                aria-label="Close chat"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>
                    </div>

                    {showSettings && (
                        <div className="chatbot-settings">
                            <label>
                                Hugging Face Token
                                {hasEnvToken && <span className="settings-hint"> (env token active — leave blank to use it)</span>}
                                <input
                                    type="password"
                                    placeholder="hf_..."
                                    value={tokenDraft}
                                    onChange={(e) => setTokenDraft(e.target.value)}
                                    autoComplete="off"
                                />
                            </label>
                            <label>
                                Model
                                <input
                                    type="text"
                                    placeholder={DEFAULT_MODEL}
                                    value={modelDraft}
                                    onChange={(e) => setModelDraft(e.target.value)}
                                />
                            </label>
                            <p className="settings-help">
                                Get a free token at{' '}
                                <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer">
                                    huggingface.co/settings/tokens
                                </a>
                                . It is stored only in your browser.
                            </p>
                            <div className="settings-actions">
                                <button className="settings-cancel" onClick={() => setShowSettings(false)}>Cancel</button>
                                <button className="settings-save" onClick={saveSettings}>Save</button>
                            </div>
                        </div>
                    )}

                    <div className="chatbot-messages" ref={listRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                                <div className="chat-bubble">{m.content}</div>
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-msg chat-msg-assistant">
                                <div className="chat-bubble typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="chat-error">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="chatbot-input-row">
                        <textarea
                            ref={inputRef}
                            className="chatbot-input"
                            placeholder={activeToken ? "Ask about ML, this course, or Jack..." : "Add a Hugging Face token in settings first"}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={loading}
                        />
                        <button
                            className="chatbot-send"
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .chatbot-fab {
                    position: fixed;
                    right: 20px;
                    bottom: 20px;
                    z-index: 1500;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 20px 12px 18px;
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    font-family: 'Outfit', var(--font-main, inherit);
                    font-weight: 700;
                    font-size: 14px;
                    color: #000;
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    box-shadow: 0 8px 24px rgba(0, 242, 255, 0.4),
                                0 4px 12px rgba(112, 0, 255, 0.3);
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
                }
                .chatbot-fab:hover {
                    transform: translateY(-2px) scale(1.04);
                    box-shadow: 0 12px 36px rgba(0, 242, 255, 0.55),
                                0 6px 18px rgba(112, 0, 255, 0.4);
                }
                .chatbot-fab.hidden { display: none; }

                .chatbot-panel {
                    position: fixed;
                    right: 20px;
                    bottom: 20px;
                    z-index: 1600;
                    width: 380px;
                    max-width: calc(100vw - 40px);
                    height: 560px;
                    max-height: calc(100vh - 40px);
                    display: flex;
                    flex-direction: column;
                    background: rgba(15, 15, 26, 0.97);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 18px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6),
                                0 0 0 1px rgba(0, 242, 255, 0.15);
                    color: var(--text-primary);
                    overflow: hidden;
                    animation: chatSlideUp 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes chatSlideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .chatbot-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 14px 16px;
                    background: linear-gradient(135deg, rgba(0, 242, 255, 0.08), rgba(112, 0, 255, 0.08));
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }
                .chatbot-title { display: flex; align-items: center; gap: 12px; }
                .chatbot-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #00f2ff, #7000ff);
                    color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .chatbot-title strong {
                    display: block;
                    font-size: 14px;
                    font-family: 'Outfit', var(--font-main, inherit);
                    font-weight: 700;
                    line-height: 1.2;
                }
                .chatbot-status {
                    font-size: 11px;
                    color: var(--text-secondary);
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: 2px;
                }
                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: inline-block;
                }
                .status-dot.online { background: #00ff9d; box-shadow: 0 0 8px rgba(0,255,157,0.6); }
                .status-dot.offline { background: #ff9d00; }
                .chatbot-header-actions { display: flex; gap: 4px; }
                .chatbot-icon-btn {
                    background: transparent;
                    border: none;
                    padding: 8px;
                    border-radius: 8px;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .chatbot-icon-btn:hover {
                    background: rgba(255,255,255,0.08);
                    color: var(--text-primary);
                }

                .chatbot-settings {
                    padding: 14px 16px;
                    background: rgba(0,0,0,0.25);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .chatbot-settings label {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    font-size: 12px;
                    color: var(--text-secondary);
                    font-weight: 500;
                }
                .settings-hint {
                    font-weight: 400;
                    font-style: italic;
                    color: #00ff9d;
                }
                .chatbot-settings input {
                    padding: 8px 10px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                }
                .chatbot-settings input:focus {
                    outline: none;
                    border-color: var(--accent-primary, #00f2ff);
                }
                .settings-help {
                    font-size: 11px;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.5;
                }
                .settings-help a { color: var(--accent-primary, #00f2ff); }
                .settings-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                }
                .settings-cancel, .settings-save {
                    padding: 8px 14px;
                    border: none;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                }
                .settings-cancel {
                    background: rgba(255,255,255,0.06);
                    color: var(--text-primary);
                }
                .settings-save {
                    background: linear-gradient(135deg, #00f2ff, #00c8d4);
                    color: #000;
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    scrollbar-width: thin;
                }
                .chat-msg { display: flex; }
                .chat-msg-user { justify-content: flex-end; }
                .chat-msg-assistant { justify-content: flex-start; }
                .chat-bubble {
                    max-width: 85%;
                    padding: 10px 14px;
                    border-radius: 14px;
                    font-size: 14px;
                    line-height: 1.5;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                .chat-msg-user .chat-bubble {
                    background: linear-gradient(135deg, #00f2ff, #00c8d4);
                    color: #000;
                    border-bottom-right-radius: 4px;
                }
                .chat-msg-assistant .chat-bubble {
                    background: rgba(255,255,255,0.05);
                    color: var(--text-primary);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-bottom-left-radius: 4px;
                }
                .chat-bubble.typing {
                    display: inline-flex;
                    gap: 4px;
                    padding: 14px;
                }
                .chat-bubble.typing span {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--accent-primary, #00f2ff);
                    animation: typingBounce 1.2s infinite ease-in-out;
                }
                .chat-bubble.typing span:nth-child(2) { animation-delay: 0.15s; }
                .chat-bubble.typing span:nth-child(3) { animation-delay: 0.3s; }
                @keyframes typingBounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                    30% { transform: translateY(-5px); opacity: 1; }
                }
                .chat-error {
                    font-size: 12px;
                    color: #ff6b8a;
                    background: rgba(255, 0, 85, 0.08);
                    border: 1px solid rgba(255, 0, 85, 0.2);
                    border-radius: 8px;
                    padding: 8px 12px;
                    margin-top: 4px;
                }

                .chatbot-input-row {
                    display: flex;
                    gap: 8px;
                    padding: 12px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    background: rgba(0,0,0,0.2);
                    align-items: flex-end;
                }
                .chatbot-input {
                    flex: 1;
                    resize: none;
                    max-height: 100px;
                    padding: 10px 12px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    color: var(--text-primary);
                    font-family: inherit;
                    font-size: 14px;
                    line-height: 1.5;
                }
                .chatbot-input:focus {
                    outline: none;
                    border-color: var(--accent-primary, #00f2ff);
                    box-shadow: 0 0 0 3px rgba(0, 242, 255, 0.12);
                }
                .chatbot-input:disabled { opacity: 0.6; }
                .chatbot-send {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #00f2ff, #00c8d4);
                    color: #000;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .chatbot-send:not(:disabled):hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 18px rgba(0, 242, 255, 0.35);
                }
                .chatbot-send:disabled { opacity: 0.4; cursor: not-allowed; }

                @media (max-width: 480px) {
                    .chatbot-panel {
                        right: 10px;
                        left: 10px;
                        bottom: 10px;
                        width: auto;
                        height: 70vh;
                    }
                    .chatbot-fab { right: 10px; bottom: 10px; }
                    .chatbot-fab span { display: none; }
                    .chatbot-fab { padding: 14px; }
                }
            `}</style>
        </>
    );
}
