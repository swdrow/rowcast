import { ScoreOrb } from '../components/ScoreOrb';
import { ConditionChip } from '../components/ConditionChip';
import { SpotlightMetrics } from '../components/SpotlightMetrics';
import type { WeatherObservation, WaterSnapshot } from '../types/api';

interface HeroSectionProps {
  score?: number;
  conditions?: WeatherObservation;
  water?: WaterSnapshot;
}

const formatNumber = (value?: number, digits = 0) =>
  value === undefined || value === null ? '—' : value.toFixed(digits);

export function HeroSection({ score, conditions, water }: HeroSectionProps) {
  const metrics = [
    {
      id: 'wind',
      label: 'Wind window',
      primary: `${formatNumber(conditions?.windSpeed)} mph`,
      secondary: conditions?.windDir ? `${conditions.windDir} • Gusts ${formatNumber(conditions?.windGust)} mph` : undefined
    },
    {
      id: 'surface',
      label: 'Surface temp',
      primary: `${formatNumber(conditions?.currentTemp)} °F`,
      secondary: `Feels like ${formatNumber(conditions?.apparentTemp)} °F`
    },
    {
      id: 'water',
      label: 'River flow',
      primary: water?.discharge ? `${Intl.NumberFormat().format(water.discharge)} cfs` : '—',
      secondary: water?.gaugeHeight ? `${water.gaugeHeight.toFixed(2)} ft gauge` : undefined
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass-panel p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Now</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Liquid glass intelligence for every outing.</h1>
          <p className="mt-4 text-base text-white/70">
            Real-time synthesis of weather, water, and NOAA stageflow feeds to decide exactly when to launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ConditionChip label="Wind" value={`${formatNumber(conditions?.windSpeed)} mph`} />
            <ConditionChip label="Gusts" value={`${formatNumber(conditions?.windGust)} mph`} />
            <ConditionChip label="Feels like" value={`${formatNumber(conditions?.apparentTemp)} °F`} />
            <ConditionChip label="Water" value={`${formatNumber(water?.waterTemp)} °F`} />
          </div>
        </div>
        <div className="glass-panel flex items-center justify-center p-8">
          <ScoreOrb score={score} />
        </div>
      </div>
      <SpotlightMetrics metrics={metrics} />
    </div>
  );
}
