import type { WaterSnapshot, WaterHistory } from '../types/api';
interface InsightsSectionProps {
    water?: WaterSnapshot | null;
    history?: WaterHistory;
}
export declare function InsightsSection({ water, history }: InsightsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
