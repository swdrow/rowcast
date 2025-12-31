import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Forecast } from './pages/Forecast';
import { Map } from './pages/Map';
import { Settings } from './pages/Settings';
import { GlassCard } from './components/GlassCard';
import { cn } from './utils/cn';
function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "min-h-screen bg-night text-white relative overflow-hidden selection:bg-liquid-blue/30", children: [_jsxs("div", { className: "fixed inset-0 z-0", children: [_jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-liquid-blue/20 rounded-full blur-[120px] animate-blob" }), _jsx("div", { className: "absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-liquid-purple/20 rounded-full blur-[120px] animate-blob animation-delay-2000" }), _jsx("div", { className: "absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-liquid-pink/20 rounded-full blur-[120px] animate-blob animation-delay-4000" })] }), _jsxs("div", { className: "relative z-10 flex flex-col min-h-screen", children: [_jsx("header", { className: "p-6", children: _jsxs(GlassCard, { className: "max-w-7xl mx-auto flex justify-between items-center py-4 px-8 !rounded-full !bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-liquid-blue to-liquid-purple" }), _jsx("h1", { className: "text-xl font-medium tracking-tight", children: "RowCast" })] }), _jsxs("nav", { className: "hidden md:flex gap-8 text-sm font-medium text-white/70", children: [_jsx(NavLink, { to: "/dashboard", className: function (_a) {
                                                    var isActive = _a.isActive;
                                                    return cn("hover:text-white transition-colors", isActive && "text-white font-semibold");
                                                }, children: "Dashboard" }), _jsx(NavLink, { to: "/forecast", className: function (_a) {
                                                    var isActive = _a.isActive;
                                                    return cn("hover:text-white transition-colors", isActive && "text-white font-semibold");
                                                }, children: "Forecast" }), _jsx(NavLink, { to: "/map", className: function (_a) {
                                                    var isActive = _a.isActive;
                                                    return cn("hover:text-white transition-colors", isActive && "text-white font-semibold");
                                                }, children: "Map" }), _jsx(NavLink, { to: "/settings", className: function (_a) {
                                                    var isActive = _a.isActive;
                                                    return cn("hover:text-white transition-colors", isActive && "text-white font-semibold");
                                                }, children: "Settings" })] }), _jsx("div", { className: "w-8 h-8 rounded-full bg-white/10" })] }) }), _jsx("main", { className: "flex-1 max-w-7xl mx-auto w-full p-6", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/forecast", element: _jsx(Forecast, {}) }), _jsx(Route, { path: "/map", element: _jsx(Map, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] }) }), _jsx("footer", { className: "p-6 text-center text-white/40 text-sm", children: _jsx("p", { children: "\u00A9 2024 RowCast. Liquid Glass Design." }) })] })] }) }));
}
export default App;
