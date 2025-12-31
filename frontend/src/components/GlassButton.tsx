import React from 'react';
import { cn } from '../utils/cn';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    secondary: 'bg-black/20 hover:bg-black/30 text-white/90 border-white/10',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-100 border-red-500/30'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={cn(
        "glass rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border backdrop-blur-md shadow-lg",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
