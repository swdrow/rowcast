import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScoreOrb } from '../components/ScoreOrb';
import { ConditionChip } from '../components/ConditionChip';
import { SpotlightMetrics } from '../components/SpotlightMetrics';
var formatNumber = function (value, digits) {
    if (digits === void 0) { digits = 0; }
    return value === undefined || value === null ? '—' : value.toFixed(digits);
};
export function HeroSection(_a) {
    var score = _a.score, conditions = _a.conditions, water = _a.water;
    var metrics = [
        {
            id: 'wind',
            label: 'Wind window',
            primary: "".concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.windSpeed), " mph"),
            secondary: (conditions === null || conditions === void 0 ? void 0 : conditions.windDir) ? "".concat(conditions.windDir, " \u2022 Gusts ").concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.windGust), " mph") : undefined
        },
        {
            id: 'surface',
            label: 'Surface temp',
            primary: "".concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.currentTemp), " \u00B0F"),
            secondary: "Feels like ".concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.apparentTemp), " \u00B0F")
        },
        {
            id: 'water',
            label: 'River flow',
            primary: (water === null || water === void 0 ? void 0 : water.discharge) ? "".concat(Intl.NumberFormat().format(water.discharge), " cfs") : '—',
            secondary: (water === null || water === void 0 ? void 0 : water.gaugeHeight) ? "".concat(water.gaugeHeight.toFixed(2), " ft gauge") : undefined
        }
    ];
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [_jsxs("div", { className: "glass-panel p-8", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "Now" }), _jsx("h1", { className: "mt-4 text-4xl font-semibold text-white", children: "Liquid glass intelligence for every outing." }), _jsx("p", { className: "mt-4 text-base text-white/70", children: "Real-time synthesis of weather, water, and NOAA stageflow feeds to decide exactly when to launch." }), _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [_jsx(ConditionChip, { label: "Wind", value: "".concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.windSpeed), " mph") }), _jsx(ConditionChip, { label: "Gusts", value: "".concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.windGust), " mph") }), _jsx(ConditionChip, { label: "Feels like", value: "".concat(formatNumber(conditions === null || conditions === void 0 ? void 0 : conditions.apparentTemp), " \u00B0F") }), _jsx(ConditionChip, { label: "Water", value: "".concat(formatNumber(water === null || water === void 0 ? void 0 : water.waterTemp), " \u00B0F") })] })] }), _jsx("div", { className: "glass-panel flex items-center justify-center p-8", children: _jsx(ScoreOrb, { score: score }) })] }), _jsx(SpotlightMetrics, { metrics: metrics })] }));
}
