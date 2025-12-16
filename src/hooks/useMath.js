import { useContext } from 'react';
import { MathContext } from '../contexts/mathContextBase';

export function useMath() {
    return useContext(MathContext);
}
