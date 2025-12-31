export type Nullable<T> = T | null | undefined;
export interface WeatherObservation {
    timestamp?: string;
    windSpeed?: number;
    windGust?: number;
    windDir?: string;
    apparentTemp?: number;
    uvIndex?: number;
    precipitation?: number;
    currentTemp?: number;
    visibility?: number;
    precipitationProbability?: number;
    lightningPotential?: number;
    weatherAlerts?: WeatherAlert[];
}
export interface WeatherAlert {
    type?: string;
    severity?: string;
    urgency?: string;
    description?: string;
}
export interface ForecastPoint {
    timestamp: string;
    score?: number;
    conditions?: WeatherObservation & WaterSnapshot;
    noaaDataUsed?: boolean;
}
export interface WaterSnapshot {
    discharge?: number;
    gaugeHeight?: number;
    waterTemp?: number;
}
export interface HistoricalSeriesPoint {
    timestamp: string;
    value: number;
}
export interface WaterHistory {
    discharge?: HistoricalSeriesPoint[];
    gaugeHeight?: HistoricalSeriesPoint[];
    waterTemp?: HistoricalSeriesPoint[];
}
export interface CompleteDashboardResponse {
    weather: {
        current: Nullable<WeatherObservation>;
        forecast: WeatherObservation[];
        extended: WeatherObservation[];
        alerts: WeatherAlert[];
    };
    water: {
        current: Nullable<WaterSnapshot>;
        historical: WaterHistory;
    };
    noaa: {
        current: Nullable<WaterSnapshot>;
        observed: WaterSnapshot[];
        forecast: WaterSnapshot[];
        metadata?: Record<string, unknown>;
    };
    rowcast: {
        current: Nullable<{
            score: number;
            params: Record<string, unknown>;
        }>;
        forecast: ForecastPoint[];
        extendedForecast: ForecastPoint[];
        shortTerm?: ForecastPoint[];
    };
}
