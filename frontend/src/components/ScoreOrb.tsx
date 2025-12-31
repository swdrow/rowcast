import { motion } from 'framer-motion';

interface ScoreOrbProps {
  score?: number;
  label?: string;
}

export function ScoreOrb({ score = 0, label = 'RowCast Score' }: ScoreOrbProps) {
  const normalized = Math.max(0, Math.min(10, score));
  const hue = (normalized / 10) * 120;

  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.div
        className="glow-ring flex h-48 w-48 items-center justify-center rounded-full"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
        animate={{
          boxShadow: [`0 0 40px rgba(75, 201, 255, 0.35)`, `0 0 80px rgba(122,92,255,0.25)`]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      >
        <motion.div
          className="flex h-40 w-40 flex-col items-center justify-center rounded-full text-center"
          style={{
            background: `conic-gradient(from 90deg, hsl(${hue}, 85%, 60%), rgba(255,255,255,0.08))`
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-5xl font-semibold tracking-tight">{normalized.toFixed(1)}</span>
          <span className="text-xs uppercase tracking-[0.4em] text-white/70">/ 10</span>
        </motion.div>
      </motion.div>
      <p className="text-sm uppercase tracking-[0.35em] text-white/60">{label}</p>
    </div>
  );
}
