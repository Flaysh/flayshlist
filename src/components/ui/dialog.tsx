'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Dialog = ({ isOpen, onClose, title, children, className }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      dialog.showModal();
    } else {
      dialog.close();
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed inset-0 z-[200] m-auto max-h-[85vh] w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900 p-0 shadow-xl',
        'backdrop:bg-black/60 backdrop:backdrop-blur-sm',
        className
      )}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
        <button
          onClick={onClose}
          className={cn(
            'rounded-md p-1 text-neutral-400 hover:text-neutral-100 transition-colors',
            focusRing
          )}
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
};
