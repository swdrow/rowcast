interface CommandBarProps {
  status: 'idle' | 'pending' | 'success' | 'error';
  lastUpdated?: string;
  onRefresh?: () => void;
}

const statusCopy: Record<CommandBarProps['status'], string> = {
  idle: 'Idle',
  pending: 'Refreshing data',
  success: 'Live data',
  error: 'Sync issue'
};

const statusColors: Record<CommandBarProps['status'], string> = {
  idle: 'bg-white/40',
  pending: 'bg-amber-300',
  success: 'bg-emerald-300',
  error: 'bg-rose-400'
};

function formatTimestamp(timestamp?: string) {
  if (!timestamp) return 'Awaiting data';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'Last update unknown';
  return date.toLocaleString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    weekday: 'short'
  });
}

export function CommandBar({ status, lastUpdated, onRefresh }: CommandBarProps) {
  return (
    <div className="glass-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${statusColors[status]}`} aria-hidden />
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">System status</p>
          <p className="font-semibold text-white">{statusCopy[status]}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Last sync</p>
          <p className="text-sm text-white/70">{formatTimestamp(lastUpdated)}</p>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 transition hover:border-white/60 hover:text-white"
          >
            Refresh now
          </button>
        )}
      </div>
    </div>
  );
}
