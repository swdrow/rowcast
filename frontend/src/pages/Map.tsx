import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';
import { DashboardData } from '../types/weather';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';

type InfoPanel = 'conditions' | 'safety' | 'forecast';

export const Map: React.FC = () => {
  const [activePanel, setActivePanel] = useState<InfoPanel>('conditions');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.fetchCompleteDashboard<DashboardData>(),
    refetchInterval: 60000
  });

  const currentScore = data?.rowcast.current?.score ?? 0;
  const currentWeather = data?.weather.current;
  const currentWater = data?.water.current;
  const forecast = data?.rowcast.forecast || [];
  const penalties = data?.rowcast.current?.penalties || [];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-300';
    if (score >= 5) return 'text-yellow-300';
    return 'text-red-300';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'from-emerald-500/30 to-emerald-600/30';
    if (score >= 5) return 'from-yellow-500/30 to-yellow-600/30';
    return 'from-red-500/30 to-red-600/30';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  const getWindDirectionName = (dir: string | number | undefined) => {
    if (!dir) return 'N/A';
    const degrees = typeof dir === 'string' ? parseInt(dir.match(/\d+/)?.[0] || '0') : dir;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getWindArrowRotation = () => {
    if (!currentWeather?.windDir) return 0;
    const windDir = typeof currentWeather.windDir === 'string'
      ? parseInt(currentWeather.windDir.match(/\d+/)?.[0] || '0')
      : currentWeather.windDir;
    return windDir;
  };

  // Calculate flow status
  const getFlowStatus = (discharge: number | undefined) => {
    if (!discharge) return { label: 'Unknown', color: 'text-white/60' };
    if (discharge < 300) return { label: 'Very Low', color: 'text-red-300' };
    if (discharge < 500) return { label: 'Low', color: 'text-yellow-300' };
    if (discharge < 2000) return { label: 'Ideal', color: 'text-emerald-300' };
    if (discharge < 4000) return { label: 'High', color: 'text-yellow-300' };
    return { label: 'Dangerous', color: 'text-red-300' };
  };

  const flowStatus = getFlowStatus(currentWater?.discharge);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-64 bg-white/10 rounded mt-2 animate-pulse" />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-[600px] bg-white/5 rounded-2xl animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-48 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <header>
          <h2 className="text-3xl font-light tracking-tight text-white/90">Live Map</h2>
          <p className="text-white/50 mt-1">Real-time conditions on the Schuylkill River</p>
        </header>
        <GlassCard className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Unable to Load Map Data</h3>
          <p className="text-white/60 mb-4">Please check your connection and try again.</p>
          <GlassButton onClick={() => refetch()}>Try Again</GlassButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-light tracking-tight text-white/90">Live Map</h2>
        <p className="text-white/50 mt-1">Real-time conditions on the Schuylkill River</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map Area */}
        <div className="lg:col-span-2">
          <GlassCard className="relative h-[600px] overflow-hidden">
            {/* Map Background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/40"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.08) 50%, transparent 52%),
                  linear-gradient(-45deg, transparent 48%, rgba(59, 130, 246, 0.08) 50%, transparent 52%)
                `,
                backgroundSize: '100% 100%, 20px 20px, 20px 20px'
              }}
            />

            {/* River Path Visualization - Schuylkill River */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                {/* Definitions for gradients and filters */}
                <defs>
                  <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                    <stop offset="50%" stopColor="rgba(96, 165, 250, 0.5)" />
                    <stop offset="100%" stopColor="rgba(147, 197, 253, 0.4)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* River banks/shores */}
                <path
                  d="M 80 60 C 150 100, 200 180, 280 260 S 380 380, 450 450 C 500 500, 580 540, 720 580"
                  stroke="rgba(34, 197, 94, 0.15)"
                  strokeWidth="120"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Outer glow */}
                <path
                  d="M 100 70 C 160 110, 210 190, 290 270 S 390 390, 460 460 C 510 510, 590 550, 700 590"
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="80"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                />

                {/* Main river body */}
                <path
                  d="M 100 70 C 160 110, 210 190, 290 270 S 390 390, 460 460 C 510 510, 590 550, 700 590"
                  stroke="url(#riverGradient)"
                  strokeWidth="45"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* River center highlight */}
                <path
                  d="M 100 70 C 160 110, 210 190, 290 270 S 390 390, 460 460 C 510 510, 590 550, 700 590"
                  stroke="rgba(191, 219, 254, 0.5)"
                  strokeWidth="15"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Animated flow lines */}
                <g className="opacity-60">
                  <path
                    d="M 130 95 C 175 125, 215 185, 280 250"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 12"
                    className="animate-pulse"
                  />
                  <path
                    d="M 320 300 S 400 400, 450 450"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 12"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <path
                    d="M 480 480 C 520 520, 580 550, 670 580"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 12"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </g>

                {/* Location markers */}
                {/* Manayunk */}
                <circle cx="180" cy="150" r="4" fill="rgba(255,255,255,0.4)" />
                <text x="190" y="145" fill="rgba(255,255,255,0.4)" fontSize="10">Manayunk</text>

                {/* East Falls */}
                <circle cx="260" cy="240" r="4" fill="rgba(255,255,255,0.4)" />
                <text x="270" y="235" fill="rgba(255,255,255,0.4)" fontSize="10">East Falls</text>

                {/* Boathouse Row - Main area */}
                <circle cx="400" cy="380" r="6" fill="rgba(96, 165, 250, 0.8)" />
                <text x="415" y="375" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="500">Boathouse Row</text>

                {/* Direction indicator */}
                <g transform="translate(620, 520)">
                  <text fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">
                    <tspan x="0" dy="0">Flow</tspan>
                    <tspan x="0" dy="12">Direction</tspan>
                  </text>
                  <path d="M 0 30 L 5 40 L 0 38 L -5 40 Z" fill="rgba(255,255,255,0.4)" />
                </g>
              </svg>
            </div>

            {/* USGS Gauge Station Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative group cursor-pointer">
                {/* Pulsing ring */}
                <div className={`absolute -inset-6 bg-gradient-to-r ${getScoreBg(currentScore)} rounded-full blur-xl opacity-60 animate-pulse`} />

                {/* Main marker */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-glass hover:bg-white/15 transition-all">
                  <div className="text-center">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">USGS 01474500</div>
                    <div className={`text-4xl font-bold ${getScoreColor(currentScore)} mb-1`}>
                      {currentScore.toFixed(1)}
                    </div>
                    <div className={`text-xs font-medium ${getScoreColor(currentScore)}`}>
                      {getScoreLabel(currentScore)}
                    </div>
                  </div>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:block">
                  <div className="glass rounded-xl p-3 whitespace-nowrap text-xs">
                    <div className="font-medium text-white mb-1">Schuylkill at Philadelphia</div>
                    <div className="text-white/60">Click for details</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wind Direction Indicator */}
            <div className="absolute top-6 right-6">
              <div className="glass rounded-2xl p-4 text-center min-w-[100px]">
                <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Wind</div>
                <div className="relative w-12 h-12 mx-auto mb-2">
                  {/* Compass ring */}
                  <div className="absolute inset-0 rounded-full border border-white/20" />
                  {/* Direction arrow */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
                    style={{ transform: `rotate(${getWindArrowRotation()}deg)` }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L8 10h8L12 2zM12 22v-8" />
                    </svg>
                  </div>
                </div>
                <div className="text-white font-medium text-lg">
                  {currentWeather?.windSpeed?.toFixed(0)} mph
                </div>
                <div className="text-white/50 text-xs">
                  {getWindDirectionName(currentWeather?.windDir)}
                </div>
              </div>
            </div>

            {/* Flow Indicator */}
            <div className="absolute bottom-6 left-6">
              <div className="glass rounded-2xl p-4 text-center min-w-[100px]">
                <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Flow</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="text-white font-medium text-lg">
                  {currentWater?.discharge?.toFixed(0)} cfs
                </div>
                <div className={`text-xs ${flowStatus.color}`}>
                  {flowStatus.label}
                </div>
              </div>
            </div>

            {/* Temperature Badge */}
            <div className="absolute top-6 left-6">
              <div className="glass rounded-2xl p-4 text-center min-w-[100px]">
                <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Temp</div>
                <div className="text-white font-medium text-lg">
                  {currentWeather?.currentTemp?.toFixed(0)}°F
                </div>
                <div className="text-white/50 text-xs">
                  Water: {currentWater?.waterTemp?.toFixed(0)}°F
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 right-6">
              <div className="glass rounded-xl p-3 text-xs">
                <div className="font-medium text-white/70 mb-2">River Info</div>
                <div className="space-y-1 text-white/50">
                  <div>Bearing: NW to SE</div>
                  <div>Length: ~128 mi</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Info Panels */}
        <div className="space-y-4">
          {/* Panel Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setActivePanel('conditions')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                activePanel === 'conditions'
                  ? 'bg-white/15 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Conditions
            </button>
            <button
              onClick={() => setActivePanel('safety')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                activePanel === 'safety'
                  ? 'bg-white/15 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Safety
            </button>
            <button
              onClick={() => setActivePanel('forecast')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                activePanel === 'forecast'
                  ? 'bg-white/15 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Forecast
            </button>
          </div>

          {/* Conditions Panel */}
          {activePanel === 'conditions' && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Current Conditions</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/60 text-sm">Air Temperature</span>
                  <span className="text-white font-medium">
                    {currentWeather?.currentTemp?.toFixed(1)}°F
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/60 text-sm">Feels Like</span>
                  <span className="text-white font-medium">
                    {currentWeather?.apparentTemp?.toFixed(1)}°F
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/60 text-sm">Water Temp</span>
                  <span className="text-white font-medium">
                    {currentWater?.waterTemp?.toFixed(1)}°F
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/60 text-sm">Visibility</span>
                  <span className="text-white font-medium">
                    {((currentWeather?.visibility || 0) / 1609).toFixed(1)} mi
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/60 text-sm">Gauge Height</span>
                  <span className="text-white font-medium">
                    {currentWater?.gaugeHeight?.toFixed(2)} ft
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/60 text-sm">UV Index</span>
                  <span className="text-white font-medium">
                    {currentWeather?.uvIndex ?? 'N/A'}
                  </span>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Safety Panel */}
          {activePanel === 'safety' && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Safety Status</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${getScoreBg(currentScore)} border border-white/10`}>
                  <div className="text-sm text-white/70 mb-1">Overall Assessment</div>
                  <div className={`text-2xl font-bold ${getScoreColor(currentScore)}`}>
                    {getScoreLabel(currentScore)} Conditions
                  </div>
                </div>

                {penalties.length > 0 ? (
                  <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-200">Active Factors</span>
                    </div>
                    <div className="space-y-1">
                      {penalties.map((penalty: string, i: number) => (
                        <div key={i} className="text-xs text-yellow-300/80 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-yellow-400" />
                          {penalty}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-emerald-300">No active warnings</span>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-white/50 mb-2">Safety Tips</div>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Check weather updates before rowing</li>
                    <li>• Wear appropriate safety gear</li>
                    <li>• Monitor water conditions</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Forecast Panel */}
          {activePanel === 'forecast' && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Next 6 Hours</h3>
              <div className="space-y-2">
                {forecast.slice(0, 6).map((item: any, i: number) => {
                  const date = new Date(item.timestamp);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/60 text-sm">
                        {i === 0 ? 'Now' : date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-xs">
                          {item.weather?.apparentTemp?.toFixed(0)}°
                        </span>
                        <span className={`font-bold ${getScoreColor(item.score)}`}>
                          {item.score?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          )}

          {/* Quick Stats */}
          <GlassCard className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {currentWeather?.windSpeed?.toFixed(0)}
                </div>
                <div className="text-xs text-white/50">Wind (mph)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {currentWater?.discharge?.toFixed(0)}
                </div>
                <div className="text-xs text-white/50">Flow (cfs)</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
