import { WaterInsightGrid } from '../components/WaterInsightGrid';
import { GlassPanel } from '../components/GlassPanel';
import type { WaterSnapshot, WaterHistory } from '../types/api';

interface InsightsSectionProps {
  water?: WaterSnapshot | null;
  history?: WaterHistory;
}

export function InsightsSection({ water, history }: InsightsSectionProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Water insights</p>
        <WaterInsightGrid current={water} history={history} />
      </div>
      <GlassPanel>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">NOAA stageflow</p>
        <p className="mt-4 text-base text-white/70">
          Advanced stageflow modeling blends observed discharge with NOAA forecasts to project the next 7 days of
          rowability and caution windows.
        </p>
      </GlassPanel>
    </div>
  );
}
