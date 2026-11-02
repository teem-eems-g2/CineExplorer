'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { type Movie, getMovieTrailerId, getMovieDirectTrailerUrl } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { isInWatchlist, toggleWatchlist, ratings, rateMovie, showToast } = useWatchlist();

  const inWatchlist = isInWatchlist(movie.id);
  const userRating = ratings[movie.id] || 0;
  const trailerId = getMovieTrailerId(movie);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleShare = () => {
    const url = `${window.location.origin}/movie/${movie.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Movie link copied to clipboard!', 'success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 modal-backdrop bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content glass-dark rounded-3xl overflow-hidden w-full max-w-4xl max-h-[92vh] flex flex-col border border-white/15 shadow-2xl bg-cine-bg/95">
        {/* Header Hero / Video Player */}
        <div className="relative aspect-video sm:h-96 w-full flex-shrink-0 bg-black overflow-hidden">
          {isPlayingTrailer ? (
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={`${movie.title} official trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
              <div className="absolute top-4 left-4 right-16 z-20 flex items-center justify-between pointer-events-none">
                <button
                  onClick={() => setIsPlayingTrailer(false)}
                  className="pointer-events-auto px-3 py-1.5 rounded-xl glass-dark text-xs font-display font-600 text-cine-foreground hover:bg-white/20 transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  ← Back to Poster
                </button>
                <a
                  href={getMovieDirectTrailerUrl(movie)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto px-3 py-1.5 rounded-xl glass-dark text-xs font-display font-600 text-white hover:bg-white/25 transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  YouTube ↗
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full h-full">
                <AppImage
                  src={movie.backdrop || movie.poster}
                  alt={`${movie.title} backdrop scene`}
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,20,0.95)] via-[rgba(10,10,20,0.4)] to-transparent" />

              {/* Play trailer button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlayingTrailer(true)}
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-cine-accent hover:bg-cine-accent/90 text-white font-display font-700 shadow-glow-accent hover:scale-105 transition-all duration-300"
                  aria-label={`Play trailer for ${movie.title}`}
                >
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Play Official Trailer</span>
                </button>
              </div>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass-dark flex items-center justify-center hover:bg-white/20 transition-colors text-cine-foreground"
            aria-label="Close modal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title + Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/08">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/08 border border-white/10 text-cine-foreground/70 font-body">
                  {movie.year}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/08 border border-white/10 text-cine-foreground/70 font-body">
                  {movie.runtime}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cine-primary/10 border border-cine-primary/20 text-cine-primary font-600 font-body">
                  {movie.genres.join(' • ')}
                </span>
              </div>
              <h2
                id="modal-title"
                className="font-display font-800 text-2xl sm:text-3xl text-cine-foreground tracking-tight"
              >
                {movie.title}
              </h2>
              {movie.tagline && (
                <p className="text-cine-primary/70 font-body italic text-sm mt-1">{movie.tagline}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => toggleWatchlist(movie)}
                className={`px-4 py-2.5 rounded-xl text-xs font-display font-700 transition-all flex items-center gap-1.5 ${
                  inWatchlist
                    ? 'bg-cine-accent text-white shadow-glow-accent'
                    : 'glass text-cine-foreground hover:border-cine-accent/40'
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
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl glass hover:bg-white/10 text-cine-foreground/70 hover:text-white transition-colors"
                title="Share Movie Link"
                aria-label="Share movie link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ratings & User Star Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-body font-700 uppercase tracking-widest text-cine-muted mb-1">
                  IMDb Rating
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-display font-800 text-2xl text-cine-gold">
                    {movie.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-cine-muted">/ 10</span>
                </div>
              </div>
              <div className="flex gap-1 text-cine-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={i < Math.round(movie.rating / 2) ? '#F5C518' : 'rgba(245,197,24,0.2)'}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Interactive User Rating */}
            <div className="glass rounded-2xl p-4">
              <p className="text-[10px] font-body font-700 uppercase tracking-widest text-cine-muted mb-1.5 flex justify-between">
                <span>Your Rating</span>
                <span className="text-cine-accent">{userRating > 0 ? `${userRating} / 10 ★` : 'Not rated yet'}</span>
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => {
                  const star = i + 1;
                  const active = (hoverRating || userRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => rateMovie(movie.id, star)}
                      className="p-0.5 text-cine-foreground/20 hover:scale-125 transition-transform"
                      aria-label={`Rate ${star} out of 10`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={active ? '#FF6B6B' : 'currentColor'}
                        stroke={active ? '#FF6B6B' : 'currentColor'}
                        strokeWidth="1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-xs font-body font-700 uppercase tracking-[0.18em] text-cine-muted mb-2">
              Storyline
            </h3>
            <p className="text-cine-foreground/80 font-body text-sm sm:text-base leading-relaxed">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast */}
          <div>
            <h3 className="text-xs font-body font-700 uppercase tracking-[0.18em] text-cine-muted mb-3">
              Featured Cast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {movie.cast.map((actor) => (
                <div
                  key={actor.name}
                  className="flex items-center gap-2.5 glass rounded-xl px-3 py-2.5 border border-white/06"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                    <AppImage
                      src={actor.photo}
                      alt={`${actor.name} headshot`}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-display font-600 text-cine-foreground truncate">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-cine-foreground/45 font-body truncate">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-3.5 border border-white/06">
              <p className="text-[10px] font-body font-700 uppercase tracking-[0.15em] text-cine-muted mb-1">
                Release Date
              </p>
              <p className="text-sm font-display font-600 text-cine-foreground">
                {movie.releaseDate}
              </p>
            </div>
            <div className="glass rounded-xl p-3.5 border border-white/06">
              <p className="text-[10px] font-body font-700 uppercase tracking-[0.15em] text-cine-muted mb-1">
                Director
              </p>
              <p className="text-sm font-display font-600 text-cine-foreground">{movie.director}</p>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-white/08 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingTrailer(true)}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-display font-700"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {isPlayingTrailer ? 'Restart Trailer' : 'Watch Trailer'}
              </button>

              <Link
                href={`/movie/${movie.id}`}
                onClick={onClose}
                className="btn-ghost flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs font-display font-600"
              >
                Full Detail Page →
              </Link>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-xs font-display font-600 text-cine-foreground/50 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
