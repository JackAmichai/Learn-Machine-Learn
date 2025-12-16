import { createContext } from 'react';

export const ToastContext = createContext({
    toasts: [],
    pushToast: () => { },
    dismissToast: () => { },
    clearToasts: () => { }
});
