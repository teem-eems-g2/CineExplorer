'use client';

import React, { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { trendingMovies, type Movie } from '@/data/Movies';

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState<'trending' | 'toprated' | 'upcoming'>('trending');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'trending' as const, label: 'Trending Now' },
    { id: 'toprated' as const, label: 'Top Rated' },
    { id: 'upcoming' as const, label: 'Upcoming' },
  ];

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = 320;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const movies = trendingMovies[activeTab];

  return (
    <>
      <section
        id="trending"
        className="py-24 px-6 lg:px-16 bg-cine-bg reveal-hidden"
        aria-labelledby="trending-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="section-label mb-3">What&apos;s Hot</p>
              <h2
                id="trending-heading"
                className="font-display font-800 text-4xl md:text-5xl text-cine-foreground tracking-tight"
              >
                Trending &amp; Popular
              </h2>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 glass rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-body font-600 transition-all duration-250 ${
                    activeTab === tab.id
                      ? 'bg-cine-accent/20 text-cine-accent border border-cine-accent/30'
                      : 'text-cine-foreground/50 hover:text-cine-foreground/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel with nav buttons */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-white/10 transition-all duration-200 hidden sm:flex"
              aria-label="Scroll left"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Carousel */}
            <div ref={trackRef} className="carousel-track">
              {movies.map((movie, i) => (
                <div
                  key={movie.id}
                  className="carousel-item"
                  style={{ width: '200px' }}
                  data-stagger
                >
                  <MovieCard movie={movie} index={i} onClick={() => setSelectedMovie(movie)} />
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-white/10 transition-all duration-200 hidden sm:flex"
              aria-label="Scroll right"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Movie Modal */}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
}

function MovieCard({
  movie,
  index,
  onClick,
}: {
  movie: Movie;
  index: number;
  onClick: () => void;
}) {
  const stars = Math.round(movie.rating / 2);

  return (
    <div
      className="movie-card poster-ratio w-full cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${movie.title}`}
    >
      {/* Poster */}
      <AppImage
        src={movie.poster}
        alt={`${movie.title} movie poster`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="200px"
        loading="lazy"
      />

      {/* Gradient overlay (always visible) */}
      <div className="absolute inset-0 bg-card-gradient z-10 pointer-events-none" />

      {/* Rank badge */}
      {index < 3 && (
        <div className="absolute top-3 left-3 z-20 w-7 h-7 rounded-full bg-cine-accent flex items-center justify-center">
          <span className="font-display font-800 text-xs text-white">#{index + 1}</span>
        </div>
      )}

      {/* Rating */}
      <div className="absolute top-3 right-3 z-20 rating-badge rounded-lg px-2 py-1 flex items-center gap-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span>{movie.rating.toFixed(1)}</span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
        <p className="font-display font-700 text-sm text-cine-foreground line-clamp-2 leading-tight mb-1">
          {movie.title}
        </p>
        <p className="text-xs text-cine-foreground/50 font-body">{movie.year}</p>

        {/* Stars — shown on hover */}
        <div className="card-overlay-extra flex gap-0.5 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill={i < stars ? '#F5C518' : 'rgba(245,197,24,0.2)'}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
