'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { featuredMovie } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';

export default function MovieDetailSection() {
  const [showModal, setShowModal] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const movie = featuredMovie;
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <>
      <section
        id="featured"
        className="py-24 px-6 lg:px-16 bg-cine-bg reveal-hidden"
        aria-labelledby="featured-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-3">Editor&apos;s Choice</p>
            <h2
              id="featured-heading"
              className="font-display font-800 text-4xl md:text-5xl text-cine-foreground tracking-tight"
            >
              Featured Film
            </h2>
          </div>

          {/* Detail card — asymmetric 40/60 split */}
          <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
            <div className="flex flex-col lg:flex-row">
              {/* Poster — 40% */}
              <div className="relative lg:w-[40%] aspect-[2/3] lg:aspect-auto lg:min-h-[600px] flex-shrink-0">
                <AppImage
                  src={movie?.poster}
                  alt={`${movie?.title} official movie poster`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Cinematic overlay on poster */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(10,10,15,0.6)] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.8)] via-transparent to-transparent lg:hidden" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-16 h-16 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-transform duration-300 group shadow-glow-accent bg-cine-accent/90"
                    aria-label={`Watch trailer for ${movie?.title}`}
                  >
                    <svg
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Details — 60% */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                {/* Meta row */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 bg-cine-gold/10 border border-cine-gold/25 rounded-lg px-3 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5C518">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="font-display font-700 text-cine-gold text-sm">
                        {movie?.rating?.toFixed(1)}
                      </span>
                      <span className="text-xs text-cine-foreground/40 font-body">/10</span>
                    </div>

                    <span className="text-xs px-3 py-1.5 rounded-lg bg-white/06 border border-white/08 text-cine-foreground/60 font-body">
                      {movie?.year}
                    </span>
                    <span className="text-xs px-3 py-1.5 rounded-lg bg-white/06 border border-white/08 text-cine-foreground/60 font-body">
                      {movie?.runtime}
                    </span>
                    {movie?.genres?.map((g) => (
                      <span
                        key={g}
                        className="text-xs px-3 py-1.5 rounded-lg bg-cine-primary/10 border border-cine-primary/20 text-cine-primary font-600 font-body"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-800 text-3xl sm:text-4xl text-cine-foreground tracking-tight mb-2">
                    {movie?.title}
                  </h3>
                  {movie?.tagline && (
                    <p className="text-cine-primary/70 font-body italic text-base mb-6">
                      &ldquo;{movie.tagline}&rdquo;
                    </p>
                  )}

                  {/* Director */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs text-cine-muted font-body uppercase tracking-widest">
                      Director:
                    </span>
                    <span className="text-sm font-display font-700 text-cine-foreground">
                      {movie?.director}
                    </span>
                  </div>

                  {/* Synopsis */}
                  <p className="text-cine-foreground/75 font-body leading-relaxed mb-8 max-w-2xl text-sm sm:text-base">
                    {movie?.synopsis}
                  </p>

                  {/* Cast */}
                  <div className="mb-8">
                    <p className="text-xs font-body font-700 uppercase tracking-widest text-cine-muted mb-4">
                      Starring Cast
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {movie?.cast?.slice(0, 6).map((actor) => (
                        <div
                          key={actor.name}
                          className="flex items-center gap-2.5 glass rounded-xl p-2.5 border border-white/06"
                        >
                          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                            <AppImage
                              src={actor.photo}
                              alt={actor.name}
                              width={36}
                              height={36}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-display font-600 text-cine-foreground truncate">
                              {actor.name}
                            </p>
                            <p className="text-[10px] text-cine-foreground/45 font-body truncate">
                              {actor.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Release date */}
                  <div className="flex items-center gap-2 mb-8">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(245,245,240,0.4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-sm text-cine-foreground/45 font-body">
                      Release Date:{' '}
                      <span className="text-cine-foreground/70 font-600">{movie?.releaseDate}</span>
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-display font-700 shadow-glow-accent"
                    aria-label={`Watch trailer for ${movie?.title}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Trailer
                  </button>

                  <button
                    onClick={() => toggleWatchlist(movie)}
                    className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-display font-600 transition-all ${
                      inWatchlist
                        ? 'bg-cine-accent text-white shadow-glow-accent'
                        : 'btn-ghost'
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={inWatchlist ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                    {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                  </button>

                  <Link
                    href={`/movie/${movie.id}`}
                    className="text-xs text-cine-foreground/60 hover:text-white transition-colors underline-offset-4 hover:underline ml-auto"
                  >
                    Dedicated Film Page →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && <MovieModal movie={movie} onClose={() => setShowModal(false)} />}
    </>
  );
}
