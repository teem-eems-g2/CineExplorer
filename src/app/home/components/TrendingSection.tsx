'use client';

import React, { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { trendingMovies, type Movie } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState<'now_playing' | 'trending' | 'toprated' | 'upcoming'>('now_playing');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const {
    isInWatchlist,
    toggleWatchlist,
    openTrailer,
    liveNowPlaying,
    isLiveLoading,
    refreshLiveMovies,
    openTmdbModal,
    tmdbKey,
  } = useWatchlist();

  const tabs = [
    { id: 'now_playing' as const, label: '🔥 New Releases (2025–2026)' },
    { id: 'trending' as const, label: 'Trending' },
    { id: 'toprated' as const, label: 'Top Rated' },
    { id: 'upcoming' as const, label: 'Upcoming (2026)' },
  ];

  const headers: Record<
    'now_playing' | 'trending' | 'toprated' | 'upcoming',
    { title: string; label: string }
  > = {
    now_playing: {
      title: 'Newly Released In Theaters (2025–2026)',
      label: 'Real-Time Cinema Feed',
    },
    trending: {
      title: 'Trending Across Cinema',
      label: 'Popular This Week',
    },
    toprated: {
      title: 'All-Time Top Rated Masterpieces',
      label: 'Cinema Hall of Fame',
    },
    upcoming: {
      title: 'Anticipated Upcoming Films (2026)',
      label: 'Future Releases',
    },
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = 320;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const movies: Movie[] =
    activeTab === 'now_playing'
      ? liveNowPlaying.length > 0
        ? liveNowPlaying
        : trendingMovies.now_playing
      : trendingMovies[activeTab] || trendingMovies.trending;

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
              <div className="flex items-center gap-2 mb-3">
                <p className="section-label">{headers[activeTab].label}</p>
                {activeTab === 'now_playing' && (
                  <button
                    onClick={openTmdbModal}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass border border-white/10 text-[10px] font-display font-600 text-cine-foreground hover:bg-white/10 transition-colors"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        tmdbKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span>{tmdbKey ? 'Live TMDB Stream' : 'Live Sync Available'}</span>
                  </button>
                )}
              </div>

              <h2
                id="trending-heading"
                className="font-display font-800 text-3xl sm:text-4xl md:text-5xl text-cine-foreground tracking-tight"
              >
                {headers[activeTab].title}
              </h2>
            </div>

            {/* Tab switcher + Refresh button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-1 glass rounded-xl p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-body font-600 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-cine-accent text-white shadow-glow-accent'
                        : 'text-cine-foreground/60 hover:text-cine-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'now_playing' && (
                <button
                  onClick={refreshLiveMovies}
                  disabled={isLiveLoading}
                  className="p-2.5 rounded-xl glass hover:bg-white/10 text-cine-foreground/70 hover:text-white transition-colors"
                  title="Check for newly released movies"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={isLiveLoading ? 'animate-spin' : ''}
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Carousel with nav buttons */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-white/10 transition-all duration-200 hidden sm:flex border border-white/10 shadow-xl"
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
                  key={`${movie.id}-${i}`}
                  className="carousel-item"
                  style={{ width: '220px' }}
                  data-stagger
                >
                  <MovieCard
                    movie={movie}
                    index={i}
                    onClick={() => setSelectedMovie(movie)}
                    onPlayTrailer={() => openTrailer(movie)}
                    isInWatchlist={isInWatchlist(movie.id)}
                    onToggleWatchlist={() => toggleWatchlist(movie)}
                  />
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-white/10 transition-all duration-200 hidden sm:flex border border-white/10 shadow-xl"
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
  onPlayTrailer,
  isInWatchlist,
  onToggleWatchlist,
}: {
  movie: Movie;
  index: number;
  onClick: () => void;
  onPlayTrailer: () => void;
  isInWatchlist: boolean;
  onToggleWatchlist: () => void;
}) {
  const stars = Math.round(movie.rating / 2);

  return (
    <div
      className="movie-card poster-ratio w-full cursor-pointer group relative"
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
        sizes="220px"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-card-gradient z-10 pointer-events-none" />

      {/* Rank badge */}
      {index < 3 && (
        <div className="absolute top-3 left-3 z-20 w-7 h-7 rounded-full bg-cine-accent flex items-center justify-center shadow-lg">
          <span className="font-display font-800 text-xs text-white">#{index + 1}</span>
        </div>
      )}

      {/* Hover action buttons */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist();
          }}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            isInWatchlist
              ? 'bg-cine-accent text-white shadow-glow-accent'
              : 'glass-dark text-white/80 hover:bg-white/20'
          }`}
          aria-label={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={isInWatchlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>

        {/* Rating */}
        <div className="rating-badge rounded-lg px-2 py-1 flex items-center gap-1 text-xs">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Play Trailer quick button on hover */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayTrailer();
          }}
          className="pointer-events-auto w-12 h-12 rounded-full bg-cine-accent/90 text-white flex items-center justify-center hover:scale-110 shadow-glow-accent transition-transform"
          aria-label={`Play ${movie.title} trailer`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3.5">
        <p className="font-display font-700 text-sm text-cine-foreground line-clamp-2 leading-tight mb-1">
          {movie.title}
        </p>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs text-cine-foreground/50 font-body">{movie.year}</p>
          {parseInt(movie.year) >= 2025 && (
            <span className="text-[9px] font-display font-700 uppercase px-1.5 py-0.5 rounded bg-cine-accent/25 text-cine-accent border border-cine-accent/40 tracking-wider">
              Upcoming
            </span>
          )}
        </div>

        {/* Stars */}
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
