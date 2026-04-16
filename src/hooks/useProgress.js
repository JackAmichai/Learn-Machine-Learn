import { useContext } from 'react';
import { ProgressContext } from '../contexts/progressContextBase';

export function useProgress() {
    return useContext(ProgressContext);
}
