import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Forecast } from './pages/Forecast';
import { Map } from './pages/Map';
import { Settings } from './pages/Settings';
import { GlassCard } from './components/GlassCard';
import { cn } from './utils/cn';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-night text-white relative overflow-hidden selection:bg-liquid-blue/30">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-liquid-blue/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-liquid-purple/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-liquid-pink/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header */}
          <header className="p-6">
            <GlassCard className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8 !rounded-full !bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-liquid-blue to-liquid-purple" />
                <h1 className="text-xl font-medium tracking-tight">RowCast</h1>
              </div>
              <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => cn("hover:text-white transition-colors", isActive && "text-white font-semibold")}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/forecast"
                  className={({ isActive }) => cn("hover:text-white transition-colors", isActive && "text-white font-semibold")}
                >
                  Forecast
                </NavLink>
                <NavLink
                  to="/map"
                  className={({ isActive }) => cn("hover:text-white transition-colors", isActive && "text-white font-semibold")}
                >
                  Map
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => cn("hover:text-white transition-colors", isActive && "text-white font-semibold")}
                >
                  Settings
                </NavLink>
              </nav>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Desktop avatar */}
              <div className="hidden md:block w-8 h-8 rounded-full bg-gradient-to-br from-liquid-blue/50 to-liquid-purple/50 border border-white/20" />
            </GlassCard>

            {/* Mobile menu dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-2 max-w-7xl mx-auto">
                <GlassCard className="!rounded-2xl p-4">
                  <nav className="flex flex-col gap-2">
                    <NavLink
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => cn(
                        "px-4 py-3 rounded-xl transition-all text-sm font-medium",
                        isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/forecast"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => cn(
                        "px-4 py-3 rounded-xl transition-all text-sm font-medium",
                        isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      Forecast
                    </NavLink>
                    <NavLink
                      to="/map"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => cn(
                        "px-4 py-3 rounded-xl transition-all text-sm font-medium",
                        isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      Map
                    </NavLink>
                    <NavLink
                      to="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => cn(
                        "px-4 py-3 rounded-xl transition-all text-sm font-medium",
                        isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      Settings
                    </NavLink>
                  </nav>
                </GlassCard>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto w-full p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/map" element={<Map />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="p-6 text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} RowCast. Liquid Glass Design.</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
