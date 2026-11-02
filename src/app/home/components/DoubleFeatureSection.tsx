'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { allMovies, type Movie } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';
import MovieModal from './MovieModal';

interface DoubleFeaturePair {
  id: string;
  marqueeTitle: string;
  tagline: string;
  themeNotes: string;
  runtimeTotal: string;
  film1Title: string;
  film2Title: string;
  bridgeReason: string;
}

const DOUBLE_FEATURES: DoubleFeaturePair[] = [
  {
    id: 'desert-stars',
    marqueeTitle: 'The Desert & The Stars',
    tagline: 'From the Spice Sands of Arrakis to the Event Horizon of Gargantua.',
    themeNotes: 'A cosmic masterclass in scale, destiny, and the human spirit.',
    runtimeTotal: '5h 32m of pure cinematic majesty',
    film1Title: 'Dune: Part Two',
    film2Title: 'Interstellar',
    bridgeReason:
      'Both films redefine grand-scale sci-fi through Hans Zimmer’s transcendent scores and intimate father-child emotional anchors.',
  },
  {
    id: 'chaos-empire',
    marqueeTitle: 'Blood in the Arena & Fire in the Streets',
    tagline: 'When institutions crumble, heroes are forged in vengeance.',
    themeNotes: 'Colosseum spectacle meets Gotham’s moral abyss.',
    runtimeTotal: '5h 00m of pulse-pounding drama',
    film1Title: 'Gladiator II',
    film2Title: 'The Dark Knight',
    bridgeReason:
      'Lucius in Rome and Bruce Wayne in Gotham both confront charismatic psychopaths who want to see their civilization burn.',
  },
  {
    id: 'barbenheimer',
    marqueeTitle: 'The Barbenheimer Paradox',
    tagline: 'Existential dread wrapped in bubblegum pink, paired with the dawn of the atomic age.',
    themeNotes: 'The cultural phenomenon that saved modern theatrical moviegoing.',
    runtimeTotal: '4h 54m cultural triumph',
    film1Title: 'Barbie',
    film2Title: 'Oppenheimer',
    bridgeReason:
      'Both investigate what happens when an idea escapes its creator’s control and permanently alters human reality.',
  },
  {
    id: 'perfection-madness',
    marqueeTitle: 'The Price of Immortality',
    tagline: 'When the desire to be legendary demands the ultimate bodily sacrifice.',
    themeNotes: 'Blood on the drumhead and blood in the mirror.',
    runtimeTotal: '4h 07m of visceral tension',
    film1Title: 'Whiplash',
    film2Title: 'The Substance',
    bridgeReason:
      'Two unrelenting allegories examining how relentless pursuit of perfection destroys the soul from the inside out.',
  },
];

const FAMOUS_QUOTES = [
  { quote: 'What we do in life echoes in eternity.', film: 'Gladiator II' },
  { quote: 'Your mind is the scene of the crime.', film: 'Inception' },
  { quote: 'Love is the one thing that transcends time and space.', film: 'Interstellar' },
  { quote: 'Why so serious?', film: 'The Dark Knight' },
  { quote: 'In space no one can hear you scream.', film: 'Alien: Romulus' },
  { quote: 'Long live the fighters.', film: 'Dune: Part Two' },
  { quote: 'There are no two words in English more harmful than "good job".', film: 'Whiplash' },
];

export default function DoubleFeatureSection() {
  const [activePairId, setActivePairId] = useState<string>('desert-stars');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { openTrailer, isInWatchlist, toggleWatchlist } = useWatchlist();

  const currentPair = DOUBLE_FEATURES.find((p) => p.id === activePairId) || DOUBLE_FEATURES[0];

  const movie1 = allMovies.find(
    (m) => m.title.toLowerCase() === currentPair.film1Title.toLowerCase()
  );
  const movie2 = allMovies.find(
    (m) => m.title.toLowerCase() === currentPair.film2Title.toLowerCase()
  );

  return (
    <>
      <section
        id="double-feature"
        className="py-20 bg-cine-bg-secondary relative overflow-hidden border-y border-white/06"
        aria-labelledby="double-feature-heading"
      >
        {/* Quotes Marquee */}
        <div className="relative mb-16 py-3 border-y border-white/06 overflow-hidden bg-black/40">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {FAMOUS_QUOTES.concat(FAMOUS_QUOTES).map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-display">
                <span className="text-cine-accent font-700">“{item.quote}”</span>
                <span className="text-cine-muted font-body">— {item.film}</span>
                <span className="text-white/20">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🎟️</span>
                <p className="section-label">Curator&apos;s Marquee</p>
              </div>
              <h2
                id="double-feature-heading"
                className="font-display font-800 text-3xl sm:text-4xl md:text-5xl text-cine-foreground tracking-tight"
              >
                The Ultimate Double Feature
              </h2>
              <p className="text-cine-muted font-body text-sm md:text-base mt-2 max-w-xl">
                Two complementary masterpieces paired together for an unforgettable movie night.
              </p>
            </div>

            {/* Selector tabs */}
            <div className="flex flex-wrap gap-2">
              {DOUBLE_FEATURES.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setActivePairId(pair.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-display font-600 transition-all ${
                    activePairId === pair.id
                      ? 'bg-cine-accent text-white shadow-glow-accent'
                      : 'glass text-cine-foreground/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {pair.marqueeTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Double Bill Showcase Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden backdrop-blur-2xl">
            {/* Pair Header info */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-display font-700 uppercase tracking-widest text-cine-primary px-3 py-1 rounded-full bg-white/06 border border-white/10 inline-block mb-3">
                Tonight&apos;s Double Bill
              </span>
              <h3 className="font-display font-800 text-2xl sm:text-4xl text-white mb-2">
                {currentPair.marqueeTitle}
              </h3>
              <p className="font-display italic text-sm sm:text-base text-cine-primary/90 mb-3">
                &ldquo;{currentPair.tagline}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-cine-muted font-body">
                <span>⏱️ {currentPair.runtimeTotal}</span>
                <span>•</span>
                <span>{currentPair.themeNotes}</span>
              </div>
            </div>

            {/* Two Movie Cards Facing Each Other with "VS / +" in center */}
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
              {/* Movie 1 (5 cols) */}
              {movie1 && (
                <div className="lg:col-span-5 glass-dark rounded-2xl overflow-hidden border border-white/10 flex flex-col sm:flex-row p-4 gap-4 group">
                  <div className="relative w-full sm:w-36 aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0">
                    <AppImage
                      src={movie1.poster}
                      alt={movie1.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="150px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-display font-700 uppercase text-cine-accent tracking-wider">
                          Part One
                        </span>
                        <span className="text-xs text-cine-gold font-display font-700">
                          ★ {movie1.rating.toFixed(1)}
                        </span>
                      </div>
                      <h4 className="font-display font-800 text-lg text-white mb-1">
                        {movie1.title}
                      </h4>
                      <p className="text-xs text-cine-muted font-body mb-2">
                        {movie1.year} • {movie1.runtime} • Dir. {movie1.director}
                      </p>
                      <p className="text-xs text-cine-foreground/70 font-body line-clamp-3 leading-relaxed mb-4">
                        {movie1.synopsis}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/06">
                      <button
                        onClick={() => openTrailer(movie1)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-display font-600 bg-cine-accent/20 border border-cine-accent/40 text-cine-accent hover:bg-cine-accent hover:text-white transition-all flex items-center justify-center gap-1.5"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Trailer</span>
                      </button>
                      <button
                        onClick={() => setSelectedMovie(movie1)}
                        className="px-3 py-1.5 rounded-lg text-xs font-display font-600 glass hover:bg-white/10 text-white"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => toggleWatchlist(movie1)}
                        className={`p-1.5 rounded-lg ${
                          isInWatchlist(movie1.id)
                            ? 'bg-cine-accent text-white'
                            : 'glass text-cine-foreground/70 hover:text-white'
                        }`}
                        title="Add to Watchlist"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill={isInWatchlist(movie1.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Center Bridge Icon (1 col) */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center py-2">
                <div className="w-12 h-12 rounded-full glass-dark border border-white/20 flex items-center justify-center shadow-xl text-lg font-display font-800 text-cine-accent">
                  +
                </div>
                <span className="text-[10px] font-display font-700 uppercase tracking-widest text-cine-muted mt-2 hidden lg:block">
                  Double Bill
                </span>
              </div>

              {/* Movie 2 (5 cols) */}
              {movie2 && (
                <div className="lg:col-span-5 glass-dark rounded-2xl overflow-hidden border border-white/10 flex flex-col sm:flex-row p-4 gap-4 group">
                  <div className="relative w-full sm:w-36 aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0">
                    <AppImage
                      src={movie2.poster}
                      alt={movie2.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="150px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-display font-700 uppercase text-cine-primary tracking-wider">
                          Part Two
                        </span>
                        <span className="text-xs text-cine-gold font-display font-700">
                          ★ {movie2.rating.toFixed(1)}
                        </span>
                      </div>
                      <h4 className="font-display font-800 text-lg text-white mb-1">
                        {movie2.title}
                      </h4>
                      <p className="text-xs text-cine-muted font-body mb-2">
                        {movie2.year} • {movie2.runtime} • Dir. {movie2.director}
                      </p>
                      <p className="text-xs text-cine-foreground/70 font-body line-clamp-3 leading-relaxed mb-4">
                        {movie2.synopsis}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/06">
                      <button
                        onClick={() => openTrailer(movie2)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-display font-600 bg-cine-accent/20 border border-cine-accent/40 text-cine-accent hover:bg-cine-accent hover:text-white transition-all flex items-center justify-center gap-1.5"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Trailer</span>
                      </button>
                      <button
                        onClick={() => setSelectedMovie(movie2)}
                        className="px-3 py-1.5 rounded-lg text-xs font-display font-600 glass hover:bg-white/10 text-white"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => toggleWatchlist(movie2)}
                        className={`p-1.5 rounded-lg ${
                          isInWatchlist(movie2.id)
                            ? 'bg-cine-accent text-white'
                            : 'glass text-cine-foreground/70 hover:text-white'
                        }`}
                        title="Add to Watchlist"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill={isInWatchlist(movie2.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Why This Pairing Works Footer */}
            <div className="mt-8 p-4 rounded-2xl glass-dark border border-white/08 max-w-2xl mx-auto text-center">
              <span className="text-[10px] font-display font-700 uppercase tracking-widest text-cine-accent block mb-1">
                Thematic Synergy
              </span>
              <p className="text-xs sm:text-sm font-body text-cine-foreground/80 leading-relaxed">
                {currentPair.bridgeReason}
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
