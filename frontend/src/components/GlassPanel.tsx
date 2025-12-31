import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type PaddingSize = 'none' | 'sm' | 'md' | 'lg';

interface GlassPanelProps {
  className?: string;
  padding?: PaddingSize;
}

const paddingMap: Record<PaddingSize, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export function GlassPanel({ children, className, padding = 'md' }: PropsWithChildren<GlassPanelProps>) {
  const pad: PaddingSize = padding ?? 'md';
  return <section className={clsx('glass-panel', paddingMap[pad], className)}>{children}</section>;
}
