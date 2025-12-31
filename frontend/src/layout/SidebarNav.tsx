const navItems = [
  { id: 'overview', label: 'Overview', description: 'Score & safety' },
  { id: 'forecast', label: 'Forecast', description: 'Timeline & alerts' },
  { id: 'water', label: 'Water', description: 'Stageflow & trends' },
  { id: 'api', label: 'API', description: 'Developer access' }
];

export function SidebarNav() {
  return (
    <nav aria-label="Primary" className="sticky top-10 flex flex-col gap-3">
      {navItems.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:border-white/40 hover:bg-white/10"
        >
          <p className="font-semibold tracking-wide text-white group-hover:text-white">{item.label}</p>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{item.description}</p>
        </a>
      ))}
    </nav>
  );
}
