import type { WeatherObservation, WaterSnapshot } from '../types/api';
interface HeroSectionProps {
    score?: number;
    conditions?: WeatherObservation;
    water?: WaterSnapshot;
}
export declare function HeroSection({ score, conditions, water }: HeroSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
