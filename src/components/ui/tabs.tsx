'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { cn, focusRing } from '@/lib/design-system';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within Tabs');
  return context;
};

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg bg-neutral-900 p-1',
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isSelected = value === selectedValue;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        focusRing,
        isSelected
          ? 'bg-neutral-800 text-neutral-100'
          : 'text-neutral-400 hover:text-neutral-100',
        className
      )}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const { value: selectedValue } = useTabsContext();

  if (value !== selectedValue) return null;

  return (
    <div role="tabpanel" className={cn('mt-4', className)}>
      {children}
    </div>
  );
};
