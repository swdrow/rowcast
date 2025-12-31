import type { ForecastPoint, WeatherObservation } from '../types/api';
interface ForecastSectionProps {
    timeline?: ForecastPoint[];
    alerts?: WeatherObservation['weatherAlerts'];
    visibility?: number;
    lightningPotential?: number;
}
export declare function ForecastSection({ timeline, alerts, visibility, lightningPotential }: ForecastSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
