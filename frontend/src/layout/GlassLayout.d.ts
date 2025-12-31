import type { PropsWithChildren } from 'react';
interface GlassLayoutProps {
    status: 'idle' | 'pending' | 'success' | 'error';
    lastUpdated?: string;
    onRefresh?: () => void;
}
export declare function GlassLayout({ children, status, lastUpdated, onRefresh }: PropsWithChildren<GlassLayoutProps>): import("react/jsx-runtime").JSX.Element;
export {};
