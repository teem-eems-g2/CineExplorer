'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { searchMovies, type Movie, allMovies } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';
import MovieModal from './MovieModal';

const HERO_SLIDES = [
  {
    id: 301,
    title: 'Superman',
    year: '2025',
    badge: '★ 8.4 · In Theaters Worldwide',
    tagline: 'Look up in the sky.',
    backdrop:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 201,
    title: 'The Odyssey',
    year: '2026',
    badge: 'Upcoming 2026 · Christopher Nolan',
    tagline: 'The journey home is the ultimate battle.',
    backdrop:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 303,
    title: 'Mission: Impossible – The Final Reckoning',
    year: '2025',
    badge: '★ 8.2 · Box Office Smash',
    tagline: 'Our lives are the sum of our choices.',
    backdrop:
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=2000&q=80',
  },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openTrailer, isInWatchlist, toggleWatchlist, tmdbKey, openRoulette } = useWatchlist();

  // Slide cycle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const suggestions = ['Gladiator II', 'Wicked', 'Alien: Romulus', 'Dune', 'Oppenheimer', 'The Substance'];

  const [results, setResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // Immediate local search
    const local = searchMovies(query);
    setResults(local);

    // Debounced live API search
    const controller = new AbortController();
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const headers: Record<string, string> = {};
        if (tmdbKey) headers['x-tmdb-key'] = tmdbKey;
        const res = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          if (data.movies && data.movies.length > 0) {
            setResults(data.movies);
          } else if (local.length === 0) {
            setResults([]);
          }
        }
      } catch {
      } finally {
        setIsSearching(false);
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, tmdbKey]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      setSelectedMovie(results[0]);
      setIsOpen(false);
      return;
    }

    if (query.trim()) {
      setIsSearching(true);
      try {
        const headers: Record<string, string> = {};
        if (tmdbKey) headers['x-tmdb-key'] = tmdbKey;
        const res = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.movies && data.movies.length > 0) {
            setSelectedMovie(data.movies[0]);
            setResults(data.movies);
            setIsOpen(false);
            return;
          }
        }
      } catch {
      } finally {
        setIsSearching(false);
      }
    }

    const categoriesEl = document.getElementById('categories');
    if (categoriesEl) {
      categoriesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSuggestion = (s: string) => {
    setQuery(s);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        aria-label="Hero section"
      >
        {/* ── Background image (cinematic full-bleed slide) ── */}
        <div className="absolute inset-0 z-0">
          <AppImage
            key={currentSlide.id}
            src={currentSlide.backdrop}
            alt={`${currentSlide.title} cinematic backdrop`}
            fill
            priority
            className="object-cover object-center transition-all duration-1000 scale-[1.02]"
            sizes="100vw"
          />

          {/* Multi-layer gradient overlay — cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-cine-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        </div>

        {/* ── Atmospheric blobs (depth layer) ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="blob-1 absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)' }}
          />

          <div
            className="blob-2 absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #E8B4B8 0%, transparent 70%)' }}
          />
        </div>

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-16 pt-32 pb-24 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            {/* Active Slide Spotlight Pill + Teaser Trigger */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 border border-white/10 shadow-lg text-xs font-display">
                <span className="w-2 h-2 rounded-full bg-cine-accent animate-ping" />
                <span className="text-white font-700">{currentSlide.badge}</span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-cine-muted font-body italic hidden sm:inline">
                  &ldquo;{currentSlide.tagline}&rdquo;
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const m = allMovies.find((item) => item.id === currentSlide.id);
                  if (m) openTrailer(m);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-display font-700 bg-cine-accent/25 border border-cine-accent/50 text-cine-accent hover:bg-cine-accent hover:text-white transition-all flex items-center gap-1.5 shadow-glow-accent cursor-pointer"
                title={`Play trailer for ${currentSlide.title}`}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Watch {currentSlide.title} Teaser</span>
              </button>
            </div>

            {/* Headline */}
            <h1 className="hero-title mb-6 text-cine-foreground">
              Discover <span className="text-gradient">Movies,</span>
              <br />
              Shows &amp; Trailers
            </h1>

            {/* Sub */}
            <p className="hero-sub mb-8 max-w-xl">
              Your cinematic universe awaits. Search 10,000+ films, watch official HD trailers,
              save to your personal watchlist, and explore today&apos;s greatest stories.
            </p>

            {/* ── Search bar ── */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <div className="relative flex items-center rounded-2xl overflow-visible shadow-2xl">
                {/* Search icon */}
                <div className="absolute left-5 z-10 pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(245,245,240,0.45)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                  }}
                  onFocus={() => {
                    if (query.trim()) setIsOpen(true);
                  }}
                  placeholder="Search by title, director, cast, or genre..."
                  className="search-input w-full pl-14 pr-44 py-5 rounded-2xl text-base bg-black/60 backdrop-blur-xl border border-white/15 focus:border-cine-accent/50 focus:outline-none transition-all"
                  aria-label="Search movies, shows, or actors"
                />

                {/* Clear button if text */}
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-36 text-cine-foreground/40 hover:text-white p-1 text-xs"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}

                <button
                  type="submit"
                  className="btn-primary absolute right-2 px-7 py-3 rounded-xl text-sm font-display font-700 shadow-glow-accent"
                  aria-label="Search"
                >
                  Explore Now
                </button>
              </div>

              {/* ── Live Search Dropdown ── */}
              {isOpen && query.trim().length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 right-0 top-full mt-2 z-50 glass-dark rounded-2xl border border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl p-2 animate-fade-in"
                >
                  <div className="px-4 py-2 text-xs font-body text-cine-muted border-b border-white/08 flex justify-between items-center">
                    <span>
                      {isSearching ? (
                        <span className="flex items-center gap-1.5 text-cine-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-cine-accent animate-ping" />
                          Searching live...
                        </span>
                      ) : (
                        <>
                          Found <strong className="text-cine-primary">{results.length}</strong> title{results.length === 1 ? '' : 's'}
                        </>
                      )}
                    </span>
                    <span className="text-[10px]">Press Enter to view first match</span>
                  </div>

                  {isSearching && results.length === 0 ? (
                    <div className="p-6 text-center text-sm font-body text-cine-foreground/70 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cine-accent animate-ping" />
                      <span>Searching global cinema database for &ldquo;{query}&rdquo;...</span>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="p-6 text-center text-sm font-body text-cine-foreground/60">
                      No titles found matching &ldquo;{query}&rdquo;. Try another search or explore categories below.
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto space-y-1 py-1">
                      {results.slice(0, 6).map((movie) => {
                        const inWatchlist = isInWatchlist(movie.id);
                        return (
                          <div
                            key={movie.id}
                            className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/08 transition-colors group cursor-pointer"
                            onClick={() => {
                              setSelectedMovie(movie);
                              setIsOpen(false);
                            }}
                          >
                            <div className="relative w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
                              <AppImage
                                src={movie.poster}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-display font-700 text-sm text-cine-foreground group-hover:text-cine-accent truncate">
                                  {movie.title}
                                </h4>
                                <span className="text-xs text-cine-muted">({movie.year})</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-0.5 text-xs font-display font-700 text-cine-gold">
                                  ★ {movie.rating.toFixed(1)}
                                </span>
                                <span className="text-cine-muted text-xs">•</span>
                                <span className="text-xs text-cine-muted truncate font-body">
                                  {movie.genres.join(', ')}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openTrailer(movie);
                                  setIsOpen(false);
                                }}
                                className="p-2 rounded-lg bg-cine-accent/15 text-cine-accent hover:bg-cine-accent hover:text-white transition-colors"
                                title="Watch Trailer"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWatchlist(movie);
                                }}
                                className={`p-2 rounded-lg transition-colors ${
                                  inWatchlist
                                    ? 'bg-cine-accent text-white'
                                    : 'glass text-cine-foreground/60 hover:text-white'
                                }`}
                                title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill={inWatchlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Quick suggestions & Roulette Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-cine-muted font-body mr-1">Trending:</span>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSelectSuggestion(s)}
                      className="text-xs px-3 py-1 rounded-full glass text-cine-foreground/70 hover:text-cine-primary hover:border-cine-primary/30 transition-all duration-200 font-body font-500"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Roulette quick trigger & slide bullets */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={openRoulette}
                    className="text-xs px-3.5 py-1.5 rounded-full glass hover:bg-white/10 text-white font-display font-600 transition-all flex items-center gap-1.5 border border-white/10 shadow-sm"
                    title="Spin the Cinema Reel"
                  >
                    <span>🎲</span>
                    <span>Cinema Roulette</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          activeSlide === idx
                            ? 'w-6 bg-cine-accent'
                            : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                        title={`Slide: ${slide.title}`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ── Stats row (bottom of hero, Template 2 pattern) ── */}
          <div className="mt-auto pt-16 flex flex-col sm:flex-row gap-8 sm:gap-0">
            {[
              { value: '10K+', label: 'Movies & Shows' },
              { value: '50+', label: 'Genres & Categories' },
              { value: 'Daily', label: 'Trending Updates' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`sm:px-10 ${i < 2 ? 'sm:border-r border-white/10' : ''}`}
              >
                <div className="font-display font-700 text-3xl md:text-4xl text-cine-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-cine-muted font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-body font-600 tracking-[0.2em] uppercase text-cine-foreground">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-cine-foreground/40 to-transparent" />
        </div>
      </section>

      {/* Hero Movie Modal if selected */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
