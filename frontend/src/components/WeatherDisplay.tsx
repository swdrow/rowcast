import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/apiClient';
import { DashboardData } from '../types/weather';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';

// Skeleton loading component
const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <GlassCard className={`animate-pulse ${className}`}>
    <div className="h-4 w-24 bg-white/10 rounded mb-3" />
    <div className="h-8 w-32 bg-white/10 rounded mb-2" />
    <div className="h-3 w-20 bg-white/10 rounded" />
  </GlassCard>
);

export const WeatherDisplay: React.FC = () => {
  const navigate = useNavigate();
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
    if (score >= 8) return 'from-emerald-500/20 to-emerald-600/20';
    if (score >= 5) return 'from-yellow-500/20 to-yellow-600/20';
    return 'from-red-500/20 to-red-600/20';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 9) return { label: 'Perfect', desc: 'Ideal rowing conditions' };
    if (score >= 8) return { label: 'Excellent', desc: 'Great conditions for rowing' };
    if (score >= 7) return { label: 'Good', desc: 'Favorable conditions' };
    if (score >= 5) return { label: 'Fair', desc: 'Acceptable with some considerations' };
    if (score >= 3) return { label: 'Poor', desc: 'Challenging conditions' };
    return { label: 'Unsafe', desc: 'Not recommended for rowing' };
  };

  const getWindDirectionName = (dir: string | number | undefined) => {
    if (!dir) return 'N/A';
    const degrees = typeof dir === 'string' ? parseInt(dir.match(/\d+/)?.[0] || '0') : dir;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="flex flex-col items-center justify-center min-h-[300px] animate-pulse">
            <div className="h-6 w-32 bg-white/10 rounded mb-4" />
            <div className="h-24 w-48 bg-white/10 rounded mb-4" />
            <div className="h-4 w-40 bg-white/10 rounded" />
          </GlassCard>
          <div className="grid grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
        <GlassCard className="w-full p-8 animate-pulse">
          <div className="h-6 w-40 bg-white/10 rounded mb-6" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center min-w-[80px] gap-2">
                <div className="h-3 w-12 bg-white/10 rounded" />
                <div className="h-6 w-10 bg-white/10 rounded" />
                <div className="h-16 w-1 bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <GlassCard className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Unable to Load Data</h3>
          <p className="text-white/60 mb-4 max-w-md">
            We couldn't fetch the latest rowing conditions. This may be due to a network issue or server maintenance.
          </p>
          <GlassButton onClick={() => refetch()}>
            Try Again
          </GlassButton>
        </GlassCard>
      </div>
    );
  }

  if (!data) return null;

  const { weather, rowcast, water } = data;
  const currentScore = rowcast.current?.score ?? 0;
  const scoreInfo = getScoreDescription(currentScore);
  const penalties = rowcast.current?.penalties || [];
  const alerts = weather.alerts || [];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Weather Alerts Banner */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert: any, i: number) => (
            <GlassCard
              key={i}
              className={`!p-4 border-l-4 ${
                alert.severity === 'Extreme' || alert.severity === 'Severe'
                  ? 'border-l-red-500 bg-red-500/10'
                  : alert.severity === 'Moderate'
                  ? 'border-l-yellow-500 bg-yellow-500/10'
                  : 'border-l-blue-500 bg-blue-500/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="font-medium text-white text-sm">{alert.event || alert.headline}</h4>
                  {alert.description && (
                    <p className="text-white/60 text-xs mt-1 line-clamp-2">{alert.description}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card - Enhanced with more color */}
        <GlassCard className="flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden lg:col-span-1">
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getScoreBg(currentScore)}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Glow effect */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-40 ${
            currentScore >= 8 ? 'bg-emerald-500' : currentScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'
          }`} />

          <div className="relative z-10 text-center">
            <h2 className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em] mb-4">RowCast Score</h2>
            <div className={`text-7xl font-bold ${getScoreColor(currentScore)} mb-1`} style={{ textShadow: '0 0 40px currentColor' }}>
              {currentScore.toFixed(1)}
            </div>
            <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              currentScore >= 8 ? 'bg-emerald-500/30 text-emerald-200' :
              currentScore >= 5 ? 'bg-yellow-500/30 text-yellow-200' :
              'bg-red-500/30 text-red-200'
            }`}>
              {scoreInfo.label}
            </div>
            <p className="text-white/50 text-xs mt-3 max-w-[200px]">{scoreInfo.desc}</p>
          </div>
        </GlassCard>

        {/* Conditions Grid - With colored accents */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {/* Temperature */}
          <GlassCard className="flex flex-col justify-between min-h-[120px] relative overflow-hidden group hover:bg-white/15 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500" />
            <span className="text-white/60 text-xs uppercase tracking-wider ml-3">Temperature</span>
            <div className="text-4xl font-light text-white ml-3">
              {weather.current?.currentTemp != null && weather.current.currentTemp !== 0
                ? `${Math.round(weather.current.currentTemp)}°`
                : weather.current?.apparentTemp != null
                ? `${Math.round(weather.current.apparentTemp)}°`
                : '--°'}
              <span className="text-lg text-white/60">F</span>
            </div>
            <span className="text-white/40 text-xs ml-3">
              Feels like {weather.current?.apparentTemp != null ? `${Math.round(weather.current.apparentTemp)}°` : '--°'}
            </span>
          </GlassCard>

          {/* Wind */}
          <GlassCard className="flex flex-col justify-between min-h-[120px] relative overflow-hidden group hover:bg-white/15 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500" />
            <span className="text-white/60 text-xs uppercase tracking-wider ml-3">Wind</span>
            <div className="text-4xl font-light text-white ml-3">
              {weather.current?.windSpeed?.toFixed(0) || '--'} <span className="text-lg text-white/60">mph</span>
            </div>
            <span className="text-white/40 text-xs ml-3">
              {getWindDirectionName(weather.current?.windDir)} · Gusts {weather.current?.windGust?.toFixed(0) || '--'}
            </span>
          </GlassCard>

          {/* Water Flow */}
          <GlassCard className="flex flex-col justify-between min-h-[120px] relative overflow-hidden group hover:bg-white/15 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500" />
            <span className="text-white/60 text-xs uppercase tracking-wider ml-3">Water Flow</span>
            <div className="text-4xl font-light text-white ml-3">
              {water.current?.discharge?.toFixed(0) || '--'} <span className="text-lg text-white/60">cfs</span>
            </div>
            <span className="text-white/40 text-xs ml-3">
              Gauge {water.current?.gaugeHeight?.toFixed(2) || '--'} ft
            </span>
          </GlassCard>

          {/* Water Temp */}
          <GlassCard className="flex flex-col justify-between min-h-[120px] relative overflow-hidden group hover:bg-white/15 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-emerald-500" />
            <span className="text-white/60 text-xs uppercase tracking-wider ml-3">Water Temp</span>
            <div className="text-4xl font-light text-white ml-3">
              {water.current?.waterTemp?.toFixed(0) || '--'}°<span className="text-lg text-white/60">F</span>
            </div>
            <span className="text-white/40 text-xs ml-3">
              Combined: {((weather.current?.currentTemp || weather.current?.apparentTemp || 0) + (water.current?.waterTemp || 0)).toFixed(0)}°
            </span>
          </GlassCard>
        </div>
      </div>

      {/* Penalties Section */}
      {penalties.length > 0 && (
        <GlassCard className="!p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-medium text-white/80">Score Factors</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {penalties.map((penalty: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/80 text-xs"
              >
                {penalty}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Forecast Section */}
      <GlassCard className="w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-light text-white">Hourly Forecast</h3>
            <p className="text-white/50 text-sm mt-1">Next 12 hours</p>
          </div>
          <GlassButton size="sm" variant="secondary" onClick={() => navigate('/forecast')}>
            View Full Forecast
          </GlassButton>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {rowcast.forecast?.slice(0, 12).map((item: any, i: number) => {
            const date = new Date(item.timestamp);
            const isNow = i === 0;
            return (
              <div
                key={i}
                className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl transition-all ${
                  isNow ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'
                }`}
              >
                <span className="text-white/60 text-xs mb-1">
                  {isNow ? 'Now' : date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                </span>
                <div className={`text-xl font-bold ${getScoreColor(item.score)} mb-2`}>
                  {item.score.toFixed(1)}
                </div>
                <div className="h-16 w-1.5 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full rounded-full transition-all ${
                      item.score >= 8 ? 'bg-emerald-400/60' :
                      item.score >= 5 ? 'bg-yellow-400/60' : 'bg-red-400/60'
                    }`}
                    style={{ height: `${(item.score / 10) * 100}%` }}
                  />
                </div>
                <span className="text-white/40 text-xs mt-2">
                  {item.weather?.apparentTemp?.toFixed(0) || '--'}°
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Last Updated */}
      <div className="text-center text-white/30 text-xs">
        Data updated {data.metadata?.lastUpdated
          ? new Date(data.metadata.lastUpdated).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          : 'recently'}
      </div>
    </div>
  );
};
