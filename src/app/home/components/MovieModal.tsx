'use client';

import React, { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { type Movie } from '@/data/Movies';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
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

  const stars = Math.round(movie.rating / 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content glass-dark rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header bar */}
        <div className="relative h-64 sm:h-80 flex-shrink-0">
          <div className="relative w-full h-full">
            <AppImage
              src={movie.backdrop || movie.poster}
              alt={`${movie.title} backdrop scene`}
              width={896}
              height={320}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,20,0.95)] via-[rgba(10,10,20,0.4)] to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-dark flex items-center justify-center hover:bg-white/15 transition-colors"
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

          {/* Play trailer button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-cine-accent/90 flex items-center justify-center hover:scale-110 hover:bg-cine-accent transition-all duration-300 shadow-glow-accent"
              aria-label={`Watch ${movie.title} trailer on YouTube`}
            >
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Title + meta */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h2
                id="modal-title"
                className="font-display font-800 text-2xl sm:text-3xl text-cine-foreground tracking-tight mb-2"
              >
                {movie.title}
              </h2>
              {movie.tagline && (
                <p className="text-cine-primary/60 font-body italic text-sm">{movie.tagline}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={i < stars ? '#F5C518' : 'rgba(245,197,24,0.2)'}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="font-display font-700 text-cine-gold text-lg">
                {movie.rating.toFixed(1)}
                <span className="text-cine-muted font-400 text-sm">/10</span>
              </span>
            </div>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white/05 border border-white/08 text-cine-foreground/60 font-body font-500">
              {movie.year}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white/05 border border-white/08 text-cine-foreground/60 font-body font-500">
              {movie.runtime}
            </span>
            {movie.genres.map((g) => (
              <span
                key={g}
                className="text-xs px-3 py-1.5 rounded-lg bg-cine-primary/10 border border-cine-primary/20 text-cine-primary/80 font-body font-600"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="divider mb-6" />

          {/* Synopsis */}
          <div className="mb-6">
            <p className="text-xs font-body font-700 uppercase tracking-[0.18em] text-cine-muted mb-3">
              Synopsis
            </p>
            <p className="text-cine-foreground/70 font-body text-sm sm:text-base leading-relaxed">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast */}
          <div className="mb-6">
            <p className="text-xs font-body font-700 uppercase tracking-[0.18em] text-cine-muted mb-4">
              Cast
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {movie.cast.map((actor) => (
                <div
                  key={actor.name}
                  className="flex items-center gap-2.5 glass rounded-xl px-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                      src={actor.photo}
                      alt={`${actor.name} actor headshot`}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-display font-600 text-cine-foreground leading-tight">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-cine-foreground/40 font-body">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Release + Director */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <p className="text-[10px] font-body font-700 uppercase tracking-[0.15em] text-cine-muted mb-1">
                Release Date
              </p>
              <p className="text-sm font-display font-600 text-cine-foreground">
                {movie.releaseDate}
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-[10px] font-body font-700 uppercase tracking-[0.15em] text-cine-muted mb-1">
                Director
              </p>
              <p className="text-sm font-display font-600 text-cine-foreground">{movie.director}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-display font-700"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Trailer
            </a>
            <button
              onClick={onClose}
              className="btn-ghost flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-display font-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
