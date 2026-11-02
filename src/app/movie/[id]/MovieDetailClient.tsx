'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { type Movie, getMovieTrailerId, getMovieDirectTrailerUrl } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';

interface MovieDetailClientProps {
  movie: Movie;
  similarMovies: Movie[];
}

export default function MovieDetailClient({ movie, similarMovies }: MovieDetailClientProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { isInWatchlist, toggleWatchlist, ratings, rateMovie, showToast, openTrailer } = useWatchlist();

  const inWatchlist = isInWatchlist(movie.id);
  const userRating = ratings[movie.id] || 0;
  const trailerId = getMovieTrailerId(movie);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-cine-bg flex flex-col text-cine-foreground">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-20">
        {/* Back Link Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-4 pb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-body font-500 text-cine-foreground/60 hover:text-cine-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to Explorer</span>
          </Link>

          <button
            onClick={handleShare}
            className="text-xs font-body font-600 glass px-3.5 py-1.5 rounded-xl hover:bg-white/10 flex items-center gap-1.5 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span>Share</span>
          </button>
        </div>

        {/* Hero Banner / Video Player */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12">
          <div className="relative aspect-video max-h-[580px] w-full rounded-3xl overflow-hidden glass-dark border border-white/10 shadow-2xl bg-black">
            {isPlayingTrailer ? (
              <div className="relative w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={`${movie.title} official trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => setIsPlayingTrailer(false)}
                    className="pointer-events-auto px-4 py-2 rounded-xl glass-dark text-xs font-display font-600 text-white hover:bg-white/20 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    ← Close Player
                  </button>
                  <a
                    href={getMovieDirectTrailerUrl(movie)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-4 py-2 rounded-xl glass-dark text-xs font-display font-600 text-white hover:bg-white/25 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Watch on YouTube ↗
                  </a>
                </div>
              </div>
            ) : (
              <>
                <AppImage
                  src={movie.backdrop || movie.poster}
                  alt={`${movie.title} backdrop`}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,20,0.95)] via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />

                {/* Center Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlayingTrailer(true)}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-cine-accent hover:bg-cine-accent/90 text-white font-display font-700 shadow-glow-accent hover:scale-105 transition-all duration-300"
                    aria-label={`Play trailer for ${movie.title}`}
                  >
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Play Official Trailer</span>
                  </button>
                </div>

                {/* Banner Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-black/60 border border-white/10 font-body">
                      {movie.year}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-black/60 border border-white/10 font-body">
                      {movie.runtime}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-cine-accent/20 border border-cine-accent/30 text-cine-accent font-display font-700">
                      ★ {movie.rating.toFixed(1)} IMDb
                    </span>
                  </div>
                  <h1 className="font-display font-800 text-3xl md:text-5xl text-white tracking-tight leading-tight">
                    {movie.title}
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2 Columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tagline & Synopsis */}
            <div>
              {movie.tagline && (
                <p className="text-cine-primary/80 font-body italic text-lg mb-4">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}
              <h2 className="text-xs font-body font-700 uppercase tracking-widest text-cine-muted mb-3">
                Overview
              </h2>
              <p className="text-cine-foreground/80 font-body text-base leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            {/* User Rating Widget */}
            <div className="glass rounded-2xl p-6 border border-white/08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-700 text-base text-cine-foreground mb-1">
                  How would you rate this film?
                </h3>
                <p className="text-xs text-cine-muted font-body">
                  Your rating helps personalize recommendations
                </p>
              </div>

              <div className="flex items-center gap-1.5">
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
                      className="p-1 text-cine-foreground/20 hover:scale-125 transition-transform"
                      aria-label={`Rate ${star} stars`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={active ? '#FF6B6B' : 'currentColor'}
                        stroke={active ? '#FF6B6B' : 'currentColor'}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  );
                })}
                <span className="text-xs font-display font-700 text-cine-accent ml-2">
                  {userRating > 0 ? `${userRating}/10` : ''}
                </span>
              </div>
            </div>

            {/* Cast & Crew Gallery */}
            <div>
              <h2 className="text-xs font-body font-700 uppercase tracking-widest text-cine-muted mb-4">
                Cast &amp; Characters
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movie.cast.map((actor) => (
                  <div
                    key={actor.name}
                    className="flex items-center gap-3 glass rounded-2xl p-3 border border-white/06"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                      <AppImage
                        src={actor.photo}
                        alt={actor.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-700 text-sm text-cine-foreground truncate">
                        {actor.name}
                      </p>
                      <p className="text-xs text-cine-muted font-body truncate">{actor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Details */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <button
                onClick={() => toggleWatchlist(movie)}
                className={`w-full py-3.5 rounded-xl text-sm font-display font-700 flex items-center justify-center gap-2 transition-all ${
                  inWatchlist
                    ? 'bg-cine-accent text-white shadow-glow-accent'
                    : 'btn-primary'
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={inWatchlist ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span>{inWatchlist ? 'Saved in Watchlist' : 'Add to Watchlist'}</span>
              </button>

              <button
                onClick={() => setIsPlayingTrailer(true)}
                className="w-full btn-ghost py-3.5 rounded-xl text-sm font-display font-600 flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Watch Trailer</span>
              </button>
            </div>

            {/* Metadata Card */}
            <div className="glass rounded-2xl p-6 border border-white/06 space-y-4">
              <div>
                <p className="text-[10px] font-body font-700 uppercase tracking-widest text-cine-muted mb-1">
                  Director
                </p>
                <p className="font-display font-700 text-base text-cine-foreground">
                  {movie.director}
                </p>
              </div>

              <div className="pt-3 border-t border-white/06">
                <p className="text-[10px] font-body font-700 uppercase tracking-widest text-cine-muted mb-1">
                  Genres
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {movie.genres.map((g) => (
                    <span
                      key={g}
                      className="text-xs px-2.5 py-1 rounded-lg bg-cine-primary/10 text-cine-primary font-600"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/06">
                <p className="text-[10px] font-body font-700 uppercase tracking-widest text-cine-muted mb-1">
                  Release Date
                </p>
                <p className="font-body font-600 text-sm text-cine-foreground">
                  {movie.releaseDate}
                </p>
              </div>

              <div className="pt-3 border-t border-white/06">
                <p className="text-[10px] font-body font-700 uppercase tracking-widest text-cine-muted mb-1">
                  Runtime
                </p>
                <p className="font-body font-600 text-sm text-cine-foreground">{movie.runtime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-20">
            <div className="mb-8">
              <p className="section-label mb-2">Recommendations</p>
              <h2 className="font-display font-800 text-3xl text-cine-foreground tracking-tight">
                More Like This
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {similarMovies.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/movie/${similar.id}`}
                  className="movie-card poster-ratio group block cursor-pointer"
                >
                  <AppImage
                    src={similar.poster}
                    alt={similar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-card-gradient pointer-events-none" />
                  <div className="absolute top-2 right-2 rating-badge rounded-md px-1.5 py-0.5 text-xs flex items-center gap-0.5">
                    ★ {similar.rating.toFixed(1)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-display font-700 text-xs text-cine-foreground line-clamp-1">
                      {similar.title}
                    </p>
                    <p className="text-[10px] text-cine-muted font-body">{similar.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
