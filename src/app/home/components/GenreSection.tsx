'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { allMovies, type Movie } from '@/data/Movies';

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
const FILTERS = ['Popular', 'Top Rated', 'Latest', 'By Year'];
const YEARS = ['2024', '2023', '2022', '2021', '2020'];

export default function GenreSection() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Popular');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filtered = allMovies.filter((m) => {
    if (activeGenre !== 'All' && !m.genres.includes(activeGenre)) return false;
    if (selectedYear && m.year !== selectedYear) return false;
    return true;
  });

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
              Explore by Genre
            </h2>
          </div>

          {/* Genre pills */}
          <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Genre filters">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`genre-pill px-5 py-2.5 rounded-full ${activeGenre === genre ? 'active' : ''}`}
                aria-pressed={activeGenre === genre}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-xs text-cine-muted font-body font-600 uppercase tracking-widest mr-2">
              Sort by:
            </span>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-4 py-2 rounded-lg font-body font-600 transition-all duration-200 border ${
                  activeFilter === f
                    ? 'bg-cine-primary/15 border-cine-primary/30 text-cine-primary'
                    : 'border-white/08 text-cine-foreground/50 hover:text-cine-foreground/80 hover:border-white/15'
                }`}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}

            {/* Year selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-xs px-4 py-2 rounded-lg font-body font-600 bg-transparent border border-white/08 text-cine-foreground/50 hover:border-white/15 transition-colors cursor-pointer focus:outline-none focus:border-cine-primary/30 ml-auto"
              aria-label="Filter by year"
            >
              <option value="">All Years</option>
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-cine-bg">
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <p className="text-xs text-cine-muted font-body mb-6">
            Showing <span className="text-cine-primary font-700">{filtered.length}</span> titles
            {activeGenre !== 'All' && (
              <span>
                {' '}
                in <span className="text-cine-foreground font-600">{activeGenre}</span>
              </span>
            )}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((movie) => (
              <GenreMovieCard
                key={movie.id}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center mt-12">
            <button className="btn-ghost px-10 py-3.5 rounded-xl text-sm font-display font-600">
              Load More Titles
            </button>
          </div>
        </div>
      </section>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
}

function GenreMovieCard({ movie, onClick }: { movie: Movie; onClick: () => void }) {
  return (
    <div
      className="movie-card poster-ratio cursor-pointer group"
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

      {/* Rating */}
      <div className="absolute top-2 right-2 z-20 rating-badge rounded-md px-1.5 py-0.5 flex items-center gap-0.5 text-xs">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="#F5C518">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {movie.rating.toFixed(1)}
      </div>

      {/* Genre tag */}
      <div className="absolute top-2 left-2 z-20">
        <span className="text-[9px] font-body font-700 uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-cine-primary/80">
          {movie.genres[0]}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
        <p className="font-display font-700 text-xs text-cine-foreground line-clamp-2 leading-tight">
          {movie.title}
        </p>
        <p className="text-[10px] text-cine-foreground/45 font-body mt-0.5">{movie.year}</p>
      </div>
    </div>
  );
}
