import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';
export var WeatherDisplay = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var _r = useQuery({
        queryKey: ['dashboard'],
        queryFn: function () { return apiClient.fetchCompleteDashboard(); },
        refetchInterval: 60000 // Refetch every minute
    }), data = _r.data, isLoading = _r.isLoading, error = _r.error;
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsx("div", { className: "animate-pulse text-white text-xl font-light", children: "Loading RowCast..." }) }));
    }
    if (error) {
        return (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsx("div", { className: "text-red-300", children: "Error loading data. Please try again." }) }));
    }
    if (!data)
        return null;
    var weather = data.weather, rowcast = data.rowcast;
    var currentScore = (_b = (_a = rowcast.current) === null || _a === void 0 ? void 0 : _a.score) !== null && _b !== void 0 ? _b : 0;
    var getScoreColor = function (score) {
        if (score >= 8)
            return 'text-emerald-300';
        if (score >= 5)
            return 'text-yellow-300';
        return 'text-red-300';
    };
    return (_jsxs("div", { className: "w-full max-w-7xl mx-auto p-6 space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs(GlassCard, { className: "flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20 opacity-50" }), _jsx("h2", { className: "text-2xl font-light text-white/80 mb-4 z-10", children: "RowCast Score" }), _jsx("div", { className: "text-9xl font-bold ".concat(getScoreColor(currentScore), " drop-shadow-glass z-10"), children: currentScore.toFixed(1) }), _jsx("p", { className: "text-white/60 mt-4 z-10", children: "Excellent Conditions" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(GlassCard, { className: "flex flex-col justify-between", children: [_jsx("span", { className: "text-white/60 text-sm", children: "Temperature" }), _jsxs("div", { className: "text-4xl font-light text-white", children: [(_d = (_c = weather.current) === null || _c === void 0 ? void 0 : _c.temp) === null || _d === void 0 ? void 0 : _d.toFixed(1), "\u00B0F"] }), _jsxs("span", { className: "text-white/40 text-xs", children: ["Feels like ", (_f = (_e = weather.current) === null || _e === void 0 ? void 0 : _e.feelsLike) === null || _f === void 0 ? void 0 : _f.toFixed(1), "\u00B0"] })] }), _jsxs(GlassCard, { className: "flex flex-col justify-between", children: [_jsx("span", { className: "text-white/60 text-sm", children: "Wind" }), _jsxs("div", { className: "text-4xl font-light text-white", children: [(_h = (_g = weather.current) === null || _g === void 0 ? void 0 : _g.windSpeed) === null || _h === void 0 ? void 0 : _h.toFixed(1), " ", _jsx("span", { className: "text-lg", children: "mph" })] }), _jsxs("span", { className: "text-white/40 text-xs", children: ["Gusts ", (_k = (_j = weather.current) === null || _j === void 0 ? void 0 : _j.windGust) === null || _k === void 0 ? void 0 : _k.toFixed(1), " mph"] })] }), _jsxs(GlassCard, { className: "flex flex-col justify-between", children: [_jsx("span", { className: "text-white/60 text-sm", children: "Water Flow" }), _jsxs("div", { className: "text-3xl font-light text-white", children: [(_m = (_l = data.water.current) === null || _l === void 0 ? void 0 : _l.discharge) === null || _m === void 0 ? void 0 : _m.toFixed(0), " ", _jsx("span", { className: "text-sm", children: "cfs" })] })] }), _jsxs(GlassCard, { className: "flex flex-col justify-between", children: [_jsx("span", { className: "text-white/60 text-sm", children: "Water Temp" }), _jsxs("div", { className: "text-3xl font-light text-white", children: [(_p = (_o = data.water.current) === null || _o === void 0 ? void 0 : _o.waterTemp) === null || _p === void 0 ? void 0 : _p.toFixed(1), "\u00B0F"] })] })] })] }), _jsxs(GlassCard, { className: "w-full p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h3", { className: "text-xl font-light text-white", children: "Hourly Forecast" }), _jsx(GlassButton, { size: "sm", variant: "secondary", children: "View Full Forecast" })] }), _jsx("div", { className: "flex overflow-x-auto gap-4 pb-4 scrollbar-hide", children: (_q = rowcast.forecast) === null || _q === void 0 ? void 0 : _q.slice(0, 12).map(function (item, i) { return (_jsxs("div", { className: "flex flex-col items-center min-w-[80px] gap-2", children: [_jsxs("span", { className: "text-white/60 text-xs", children: [new Date(item.timestamp).getHours(), ":00"] }), _jsx("div", { className: "text-lg font-bold ".concat(getScoreColor(item.score)), children: item.score.toFixed(1) }), _jsx("div", { className: "h-16 w-1 bg-white/10 rounded-full relative", children: _jsx("div", { className: "absolute bottom-0 w-full bg-white/40 rounded-full", style: { height: "".concat((item.score / 10) * 100, "%") } }) })] }, i)); }) })] })] }));
};
