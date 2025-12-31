import React from 'react';
import { WeatherDisplay } from '../components/WeatherDisplay';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-light tracking-tight text-white/90">Dashboard</h2>
        <p className="text-white/50 mt-1">Current conditions and overview</p>
      </header>
      <WeatherDisplay />
    </div>
  );
};
