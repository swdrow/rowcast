interface SpotlightMetric {
    id: string;
    label: string;
    primary: string;
    secondary?: string;
    trendLabel?: string;
}
interface SpotlightMetricsProps {
    metrics: SpotlightMetric[];
}
export declare function SpotlightMetrics({ metrics }: SpotlightMetricsProps): import("react/jsx-runtime").JSX.Element;
export {};
