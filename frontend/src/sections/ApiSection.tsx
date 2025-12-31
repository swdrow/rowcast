import { ApiDocsPreview } from '../components/ApiDocsPreview';
import { GlassPanel } from '../components/GlassPanel';

export function ApiSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassPanel>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Developers</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Instrument the river in code.</h2>
        <p className="mt-3 text-base text-white/70">
          Consume the same feed powering the dashboard. Documented responses, NOAA aware endpoints, and transparent
          scoring allow experimentation in your notebooks or fleet monitors.
        </p>
      </GlassPanel>
      <ApiDocsPreview />
    </div>
  );
}
