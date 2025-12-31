import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarNav } from './SidebarNav';
import { CommandBar } from './CommandBar';
import { FooterStatus } from './FooterStatus';
export function GlassLayout(_a) {
    var children = _a.children, status = _a.status, lastUpdated = _a.lastUpdated, onRefresh = _a.onRefresh;
    return (_jsxs("div", { className: "relative min-h-screen overflow-hidden bg-[#04060a] text-white", children: [_jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10", children: [_jsx("div", { className: "absolute -top-40 -left-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(75,201,255,0.35),_transparent_70%)] blur-3xl" }), _jsx("div", { className: "absolute top-32 right-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(122,92,255,0.25),_transparent_65%)] blur-3xl" }), _jsx("div", { className: "absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,126,182,0.2),_transparent_60%)] blur-[120px]" })] }), _jsxs("div", { className: "mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-12", children: [_jsx("aside", { className: "hidden w-60 flex-shrink-0 lg:block", children: _jsx(SidebarNav, {}) }), _jsxs("div", { className: "flex flex-1 flex-col gap-10", children: [_jsx(CommandBar, { status: status, lastUpdated: lastUpdated, onRefresh: onRefresh }), _jsx("div", { className: "flex flex-1 flex-col gap-12", id: "main-content", children: children }), _jsx(FooterStatus, {})] })] })] }));
}
