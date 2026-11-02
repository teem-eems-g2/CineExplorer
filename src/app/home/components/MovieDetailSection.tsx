'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { featuredMovie } from '@/data/Movies';

export default function MovieDetailSection() {
  const [showModal, setShowModal] = useState(false);
  const movie = featuredMovie;

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
          <div className="glass-card rounded-3xl overflow-hidden">
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
                    className="w-16 h-16 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                    aria-label={`Watch trailer for ${movie?.title}`}
                  >
                    <svg
                      className="w-6 h-6 text-cine-foreground ml-1 group-hover:text-cine-accent transition-colors"
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

                    {/* Year */}
                    <span className="text-sm font-body font-500 text-cine-foreground/50 bg-white/05 px-3 py-1.5 rounded-lg border border-white/08">
                      {movie?.year}
                    </span>

                    {/* Runtime */}
                    <span className="text-sm font-body font-500 text-cine-foreground/50 bg-white/05 px-3 py-1.5 rounded-lg border border-white/08">
                      {movie?.runtime}
                    </span>

                    {/* Genres */}
                    {movie?.genres?.slice(0, 2)?.map((g) => (
                      <span
                        key={g}
                        className="text-xs font-body font-600 text-cine-primary/80 bg-cine-primary/10 border border-cine-primary/20 px-3 py-1.5 rounded-lg"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-800 text-3xl md:text-4xl lg:text-5xl text-cine-foreground tracking-tight mb-4 leading-tight">
                    {movie?.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-cine-primary/70 font-body font-500 italic text-base mb-6">
                    {movie?.tagline}
                  </p>

                  {/* Synopsis */}
                  <p className="text-cine-foreground/65 font-body text-base leading-relaxed line-clamp-3 mb-8">
                    {movie?.synopsis}
                  </p>

                  {/* Cast */}
                  <div className="mb-8">
                    <p className="text-xs font-body font-700 uppercase tracking-[0.18em] text-cine-muted mb-4">
                      Cast
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {movie?.cast?.map((actor) => (
                        <div
                          key={actor?.name}
                          className="flex items-center gap-2.5 glass rounded-xl px-3 py-2"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <AppImage
                              src={actor?.photo}
                              alt={`${actor?.name} actor photo`}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-display font-600 text-cine-foreground leading-none">
                              {actor?.name}
                            </p>
                            <p className="text-[10px] text-cine-foreground/40 font-body mt-0.5">
                              {actor?.role}
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
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-display font-700"
                    aria-label={`Watch trailer for ${movie?.title}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Trailer
                  </button>
                  <button className="btn-ghost flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-display font-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Add to Watchlist
                  </button>
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
