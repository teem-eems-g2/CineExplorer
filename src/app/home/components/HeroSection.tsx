'use client';

import React, { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search handler — connects to movie API
  };

  const suggestions = ['Inception', 'Dune', 'Oppenheimer', 'The Batman', 'Avatar'];

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background image (cinematic full-bleed) ── */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1d9658507-1772698049413.png"
          alt="Cinematic movie theater with dramatic lighting and film atmosphere"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Multi-layer gradient overlay — cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-cine-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-cine-accent animate-pulse-slow" />
            <span className="section-label" style={{ letterSpacing: '0.18em' }}>
              Now Streaming · 10,000+ Titles
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-title mb-6 text-cine-foreground">
            Discover <span className="text-gradient">Movies,</span>
            <br />
            Shows &amp; Trailers
          </h1>

          {/* Sub */}
          <p className="hero-sub mb-10 max-w-xl">
            Your cinematic universe awaits. Search 10,000+ films, explore trending titles, and find
            your next obsession — all in one place.
          </p>

          {/* ── Search bar ── */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <div className="relative flex items-center rounded-2xl overflow-visible">
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, actor, or genre..."
                className="search-input w-full pl-14 pr-44 py-5 rounded-2xl text-base"
                aria-label="Search movies, shows, or actors"
              />

              <button
                type="submit"
                className="btn-primary absolute right-2 px-7 py-3 rounded-xl text-sm font-display font-700"
                aria-label="Search"
              >
                Explore Now
              </button>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs text-cine-muted font-body mr-1 self-center">Trending:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="text-xs px-3 py-1.5 rounded-full glass text-cine-foreground/70 hover:text-cine-primary hover:border-cine-primary/30 transition-all duration-200 font-body font-500"
                >
                  {s}
                </button>
              ))}
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
  );
}
