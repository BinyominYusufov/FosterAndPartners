import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
          variant === 'default'
            ? 'border-transparent bg-black text-white'
            : 'border-neutral-200 bg-white text-neutral-700',
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

