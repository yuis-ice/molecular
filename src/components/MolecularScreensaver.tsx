import React, { useState, useEffect, useCallback } from 'react';
import { MolecularDisplay } from './MolecularDisplay';
import { SettingsPanel } from './SettingsPanel';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_MOLECULES } from '../data/molecules';
import { Molecule, ScreensaverSettings } from '../types/molecule';

export const MolecularScreensaver: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<ScreensaverSettings>('molecular-screensaver-settings', {
    speed: 5
  });

  const [currentMolecule, setCurrentMolecule] = useState<Molecule>(
    DEFAULT_MOLECULES[Math.floor(Math.random() * DEFAULT_MOLECULES.length)]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const getRandomMolecule = useCallback(() => {
    let newMolecule;
    do {
      newMolecule = DEFAULT_MOLECULES[Math.floor(Math.random() * DEFAULT_MOLECULES.length)];
    } while (newMolecule.cid === currentMolecule.cid && DEFAULT_MOLECULES.length > 1);
    return newMolecule;
  }, [currentMolecule.cid]);

  const switchToNextMolecule = useCallback(() => {
    if (!isPlaying) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const nextMolecule = getRandomMolecule();
      setCurrentMolecule(nextMolecule);
      setIsLoading(false);
    }, 500);
  }, [getRandomMolecule, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      switchToNextMolecule();
    }, settings.speed * 1000);

    return () => clearInterval(interval);
  }, [settings.speed, switchToNextMolecule, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-teal-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400/15 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse"></div>
      </div>

      {/* Main content */}
      <MolecularDisplay molecule={currentMolecule} isLoading={isLoading} />

      {/* Settings panel */}
      <SettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />

      {/* Bottom indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-white/70 text-sm">
            {isPlaying ? 'Playing' : 'Paused'} • Next in {settings.speed}s
          </span>
        </div>
      </div>
    </div>
  );
};