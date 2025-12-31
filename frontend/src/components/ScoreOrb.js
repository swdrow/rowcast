import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function ScoreOrb(_a) {
    var _b = _a.score, score = _b === void 0 ? 0 : _b, _c = _a.label, label = _c === void 0 ? 'RowCast Score' : _c;
    var normalized = Math.max(0, Math.min(10, score));
    var hue = (normalized / 10) * 120;
    return (_jsxs("div", { className: "relative flex flex-col items-center gap-4", children: [_jsx(motion.div, { className: "glow-ring flex h-48 w-48 items-center justify-center rounded-full", style: {
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }, animate: {
                    boxShadow: ["0 0 40px rgba(75, 201, 255, 0.35)", "0 0 80px rgba(122,92,255,0.25)"]
                }, transition: { duration: 4, repeat: Infinity, repeatType: 'reverse' }, children: _jsxs(motion.div, { className: "flex h-40 w-40 flex-col items-center justify-center rounded-full text-center", style: {
                        background: "conic-gradient(from 90deg, hsl(".concat(hue, ", 85%, 60%), rgba(255,255,255,0.08))")
                    }, animate: { rotate: [0, 360] }, transition: { duration: 20, repeat: Infinity, ease: 'linear' }, children: [_jsx("span", { className: "text-5xl font-semibold tracking-tight", children: normalized.toFixed(1) }), _jsx("span", { className: "text-xs uppercase tracking-[0.4em] text-white/70", children: "/ 10" })] }) }), _jsx("p", { className: "text-sm uppercase tracking-[0.35em] text-white/60", children: label })] }));
}
