import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ApiDocsPreview } from '../components/ApiDocsPreview';
import { GlassPanel } from '../components/GlassPanel';
export function ApiSection() {
    return (_jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [_jsxs(GlassPanel, { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-white/40", children: "Developers" }), _jsx("h2", { className: "mt-4 text-3xl font-semibold text-white", children: "Instrument the river in code." }), _jsx("p", { className: "mt-3 text-base text-white/70", children: "Consume the same feed powering the dashboard. Documented responses, NOAA aware endpoints, and transparent scoring allow experimentation in your notebooks or fleet monitors." })] }), _jsx(ApiDocsPreview, {})] }));
}
