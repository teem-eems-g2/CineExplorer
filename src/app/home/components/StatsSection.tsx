'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 10000, suffix: '+', label: 'Movies & Shows', description: 'Across all genres and eras' },
  { value: 50, suffix: '+', label: 'Genres', description: 'From action to avant-garde' },
  { value: 98, suffix: '%', label: 'Accuracy', description: 'TMDB-powered real-time data' },
  { value: 4, suffix: 'M+', label: 'Searches Daily', description: 'By cinephiles worldwide' },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active);
  const display =
    stat.value >= 1000
      ? count >= 1000
        ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
        : count.toString()
      : count.toString();

  return (
    <div className="glass-card rounded-2xl p-8 text-center group">
      <div className="font-display font-800 text-4xl md:text-5xl text-gradient mb-2 tracking-tight">
        {display}
        {stat.suffix}
      </div>
      <div className="font-display font-700 text-cine-foreground text-lg mb-1">{stat.label}</div>
      <div className="text-sm text-cine-foreground/45 font-body leading-relaxed">
        {stat.description}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="py-24 px-6 lg:px-16 bg-cine-bg-secondary reveal-hidden"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">Powered by TMDB</p>
          <h2
            id="stats-heading"
            className="font-display font-800 text-4xl md:text-5xl text-cine-foreground tracking-tight mb-6"
          >
            The Numbers Behind <span className="text-gradient">CineExplorer</span>
          </h2>
          <p className="text-cine-foreground/55 font-body text-lg max-w-xl mx-auto leading-relaxed">
            Real-time data from The Movie Database. Updated daily. Trusted by millions.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </div>

        {/* Divider */}
        <div className="divider mb-20" />

        {/* CTA block */}
        <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-16 text-center">
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(255,107,107,0.4) 0%, rgba(232,180,184,0.2) 40%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <p className="section-label mb-4">Your gateway to cinema</p>
            <h3 className="font-display font-800 text-3xl md:text-5xl text-cine-foreground tracking-tight mb-6 leading-tight">
              Start Exploring
              <br />
              <span className="text-gradient">10,000+ Titles</span>
            </h3>
            <p className="text-cine-foreground/55 font-body text-lg mb-10 max-w-lg mx-auto">
              No sign-up required. Search any movie, discover hidden gems, and watch trailers
              instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="btn-primary flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-base font-display font-700"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Start Exploring
              </a>
              <a
                href="#trending"
                className="btn-ghost flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-base font-display font-600"
              >
                Browse Trending
              </a>
            </div>

            {/* TMDB attribution */}
            <p className="text-xs text-cine-foreground/25 font-body mt-10">
              Data provided by{' '}
              <span className="text-cine-primary/50 font-600">The Movie Database (TMDB)</span>. Not
              affiliated with or endorsed by TMDB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
