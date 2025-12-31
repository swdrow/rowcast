import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ConditionChip(_a) {
    var label = _a.label, _b = _a.value, value = _b === void 0 ? '—' : _b, icon = _a.icon, _c = _a.emphasize, emphasize = _c === void 0 ? false : _c;
    return (_jsxs("div", { className: "flex items-center gap-3 rounded-full border px-4 py-2 text-sm ".concat(emphasize ? 'border-white/50 text-white' : 'border-white/20 text-white/70'), children: [icon && _jsx("span", { className: "text-lg text-white/70", children: icon }), _jsxs("div", { className: "flex flex-col leading-tight", children: [_jsx("span", { className: "text-[0.65rem] uppercase tracking-[0.4em] text-white/45", children: label }), _jsx("span", { className: "font-semibold tracking-tight text-white", children: value })] })] }));
}
