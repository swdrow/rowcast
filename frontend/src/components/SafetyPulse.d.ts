import type { WeatherAlert } from '../types/api';
interface SafetyPulseProps {
    alerts?: WeatherAlert[];
    visibility?: number;
    lightningPotential?: number;
}
export declare function SafetyPulse({ alerts, visibility, lightningPotential }: SafetyPulseProps): import("react/jsx-runtime").JSX.Element;
export {};
