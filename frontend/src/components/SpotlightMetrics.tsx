interface SpotlightMetric {
  id: string;
  label: string;
  primary: string;
  secondary?: string;
  trendLabel?: string;
}

interface SpotlightMetricsProps {
  metrics: SpotlightMetric[];
}

export function SpotlightMetrics({ metrics }: SpotlightMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map(metric => (
        <div key={metric.id} className="glass-panel p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{metric.label}</p>
          <p className="mt-3 text-4xl font-semibold text-white">{metric.primary}</p>
          {metric.secondary && <p className="text-sm text-white/70">{metric.secondary}</p>}
          {metric.trendLabel && <p className="text-xs text-white/50">{metric.trendLabel}</p>}
        </div>
      ))}
    </div>
  );
}
