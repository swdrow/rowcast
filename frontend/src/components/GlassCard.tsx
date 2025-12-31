import React from 'react';
import { cn } from '../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hoverEffect = true,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300 border border-white/20 shadow-glass",
        hoverEffect && "hover:bg-white/15 hover:scale-[1.02] hover:shadow-glass-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
