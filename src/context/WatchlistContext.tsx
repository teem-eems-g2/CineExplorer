'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { type Movie, allMovies, featuredMovie } from '@/data/Movies';

interface ToastData {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'alert';
}

interface WatchlistContextType {
  watchlist: Movie[];
  isInWatchlist: (movieId: number | string) => boolean;
  toggleWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number | string) => void;
  clearWatchlist: () => void;
  isWatchlistOpen: boolean;
  openWatchlist: () => void;
  closeWatchlist: () => void;
  ratings: Record<number, number>;
  rateMovie: (movieId: number, rating: number) => void;
  activeTrailerMovie: Movie | null;
  openTrailer: (movie: Movie) => void;
  closeTrailer: () => void;
  toasts: ToastData[];
  showToast: (message: string, type?: 'info' | 'success' | 'alert') => void;
  // TMDB Live Integration
  tmdbKey: string;
  saveTmdbKey: (key: string) => void;
  isTmdbModalOpen: boolean;
  openTmdbModal: () => void;
  closeTmdbModal: () => void;
  // Cinema Roulette
  isRouletteOpen: boolean;
  openRoulette: () => void;
  closeRoulette: () => void;
  liveNowPlaying: Movie[];
  setLiveNowPlaying: (movies: Movie[]) => void;
  isLiveLoading: boolean;
  refreshLiveMovies: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const STORAGE_KEY = 'cineexplorer_watchlist_v1';
const RATINGS_KEY = 'cineexplorer_ratings_v1';
const TMDB_KEY_STORAGE = 'cineexplorer_tmdb_key_v1';

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isTmdbModalOpen, setIsTmdbModalOpen] = useState(false);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [tmdbKey, setTmdbKey] = useState<string>('');
  const [liveNowPlaying, setLiveNowPlaying] = useState<Movie[]>([]);
  const [isLiveLoading, setIsLiveLoading] = useState(false);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const refreshLiveMovies = useCallback(async () => {
    setIsLiveLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (tmdbKey) headers['x-tmdb-key'] = tmdbKey;
      const res = await fetch('/api/movies?category=now_playing', { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.movies && data.movies.length > 0) {
          setLiveNowPlaying(data.movies);
          if (data.source === 'tmdb_live') {
            showToast(`Loaded ${data.movies.length} live new releases from TMDB!`, 'success');
          }
        }
      }
    } catch {
      // fallback
    } finally {
      setIsLiveLoading(false);
    }
  }, [tmdbKey, showToast]);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWatchlist(parsed);
        }
      } else {
        const initial = [featuredMovie, allMovies[1]].filter(Boolean);
        setWatchlist(initial);
      }

      const storedRatings = localStorage.getItem(RATINGS_KEY);
      if (storedRatings) {
        setRatings(JSON.parse(storedRatings));
      }

      const storedKey = localStorage.getItem(TMDB_KEY_STORAGE);
      if (storedKey) {
        setTmdbKey(storedKey);
      }
    } catch {}
  }, []);

  // Fetch live movies on initial load
  useEffect(() => {
    refreshLiveMovies();
  }, [refreshLiveMovies]);

  const saveTmdbKey = useCallback((key: string) => {
    const trimmed = key.trim();
    setTmdbKey(trimmed);
    try {
      if (trimmed) {
        localStorage.setItem(TMDB_KEY_STORAGE, trimmed);
      } else {
        localStorage.removeItem(TMDB_KEY_STORAGE);
      }
    } catch {}
    showToast(trimmed ? 'TMDB API Key connected! Fetching live movies...' : 'TMDB Key removed', 'success');
  }, [showToast]);

  const isInWatchlist = useCallback(
    (movieId: number | string) =>
      watchlist.some((m) => String(m.id) === String(movieId)),
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (movie: Movie) => {
      setWatchlist((prev) => {
        const exists = prev.some((m) => String(m.id) === String(movie.id));
        let updated: Movie[];
        if (exists) {
          updated = prev.filter((m) => String(m.id) !== String(movie.id));
          showToast(`Removed "${movie.title}" from Watchlist`, 'info');
        } else {
          updated = [movie, ...prev];
          showToast(`Added "${movie.title}" to Watchlist!`, 'success');
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    [showToast]
  );

  const removeFromWatchlist = useCallback(
    (movieId: number | string) => {
      setWatchlist((prev) => {
        const item = prev.find((m) => String(m.id) === String(movieId));
        const updated = prev.filter((m) => String(m.id) !== String(movieId));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        if (item) {
          showToast(`Removed "${item.title}" from Watchlist`, 'info');
        }
        return updated;
      });
    },
    [showToast]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    showToast('Watchlist cleared', 'info');
  }, [showToast]);

  const rateMovie = useCallback(
    (movieId: number, rating: number) => {
      setRatings((prev) => {
        const updated = { ...prev, [movieId]: rating };
        try {
          localStorage.setItem(RATINGS_KEY, JSON.stringify(updated));
        } catch {}
        showToast(`Rated ${rating}/10 ★`, 'success');
        return updated;
      });
    },
    [showToast]
  );

  const openWatchlist = useCallback(() => setIsWatchlistOpen(true), []);
  const closeWatchlist = useCallback(() => setIsWatchlistOpen(false), []);

  const openTmdbModal = useCallback(() => setIsTmdbModalOpen(true), []);
  const closeTmdbModal = useCallback(() => setIsTmdbModalOpen(false), []);

  const openRoulette = useCallback(() => setIsRouletteOpen(true), []);
  const closeRoulette = useCallback(() => setIsRouletteOpen(false), []);

  const openTrailer = useCallback((movie: Movie) => setActiveTrailerMovie(movie), []);
  const closeTrailer = useCallback(() => setActiveTrailerMovie(null), []);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        isInWatchlist,
        toggleWatchlist,
        removeFromWatchlist,
        clearWatchlist,
        isWatchlistOpen,
        openWatchlist,
        closeWatchlist,
        ratings,
        rateMovie,
        activeTrailerMovie,
        openTrailer,
        closeTrailer,
        toasts,
        showToast,
        tmdbKey,
        saveTmdbKey,
        isTmdbModalOpen,
        openTmdbModal,
        closeTmdbModal,
        isRouletteOpen,
        openRoulette,
        closeRoulette,
        liveNowPlaying,
        setLiveNowPlaying,
        isLiveLoading,
        refreshLiveMovies,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
