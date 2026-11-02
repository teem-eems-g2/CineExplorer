'use client';

import React, { useState, useEffect } from 'react';
import { cinemaAudio } from '@/lib/cinemaAudio';

export default function CinemaSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Cleanup if component unmounts
    return () => {
      if (cinemaAudio.getIsPlaying()) {
        cinemaAudio.stopAmbiance();
      }
    };
  }, []);

  const handleToggle = () => {
    const active = cinemaAudio.toggleAmbiance();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    cinemaAudio.setVolume(val);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`px-3 py-1.5 rounded-xl text-xs font-display font-600 transition-all duration-300 flex items-center gap-2 border ${
          isPlaying
            ? 'bg-cine-accent/15 border-cine-accent/50 text-cine-accent shadow-glow-accent'
            : 'glass border-white/10 text-cine-foreground/75 hover:text-white hover:border-white/20'
        }`}
        title="Toggle authentic cinema theater room tone"
        aria-label="Toggle Theater Soundscape"
      >
        {/* Animated equalizer bars */}
        <div className="flex items-end gap-0.5 h-3 w-3">
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-50'
            }`}
          />
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-2 animate-bounce' : 'h-2.5 opacity-50'
            }`}
          />
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3.5 animate-pulse delay-75' : 'h-1 opacity-50'
            }`}
          />
        </div>

        <span className="hidden sm:inline">
          {isPlaying ? 'Auditorium Audio' : 'Theater Tone'}
        </span>
      </button>

      {/* Floating mini volume slider */}
      {showSlider && (
        <div className="absolute right-0 top-full mt-2 p-2.5 glass-dark rounded-xl border border-white/10 shadow-2xl flex items-center gap-2 z-50 animate-fade-in min-w-[140px]">
          <span className="text-[10px] text-cine-muted font-body">Vol</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-cine-accent h-1 bg-white/20 rounded-lg cursor-pointer"
            aria-label="Soundscape Volume"
          />
          <span className="text-[10px] font-mono text-cine-foreground/70">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
