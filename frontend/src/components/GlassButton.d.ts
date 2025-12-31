import React from 'react';
interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}
export declare const GlassButton: React.FC<GlassButtonProps>;
export {};
