import React from 'react';

import AppLogo from '@/components/ui/AppLogo';
import { FilmIcon, EnvelopeIcon, PhoneIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// Pattern 7 — Arc Browser Split: Logo+tagline left, links right
export default function Footer() {
  return (
    <footer className="bg-cine-bg border-t border-white/06 py-16 px-6 lg:px-16" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Left — Logo + tagline */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={32} iconName="FilmIcon" />
              <span className="font-display font-800 text-base text-cine-foreground tracking-tight">
                Cine<span className="text-gradient">Explorer</span>
              </span>
            </div>
            <p className="text-sm text-cine-foreground/40 font-body leading-relaxed mb-4">
              Your gateway to the world of cinema.
            </p>
            
            {/* Owner Info */}
            <div className="glass rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AcademicCapIcon className="w-4 h-4 text-cine-primary" />
                <span className="text-xs font-display font-600 text-cine-foreground">Project Owner</span>
              </div>
              <p className="text-sm font-display font-700 text-cine-foreground mb-1">Solomon Fentaw</p>
              <p className="text-xs text-cine-foreground/60 font-body">3rd Year CS Student</p>
              <p className="text-xs text-cine-foreground/60 font-body">Mekelle University</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-display font-700 text-cine-foreground mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Trending', href: '#trending' },
                { label: 'Categories', href: '#categories' },
                { label: 'Featured', href: '#featured' },
                { label: 'Privacy', href: '#' },
                { label: 'Terms', href: '#' },
              ]?.map((link) => (
                <a
                  key={link?.label}
                  href={link?.href}
                  className="text-sm font-body font-500 text-cine-foreground/45 hover:text-cine-foreground transition-colors duration-200"
                >
                  {link?.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-display font-700 text-cine-foreground mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+251914131094"
                className="flex items-center gap-2 text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                <PhoneIcon className="w-4 h-4" />
                <span>+251 914 131 094</span>
              </a>
              <a
                href="mailto:solomonfentaw884@gmail.com"
                className="flex items-center gap-2 text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                <EnvelopeIcon className="w-4 h-4" />
                <span>solomonfentaw884@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Portfolio Links */}
          <div>
            <h3 className="text-sm font-display font-700 text-cine-foreground mb-4">Portfolio</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/solomon-fentaw/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Henry24-94"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://vercel.com/solomon-fentaws-projects-aed1ec90"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                Vercel Profile
              </a>
              <a
                href="https://henrysolomon.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                Portfolio Site 1
              </a>
              <a
                href="https://solomonfentaw.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cine-foreground/45 hover:text-cine-foreground transition-colors"
              >
                Portfolio Site 2
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-white/06 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cine-foreground/25 font-body">
            © 2026 CineExplorer. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/solomon-fentaw/',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Henry24-94',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
              {
                label: 'Vercel',
                href: 'https://vercel.com/solomon-fentaws-projects-aed1ec90',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 1.61H14.06L12 5.16 9.94 1.61H0L12 22.39ZM12 14.08 5.16 2.23H9.59L12 6.41l2.41-4.18h4.43Z"/>
                  </svg>
                ),
              },
              {
                label: 'Portfolio 1',
                href: 'https://henrysolomon.vercel.app/',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                ),
              },
              {
                label: 'Portfolio 2',
                href: 'https://solomonfentaw.vercel.app/',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                ),
              },
            ]?.map((social) => (
              <a
                key={social?.label}
                href={social?.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social?.label}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-cine-foreground/35 hover:text-cine-foreground/70 hover:bg-white/08 transition-all duration-200"
              >
                {social?.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
