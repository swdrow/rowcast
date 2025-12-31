import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var metricMap = [
    { key: 'discharge', label: 'Discharge', unit: 'cfs' },
    { key: 'gaugeHeight', label: 'Height', unit: 'ft' },
    { key: 'waterTemp', label: 'Water Temp', unit: '°F' }
];
export function WaterInsightGrid(_a) {
    var current = _a.current, history = _a.history;
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-3", children: metricMap.map(function (metric) {
            var _a, _b, _c;
            var trend = (_b = (_a = history === null || history === void 0 ? void 0 : history[metric.key]) === null || _a === void 0 ? void 0 : _a.slice(-6).map(function (point) { return point.value; })) !== null && _b !== void 0 ? _b : [];
            var direction = trend.length > 1 ? trend[trend.length - 1] - trend[0] : 0;
            return (_jsxs("div", { className: "glass-panel p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: metric.label }), _jsx("p", { className: "mt-2 text-3xl font-semibold text-white", children: (current === null || current === void 0 ? void 0 : current[metric.key]) ? "".concat((_c = current[metric.key]) === null || _c === void 0 ? void 0 : _c.toFixed(2), " ").concat(metric.unit) : '—' }), _jsx("p", { className: "text-xs text-white/50", children: direction > 0 ? 'Rising' : direction < 0 ? 'Falling' : 'Stable' })] }, metric.key));
        }) }));
}
