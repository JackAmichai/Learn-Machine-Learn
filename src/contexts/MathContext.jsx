import { useCallback, useMemo, useState } from 'react';
import { MathModal } from '../components/MathModal';
import { MATH_TOPICS } from '../engine/mathContent';
import { MathContext } from './mathContextBase';

export function MathProvider({ children }) {
    const [activeTopic, setActiveTopic] = useState(null);

    const openMath = useCallback((topic) => {
        // Only open if we have content for it
        if (MATH_TOPICS[topic]) {
            setActiveTopic(topic);
        } else {
            console.warn(`No math content for: ${topic}`);
        }
    }, []);

    const closeMath = () => setActiveTopic(null);

    const value = useMemo(() => ({ openMath }), [openMath]);

    return (
        <MathContext.Provider value={value}>
            {children}
            {activeTopic && <MathModal topic={activeTopic} onClose={closeMath} />}
        </MathContext.Provider>
    );
}
