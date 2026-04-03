import * as React from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'ghost';
type ButtonSize = 'default' | 'lg' | 'icon';

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-[var(--accent)] text-[#052311] shadow-[0_20px_40px_rgba(120,222,171,0.16)] hover:bg-[#91e5bb]',
  secondary:
    'border border-white/12 bg-white/6 text-white hover:border-[rgba(120,222,171,0.35)] hover:bg-white/10',
  ghost: 'bg-transparent text-[var(--muted-foreground)] hover:bg-white/6 hover:text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
  icon: 'h-10 w-10',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#082108] disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      type={type}
      {...props}
    />
  );
}
