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
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../utils/cn';
export var GlassButton = function (_a) {
    var children = _a.children, className = _a.className, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, props = __rest(_a, ["children", "className", "variant", "size"]);
    var variants = {
        primary: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
        secondary: 'bg-black/20 hover:bg-black/30 text-white/90 border-white/10',
        danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-100 border-red-500/30'
    };
    var sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };
    return (_jsx("button", __assign({ className: cn("glass rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border backdrop-blur-md shadow-lg", variants[variant], sizes[size], className) }, props, { children: children })));
};
