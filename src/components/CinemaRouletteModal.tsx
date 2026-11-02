'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { allMovies, type Movie } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';
import { cinemaAudio } from '@/lib/cinemaAudio';

interface CinemaRouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CinemaRouletteModal({ isOpen, onClose }: CinemaRouletteModalProps) {
  const { openTrailer, isInWatchlist, toggleWatchlist } = useWatchlist();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const spinTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with a random movie on open
  useEffect(() => {
    if (isOpen) {
      const rand = Math.floor(Math.random() * allMovies.length);
      setCurrentIndex(rand);
      setSelectedMovie(allMovies[rand]);
      setIsSpinning(false);
    }
  }, [isOpen]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearInterval(spinTimerRef.current);
    };
  }, []);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedMovie(null);

    let speed = 60; // initial tick interval in ms
    let iterations = 0;
    const maxIterations = 28 + Math.floor(Math.random() * 10);
    let currentIdx = currentIndex;

    const tick = () => {
      iterations++;
      currentIdx = (currentIdx + 1) % allMovies.length;
      setCurrentIndex(currentIdx);
      cinemaAudio.playTick();

      if (iterations >= maxIterations) {
        // Finished spin
        setIsSpinning(false);
        const winner = allMovies[currentIdx];
        setSelectedMovie(winner);
        cinemaAudio.playFanfare();
      } else {
        // Slow down physics
        if (iterations > maxIterations - 12) {
          speed += 28;
        } else if (iterations > maxIterations - 6) {
          speed += 50;
        }
        spinTimerRef.current = setTimeout(tick, speed);
      }
    };

    spinTimerRef.current = setTimeout(tick, speed);
  };

  if (!isOpen) return null;

  const currentDisplayMovie = allMovies[currentIndex] || allMovies[0];
  const inWatchlist = selectedMovie ? isInWatchlist(selectedMovie.id) : false;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass-dark border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cine-accent/20 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full glass hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors z-20"
          aria-label="Close Cinema Roulette"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-display font-700 text-cine-primary uppercase tracking-widest mb-3">
            <span>🎞️</span>
            <span>The Curator&apos;s Reel</span>
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-white tracking-tight">
            Cinema Roulette
          </h2>
          <p className="text-xs sm:text-sm text-cine-muted font-body mt-1.5 max-w-md mx-auto">
            Indecisive about movie night? Let destiny and the film projector choose your
            next obsession.
          </p>
        </div>

        {/* Reel Display Card */}
        <div className="relative mb-8 z-10">
          {/* Film Strip Perforations Top & Bottom */}
          <div className="h-4 bg-black/80 rounded-t-2xl flex items-center justify-around px-3 border-x border-t border-white/10">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="w-2.5 h-2 bg-white/20 rounded-sm" />
            ))}
          </div>

          {/* Film Frame Content */}
          <div className="bg-black/90 p-5 sm:p-6 border-x border-white/10 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            {/* Spinning Motion Blur Indicator */}
            {isSpinning && (
              <div className="absolute inset-0 bg-cine-accent/05 animate-pulse pointer-events-none" />
            )}

            {/* Poster Frame */}
            <div className="relative w-40 sm:w-44 aspect-[2/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl flex-shrink-0">
              <AppImage
                src={currentDisplayMovie.poster}
                alt={currentDisplayMovie.title}
                fill
                className={`object-cover transition-transform duration-100 ${
                  isSpinning ? 'scale-105 filter blur-[0.5px]' : 'scale-100'
                }`}
                sizes="180px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[10px] font-display font-700 uppercase tracking-widest text-white/80 bg-black/70 px-2 py-0.5 rounded">
                  {currentDisplayMovie.year}
                </span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-display font-700 bg-cine-gold/20 text-cine-gold border border-cine-gold/30">
                  ★ {currentDisplayMovie.rating.toFixed(1)} / 10
                </span>
                <span className="text-xs text-cine-muted font-body">
                  {currentDisplayMovie.runtime}
                </span>
              </div>

              <h3 className="font-display font-800 text-2xl text-white mb-2 leading-tight">
                {currentDisplayMovie.title}
              </h3>

              <p className="text-xs text-cine-primary/90 font-display italic mb-3">
                &ldquo;{currentDisplayMovie.tagline}&rdquo;
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-3">
                {currentDisplayMovie.genres.map((g) => (
                  <span
                    key={g}
                    className="text-[10px] font-body px-2 py-0.5 rounded-full bg-white/10 text-cine-foreground/80"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-xs text-cine-foreground/70 font-body line-clamp-3 leading-relaxed">
                {currentDisplayMovie.synopsis}
              </p>
            </div>
          </div>

          {/* Film Strip Perforations Bottom */}
          <div className="h-4 bg-black/80 rounded-b-2xl flex items-center justify-around px-3 border-x border-b border-white/10">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="w-2.5 h-2 bg-white/20 rounded-sm" />
            ))}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-display font-800 text-sm tracking-wide transition-all shadow-glow-accent flex items-center justify-center gap-2 ${
              isSpinning
                ? 'bg-white/20 text-white/50 cursor-not-allowed'
                : 'btn-primary text-white hover:scale-105 active:scale-95'
            }`}
          >
            <span>{isSpinning ? '🎲 Projecting...' : '🎲 Spin the Reel'}</span>
          </button>

          {selectedMovie && (
            <>
              <button
                onClick={() => {
                  onClose();
                  openTrailer(selectedMovie);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass hover:bg-white/15 text-white font-display font-700 text-sm transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Watch Trailer Now</span>
              </button>

              <button
                onClick={() => toggleWatchlist(selectedMovie)}
                className={`w-full sm:w-auto p-3.5 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xs font-display font-700 ${
                  inWatchlist
                    ? 'bg-cine-accent text-white border-cine-accent'
                    : 'glass text-cine-foreground/80 hover:text-white border-white/15 hover:bg-white/10'
                }`}
                title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={inWatchlist ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span>{inWatchlist ? 'In Watchlist' : 'Watchlist'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
