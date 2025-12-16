import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContextBase';

export function useTheme() {
    return useContext(ThemeContext);
}
