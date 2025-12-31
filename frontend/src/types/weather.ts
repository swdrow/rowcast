export interface WeatherData {
  currentTemp: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  windGust: number;
  windDir: number | string; // Backend sends string "S (180°)" sometimes? No, wait.
  precipitation: number;
  uvIndex: number;
  visibility: number;
  description?: string;
  icon?: string;
  timestamp: string;
}

export interface WaterData {
  discharge: number;
  gaugeHeight: number;
  waterTemp: number;
  timestamp: string;
}

export interface RowCastData {
  score: number;
  conditions: any;
  penalties?: string[];
  timestamp: string;
}

export interface ForecastData {
  timestamp: string;
  score: number;
  weather: WeatherData;
  water: WaterData;
}

export interface DashboardData {
  weather: {
    current: WeatherData;
    forecast: WeatherData[];
    extended: WeatherData[];
    alerts: any[];
  };
  water: {
    current: WaterData;
    historical: any;
  };
  rowcast: {
    current: RowCastData;
    forecast: any[];
    extendedForecast: any[];
    shortTerm: any[];
  };
  metadata: {
    lastUpdated: string;
  };
}
