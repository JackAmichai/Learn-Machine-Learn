import { useCallback, useContext, useMemo, useState } from 'react';
import { MathModal } from '../components/MathModal';
import { MATH_TOPICS } from '../engine/mathContent';
import { MathContext } from './mathContextBase';
import { PersonalizationContext } from './PersonalizationContext';
import { DEFAULT_PROFILE } from '../engine/personalizationEngine';

export function MathProvider({ children }) {
    const [activeTopic, setActiveTopic] = useState(null);
    const { profile, setProfile } = useContext(PersonalizationContext);

    const openMath = useCallback((topic) => {
        // Only open if we have content for it
        if (MATH_TOPICS[topic]) {
            setActiveTopic(topic);
        } else {
            console.warn(`No math content for: ${topic}`);
        }
    }, []);

    const closeMath = useCallback(() => setActiveTopic(null), []);

    const markComplete = useCallback((topic) => {
        const base = profile || DEFAULT_PROFILE;
        const existing = base.completedTopics || [];
        if (existing.includes(topic)) return;
        setProfile({
            ...base,
            completedTopics: [...existing, topic],
        });
    }, [profile, setProfile]);

    const value = useMemo(() => ({ openMath }), [openMath]);

    return (
        <MathContext.Provider value={value}>
            {children}
            {activeTopic && (
                <MathModal
                    topic={activeTopic}
                    onClose={closeMath}
                    onComplete={markComplete}
                />
            )}
        </MathContext.Provider>
    );
}
