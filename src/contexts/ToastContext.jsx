import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastContext } from './toastContextBase';

const fallbackId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timers = useRef(new Map());

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
    }, []);

    const pushToast = useCallback((toast) => {
        const id = toast.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : fallbackId());
        const duration = typeof toast.duration === 'number' ? toast.duration : 4000;
        const nextToast = {
            id,
            type: toast.type || 'info',
            title: toast.title || 'Heads up',
            message: toast.message || '',
            duration
        };

        setToasts(prev => [...prev, nextToast]);

        if (duration > 0) {
            const timer = setTimeout(() => dismissToast(id), duration);
            timers.current.set(id, timer);
        }

        return id;
    }, [dismissToast]);

    const clearToasts = useCallback(() => {
        timers.current.forEach(timer => clearTimeout(timer));
        timers.current.clear();
        setToasts([]);
    }, []);

    useEffect(() => () => {
        timers.current.forEach(timer => clearTimeout(timer));
        timers.current.clear();
    }, []);

    const value = useMemo(() => ({ toasts, pushToast, dismissToast, clearToasts }), [toasts, pushToast, dismissToast, clearToasts]);

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
}
