import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WaterInsightGrid } from '../components/WaterInsightGrid';
import { GlassPanel } from '../components/GlassPanel';
export function InsightsSection(_a) {
    var water = _a.water, history = _a.history;
    return (_jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "Water insights" }), _jsx(WaterInsightGrid, { current: water, history: history })] }), _jsxs(GlassPanel, { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "NOAA stageflow" }), _jsx("p", { className: "mt-4 text-base text-white/70", children: "Advanced stageflow modeling blends observed discharge with NOAA forecasts to project the next 7 days of rowability and caution windows." })] })] }));
}
