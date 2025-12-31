interface CommandBarProps {
    status: 'idle' | 'pending' | 'success' | 'error';
    lastUpdated?: string;
    onRefresh?: () => void;
}
export declare function CommandBar({ status, lastUpdated, onRefresh }: CommandBarProps): import("react/jsx-runtime").JSX.Element;
export {};
