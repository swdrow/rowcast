interface ConditionChipProps {
  label: string;
  value?: string | number;
  icon?: React.ReactNode;
  emphasize?: boolean;
}

export function ConditionChip({ label, value = '—', icon, emphasize = false }: ConditionChipProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm ${
        emphasize ? 'border-white/50 text-white' : 'border-white/20 text-white/70'
      }`}
    >
      {icon && <span className="text-lg text-white/70">{icon}</span>}
      <div className="flex flex-col leading-tight">
        <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/45">{label}</span>
        <span className="font-semibold tracking-tight text-white">{value}</span>
      </div>
    </div>
  );
}
