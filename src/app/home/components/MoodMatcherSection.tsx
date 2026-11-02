'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import MovieModal from './MovieModal';
import { allMovies, type Movie } from '@/data/Movies';
import { useWatchlist } from '@/context/WatchlistContext';
import { cinemaAudio } from '@/lib/cinemaAudio';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  tagline: string;
  quote: string;
  quoteAuthor: string;
  accentColor: string;
  glowGradient: string;
  movieTitles: string[];
  vibeNotes: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'cosmic',
    emoji: '🌌',
    label: 'Mind-Bending & Cosmic',
    tagline: 'Transcend spacetime, perception, and the outer limits of existence.',
    quote: 'We used to look up at the sky and wonder at our place in the stars...',
    quoteAuthor: 'Interstellar (2014)',
    accentColor: '#8B5CF6',
    glowGradient: 'from-purple-900/30 via-indigo-900/20 to-transparent',
    movieTitles: ['Interstellar', 'Inception', 'Dune: Part Two'],
    vibeNotes: 'Best watched with lights dimmed and deep subwoofer engaged.',
  },
  {
    id: 'adrenaline',
    emoji: '⚡',
    label: 'Pure Adrenaline & Fury',
    tagline: 'High-octane spectacles, colossal arenas, and heart-pounding stakes.',
    quote: 'What we do in life echoes in eternity.',
    quoteAuthor: 'Gladiator II (2024)',
    accentColor: '#EF4444',
    glowGradient: 'from-red-950/40 via-orange-950/20 to-transparent',
    movieTitles: ['Gladiator II', 'Deadpool & Wolverine', 'Alien: Romulus'],
    vibeNotes: 'Maximum pulse-rate cinema designed for pure escapism.',
  },
  {
    id: 'poetic',
    emoji: '💔',
    label: 'Bittersweet & Poetic',
    tagline: 'Tender glances, unspoken words, and the profound weight of time.',
    quote: 'There is a word in Korean: In-Yun. It means providence or fate.',
    quoteAuthor: 'Past Lives (2023)',
    accentColor: '#F472B6',
    glowGradient: 'from-pink-950/30 via-rose-950/20 to-transparent',
    movieTitles: ['Past Lives', 'Barbie', 'Poor Things'],
    vibeNotes: 'Have tissues ready; an unforgettable emotional imprint.',
  },
  {
    id: 'noir',
    emoji: '🕯️',
    label: 'Dark Noir & Psychological',
    tagline: 'Labyrinthine mysteries, twisted human nature, and urban grit.',
    quote: 'Fear is a tool. When that light hits the sky, it is not just a call. It is a warning.',
    quoteAuthor: 'The Batman (2022)',
    accentColor: '#10B981',
    glowGradient: 'from-emerald-950/30 via-slate-950/20 to-transparent',
    movieTitles: ['The Batman', 'The Dark Knight', 'The Substance'],
    vibeNotes: 'Chilling, shadowy cinematography with razor-sharp tension.',
  },
  {
    id: 'wonder',
    emoji: '✨',
    label: 'Awe & Mythological Wonder',
    tagline: 'Breathtaking fantasy, legendary odysseys, and boundless magic.',
    quote: 'The journey home is the ultimate battle.',
    quoteAuthor: 'The Odyssey (2026)',
    accentColor: '#38BDF8',
    glowGradient: 'from-sky-950/30 via-blue-950/20 to-transparent',
    movieTitles: ['Spirited Away', 'The Odyssey', 'Superman'],
    vibeNotes: 'Inspires childhood wonder and pure cinematic awe.',
  },
  {
    id: 'obsession',
    emoji: '🥁',
    label: 'Obsession & Electric Tension',
    tagline: 'The harrowing pursuit of greatness at the brink of madness.',
    quote: 'There are no two words in the English language more harmful than "good job".',
    quoteAuthor: 'Whiplash (2014)',
    accentColor: '#F59E0B',
    glowGradient: 'from-amber-950/30 via-yellow-950/20 to-transparent',
    movieTitles: ['Whiplash', 'Oppenheimer', 'Parasite'],
    vibeNotes: 'Relentless pacing with jaw-dropping, award-winning performances.',
  },
];

export default function MoodMatcherSection() {
  const [selectedMoodId, setSelectedMoodId] = useState<string>('cosmic');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { isInWatchlist, toggleWatchlist, openTrailer } = useWatchlist();

  const currentMood = MOODS.find((m) => m.id === selectedMoodId) || MOODS[0];

  let matchedMovies = currentMood.movieTitles
    .map((title) => allMovies.find((m) => m.title.toLowerCase() === title.toLowerCase()))
    .filter(Boolean) as Movie[];

  // Fallback safeguard: ensure every mood always displays at least 3 curated masterpieces
  if (matchedMovies.length < 3) {
    const existingIds = new Set(matchedMovies.map((m) => m.id));
    const backfill = allMovies.filter((m) => !existingIds.has(m.id));
    matchedMovies = [...matchedMovies, ...backfill.slice(0, 3 - matchedMovies.length)];
  }

  const handleSelectMood = (id: string) => {
    cinemaAudio.playTick();
    setSelectedMoodId(id);
  };

  const handleShuffleMood = () => {
    const otherMoods = MOODS.filter((m) => m.id !== selectedMoodId);
    const random = otherMoods[Math.floor(Math.random() * otherMoods.length)];
    handleSelectMood(random.id);
  };

  return (
    <>
      <section
        id="moods"
        className="relative py-24 px-6 lg:px-16 bg-cine-bg overflow-hidden transition-all duration-700"
        aria-labelledby="mood-heading"
      >
        {/* Dynamic ambient backlight matching mood */}
        <div
          className={`absolute inset-0 bg-gradient-radial ${currentMood.glowGradient} opacity-60 pointer-events-none transition-all duration-1000`}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/05 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-cine-accent animate-ping" />
                <p className="section-label">Cinematic Mood Matcher</p>
              </div>
              <h2
                id="mood-heading"
                className="font-display font-800 text-4xl md:text-5xl text-cine-foreground tracking-tight"
              >
                How Do You Want to Feel?
              </h2>
              <p className="text-cine-muted font-body text-sm md:text-base mt-2 max-w-2xl">
                Every film has a pulse. Tell us what your soul seeks tonight, and we’ll curate
                a cinematic journey tailored precisely to your emotional frequency.
              </p>
            </div>

            <button
              onClick={handleShuffleMood}
              className="self-start md:self-auto px-4 py-2.5 rounded-xl glass hover:bg-white/10 text-xs font-display font-600 text-cine-foreground/80 hover:text-white transition-all flex items-center gap-2 border border-white/10"
              title="Pick a random emotional vibe"
            >
              <span>🎲</span>
              <span>Surprise My Vibe</span>
            </button>
          </div>

          {/* Mood Pills Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {MOODS.map((mood) => {
              const isSelected = mood.id === selectedMoodId;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSelectMood(mood.id)}
                  className={`relative p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden border ${
                    isSelected
                      ? 'glass-dark border-white/30 shadow-2xl scale-[1.03]'
                      : 'glass border-white/06 hover:border-white/15 hover:bg-white/05'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 12px 30px ${mood.accentColor}25` : undefined,
                  }}
                >
                  {/* Selected Top Accent Line */}
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: mood.accentColor }}
                    />
                  )}

                  <div className="text-2xl mb-2">{mood.emoji}</div>
                  <div>
                    <h3
                      className={`font-display font-700 text-xs md:text-sm leading-snug transition-colors ${
                        isSelected ? 'text-white' : 'text-cine-foreground/80 group-hover:text-white'
                      }`}
                    >
                      {mood.label}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Mood Showcase Banner */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-10 relative overflow-hidden backdrop-blur-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{currentMood.emoji}</span>
                  <span
                    className="text-xs font-display font-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10"
                    style={{ color: currentMood.accentColor }}
                  >
                    Current Frequency
                  </span>
                </div>

                <h3 className="font-display font-800 text-2xl sm:text-3xl text-white mb-2">
                  {currentMood.label}
                </h3>
                <p className="text-sm font-body text-cine-foreground/75 mb-4">
                  {currentMood.tagline}
                </p>

                {/* Curator Quote */}
                <div className="border-l-2 pl-4 py-1 italic font-display text-sm sm:text-base text-cine-foreground/90 border-white/30">
                  &ldquo;{currentMood.quote}&rdquo;
                  <span className="block text-xs not-italic text-cine-muted font-body mt-1">
                    — {currentMood.quoteAuthor}
                  </span>
                </div>
              </div>

              {/* Vibe note pill */}
              <div className="lg:w-72 p-4 rounded-2xl glass-dark border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-display font-700 uppercase text-cine-muted tracking-wider block mb-1">
                    Auditorium Vibe
                  </span>
                  <p className="text-xs font-body text-cine-foreground/80 leading-relaxed">
                    {currentMood.vibeNotes}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/06 flex items-center justify-between">
                  <span className="text-[11px] text-cine-muted">Matched Masterpieces</span>
                  <span
                    className="text-xs font-display font-700 px-2 py-0.5 rounded-md bg-white/10"
                    style={{ color: currentMood.accentColor }}
                  >
                    {matchedMovies.length} Films
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Film Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedMovies.map((movie, index) => {
              const inWatchlist = isInWatchlist(movie.id);

              return (
                <div
                  key={movie.id}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col"
                >
                  {/* Poster header with quick play */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-black/60">
                    <AppImage
                      src={movie.backdrop || movie.poster}
                      alt={`${movie.title} backdrop`}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cine-bg via-black/30 to-transparent" />

                    {/* Vibe rank tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-display font-700 uppercase tracking-wider bg-black/75 text-white border border-white/15 backdrop-blur-md">
                        Spotlight #{index + 1}
                      </span>
                    </div>

                    {/* Play trailer button */}
                    <button
                      type="button"
                      onClick={() => openTrailer(movie)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cine-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300 shadow-glow-accent z-20"
                      aria-label={`Play trailer for ${movie.title}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70 border border-white/10 text-xs font-display font-700 text-cine-foreground">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#F5C518">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-display font-700 text-base text-white group-hover:text-cine-primary transition-colors line-clamp-1">
                          {movie.title}
                        </h4>
                        <span className="text-xs font-body text-cine-muted font-500">
                          {movie.year}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {movie.genres.slice(0, 3).map((g) => (
                          <span
                            key={g}
                            className="text-[10px] font-body px-2 py-0.5 rounded-full bg-white/06 text-cine-foreground/70 border border-white/06"
                          >
                            {g}
                          </span>
                        ))}
                        <span className="text-[10px] font-body text-cine-muted self-center ml-auto">
                          {movie.runtime}
                        </span>
                      </div>

                      <p className="text-xs text-cine-foreground/60 font-body line-clamp-2 leading-relaxed mb-4">
                        {movie.synopsis}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/08">
                      <button
                        type="button"
                        onClick={() => setSelectedMovie(movie)}
                        className="flex-1 py-2 rounded-xl text-xs font-display font-600 glass hover:bg-white/10 text-white transition-colors"
                      >
                        Film Details
                      </button>

                      <button
                        type="button"
                        onClick={() => openTrailer(movie)}
                        className="px-3 py-2 rounded-xl text-xs font-display font-600 bg-cine-accent/20 border border-cine-accent/40 text-cine-accent hover:bg-cine-accent hover:text-white transition-all flex items-center gap-1.5"
                        title="Watch Trailer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Trailer</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleWatchlist(movie)}
                        className={`p-2 rounded-xl transition-all ${
                          inWatchlist
                            ? 'bg-cine-accent text-white shadow-glow-accent'
                            : 'glass text-cine-foreground/70 hover:text-white hover:bg-white/10'
                        }`}
                        title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={inWatchlist ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal if details clicked */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
