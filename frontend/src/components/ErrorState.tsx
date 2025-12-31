interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-base font-medium text-white/90">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-white/30 px-5 py-2 text-sm uppercase tracking-[0.35em] text-white/70 transition hover:border-white/70 hover:text-white"
        >
          Refresh data
        </button>
      )}
    </div>
  );
}
