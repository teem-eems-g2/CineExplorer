'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWatchlist } from '@/context/WatchlistContext';
import { getMovieTrailerId, getMovieDirectTrailerUrl } from '@/data/Movies';

export default function TrailerModal() {
  const { activeTrailerMovie, closeTrailer, isInWatchlist, toggleWatchlist } = useWatchlist();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTrailer();
    };
    if (activeTrailerMovie) {
      setIframeLoaded(false);
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeTrailerMovie, closeTrailer]);

  if (!activeTrailerMovie) return null;

  const trailerId = getMovieTrailerId(activeTrailerMovie);
  const directUrl = getMovieDirectTrailerUrl(activeTrailerMovie);
  const inWatchlist = isInWatchlist(activeTrailerMovie.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop bg-black/90 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Official Trailer - ${activeTrailerMovie.title}`}
      onClick={(e) => e.target === e.currentTarget && closeTrailer()}
    >
      <div className="w-full max-w-5xl glass-dark rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[95vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div>
              <h3 className="font-display font-800 text-base sm:text-xl text-cine-foreground tracking-tight flex items-center gap-2">
                {activeTrailerMovie.title}
                <span className="text-xs font-normal text-cine-muted font-body">
                  ({activeTrailerMovie.year})
                </span>
              </h3>
              <p className="text-xs text-cine-muted font-body">Official Cinema Trailer HD</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct YouTube Link Button */}
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-display font-600 glass text-cine-foreground/90 hover:text-white hover:bg-white/15 transition-all flex items-center gap-1.5"
              title="Open directly on YouTube"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="hidden sm:inline">Watch on</span> YouTube ↗
            </a>

            <button
              onClick={() => toggleWatchlist(activeTrailerMovie)}
              className={`px-3 py-1.5 rounded-xl text-xs font-display font-600 transition-all flex items-center gap-1.5 ${
                inWatchlist
                  ? 'bg-cine-accent text-white shadow-glow-accent'
                  : 'glass text-cine-foreground/80 hover:text-white'
              }`}
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
              {inWatchlist ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={closeTrailer}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/15 transition-colors text-cine-foreground/70 hover:text-white"
              aria-label="Close trailer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* 16:9 Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-cine-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-cine-muted font-display tracking-wider uppercase">Loading cinema stream...</p>
              </div>
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={`${activeTrailerMovie.title} official trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIframeLoaded(true)}
            className="w-full h-full border-0 relative z-20"
          />
        </div>

        {/* Fallback & Playback Notice Bar */}
        <div className="px-5 py-2.5 bg-black/80 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-cine-muted font-body">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>High Definition Cinema Audio & Visuals</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Video restricted by your browser or country?</span>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cine-accent hover:underline font-display font-600 inline-flex items-center gap-1"
            >
              Open directly on YouTube ↗
            </a>
          </div>
        </div>

        {/* Bottom bar with synopsis & link to details */}
        <div className="p-4 sm:p-6 bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs px-2 py-0.5 rounded bg-cine-gold/15 text-cine-gold font-display font-700">
                ★ {activeTrailerMovie.rating.toFixed(1)}
              </span>
              <span className="text-xs text-cine-muted font-body">{activeTrailerMovie.runtime}</span>
              <span className="text-cine-muted text-xs">•</span>
              <span className="text-xs text-cine-muted font-body">
                Directed by {activeTrailerMovie.director}
              </span>
            </div>
            <p className="text-xs text-cine-foreground/70 font-body line-clamp-2">
              {activeTrailerMovie.synopsis}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href={`/movie/${activeTrailerMovie.id}`}
              onClick={closeTrailer}
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-display font-700 whitespace-nowrap"
            >
              Full Movie Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
