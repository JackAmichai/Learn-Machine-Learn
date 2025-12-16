import { createContext, useContext, useState } from 'react';
import { MathModal } from '../components/MathModal';
import { MATH_TOPICS } from '../engine/mathContent';

const MathContext = createContext();

export function MathProvider({ children }) {
    const [activeTopic, setActiveTopic] = useState(null);

    const openMath = (topic) => {
        // Only open if we have content for it
        if (MATH_TOPICS[topic]) {
            setActiveTopic(topic);
        } else {
            console.warn(`No math content for: ${topic}`);
        }
    };

    const closeMath = () => setActiveTopic(null);

    return (
        <MathContext.Provider value={{ openMath }}>
            {children}
            {activeTopic && <MathModal topic={activeTopic} onClose={closeMath} />}
        </MathContext.Provider>
    );
}

export const useMath = () => useContext(MathContext);
