import React from 'react';
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}
export declare const GlassCard: React.FC<GlassCardProps>;
export {};
