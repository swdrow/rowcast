import type { ForecastPoint } from '../types/api';
import { formatHourLabel } from '../utils/time';

interface ForecastTimelineProps {
  data?: ForecastPoint[];
}

export function ForecastTimeline({ data = [] }: ForecastTimelineProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.slice(0, 9).map(point => (
        <div key={point.timestamp} className="glass-panel p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">{formatHourLabel(point.timestamp)}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{point.score?.toFixed(1) ?? '—'}</p>
          <p className="text-xs text-white/50">score</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/70">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/40">Wind</p>
              <p>{point.conditions?.windSpeed ? `${point.conditions.windSpeed} mph` : '—'}</p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/40">Water</p>
              <p>{point.conditions?.waterTemp ? `${point.conditions.waterTemp}°F` : '—'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
