import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ErrorState(_a) {
    var message = _a.message, onRetry = _a.onRetry;
    return (_jsxs("div", { className: "flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center", children: [_jsx("p", { className: "text-base font-medium text-white/90", children: message }), onRetry && (_jsx("button", { onClick: onRetry, className: "rounded-full border border-white/30 px-5 py-2 text-sm uppercase tracking-[0.35em] text-white/70 transition hover:border-white/70 hover:text-white", children: "Refresh data" }))] }));
}
