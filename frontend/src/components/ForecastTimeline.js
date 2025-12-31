import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatHourLabel } from '../utils/time';
export function ForecastTimeline(_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b;
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-3", children: data.slice(0, 9).map(function (point) {
            var _a, _b, _c, _d;
            return (_jsxs("div", { className: "glass-panel p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/50", children: formatHourLabel(point.timestamp) }), _jsx("p", { className: "mt-2 text-3xl font-semibold text-white", children: (_b = (_a = point.score) === null || _a === void 0 ? void 0 : _a.toFixed(1)) !== null && _b !== void 0 ? _b : '—' }), _jsx("p", { className: "text-xs text-white/50", children: "score" }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm text-white/70", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[0.65rem] uppercase tracking-[0.35em] text-white/40", children: "Wind" }), _jsx("p", { children: ((_c = point.conditions) === null || _c === void 0 ? void 0 : _c.windSpeed) ? "".concat(point.conditions.windSpeed, " mph") : '—' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[0.65rem] uppercase tracking-[0.35em] text-white/40", children: "Water" }), _jsx("p", { children: ((_d = point.conditions) === null || _d === void 0 ? void 0 : _d.waterTemp) ? "".concat(point.conditions.waterTemp, "\u00B0F") : '—' })] })] })] }, point.timestamp));
        }) }));
}
