export function LoadingState() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white/80" />
      <p className="text-sm uppercase tracking-[0.35em] text-white/60">Hydrating dashboard</p>
    </div>
  );
}
