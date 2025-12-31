import { ForecastTimeline } from '../components/ForecastTimeline';
import { SafetyPulse } from '../components/SafetyPulse';
import type { ForecastPoint, WeatherObservation } from '../types/api';

interface ForecastSectionProps {
  timeline?: ForecastPoint[];
  alerts?: WeatherObservation['weatherAlerts'];
  visibility?: number;
  lightningPotential?: number;
}

export function ForecastSection({ timeline, alerts, visibility, lightningPotential }: ForecastSectionProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Next best windows</p>
        <ForecastTimeline data={timeline} />
      </div>
      <div className="lg:col-span-2">
        <SafetyPulse alerts={alerts} visibility={visibility} lightningPotential={lightningPotential} />
      </div>
    </div>
  );
}
