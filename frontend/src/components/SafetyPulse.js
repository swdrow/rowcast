import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SafetyPulse(_a) {
    var _b, _c, _d, _e;
    var _f = _a.alerts, alerts = _f === void 0 ? [] : _f, visibility = _a.visibility, lightningPotential = _a.lightningPotential;
    var headline = (_c = (_b = alerts[0]) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : 'No active alerts';
    var severity = (_e = (_d = alerts[0]) === null || _d === void 0 ? void 0 : _d.severity) !== null && _e !== void 0 ? _e : 'normal';
    var score = Math.max(0, 100 - (lightningPotential !== null && lightningPotential !== void 0 ? lightningPotential : 0) * 0.8 - (visibility && visibility < 1 ? 40 : 0));
    return (_jsxs("div", { className: "glass-panel p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "Safety pulse" }), _jsxs("div", { className: "mt-2 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-semibold text-white", children: headline }), _jsxs("p", { className: "text-sm text-white/60", children: ["Severity: ", severity] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-4xl font-semibold text-white", children: [score.toFixed(0), "%"] }), _jsx("p", { className: "text-xs text-white/60", children: "Readiness" })] })] })] }));
}
