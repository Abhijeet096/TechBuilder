import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const NotifyContext = createContext(null);

export function NotifyProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((arr) => [...arr, { id, ...toast }]);
    setTimeout(() => dismiss(id), toast.duration ?? 4000);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((arr) => arr.filter(t => t.id !== id));
  }, []);

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <NotifyContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] space-y-2">
        {toasts.map(t => (
          <div key={t.id} className={`rounded-md px-4 py-3 shadow ring-1 ring-gray-200 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 ${t.variant === 'error' ? 'border border-red-300' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 h-2 w-2 rounded-full ${t.variant === 'error' ? 'bg-red-500' : 'bg-primary'}`} />
              <div>
                <div className="font-medium">{t.title || (t.variant === 'error' ? 'Error' : 'Notice')}</div>
                {t.message && <div className="mt-0.5 opacity-80">{t.message}</div>}
              </div>
              <button className="ml-4 text-xs text-gray-500 hover:text-gray-700" onClick={() => dismiss(t.id)}>Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error('useNotify must be used within NotifyProvider');
  return ctx;
}
