import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
var paddingMap = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
};
export function GlassPanel(_a) {
    var children = _a.children, className = _a.className, _b = _a.padding, padding = _b === void 0 ? 'md' : _b;
    var pad = padding !== null && padding !== void 0 ? padding : 'md';
    return _jsx("section", { className: clsx('glass-panel', paddingMap[pad], className), children: children });
}
