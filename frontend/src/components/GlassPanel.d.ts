import { PropsWithChildren } from 'react';
type PaddingSize = 'none' | 'sm' | 'md' | 'lg';
interface GlassPanelProps {
    className?: string;
    padding?: PaddingSize;
}
export declare function GlassPanel({ children, className, padding }: PropsWithChildren<GlassPanelProps>): import("react/jsx-runtime").JSX.Element;
export {};
