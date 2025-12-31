import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var navItems = [
    { id: 'overview', label: 'Overview', description: 'Score & safety' },
    { id: 'forecast', label: 'Forecast', description: 'Timeline & alerts' },
    { id: 'water', label: 'Water', description: 'Stageflow & trends' },
    { id: 'api', label: 'API', description: 'Developer access' }
];
export function SidebarNav() {
    return (_jsx("nav", { "aria-label": "Primary", className: "sticky top-10 flex flex-col gap-3", children: navItems.map(function (item) { return (_jsxs("a", { href: "#".concat(item.id), className: "group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:border-white/40 hover:bg-white/10", children: [_jsx("p", { className: "font-semibold tracking-wide text-white group-hover:text-white", children: item.label }), _jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: item.description })] }, item.id)); }) }));
}
