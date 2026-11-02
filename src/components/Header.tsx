'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { FilmIcon } from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { label: 'Trending', href: '#trending' },
  { label: 'Categories', href: '#categories' },
  { label: 'Featured', href: '#featured' },
  { label: 'About', href: '#stats' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/home"
          className="flex items-center gap-2.5 group"
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
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS?.map((item) => (
            <a
              key={item?.label}
              href={item?.href}
              className="text-sm font-body font-500 text-cine-foreground/60 hover:text-cine-foreground transition-colors duration-200"
            >
              {item?.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#"
            className="text-sm font-body font-500 text-cine-foreground/60 hover:text-cine-foreground transition-colors"
          >
            Sign In
          </a>
          <a
            href="#trending"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-display font-700"
          >
            Explore Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-9 h-9 glass rounded-lg flex items-center justify-center"
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
      </nav>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-white/06 px-6 py-6 space-y-4">
          {NAV_ITEMS?.map((item) => (
            <a
              key={item?.label}
              href={item?.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-body font-500 text-cine-foreground/70 hover:text-cine-foreground py-2 transition-colors"
            >
              {item?.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/06">
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
