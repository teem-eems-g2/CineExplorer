'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { useWatchlist } from '@/context/WatchlistContext';
import { type Movie } from '@/data/Movies';

interface WatchlistDrawerProps {
  onSelectMovie?: (movie: Movie) => void;
}

export default function WatchlistDrawer({ onSelectMovie }: WatchlistDrawerProps) {
  const {
    watchlist,
    isWatchlistOpen,
    closeWatchlist,
    removeFromWatchlist,
    clearWatchlist,
    openTrailer,
  } = useWatchlist();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWatchlist();
    };
    if (isWatchlistOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isWatchlistOpen, closeWatchlist]);

  if (!isWatchlistOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Your Watchlist"
      onClick={(e) => e.target === e.currentTarget && closeWatchlist()}
    >
      <div className="w-full max-w-md h-full glass-dark border-l border-white/10 shadow-2xl flex flex-col animate-slide-left p-6 sm:p-8 overflow-hidden bg-cine-bg/95 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-800 text-2xl text-cine-foreground tracking-tight">
                My Watchlist
              </h2>
              <span className="text-xs font-display font-700 px-2 py-0.5 rounded-full bg-cine-accent text-white">
                {watchlist.length}
              </span>
            </div>
            <p className="text-xs text-cine-muted font-body mt-1">
              Your saved cinematic favorites
            </p>
          </div>

          <button
            onClick={closeWatchlist}
            className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/15 transition-colors text-cine-foreground/70 hover:text-cine-foreground"
            aria-label="Close watchlist"
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

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          {watchlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 text-cine-accent/80">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </div>
              <h3 className="font-display font-700 text-lg text-cine-foreground mb-1">
                Your watchlist is empty
              </h3>
              <p className="text-xs text-cine-muted font-body leading-relaxed max-w-xs mb-6">
                Explore movies and tap the bookmark or &ldquo;Add to Watchlist&rdquo; button to save
                them here for later!
              </p>
              <a
                href="#trending"
                onClick={closeWatchlist}
                className="btn-primary px-6 py-2.5 rounded-xl text-xs font-display font-700"
              >
                Explore Trending
              </a>
            </div>
          ) : (
            watchlist.map((movie) => (
              <div
                key={movie.id}
                className="group relative flex items-center gap-3.5 glass rounded-2xl p-3 border border-white/06 hover:border-white/15 transition-all duration-200"
              >
                {/* Poster */}
                <div
                  className="relative w-16 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer shadow-md"
                  onClick={() => {
                    closeWatchlist();
                    if (onSelectMovie) onSelectMovie(movie);
                  }}
                >
                  <AppImage
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="64px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-display font-700 text-sm text-cine-foreground truncate hover:text-cine-accent cursor-pointer transition-colors"
                    onClick={() => {
                      closeWatchlist();
                      if (onSelectMovie) onSelectMovie(movie);
                    }}
                  >
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-cine-muted font-body">{movie.year}</span>
                    <span className="text-cine-muted text-[10px]">•</span>
                    <span className="flex items-center gap-0.5 text-[11px] font-display font-700 text-cine-gold">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#F5C518">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[10px] text-cine-foreground/50 font-body truncate mt-0.5">
                    {movie.genres.slice(0, 2).join(', ')}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={() => {
                        closeWatchlist();
                        openTrailer(movie);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-display font-600 px-2.5 py-1 rounded-lg bg-cine-accent/15 text-cine-accent hover:bg-cine-accent hover:text-white transition-all duration-200"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Trailer
                    </button>

                    <Link
                      href={`/movie/${movie.id}`}
                      onClick={closeWatchlist}
                      className="text-[11px] font-body text-cine-foreground/60 hover:text-cine-foreground px-2 py-1 rounded-lg hover:bg-white/05 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-cine-foreground/30 hover:text-cine-accent hover:bg-white/05 transition-colors"
                  aria-label={`Remove ${movie.title} from watchlist`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {watchlist.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={clearWatchlist}
              className="text-xs text-cine-foreground/40 hover:text-cine-accent transition-colors font-body"
            >
              Clear All ({watchlist.length})
            </button>
            <button
              onClick={closeWatchlist}
              className="btn-ghost px-5 py-2 rounded-xl text-xs font-display font-600"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
