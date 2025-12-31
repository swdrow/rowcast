import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var statusCopy = {
    idle: 'Idle',
    pending: 'Refreshing data',
    success: 'Live data',
    error: 'Sync issue'
};
var statusColors = {
    idle: 'bg-white/40',
    pending: 'bg-amber-300',
    success: 'bg-emerald-300',
    error: 'bg-rose-400'
};
function formatTimestamp(timestamp) {
    if (!timestamp)
        return 'Awaiting data';
    var date = new Date(timestamp);
    if (Number.isNaN(date.getTime()))
        return 'Last update unknown';
    return date.toLocaleString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        weekday: 'short'
    });
}
export function CommandBar(_a) {
    var status = _a.status, lastUpdated = _a.lastUpdated, onRefresh = _a.onRefresh;
    return (_jsxs("div", { className: "glass-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "h-3 w-3 rounded-full ".concat(statusColors[status]), "aria-hidden": true }), _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "System status" }), _jsx("p", { className: "font-semibold text-white", children: statusCopy[status] })] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "Last sync" }), _jsx("p", { className: "text-sm text-white/70", children: formatTimestamp(lastUpdated) })] }), onRefresh && (_jsx("button", { type: "button", onClick: onRefresh, className: "rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 transition hover:border-white/60 hover:text-white", children: "Refresh now" }))] })] }));
}
