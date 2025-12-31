import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';
import type {
  CompleteDashboardResponse,
  ForecastPoint,
  Nullable,
  WeatherObservation,
  WaterSnapshot
} from '../types/api';

interface DerivedDashboardData {
  data?: CompleteDashboardResponse;
  latestScore?: number;
  heroConditions?: Nullable<WeatherObservation>;
  waterNow?: Nullable<WaterSnapshot>;
  shortTerm?: ForecastPoint[];
  trend?: ForecastPoint[];
}

export const useRowcastData = () => {
  const query = useQuery({
    queryKey: ['dashboard', 'complete'],
    queryFn: () => apiClient.fetchCompleteDashboard<CompleteDashboardResponse>(),
    refetchInterval: 1000 * 60 * 5
  });

  const derived = useMemo<DerivedDashboardData>(() => {
    if (!query.data) return {};
    const { weather, water, rowcast } = query.data;
    return {
      data: query.data,
      latestScore: rowcast?.current?.score ?? rowcast?.forecast?.[0]?.score,
      heroConditions: weather?.current ?? weather?.forecast?.[0],
      waterNow: water?.current,
      shortTerm: rowcast?.shortTerm ?? rowcast?.forecast?.slice(0, 12),
      trend: rowcast?.forecast ?? []
    };
  }, [query.data]);

  return {
    ...query,
    derived
  };
};
