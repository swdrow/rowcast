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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../utils/cn';
export var GlassInput = function (_a) {
    var className = _a.className, label = _a.label, error = _a.error, props = __rest(_a, ["className", "label", "error"]);
    return (_jsxs("div", { className: "flex flex-col gap-2", children: [label && (_jsx("label", { className: "text-sm font-medium text-white/80 ml-1", children: label })), _jsx("input", __assign({ className: cn("glass rounded-xl px-4 py-3 outline-none border border-white/20", "focus:border-white/40 focus:bg-white/20 focus:shadow-glass-hover", "placeholder-white/40 text-white transition-all duration-300", error && "border-red-500/50 focus:border-red-500/80", className) }, props)), error && (_jsx("span", { className: "text-xs text-red-300 ml-1", children: error }))] }));
};
