import type { WeatherAlert } from '../types/api';

interface SafetyPulseProps {
  alerts?: WeatherAlert[];
  visibility?: number;
  lightningPotential?: number;
}

export function SafetyPulse({ alerts = [], visibility, lightningPotential }: SafetyPulseProps) {
  const headline = alerts[0]?.type ?? 'No active alerts';
  const severity = alerts[0]?.severity ?? 'normal';
  const score = Math.max(0, 100 - (lightningPotential ?? 0) * 0.8 - (visibility && visibility < 1 ? 40 : 0));

  return (
    <div className="glass-panel p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-white/40">Safety pulse</p>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">{headline}</p>
          <p className="text-sm text-white/60">Severity: {severity}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-semibold text-white">{score.toFixed(0)}%</p>
          <p className="text-xs text-white/60">Readiness</p>
        </div>
      </div>
    </div>
  );
}
