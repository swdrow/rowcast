import type { WaterSnapshot, WaterHistory } from '../types/api';
interface Props {
    current?: WaterSnapshot | null;
    history?: WaterHistory;
}
export declare function WaterInsightGrid({ current, history }: Props): import("react/jsx-runtime").JSX.Element;
export {};
