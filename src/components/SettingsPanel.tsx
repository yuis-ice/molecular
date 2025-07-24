import React from 'react';
import { Settings, Play, Pause } from 'lucide-react';
import { ScreensaverSettings } from '../types/molecule';

interface SettingsPanelProps {
  settings: ScreensaverSettings;
  onSettingsChange: (settings: ScreensaverSettings) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isPlaying,
  onPlayPause,
}) => {
  const speedOptions = [
    { value: 2, label: '2s - Fast' },
    { value: 3, label: '3s - Normal' },
    { value: 5, label: '5s - Slow' },
    { value: 8, label: '8s - Relaxed' },
    { value: 12, label: '12s - Peaceful' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 group">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-white" />
          <h3 className="text-white font-semibold">Controls</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-2">
              Transition Speed
            </label>
            <select
              value={settings.speed}
              onChange={(e) => onSettingsChange({ ...settings, speed: Number(e.target.value) })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
            >
              {speedOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onPlayPause}
            className="w-full flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:scale-105"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};