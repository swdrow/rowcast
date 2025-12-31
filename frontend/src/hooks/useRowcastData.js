var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';
export var useRowcastData = function () {
    var query = useQuery({
        queryKey: ['dashboard', 'complete'],
        queryFn: function () { return apiClient.fetchCompleteDashboard(); },
        refetchInterval: 1000 * 60 * 5
    });
    var derived = useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (!query.data)
            return {};
        var _k = query.data, weather = _k.weather, water = _k.water, rowcast = _k.rowcast;
        return {
            data: query.data,
            latestScore: (_b = (_a = rowcast === null || rowcast === void 0 ? void 0 : rowcast.current) === null || _a === void 0 ? void 0 : _a.score) !== null && _b !== void 0 ? _b : (_d = (_c = rowcast === null || rowcast === void 0 ? void 0 : rowcast.forecast) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.score,
            heroConditions: (_e = weather === null || weather === void 0 ? void 0 : weather.current) !== null && _e !== void 0 ? _e : (_f = weather === null || weather === void 0 ? void 0 : weather.forecast) === null || _f === void 0 ? void 0 : _f[0],
            waterNow: water === null || water === void 0 ? void 0 : water.current,
            shortTerm: (_g = rowcast === null || rowcast === void 0 ? void 0 : rowcast.shortTerm) !== null && _g !== void 0 ? _g : (_h = rowcast === null || rowcast === void 0 ? void 0 : rowcast.forecast) === null || _h === void 0 ? void 0 : _h.slice(0, 12),
            trend: (_j = rowcast === null || rowcast === void 0 ? void 0 : rowcast.forecast) !== null && _j !== void 0 ? _j : []
        };
    }, [query.data]);
    return __assign(__assign({}, query), { derived: derived });
};
