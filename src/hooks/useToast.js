import { useContext } from 'react';
import { ToastContext } from '../contexts/toastContextBase';

export function useToast() {
    return useContext(ToastContext);
}
