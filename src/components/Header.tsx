'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useWatchlist } from '@/context/WatchlistContext';
import CinemaSoundscape from '@/components/CinemaSoundscape';

const NAV_ITEMS = [
  { label: 'Trending', href: '#trending' },
  { label: 'Vibes', href: '#moods' },
  { label: 'Double Bill', href: '#double-feature' },
  { label: 'Categories', href: '#categories' },
  { label: 'Featured', href: '#featured' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    watchlist,
    openWatchlist,
    tmdbKey,
    openTmdbModal,
    openRoulette,
  } = useWatchlist();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
        scrolled ? 'glass-dark border-b border-white/06 py-3' : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group mr-6 lg:mr-10 flex-shrink-0"
          aria-label="CineExplorer home"
        >
          <AppLogo
            size={36}
            iconName="FilmIcon"
            className="group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-display font-800 text-lg text-cine-foreground tracking-tight">
            Cine<span className="text-gradient">Explorer</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-body font-500 text-cine-foreground/60 hover:text-cine-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cinema Theater Soundscape */}
          <CinemaSoundscape />

          {/* TMDB Live Sync Status Pill */}
          <button
            onClick={openTmdbModal}
            className="px-3 py-1.5 rounded-xl text-xs font-display font-600 glass text-cine-foreground/80 hover:text-white hover:border-emerald-500/40 transition-all duration-200 flex items-center gap-2"
            title="Configure TMDB Live Movie Stream"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                tmdbKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{tmdbKey ? 'TMDB Live' : 'Live Sync'}</span>
          </button>

          {/* Cinema Roulette Reel button */}
          <button
            onClick={openRoulette}
            className="px-3.5 py-1.5 rounded-xl text-xs font-display font-600 glass text-cine-foreground/80 hover:text-white hover:border-cine-primary/40 transition-all duration-200 flex items-center gap-1.5"
            title="Spin the Curator's Film Reel"
          >
            <span>🎲</span>
            <span>Roulette</span>
          </button>

          {/* Watchlist button with counter */}
          <button
            onClick={openWatchlist}
            className="px-3.5 py-1.5 rounded-xl text-xs font-display font-600 glass text-cine-foreground/80 hover:text-white hover:border-cine-accent/40 transition-all duration-200 flex items-center gap-2"
            aria-label="Open Watchlist"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={watchlist.length > 0 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              className={watchlist.length > 0 ? 'text-cine-accent' : ''}
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            <span>Watchlist</span>
            {watchlist.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cine-accent text-white text-[10px] font-bold">
                {watchlist.length}
              </span>
            )}
          </button>

          <a
            href="#trending"
            className="btn-primary px-5 py-2 rounded-xl text-xs font-display font-700 shadow-glow-accent"
          >
            Explore Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={openTmdbModal}
            className="w-9 h-9 glass rounded-lg flex items-center justify-center text-xs"
            title="Live Sync"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                tmdbKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
          </button>

          <button
            onClick={openWatchlist}
            className="w-9 h-9 glass rounded-lg flex items-center justify-center relative text-cine-foreground/80"
            aria-label="Open Watchlist"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cine-accent text-white text-[9px] font-bold flex items-center justify-center">
                {watchlist.length}
              </span>
            )}
          </button>

          <button
            className="w-9 h-9 glass rounded-lg flex items-center justify-center text-cine-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
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
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-white/06 px-6 py-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-body font-500 text-cine-foreground/70 hover:text-cine-foreground py-2 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/06 space-y-3">
            <button
              onClick={() => {
                setMobileOpen(false);
                openTmdbModal();
              }}
              className="w-full glass py-2.5 rounded-xl text-sm font-display font-600 flex items-center justify-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${tmdbKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{tmdbKey ? 'TMDB Live Connected' : 'Configure Live TMDB'}</span>
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                openRoulette();
              }}
              className="w-full glass py-2.5 rounded-xl text-sm font-display font-600 flex items-center justify-center gap-2"
            >
              <span>🎲</span>
              <span>Cinema Roulette</span>
            </button>
            <a
              href="#trending"
              onClick={() => setMobileOpen(false)}
              className="btn-primary block text-center px-6 py-3 rounded-xl text-sm font-display font-700"
            >
              Explore Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
