import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';
import { DashboardData } from '../types/weather';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';

type ViewMode = 'hourly' | 'daily';

// Mini sparkline chart component
const MiniChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 24;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
};

export const Forecast: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('hourly');
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.fetchCompleteDashboard<DashboardData>(),
    refetchInterval: 60000
  });

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-300';
    if (score >= 5) return 'text-yellow-300';
    return 'text-red-300';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-emerald-500/20';
    if (score >= 5) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) {
      return (
        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    if (score >= 5) {
      return (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-64 bg-white/10 rounded mt-2 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-20 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-10 w-20 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </header>
        <GlassCard className="p-6 animate-pulse">
          <div className="h-6 w-32 bg-white/10 rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-xl" />
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <header>
          <h2 className="text-3xl font-light tracking-tight text-white/90">Extended Forecast</h2>
          <p className="text-white/50 mt-1">7-day weather and water predictions</p>
        </header>
        <GlassCard className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Unable to Load Forecast</h3>
          <p className="text-white/60 mb-4">Please check your connection and try again.</p>
          <GlassButton onClick={() => refetch()}>Try Again</GlassButton>
        </GlassCard>
      </div>
    );
  }

  if (!data) return null;

  const { rowcast } = data;
  // Use extendedForecast which has the full hourly data, fallback to forecast
  const forecastData = rowcast.extendedForecast || rowcast.forecast || [];

  // Group hourly data by day for daily view
  const groupByDay = (items: any[]) => {
    const days = new Map<string, any[]>();
    items.forEach(item => {
      const date = new Date(item.timestamp);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      if (!days.has(dayKey)) {
        days.set(dayKey, []);
      }
      days.get(dayKey)!.push(item);
    });
    return Array.from(days.entries()).map(([date, hours]) => {
      const scores = hours.map(h => h.score || 0);
      const temps = hours.map(h => h.conditions?.apparentTemp || h.weather?.apparentTemp || 0).filter(t => t > 0);
      const winds = hours.map(h => h.conditions?.windSpeed || h.weather?.windSpeed || 0);
      const gusts = hours.map(h => h.conditions?.windGust || h.weather?.windGust || 0);

      return {
        date,
        hours,
        avgScore: scores.reduce((sum, s) => sum + s, 0) / scores.length,
        maxScore: Math.max(...scores),
        minScore: Math.min(...scores),
        maxTemp: temps.length > 0 ? Math.max(...temps) : 0,
        minTemp: temps.length > 0 ? Math.min(...temps) : 0,
        avgWind: winds.reduce((sum, w) => sum + w, 0) / winds.length,
        maxWind: Math.max(...winds),
        maxGust: Math.max(...gusts),
        scoreData: scores
      };
    });
  };

  const dailyData = groupByDay(forecastData.slice(0, 168));

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-white/90">Extended Forecast</h2>
          <p className="text-white/50 mt-1">7-day weather and water predictions</p>
        </div>
        <div className="flex gap-2">
          <GlassButton
            variant={viewMode === 'hourly' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('hourly')}
            size="sm"
          >
            Hourly
          </GlassButton>
          <GlassButton
            variant={viewMode === 'daily' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('daily')}
            size="sm"
          >
            Daily
          </GlassButton>
        </div>
      </header>

      {viewMode === 'hourly' ? (
        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-light text-white">Next 48 Hours</h3>
              <span className="text-white/40 text-sm">Click for details</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {forecastData.slice(0, 48).map((item: any, i: number) => {
                const date = new Date(item.timestamp);
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = selectedHour === i;

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedHour(isSelected ? null : i)}
                    className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${getScoreBg(item.score)}
                      ${isSelected ? 'ring-2 ring-white/30 scale-105' : 'hover:scale-102 hover:bg-white/10'}
                      glass border border-white/10`}
                  >
                    <span className="text-white/50 text-xs mb-0.5">
                      {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-white font-medium text-sm mb-2">
                      {date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                    </span>
                    <div className={`text-2xl font-bold ${getScoreColor(item.score)} mb-1`}>
                      {item.score?.toFixed(1) || 'N/A'}
                    </div>
                    <div className="text-white/70 text-sm mb-1">
                      {(item.conditions?.apparentTemp ?? item.weather?.apparentTemp)?.toFixed(0)}°F
                    </div>
                    <div className="flex items-center gap-1 text-white/50 text-xs">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      {(item.conditions?.windSpeed ?? item.weather?.windSpeed)?.toFixed(0)}
                      {(item.conditions?.windGust ?? item.weather?.windGust) ?
                        <span className="text-white/40">/{(item.conditions?.windGust ?? item.weather?.windGust)?.toFixed(0)}</span> : null
                      } mph
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Selected hour details */}
          {selectedHour !== null && forecastData[selectedHour] && (
            <GlassCard className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Detailed Conditions</h3>
                  <p className="text-white/50 text-sm">
                    {new Date(forecastData[selectedHour].timestamp).toLocaleString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedHour(null)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Score</div>
                  <div className={`text-2xl font-bold ${getScoreColor(forecastData[selectedHour].score)}`}>
                    {forecastData[selectedHour].score?.toFixed(1)}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Temperature</div>
                  <div className="text-2xl font-light text-white">
                    {(forecastData[selectedHour].conditions?.apparentTemp ?? forecastData[selectedHour].weather?.apparentTemp)?.toFixed(0)}°F
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Wind</div>
                  <div className="text-2xl font-light text-white">
                    {(forecastData[selectedHour].conditions?.windSpeed ?? forecastData[selectedHour].weather?.windSpeed)?.toFixed(0)} mph
                  </div>
                  <div className="text-white/40 text-xs mt-1">
                    Gusts {(forecastData[selectedHour].conditions?.windGust ?? forecastData[selectedHour].weather?.windGust)?.toFixed(0) || '--'} mph
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Water Flow</div>
                  <div className="text-2xl font-light text-white">
                    {(forecastData[selectedHour].conditions?.discharge ?? forecastData[selectedHour].water?.discharge)?.toFixed(0)} cfs
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {dailyData.map((day, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {getScoreIcon(day.avgScore)}
                  <div>
                    <h3 className="text-lg font-medium text-white">{day.date}</h3>
                    <p className="text-white/50 text-sm">{day.hours.length} hours of data</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(day.avgScore)}`}>
                      {day.avgScore.toFixed(1)}
                    </div>
                    <p className="text-white/50 text-xs">{getScoreLabel(day.avgScore)}</p>
                  </div>
                  <div className="hidden sm:block">
                    <MiniChart
                      data={day.scoreData}
                      color={day.avgScore >= 8 ? '#6ee7b7' : day.avgScore >= 5 ? '#fcd34d' : '#fca5a5'}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs mb-1">Temperature</div>
                  <div className="text-white text-sm font-medium">
                    {day.maxTemp.toFixed(0)}° / {day.minTemp.toFixed(0)}°
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs mb-1">Avg Wind</div>
                  <div className="text-white text-sm font-medium">
                    {day.avgWind.toFixed(0)} mph
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs mb-1">Score Range</div>
                  <div className="text-white text-sm font-medium">
                    {day.minScore.toFixed(1)} - {day.maxScore.toFixed(1)}
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-white/50 text-xs mb-1">Peak Gusts</div>
                  <div className="text-white text-sm font-medium">
                    {day.maxGust.toFixed(0)} mph
                  </div>
                </div>
              </div>

              <div className="flex overflow-x-auto gap-1.5 pb-2 scrollbar-hide">
                {day.hours.map((hour: any, j: number) => {
                  const date = new Date(hour.timestamp);
                  return (
                    <div
                      key={j}
                      className="flex flex-col items-center min-w-[48px] p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/50 text-[10px] mb-0.5">
                        {date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                      </span>
                      <div className={`text-sm font-bold ${getScoreColor(hour.score)}`}>
                        {hour.score?.toFixed(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
