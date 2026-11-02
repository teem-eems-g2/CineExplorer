'use client';

import React, { useState, useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { allMovies, type Movie } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';

const GENRES = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Thriller',
  'Sci-Fi',
  'Horror',
  'Romance',
  'Animation',
];
const FILTERS = ['Popular', 'Top Rated', 'Latest'];
const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'];

export default function GenreSection() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Popular');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const { isInWatchlist, toggleWatchlist, openTrailer } = useWatchlist();

  const filtered = useMemo(() => {
    let list = allMovies.filter((m) => {
      if (activeGenre !== 'All' && !m.genres.includes(activeGenre)) return false;
      if (selectedYear && m.year !== selectedYear) return false;
      return true;
    });

    if (activeFilter === 'Popular') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (activeFilter === 'Top Rated') {
      list = [...list].sort((a, b) => (b.rating >= 8.5 ? 1 : 0) - (a.rating >= 8.5 ? 1 : 0) || b.rating - a.rating);
    } else if (activeFilter === 'Latest') {
      list = [...list].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }

    return list;
  }, [activeGenre, activeFilter, selectedYear]);

  const displayedMovies = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <>
      <section
        id="categories"
        className="py-24 px-6 lg:px-16 bg-cine-bg-secondary reveal-hidden"
        aria-labelledby="genre-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="section-label mb-3">Browse by taste</p>
            <h2
              id="genre-heading"
              className="font-display font-800 text-4xl md:text-5xl text-cine-foreground tracking-tight"
            >
              Explore by Genre &amp; Year
            </h2>
          </div>

          {/* Genre pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8" role="group" aria-label="Genre filters">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setActiveGenre(genre);
                  setVisibleCount(12);
                }}
                className={`genre-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-600 transition-all ${
                  activeGenre === genre ? 'active bg-cine-accent text-white shadow-glow-accent' : ''
                }`}
                aria-pressed={activeGenre === genre}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs text-cine-muted font-body font-600 uppercase tracking-widest mr-2">
              Sort by:
            </span>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-4 py-2 rounded-xl font-body font-600 transition-all duration-200 border ${
                  activeFilter === f
                    ? 'bg-cine-primary/20 border-cine-primary text-cine-primary shadow-sm'
                    : 'border-white/08 text-cine-foreground/50 hover:text-cine-foreground hover:border-white/15'
                }`}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}

            {/* Year selector */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-cine-muted font-body hidden sm:inline">Release Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setVisibleCount(12);
                }}
                className="text-xs px-4 py-2 rounded-xl font-body font-600 bg-black/40 border border-white/10 text-cine-foreground hover:border-white/20 transition-colors cursor-pointer focus:outline-none focus:border-cine-primary/50"
                aria-label="Filter by year"
              >
                <option value="">All Years</option>
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-cine-bg text-cine-foreground">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-cine-muted font-body">
              Showing <span className="text-cine-primary font-700">{displayedMovies.length}</span> of{' '}
              <span className="text-cine-foreground font-600">{filtered.length}</span> titles
              {activeGenre !== 'All' && (
                <span>
                  {' '}
                  in <span className="text-cine-accent font-600">{activeGenre}</span>
                </span>
              )}
            </p>

            {(activeGenre !== 'All' || selectedYear !== '') && (
              <button
                onClick={() => {
                  setActiveGenre('All');
                  setSelectedYear('');
                  setVisibleCount(12);
                }}
                className="text-xs text-cine-accent hover:underline font-body"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center max-w-lg mx-auto">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="font-display font-700 text-lg text-cine-foreground mb-1">
                No titles match your filter
              </h3>
              <p className="text-xs text-cine-muted font-body mb-4">
                Try selecting a different genre or release year.
              </p>
              <button
                onClick={() => {
                  setActiveGenre('All');
                  setSelectedYear('');
                }}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-display font-700"
              >
                Show All Titles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {displayedMovies.map((movie) => (
                <GenreMovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                  onPlayTrailer={() => openTrailer(movie)}
                  isInWatchlist={isInWatchlist(movie.id)}
                  onToggleWatchlist={() => toggleWatchlist(movie)}
                />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="btn-ghost px-10 py-3.5 rounded-xl text-sm font-display font-600 hover:bg-white/10 transition-colors"
              >
                Load More Titles (+6)
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
}

function GenreMovieCard({
  movie,
  onClick,
  onPlayTrailer,
  isInWatchlist,
  onToggleWatchlist,
}: {
  movie: Movie;
  onClick: () => void;
  onPlayTrailer: () => void;
  isInWatchlist: boolean;
  onToggleWatchlist: () => void;
}) {
  return (
    <div
      className="movie-card poster-ratio cursor-pointer group relative overflow-hidden rounded-2xl border border-white/06 hover:border-white/20 transition-all duration-300"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${movie.title}`}
    >
      <AppImage
        src={movie.poster}
        alt={`${movie.title} movie poster`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-card-gradient z-10 pointer-events-none" />

      {/* Top badges */}
      <div className="absolute top-2 left-2 z-20">
        <span className="text-[9px] font-body font-700 uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/70 text-cine-primary/90 border border-white/05">
          {movie.genres[0]}
        </span>
      </div>

      <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist();
          }}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
            isInWatchlist
              ? 'bg-cine-accent text-white shadow-glow-accent'
              : 'glass-dark text-white/80 hover:bg-white/20'
          }`}
          aria-label={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill={isInWatchlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>

        <div className="rating-badge rounded-md px-1.5 py-0.5 flex items-center gap-0.5 text-xs">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="#F5C518">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {movie.rating.toFixed(1)}
        </div>
      </div>

      {/* Quick Play Trailer on hover */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayTrailer();
          }}
          className="pointer-events-auto w-10 h-10 rounded-full bg-cine-accent/90 text-white flex items-center justify-center hover:scale-110 shadow-glow-accent transition-transform"
          aria-label={`Play ${movie.title} trailer`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
        <p className="font-display font-700 text-xs text-cine-foreground line-clamp-2 leading-tight">
          {movie.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-[10px] text-cine-foreground/50 font-body">{movie.year}</p>
          {parseInt(movie.year) >= 2025 && (
            <span className="text-[8px] font-display font-700 uppercase px-1.5 py-0.2 rounded bg-cine-accent/25 text-cine-accent border border-cine-accent/40">
              Upcoming
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
