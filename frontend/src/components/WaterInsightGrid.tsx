import type { WaterSnapshot, WaterHistory } from '../types/api';

interface Props {
  current?: WaterSnapshot | null;
  history?: WaterHistory;
}

const metricMap = [
  { key: 'discharge', label: 'Discharge', unit: 'cfs' },
  { key: 'gaugeHeight', label: 'Height', unit: 'ft' },
  { key: 'waterTemp', label: 'Water Temp', unit: '°F' }
] as const;

export function WaterInsightGrid({ current, history }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metricMap.map(metric => {
        const trend = history?.[metric.key]?.slice(-6).map(point => point.value) ?? [];
        const direction = trend.length > 1 ? trend[trend.length - 1] - trend[0] : 0;
        return (
          <div key={metric.key} className="glass-panel p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {current?.[metric.key] ? `${current[metric.key]?.toFixed(2)} ${metric.unit}` : '—'}
            </p>
            <p className="text-xs text-white/50">{direction > 0 ? 'Rising' : direction < 0 ? 'Falling' : 'Stable'}</p>
          </div>
        );
      })}
    </div>
  );
}
