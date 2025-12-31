import React from 'react';
import { cn } from '../utils/cn';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({ 
  className, 
  label,
  error,
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-white/80 ml-1">
          {label}
        </label>
      )}
      <input 
        className={cn(
          "glass rounded-xl px-4 py-3 outline-none border border-white/20",
          "focus:border-white/40 focus:bg-white/20 focus:shadow-glass-hover",
          "placeholder-white/40 text-white transition-all duration-300",
          error && "border-red-500/50 focus:border-red-500/80",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-300 ml-1">{error}</span>
      )}
    </div>
  );
};
