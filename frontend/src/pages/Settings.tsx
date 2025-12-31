import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { GlassInput } from '../components/GlassInput';

interface UserSettings {
  temperatureUnit: 'fahrenheit' | 'celsius';
  windSpeedUnit: 'mph' | 'kmh';
  severeAlerts: boolean;
  dailyEmail: boolean;
  email: string;
  refreshInterval: number;
  theme: 'dark' | 'light';
}

const defaultSettings: UserSettings = {
  temperatureUnit: 'fahrenheit',
  windSpeedUnit: 'mph',
  severeAlerts: true,
  dailyEmail: false,
  email: '',
  refreshInterval: 60,
  theme: 'dark'
};

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('rowcast-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse saved settings');
      }
    }
  }, []);

  // Track changes
  useEffect(() => {
    const savedSettings = localStorage.getItem('rowcast-settings');
    if (savedSettings) {
      setHasChanges(JSON.stringify(settings) !== savedSettings);
    } else {
      setHasChanges(JSON.stringify(settings) !== JSON.stringify(defaultSettings));
    }
  }, [settings]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      localStorage.setItem('rowcast-settings', JSON.stringify(settings));
      setSaveStatus('success');
      setHasChanges(false);

      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaveStatus('idle');
  };

  // Toggle component
  const Toggle: React.FC<{ enabled: boolean; onChange: (value: boolean) => void }> = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
        enabled ? 'bg-liquid-blue/60' : 'bg-white/10'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-white/90">Settings</h2>
          <p className="text-white/50 mt-1">Preferences and configuration</p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-2 text-yellow-300/80 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Unsaved changes
          </div>
        )}
      </header>

      <div className="grid gap-6 max-w-2xl">
        {/* Units & Display */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Units & Display
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <span className="text-white/80 block">Temperature Unit</span>
                <span className="text-white/40 text-xs">Choose your preferred temperature scale</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSetting('temperatureUnit', 'fahrenheit')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    settings.temperatureUnit === 'fahrenheit'
                      ? 'bg-liquid-blue/30 text-white border border-liquid-blue/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  °F
                </button>
                <button
                  onClick={() => updateSetting('temperatureUnit', 'celsius')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    settings.temperatureUnit === 'celsius'
                      ? 'bg-liquid-blue/30 text-white border border-liquid-blue/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  °C
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <span className="text-white/80 block">Wind Speed</span>
                <span className="text-white/40 text-xs">Choose your preferred wind speed unit</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSetting('windSpeedUnit', 'mph')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    settings.windSpeedUnit === 'mph'
                      ? 'bg-liquid-blue/30 text-white border border-liquid-blue/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  mph
                </button>
                <button
                  onClick={() => updateSetting('windSpeedUnit', 'kmh')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    settings.windSpeedUnit === 'kmh'
                      ? 'bg-liquid-blue/30 text-white border border-liquid-blue/50'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  km/h
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <span className="text-white/80 block">Refresh Interval</span>
                <span className="text-white/40 text-xs">How often to update data</span>
              </div>
              <select
                value={settings.refreshInterval}
                onChange={(e) => updateSetting('refreshInterval', parseInt(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-white/40"
              >
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
                <option value={600}>10 minutes</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <span className="text-white/80 block">Severe Weather Alerts</span>
                <span className="text-white/40 text-xs">Get notified about dangerous conditions</span>
              </div>
              <Toggle
                enabled={settings.severeAlerts}
                onChange={(value) => updateSetting('severeAlerts', value)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <span className="text-white/80 block">Daily Forecast Email</span>
                <span className="text-white/40 text-xs">Receive daily conditions summary</span>
              </div>
              <Toggle
                enabled={settings.dailyEmail}
                onChange={(value) => updateSetting('dailyEmail', value)}
              />
            </div>
          </div>
        </GlassCard>

        {/* Account */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </h3>
          <div className="space-y-4">
            <GlassInput
              label="Email Address"
              type="email"
              placeholder="rower@example.com"
              value={settings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
            />
          </div>
        </GlassCard>

        {/* Data & Privacy */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Data & Privacy
          </h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Local Storage</span>
                <span className="text-white/40 text-xs">
                  {localStorage.getItem('rowcast-settings') ? 'In use' : 'Empty'}
                </span>
              </div>
              <p className="text-white/40 text-xs">
                Your preferences are stored locally in your browser.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-red-400/80 hover:text-red-400 text-sm transition-colors"
            >
              Reset to defaults
            </button>
          </div>
        </GlassCard>

        {/* About */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About RowCast
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Version</span>
              <span className="text-white/80">2.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Data Sources</span>
              <span className="text-white/80">NOAA, USGS, NWS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Location</span>
              <span className="text-white/80">Schuylkill River, PA</span>
            </div>
          </div>
        </GlassCard>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <GlassButton
            className="flex-1"
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </GlassButton>

          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Saved!
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Failed to save
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
