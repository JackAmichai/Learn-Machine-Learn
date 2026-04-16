import { createContext } from 'react';

/**
 * ProgressContext — global learning progress state.
 *
 * Shape:
 *   {
 *     visitedLessons: Set<string>,        // lesson topic keys the user has opened
 *     completedQuizzes: Set<string>,      // quiz scenario IDs the user has finished
 *     bestScore: number,                  // highest quiz score (correct/total ratio %)
 *     streakDays: number,                 // consecutive days with at least one action
 *     lastActiveDate: string | null,      // YYYY-MM-DD of last action
 *     achievements: Set<string>,          // achievement IDs unlocked
 *     totalXP: number,                    // accumulated experience points
 *   }
 *
 * Actions:
 *   markLessonVisited(key)
 *   markQuizCompleted(id, scorePct)
 *   resetProgress()
 *
 * The provider derives `level` and `nextLevelAt` from totalXP for HomeNav.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const ProgressContext = createContext({
    visitedLessons: new Set(),
    completedQuizzes: new Set(),
    bestScore: 0,
    streakDays: 0,
    lastActiveDate: null,
    achievements: new Set(),
    totalXP: 0,
    level: 1,
    nextLevelAt: 100,
    levelProgress: 0,
    markLessonVisited: () => { },
    markQuizCompleted: () => { },
    resetProgress: () => { },
});
