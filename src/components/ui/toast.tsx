'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/design-system';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[400] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const variants = {
  default: 'bg-neutral-800 border-neutral-700',
  success: 'bg-green-900/50 border-green-700',
  error: 'bg-red-900/50 border-red-700',
};

const ToastItem = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) => {
  return (
    <div
      className={cn(
        'flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg',
        'animate-in slide-in-from-right-full',
        variants[toast.variant ?? 'default']
      )}
      role="alert"
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-100">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-sm text-neutral-400">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-neutral-400 hover:text-neutral-100 transition-colors"
        aria-label="Close toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
