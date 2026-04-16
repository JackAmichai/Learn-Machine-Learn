import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProgressContext } from './progressContextBase';
import { useToast } from '../hooks/useToast';

const STORAGE_KEY = 'lml_progress_v1';

const ACHIEVEMENTS = [
    { id: 'first_lesson', label: 'First Steps', description: 'Open your first lesson', xp: 10,
      check: (p) => p.visitedLessons.size >= 1 },
    { id: 'curious_mind', label: 'Curious Mind', description: 'Open 5 lessons', xp: 25,
      check: (p) => p.visitedLessons.size >= 5 },
    { id: 'scholar', label: 'Scholar', description: 'Open 15 lessons', xp: 75,
      check: (p) => p.visitedLessons.size >= 15 },
    { id: 'polymath', label: 'Polymath', description: 'Open 30 lessons', xp: 200,
      check: (p) => p.visitedLessons.size >= 30 },
    { id: 'first_quiz', label: 'Quiz Initiate', description: 'Complete your first quiz', xp: 15,
      check: (p) => p.completedQuizzes.size >= 1 },
    { id: 'quiz_5', label: 'Practice Makes Perfect', description: 'Complete 5 quizzes', xp: 40,
      check: (p) => p.completedQuizzes.size >= 5 },
    { id: 'quiz_master', label: 'Quiz Master', description: 'Complete 15 quizzes', xp: 150,
      check: (p) => p.completedQuizzes.size >= 15 },
    { id: 'sharpshooter', label: 'Sharpshooter', description: 'Score 100% on a quiz', xp: 50,
      check: (p) => p.bestScore >= 100 },
    { id: 'streak_3', label: 'On a Roll', description: '3-day learning streak', xp: 30,
      check: (p) => p.streakDays >= 3 },
    { id: 'streak_7', label: 'Devoted', description: '7-day learning streak', xp: 80,
      check: (p) => p.streakDays >= 7 },
];

const LEVEL_CURVE = [0, 100, 250, 500, 850, 1300, 1900, 2700, 3700, 5000, 6500, 8500, 11000];

function computeLevel(xp) {
    let level = 1;
    for (let i = 1; i < LEVEL_CURVE.length; i++) {
        if (xp >= LEVEL_CURVE[i]) level = i + 1;
        else break;
    }
    const lo = LEVEL_CURVE[level - 1] ?? 0;
    const hi = LEVEL_CURVE[level] ?? lo + 5000;
    const progress = hi > lo ? (xp - lo) / (hi - lo) : 1;
    return { level, nextLevelAt: hi, levelProgress: Math.min(1, progress) };
}

function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a, b) {
    if (!a || !b) return null;
    const da = new Date(a + 'T00:00:00Z');
    const db = new Date(b + 'T00:00:00Z');
    return Math.round((db - da) / 86400000);
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return {
            visitedLessons: new Set(parsed.visitedLessons || []),
            completedQuizzes: new Set(parsed.completedQuizzes || []),
            bestScore: Number(parsed.bestScore) || 0,
            streakDays: Number(parsed.streakDays) || 0,
            lastActiveDate: parsed.lastActiveDate || null,
            achievements: new Set(parsed.achievements || []),
            totalXP: Number(parsed.totalXP) || 0,
        };
    } catch {
        return null;
    }
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            visitedLessons: Array.from(state.visitedLessons),
            completedQuizzes: Array.from(state.completedQuizzes),
            bestScore: state.bestScore,
            streakDays: state.streakDays,
            lastActiveDate: state.lastActiveDate,
            achievements: Array.from(state.achievements),
            totalXP: state.totalXP,
        }));
    } catch { /* noop */ }
}

const EMPTY_STATE = {
    visitedLessons: new Set(),
    completedQuizzes: new Set(),
    bestScore: 0,
    streakDays: 0,
    lastActiveDate: null,
    achievements: new Set(),
    totalXP: 0,
};

export function ProgressProvider({ children }) {
    const [state, setState] = useState(() => loadState() || EMPTY_STATE);
    const toast = useToast();
    const initialized = useRef(false);

    // Persist on every change
    useEffect(() => { saveState(state); }, [state]);

    // Touch streak on first mount of the session
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        setState(prev => {
            const today = todayStr();
            if (prev.lastActiveDate === today) return prev;
            const delta = daysBetween(prev.lastActiveDate, today);
            const nextStreak = delta === 1 ? prev.streakDays + 1 : 1;
            return { ...prev, lastActiveDate: today, streakDays: nextStreak };
        });
    }, []);

    const evaluateAchievements = useCallback((nextState) => {
        const earned = [];
        let bonusXP = 0;
        for (const a of ACHIEVEMENTS) {
            if (!nextState.achievements.has(a.id) && a.check(nextState)) {
                earned.push(a);
                bonusXP += a.xp;
            }
        }
        if (earned.length === 0) return nextState;

        const merged = {
            ...nextState,
            achievements: new Set([...nextState.achievements, ...earned.map(a => a.id)]),
            totalXP: nextState.totalXP + bonusXP,
        };

        // Fire toasts asynchronously (avoid setState during render)
        if (toast?.pushToast) {
            queueMicrotask(() => {
                earned.forEach(a => {
                    toast.pushToast({
                        type: 'success',
                        title: `Achievement unlocked — ${a.label}`,
                        message: `${a.description} (+${a.xp} XP)`,
                        duration: 5500,
                    });
                });
            });
        }
        return merged;
    }, [toast]);

    const markLessonVisited = useCallback((key) => {
        if (!key) return;
        setState(prev => {
            if (prev.visitedLessons.has(key)) return prev;
            const next = {
                ...prev,
                visitedLessons: new Set([...prev.visitedLessons, key]),
                totalXP: prev.totalXP + 5,
            };
            return evaluateAchievements(next);
        });
    }, [evaluateAchievements]);

    const markQuizCompleted = useCallback((id, scorePct = 0) => {
        if (!id) return;
        setState(prev => {
            const wasCompleted = prev.completedQuizzes.has(id);
            const nextScore = Math.max(prev.bestScore, scorePct || 0);
            const xpGain = wasCompleted
                ? Math.round((scorePct || 0) / 10)            // small XP for replay
                : 15 + Math.round((scorePct || 0) / 5);       // bigger first-time bonus
            const next = {
                ...prev,
                completedQuizzes: new Set([...prev.completedQuizzes, id]),
                bestScore: nextScore,
                totalXP: prev.totalXP + xpGain,
            };
            return evaluateAchievements(next);
        });
    }, [evaluateAchievements]);

    const resetProgress = useCallback(() => {
        setState(EMPTY_STATE);
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
    }, []);

    const { level, nextLevelAt, levelProgress } = computeLevel(state.totalXP);

    const value = useMemo(() => ({
        ...state,
        level,
        nextLevelAt,
        levelProgress,
        markLessonVisited,
        markQuizCompleted,
        resetProgress,
        achievementCatalog: ACHIEVEMENTS,
    }), [state, level, nextLevelAt, levelProgress, markLessonVisited, markQuizCompleted, resetProgress]);

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
}
