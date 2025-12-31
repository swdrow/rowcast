import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ForecastTimeline } from '../components/ForecastTimeline';
import { SafetyPulse } from '../components/SafetyPulse';
export function ForecastSection(_a) {
    var timeline = _a.timeline, alerts = _a.alerts, visibility = _a.visibility, lightningPotential = _a.lightningPotential;
    return (_jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [_jsxs("div", { className: "lg:col-span-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "Next best windows" }), _jsx(ForecastTimeline, { data: timeline })] }), _jsx("div", { className: "lg:col-span-2", children: _jsx(SafetyPulse, { alerts: alerts, visibility: visibility, lightningPotential: lightningPotential }) })] }));
}
