import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SpotlightMetrics(_a) {
    var metrics = _a.metrics;
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-3", children: metrics.map(function (metric) { return (_jsxs("div", { className: "glass-panel p-5", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: metric.label }), _jsx("p", { className: "mt-3 text-4xl font-semibold text-white", children: metric.primary }), metric.secondary && _jsx("p", { className: "text-sm text-white/70", children: metric.secondary }), metric.trendLabel && _jsx("p", { className: "text-xs text-white/50", children: metric.trendLabel })] }, metric.id)); }) }));
}
