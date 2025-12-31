interface EndpointCardProps {
  method: 'GET' | 'POST';
  path: string;
  description: string;
}

const endpoints: EndpointCardProps[] = [
  { method: 'GET', path: '/api/rowcast', description: 'Current RowCast score and parameters' },
  { method: 'GET', path: '/api/complete/extended', description: 'Full dataset for dashboard consumption' },
  { method: 'GET', path: '/api/water/predictions', description: 'Dynamic water projections and NOAA blend' }
];

export function ApiDocsPreview() {
  return (
    <div className="flex flex-col gap-4">
      {endpoints.map(endpoint => (
        <div key={endpoint.path} className="glass-panel p-4">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
              {endpoint.method}
            </span>
            <code className="text-sm text-white/70">{endpoint.path}</code>
          </div>
          <p className="mt-3 text-sm text-white/70">{endpoint.description}</p>
        </div>
      ))}
    </div>
  );
}
